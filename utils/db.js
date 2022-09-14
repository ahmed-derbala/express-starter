const mongoose = require('mongoose');
const dbConf  = require(`../utils/requireConf`)('db')
const { log } = require(`./log`)
const { errorHandler } = require('./error');

const connect = async () => {
  try {
    await mongoose.connect(dbConf.mongo.uri, dbConf.mongo.options,
      () => { log({ message: `db_conn_success | ${dbConf.mongo.name} | ${dbConf.mongo.host}:${dbConf.mongo.port}`, level: 'success' }) }
    );
  } catch (err) {
    errorHandler({ err })
  }

  mongoose.connection
    .on('error', () => { log({ message: `db_conn_error | ${dbConf.mongo.name} | ${dbConf.mongo.host}:${dbConf.mongo.port}`, level: 'error' }) })
    .on('close', console.info.bind(console, 'Database connection: close'))
    .on('disconnected', console.info.bind(console, 'Database connection: disconnecting'))
    .on('disconnected', console.info.bind(console, 'Database connection: disconnected'))
    .on('reconnected', console.info.bind(console, 'Database connection: reconnected'))
    .on('fullsetup', console.info.bind(console, 'Database connection: fullsetup'))
    .on('all', console.info.bind(console, 'Database connection: all'))
}


module.exports = {
  connect
}





