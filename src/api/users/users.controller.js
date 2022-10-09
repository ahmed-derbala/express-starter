const Users = require(`./users.schema`)
const usersSrvc = require('./users.service')
const { errorHandler } = require('../../utils/error');





module.exports.getUsers = async (req, res) => {
    return usersSrvc.getUsers()
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => errorHandler({ err,req, res }))
}

module.exports.getProfile =  (req, res) => {
    return usersSrvc.getProfile({username:req.params.username})
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => errorHandler({ err,req, res }))
}