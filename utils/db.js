const mongoose = require('mongoose');
const { mainMongo } = require(`../configs/mongo.config`)
const { log } = require(`./log`)


mongoose.connect(mainMongo.uri, mainMongo.options);
const db = mongoose.connection;

db.on('error', function () {
  log({ message: `db_conn_error | ${mainMongo.name} | ${mainMongo.host}:${mainMongo.port}`, level: 'error' });
});

db.once('open', function () {
  log({ message: `db_conn_success | ${mainMongo.name} | ${mainMongo.host}:${mainMongo.port}`, level: 'debug' });
});


