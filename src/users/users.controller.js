const Users = require(`./users.schema`)
const usersSrvc = require('./users.service')
const { errorHandler } = require('../../utils/error');





module.exports.getUsers = async (req, res) => {
    return usersSrvc.getUsers()
        .then(users => {
            return res.status(200).json({ message: 'users', data: users })
        })
        .catch(err => errorHandler({ err,req, res }))
}