const Users = require(`./users.schema`)
const { errorHandler } = require('../../utils/error');





module.exports.getUsers = async (params) => {
    return Users.paginate()
    .then(users=>{
        return users 
    })
    .catch(err => errorHandler({ err }))
}