/**
 * this file has the logging system
 * logging system written in seperate file to make it easy to integrates in other projects and to be extensible as possible
 */
const appRootPath = require('app-root-path');
const winston = require('winston'); //logging module
require('winston-mongodb');
const logConf = require(`../configs/log.config`)
const _ = require('lodash');

module.exports.log = (params) => {
  //console.log(params,'log params')
  if (!params) params = {}
  if (!params.level) params.level = 'debug'
  if (!params.message) params.message = 'msg'

  //console.log(logConf.createLoggerOptions,'logConf.createLoggerOptions');
  return winston.createLogger(logConf.createLoggerOptions)[params.level](params)
}






