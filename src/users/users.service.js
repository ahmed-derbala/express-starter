const Users = require(`./users.schema`)
const { errorHandler } = require('../../utils/error');
const { paginate } = require('../../helpers/pagination')




module.exports.getUsers = async (params) => {
    return paginate({ model: Users })
        .then(users => {
            return users
        })
        .catch(err => errorHandler({ err }))
}

module.exports.getProfile = async ({username}) => {
    return Users.findOne({username}).select('profile').lean()
        .then(user => {
            return user
        })
        .catch(err => errorHandler({ err }))
}