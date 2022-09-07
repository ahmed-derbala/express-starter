const fs = require('fs');
const appRootPath = require('app-root-path');
const { log } = require(`../utils/log`)




module.exports.routes = (app) => {
    let directories = fs.readdirSync(`${appRootPath}/src/`)
    let endpoint_root,files
    for (const dir of directories) {
        files = fs.readdirSync(`${appRootPath}/src/${dir}`)
        if (files.length > 0) {
            for (const file of files) {
                if (file.includes('.route.js')) {
                    endpoint_root = file.substring(0, file.indexOf('.route.js'))
                    app.use(`/api/${endpoint_root}`, require(`../src/${dir}/${file}`));
                }
            }
        }
    }
    app.use(`/`, require(`../src/index/index.route`));//make sure main url works with src/index
    log({ level: 'debug', message: 'routes loaded' })
}

