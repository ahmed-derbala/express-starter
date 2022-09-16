const packagejson = require(`../package.json`);
const os = require("os")
const ip = require("ip");

module.exports = {
    name: packagejson.name,
    version: packagejson.version,
    backend: {
        port: 5000,
        host: `${ip.address()}`,
        protocol: 'http://',
        get url() { return `${this.protocol}${this.host}:${this.port}` },
    },
    //cluster: number, 0 to disable
    cluster: 0,
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