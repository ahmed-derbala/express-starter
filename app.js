var express = require('express');
var cookieParser = require('cookie-parser');
const useragent = require('express-useragent');
const expressWinston = require('express-winston');
require('winston-mongodb');
const winston = require('winston'); //logging module
const loaders = require('./helpers/loaders')
const { mainMongo } = require(`./configs/mongo.config`)
const morganLogger = require(`./utils/morgan`)
const { randomUUID } = require('crypto');
const { transportsOptions } = require('./configs/log.config')
const rateLimit = require('express-rate-limit')
const appConf = require(`./configs/app.config`)


let app = express();
app.use('/api', rateLimit(appConf.apiLimiter))
//process transaction id
const tidHandler = (request, response, next) => {
  if (!request.headers.tid) {
    request.headers.tid = randomUUID()
  }
  response.append('tid', request.headers.tid);
  next();
}
app.use(tidHandler)

app.use(expressWinston.logger({
  transports: [
    new winston.transports.MongoDB(transportsOptions.mongo)
  ],
  expressFormat: true
}));

app.use(morganLogger())
app.use(useragent.express());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable('x-powered-by');
app.disable('etag');

loaders.routes(app)//load routes

module.exports = app;
