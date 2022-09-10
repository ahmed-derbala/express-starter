const http = require('http')
const socketioConf = require('../configs/socketio.config')


exports.socketio = ({ server }) => {
    console.log('hello from socketio');
    let socket = require('socket.io')(server, socketioConf.options);


    socket.on('connection', (data) => {
        console.log('a user connected');
    });

    socket.on('error', (error) => {
        console.log(error)
    })

    socket.on('disconnect', (reason) => {
        console.log(reason)


    })


}