/**
 * this file has the logging system
 * logging system written in seperate file to make it easy to integrates in other projects and to be extensible as possible
 */
const winston = require('winston'); //logging module
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

  winston.addColors(logConf.colors)

  let memory = null
  if (logConf.memory) memory = process.memoryUsage()
  let logger = winston.createLogger(logConf.createLoggerOptions)
  logger[level]({ req, level, message, memory })

  logger.close()
  return logger
}






