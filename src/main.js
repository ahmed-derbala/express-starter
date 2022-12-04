#!/usr/bin/env node
console.clear()
const conf = require(`./utils/loadConf`)

if (conf().app.use_strict) require('use-strict')

const db = require("./utils/db");
db.connect()

const { log } = require(`./utils/log`)

process.on('warning', err => log({ message: err.stack, level: 'warn' }));//print out memory leak errors
process.on('uncaughtException', err => log({ message: err.stack, level: 'warn' }));
process.on('unhandledRejection', err => log({ message: err.stack, level: 'warn' }));

const server = require('./utils/server')
const { socketio } = require('./utils/socketio')
socketio({ server })