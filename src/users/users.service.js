const Users = require(`./users.schema`)
const { errorHandler } = require('../../utils/error');
const { paginate } = require('../../helpers/pagination.helper')




module.exports.getUsers = async (params) => {
    return paginate({ model: Users })
        .then(users => {
            return users
        })
        .catch(err => errorHandler({ err }))
}