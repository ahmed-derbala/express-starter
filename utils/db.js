const mongoose = require('mongoose');
const { mainMongo } = require(`../configs/mongo.config`)
const { log } = require(`./log`)
const { errorHandler } = require('./error');

const connect = async () => {
  try {
    await mongoose.connect(mainMongo.uri, mainMongo.options,
      () => { log({ message: `db_conn_success | ${mainMongo.name} | ${mainMongo.host}:${mainMongo.port}`, level: 'debug' }) }
    );
  } catch (err) {
    errorHandler({ err })
  }

  mongoose.connection
    .on('error', () => { log({ message: `db_conn_error | ${mainMongo.name} | ${mainMongo.host}:${mainMongo.port}`, level: 'error' }) })
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





