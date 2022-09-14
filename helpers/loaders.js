const fs = require('fs');
const { log } = require(`../utils/log`)




module.exports.routes = (app) => {
    let directories = fs.readdirSync(`${process.cwd()}/src/`)
    let endpoint_root,files
    for (const dir of directories) {
        files = fs.readdirSync(`${process.cwd()}/src/${dir}`)
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
    log({ level: 'success', message: 'routes loaded' })
}

