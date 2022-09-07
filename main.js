#!/usr/bin/env node
console.clear()
process.on('warning', e => console.warn(e.stack));//print out memory leak errors

const ip = require("ip");
const appConf = require(`./configs/app.config`)
require(`./utils/db`);//connect to db
const { log } = require(`./utils/log`)


/**
 * Module dependencies.
 */
var app = require('./app');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */
app.set('port', appConf.backend.port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
if (appConf.cluster > 0) {
  let cluster = require('cluster');
  if (cluster.isMaster) {
    log({ message: `cluster is enabled. ${appConf.cluster} cpus are in use`, level: 'debug' })
    // Create a worker for each CPU
    for (let c = 1; c <= appConf.cluster; c++) {
      cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', function () {
      console.log(`cluster exited`)
      cluster.fork();
    });

  } else {
    //launching the server
    server.listen(appConf.backend.port, log({ message: `*** ${appConf.name} ${appConf.version} http://${ip.address()}:${appConf.backend.port}/ NODE_ENV=${appConf.NODE_ENV} fork ${cluster.worker.id} pid ${cluster.worker.process.pid} ***`, level: 'debug' }))
    server.on('error', onError);
    server.on('listening', onListening);
  }
} else {
  //launching the server without cluster
  server.listen(appConf.backend.port, log({ message: `*** ${appConf.name} ${appConf.version} http://${ip.address()}:${appConf.backend.port}/ NODE_ENV=${appConf.NODE_ENV} ***`, level: 'debug' }))
  server.on('error', onError);
  server.on('listening', onListening);
}

server.setTimeout(0)//make sure timeout is disabled , wait forever


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof appConf.backend.port === 'string'
    ? 'Pipe ' + appConf.backend.port
    : 'Port ' + appConf.backend.port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      log({ level: 'error', message: `${bind} requires elevated privileges` });
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log({ level: 'error', message: `${bind} is already in use` });
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  log({ level: 'debug', message: `Listening on ${bind}` });
}
