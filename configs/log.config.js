const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint, colorize } = format;
const { mainMongo } = require(`../configs/mongo.config`)
const appRootPath = require('app-root-path');
const appConf = require(`./app.config`)
const fs = require('fs');

const transportsOptions = {
  file: {
    level: 'verbose',
    filename: `${appRootPath}/logs/${appConf.name}.log`,
    handleExceptions: true,
    maxsize: 1000000, //1 million = 1 mb
    maxFiles: 2,
    json: true,
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD--HH:mm:ss.SSS',
      }),
    ),
  },

  console: {
    level: 'startup',
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
    level: 'warn',
    db: mainMongo.uri,
    options: {
      useUnifiedTopology: true
    },
    decolorize: true,
    expireAfterSeconds: 3600,
    collection: 'logs',
    format: format.metadata()
  }
}

const levels={
  error:0,
  warn:1,
  verbose:2,
  socket:3,
  debug:4,
  startup:5
}

const levelNames={
  error:'error',
  warn:'warn',
  verbose:'verbose',
  socket:'socket',
  debug:'debug'
}

let createLoggerOptions = {
  transports: [
    //new transports.File(transportsOptions.file),//Error: write after end
    new transports.Console(transportsOptions.console),
    new transports.MongoDB(transportsOptions.mongo)
  ],
  exitOnError: false,
  levels
}

const colors = {
  error:'red',
  warn:'yellow',
  verbose:'green',
  socket:'magenta',
  debug:'white',
  startup:'white blueBG'
}



/*if (fs.existsSync(`${appRootPath}/configs/log.config.${appConf.NODE_ENV}.js`)) {
  createLoggerOptions=require(`./log.config.${appConf.NODE_ENV}.js`)
 // console.log(createLoggerOptions,'createLoggerOptions')
}*/

module.exports = {
  createLoggerOptions, transportsOptions, colors,levels,levelNames
}