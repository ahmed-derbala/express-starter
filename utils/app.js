const express = require('express');
const cookieParser = require('cookie-parser');
const useragent = require('express-useragent');
const expressWinston = require('express-winston');
const winston = require('winston'); //logging module
const loaders = require('../helpers/loaders')
const morganLogger = require(`./morgan`)
const logConf = require(`./requireConf`)('log')
const rateLimit = require('express-rate-limit')
const appConf = require(`../configs/app.config`)
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const { tidHandler } = require('../helpers/tid')

let app = express();
app.use(cors(appConf.corsOptions))
app.use('/api', rateLimit(appConf.apiLimiter))
app.use(compression())
app.use(helmet({
  crossOriginResourcePolicy: false,
}))
app.use(tidHandler)
app.use(useragent.express());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable('x-powered-by');
app.disable('etag');
app.use(morganLogger())


app.use(expressWinston.logger({
  transports: [
    new winston.transports.MongoDB(logConf.transportsOptions.mongo)
  ],
  expressFormat: true
}));


loaders.routes(app)//load routes

//404
app.use((req, res, next) => {
  return res.status(404).json({ status: 404, message: '404 not found', data: null })
})


module.exports = app;
