const socketioConf = require('../configs/socketio.config');
const { log } = require('./log');
const logConf =require('../configs/log.config')

exports.socketio = ({ server }) => {
    let socket = require('socket.io')(server, socketioConf.options);

    socket.on('connection', (socketData) => {
        log({level:logConf.levelNames.socket,message:`socketId=${socketData.id} | ip=${socketData.handshake.address} | userAgent=${socketData.handshake.headers['user-agent']}`})
    });

    socket.on('error', (error) => {
        console.log(error)
    })

    socket.on('disconnect', (reason) => {
        console.log(reason)


    })


}