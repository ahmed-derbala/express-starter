/**
 * this file has the logging system
 * logging system written in seperate file to make it easy to integrates in other projects and to be extensible as possible
 */
const winston = require('winston'); //logging module
require('winston-mongodb');
const logConf = require(`./requireConf`)('log')

/**
 * log function
 * @param {Object} log
 * @param {Request} log.req 
 * @param {string} log.level
 * @param {string} log.message
 */
module.exports.log = ({ req, level, message }) => {
  //console.log('log')
  //console.log({req,level,message})
  if (!level) level = 'debug'
  if (!message) message = 'msg'

  winston.addColors(logConf.colors)

  let logger = winston.createLogger(logConf.createLoggerOptions)
  logger[level]({ req, level, message })
  logger.close()
}






