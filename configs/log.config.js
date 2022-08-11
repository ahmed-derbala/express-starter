const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint,colorize } = format;
const { mainMongo } = require(`../configs/mongo.config`)
const appRootPath = require('app-root-path');
const packagejson = require(`${appRootPath}/package.json`);
const appConf=require(`./app.config`)
const fs = require('fs');

const transportsOptions={
    file: {
      level: 'verbose',
      filename: `${appRootPath}/logs/${packagejson.name}.log`,
      //timestamp: true,
      handleExceptions: true,
      maxsize: 1000000, //1MB, 1 million = 1 mb
      maxFiles: 2,
      json: true,
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD--HH:mm:ss.SSS',
        }),
      ),
    },

    console: {
      level: 'debug',
      json: true,
      handleExceptions: true,
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD--HH:mm:ss.SSS',
        }),
        format.json(),
        prettyPrint(),//print every json key in a seperate row for clearer reading
        colorize({ all: true }),//this must be always called at the end to make sure of colors
      ),
    },

    mongo: {
      db: mainMongo.uri,
      options: {
        useUnifiedTopology: true
      },
      decolorize: true,
    }
  }

 let createLoggerOptions={
    transports: [
      new transports.File(transportsOptions.file),
      new transports.Console(transportsOptions.console),
      new transports.MongoDB(transportsOptions.mongo)
    ],
    exitOnError: false,
  }
  /*if (fs.existsSync(`${appRootPath}/configs/log.config.${appConf.NODE_ENV}.js`)) {
    createLoggerOptions=require(`./log.config.${appConf.NODE_ENV}.js`)
   // console.log(createLoggerOptions,'createLoggerOptions')
  }*/

module.exports = {
      createLoggerOptions
}