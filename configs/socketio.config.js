module.exports = {
    options: {
        cors: {
            // origin: "*",//doesnt work
            origin: ["http://127.0.0.1:3666", "http://localhost:3666"],
            credentials: true,
            method: ["GET", "POST"],
            transports: ['websocket', 'polling'],
        },
        allowEIO3: true
    }
}