const packagejson = require(`../package.json`);

module.exports={
    saltRounds:10,
    jwt:{
        privateKey:packagejson.name
    }
}