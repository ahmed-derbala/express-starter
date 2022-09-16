const appConf = require(`../utils/requireConf`)('app')
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint, colorize } = format;
const dbConf = require(`../utils/requireConf`)('db')
require('winston-mongodb');

const transportsOptions = {
  file: {
    level: 'verbose',
    filename: `${process.cwd()}/logs/${appConf.name}.log`,
    handleExceptions: true,
    maxsize: 1000000, //1 million = 1 mb
    maxFiles: 2,
    decolorize: true,
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
    level: 'error',
    db: dbConf.mongo.uri,
    options: {
      useUnifiedTopology: true
    },
    decolorize: true,
    expireAfterSeconds: 3600,
    collection: 'logs',
    format: format.metadata()
  }
}

const levels = {
  error: 0,
  warn: 1,
  verbose: 2,
  socket: 3,
  debug: 4,
  success: 5,
  startup: 6
}

const colors = {
  error: 'black redBG',
  warn: 'black yellowBG',
  verbose: 'black greenBG',
  socket: 'magenta',
  debug: 'white',
  success: 'green',
  startup: 'white blueBG'
}

const levelNames = {
  error: 'error',
  warn: 'warn',
  verbose: 'verbose',
  socket: 'socket',
  debug: 'debug',
  success: 'success',
  startup: 'startup'
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



module.exports = {
  createLoggerOptions, transportsOptions, colors, levels, levelNames,memory:true
}