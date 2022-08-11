const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Posts = mongoose.model('Posts');





module.exports.create = async (params) => {
    return Posts.create(params.data)
    .then(post=>{
        return {statusCode:201,msg:'post created',data:post} 
    })
    .catch(err => errorHandler({ err }))
}