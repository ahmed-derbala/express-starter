const packagejson = require(`../package.json`);
const os = require("os")

module.exports = {
    name: packagejson.name,
    version: packagejson.version,
    backend: {
        port: 5000,
        host: '127.0.0.1',
        protocol: 'http://',
        url: `http://127.0.0.1:5000`
    },
    cluster: os.cpus().length,    //a number, 0 to disable
    NODE_ENV: process.env.NODE_ENV || 'local',
    responseTimeAlert: 20000,//time in ms before considering a request timeout
    morgan: {
        //more infos: https://www.npmjs.com/package/morgan
        tokenString: `{"status"::status,"method":":method", "url":":url", "ip":":ip", "user": :user ,"body": :body,"browser":":browser", "os":":os", "platform":":platform" ,"origin":":origin", "isBot":":isBot", "referrer":":referrer","tid":":tid" ,"responseTime":":response-time"}`,
    },
    apiLimiter: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers 
    }
}