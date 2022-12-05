/**
 * the default config.js 
 */
const packagejson = require(`../package.json`);
const os = require("os")
const ip = require("ip");


/**
 * app
 */
let app = {
    name: packagejson.name,
    version: packagejson.version,
    backend: {
        port: 5000,
        host: `${ip.address()}`,
        protocol: 'http://',
        get url() { return `${this.protocol}${this.host}:${this.port}` },
    },
    //a number, 0 to disable
    cluster: 0,//os.cpus().length,
    NODE_ENV: process.env.NODE_ENV || 'local',
    responseTimeAlert: 20000,//time in ms before considering a request timeout
    morgan: {
        //more infos: https://www.npmjs.com/package/morgan
        tokenString: `{"status"::status,"method":":method", "url":":url", "ip":":ip", "user": :user ,"body": :body,"browser":":browser", "os":":os", "platform":":platform" ,"origin":":origin", "isBot":":isBot", "referrer":":referrer","tid":":tid" ,"responseTime":":response-time"}`,
        hiddenBodyFields: ["password", "user.password"],//[] for none, display these keys as *** in terminal
    },
    apiLimiter: {
        windowMs: 15 * 60 * 1000, // 15 minutes 
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers 
    },
    use_strict: true,
    corsOptions: {
        origin: "*",
        //methods: "GET,PUT,POST,DELETE,PATCH",
        credentials: true,
    }
}


/**
 * db
 */
const user = null
const password = null
const host = process.env.DATABASE_HOST || 'localhost'
const port = parseInt(process.env.DATABASE_PORT, 10) || 27017
const name = packagejson.name
const maxPoolSize = 200 //number > 0 otherwise ignored, default 200, more infos: https://mongoosejs.com/docs/connections.html#connection_pools
const minPoolSize = 5 //number > 0 otherwise ignored, default 5, more infos: https://mongoosejs.com/docs/connections.html#connection_pools

let uri = ``

if (!user && !password) uri = `mongodb://${host}:${port}/${name}`
else uri = `mongodb://${user}:${password}@${host}:${port}/${name}`

let db = {
    mongo: {
        host,
        port,
        name,
        uri,
        connectionName: name,
        options: {
            maxPoolSize, minPoolSize
        }
    }
}


/**
 * log
 */
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint, colorize } = format;
require('winston-mongodb');
const transportsOptions = {
    file: {
        level: 'verbose',
        filename: `${process.cwd()}/logs/${app.name}.json`,
        handleExceptions: true,
        maxsize: 1000000, //1 million = 1 mb
        maxFiles: 2,
        decolorize: true,
        json: true,
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD--HH:mm:ss.SSS',
            }),
        ),
    },

    console: {
        level: 'startup',
        json: true,
        handleExceptions: true,
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD--HH:mm:ss.SSS',
            }),
            format.json(),
            prettyPrint(),//print every json key in a seperate row for clearer reading
            colorize({ all: true }),//this must be always called at the end to make sure of colors
        ),
    },

    mongo: {
        level: 'error',
        db: db.mongo.uri,
        options: {
            useUnifiedTopology: true
        },
        decolorize: true,
        expireAfterSeconds: 3600,
        collection: 'logs',
        format: format.metadata()
    }
}

const levels = {
    error: 0,
    warn: 1,
    verbose: 2,
    socket: 3,
    debug: 4,
    success: 5,
    startup: 6
}

const colors = {
    error: 'black redBG',
    warn: 'black yellowBG',
    verbose: 'black greenBG',
    socket: 'magenta',
    debug: 'white',
    success: 'green',
    startup: 'white blueBG'
}

const levelNames = {
    error: 'error',
    warn: 'warn',
    verbose: 'verbose',
    socket: 'socket',
    debug: 'debug',
    success: 'success',
    startup: 'startup'
}

let createLoggerOptions = {
    transports: [
        //comment or delete transports you dont want to use
        //new transports.File(transportsOptions.file),//Error: write after end
        new transports.Console(transportsOptions.console),
        new transports.MongoDB(transportsOptions.mongo)
    ],
    exitOnError: false,
    levels
}


module.exports = {
    app,
    auth: {
        saltRounds: 10,
        jwt: {
            privateKey: packagejson.name
        }
    },
    db,
    log: {
        createLoggerOptions,
        transportsOptions,
        colors,
        levels,
        levelNames,
        memory: true
    },
    pagination: {
        minLimit: 1,
        defaultLimit: 100,//limit to use when no limit is provided
        maxLimit: 300
    },
    socketio: {
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
    },
    users: {
        roles: ["admin", "user"],
        types: ["type1", "type2"]
    }
}