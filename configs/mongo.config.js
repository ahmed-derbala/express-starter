const packagejson = require(`../package.json`);

const user = null
const password = null
const host = process.env.DATABASE_HOST || 'localhost'
const port = parseInt(process.env.DATABASE_PORT, 10) || 27017
const name = packagejson.name
const maxPoolSize = 200 //number > 0 otherwise ignored, default 10, more infos: https://mongoosejs.com/docs/connections.html#connection_pools
const minPoolSize = 5 //number > 0 otherwise ignored, default 10, more infos: https://mongoosejs.com/docs/connections.html#connection_pools

let uri = ``

if (!user && !password) uri = `mongodb://${host}:${port}/${name}`
else uri = `mongodb://${user}:${password}@${host}:${port}/${name}`

module.exports = {
    mainMongo: {
        host,
        port,
        name,
        uri,
        connectionName: name,
        options:{
            maxPoolSize,minPoolSize
        }
    }
}
