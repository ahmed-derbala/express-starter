const Posts = require(`./posts.schema`)
const postsSrvc = require('./posts.service')
const { errorHandler } = require('../../utils/error');




module.exports.createPost = async (req, res) => {
    const { post } = req.body

    return postsSrvc.createPost({ post })
        .then(data => {
            console.log(data,'data');
            return res.status(200).json(data)
        })
        .catch(err => errorHandler({ err, req, res }))
}