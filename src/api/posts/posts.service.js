const Posts = require(`./posts.schema`)
const { errorHandler } = require('../../utils/error');
const { paginate } = require('../../helpers/pagination');




module.exports.createPost = async ({post}) => {
    return Posts.create(post)
        .then(createdPost => {
            console.log(createdPost,'createdPost');
            return createdPost
        })
        .catch(err => {
            //throw err
           return  errorHandler({ err })
            //return {data:"fff"}
        })
}