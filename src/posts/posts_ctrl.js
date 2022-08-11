const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Posts = mongoose.model('Posts');

const posts_srvc = require('./posts_srvc')





module.exports.create = async (req, res) => {
    req.body.userId=req.user._id
    return posts_srvc.create({data:req.body,res})
        .then(post => {
            return res.status(post.statusCode).json(post)
        })
        .catch(err => errorHandler({ err, res }))
}