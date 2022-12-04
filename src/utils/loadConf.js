const fs = require('fs');
const defaultConf = require('../../configs/config')
const NODE_ENV = process.env.NODE_ENV || defaultConf.NODE_ENV


/**
 * load config file based on NODE_ENV
 * @returns 
 */
 module.exports= () => {
    const defaultPath = `${process.cwd()}/configs/config.js`
    const envPath = `${process.cwd()}/configs/${NODE_ENV}.config.js`
    if (fs.existsSync(envPath)) {
        return require(envPath)
    }
    return require(defaultPath)
}
