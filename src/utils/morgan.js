const morgan = require('morgan');
const conf = require(`./loadConf`)
const { log } = require(`./log`)
const _ = require('lodash');
const { errorHandler } = require('./error');


morgan.token('ip', (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress);

morgan.token('user', (req) => {
    if (!req.user) return JSON.stringify({});
    return JSON.stringify(req.user);
});

morgan.token('browser', (req) => {
    return req.useragent.browser;
});

morgan.token('os', (req) => {
    return req.useragent.os;
});

morgan.token('platform', (req) => {
    return req.useragent.platform;
});

morgan.token('isBot', (req) => {
    return req.useragent.isBot;
});

morgan.token('referrer', (req) => {
    return req.headers.referrer || req.headers.referer;
});

morgan.token('body', (req) => {
    if (!req.body) req.body = {}

    for (let [key, value] of Object.entries(req.body)) {
        if (conf().app.morgan.hiddenBodyFields.includes(key)) req.body[key] = '***'
        for (let [k, v] of Object.entries(req.body[key])) {
            if (conf().app.morgan.hiddenBodyFields.includes(`${key}.${k}`)) req.body[key][k] = '***'
        }
    }
    return JSON.stringify(req.body);
});

morgan.token('nl', (req) => {
    return '\n';//new line
});

morgan.token('origin', (req) => {
    return req.headers.origin;
});

morgan.token('tid', (req) => {
    return req.headers.tid;
});


const stream = {
    write: function (req) {
        try {
            req = JSON.parse(req)
        }
        catch (e) {
            return errorHandler({ err: 'REQ_NOT_PARSED', req })
        }

        let level = 'error'
        if (_.inRange(req.status, 200, 399)) level = 'verbose'
        if (_.inRange(req.status, 400, 499)) level = 'warn'

        if (level != 'error') log({ req, level,message:"morgan_log" })//we only need to log non error requests cause they will be logged in errorHandler
    },
};

let morganLogger = () => {
    return morgan(conf().app.morgan.tokenString, { stream })
}
module.exports = morganLogger