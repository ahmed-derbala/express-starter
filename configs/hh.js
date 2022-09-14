const defaultAppConf = require('./app.config')
const NODE_ENV = process.env.NODE_ENV || defaultAppConf.NODE_ENV
const fs = require('fs');

const requireConf = (name) => {
    console.log(name,'heelo from requireConf');
    const defaultPath = `${__dirname}/${name}.config.js`
    const envPath = `${__dirname}/${name}.config.${NODE_ENV}.js`
    if (fs.existsSync(envPath)) {
        console.log('local');
        return require(envPath)
    }
    console.log('non local');
    return require(defaultPath)
}

const logConf = requireConf('log')
const appConf = requireConf('app')
console.log(appConf,'ddddddddd');
const dbConf = requireConf('db')

    module.exports = {
        logConf,
        appConf,
        dbConf,


    }

