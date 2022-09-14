const fs = require('fs');


const defaultAppConf = require('../configs/app.config')
const NODE_ENV = process.env.NODE_ENV || defaultAppConf.NODE_ENV


module.exports=(name)=>{
    const defaultPath = `${process.cwd()}/configs/${name}.config.js`
    const envPath = `${process.cwd()}/configs/${name}.config.${NODE_ENV}.js`
    if (fs.existsSync(envPath)) {
        return require(envPath)
    }
    return require(defaultPath)
}