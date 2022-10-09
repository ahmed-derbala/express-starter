const mongoose = require('mongoose');
const Users = require(`../users/users.schema`)
const Sessions = require(`../sessions/sessions.schema`)
const bcrypt = require('bcrypt');
const { errorHandler } = require('../../utils/error');
const jwt = require('jsonwebtoken');
const authConf = require(`../../../configs/auth.config`)

module.exports.signup = async ({user}) => {
    //console.log(params,"servc params")
    const salt = bcrypt.genSaltSync(authConf.saltRounds)
    user.password = bcrypt.hashSync(user.password, salt)
    if (!user.profile.displayname) user.profile.displayname = `${user.profile.firstname} ${user.profile.lastname}`

        user.phone.countryCode = user.phone.countryCode.trim()
        user.phone.shortNUmber = user.phone.shortNumber.trim()
        user.phone.fullNumber = `${user.phone.countryCode}${user.phone.shortNumber}`
    
    return Users.create(user)
        .then(createdUser => {
            createdUser = createdUser.toJSON()
            delete createdUser.password
            if (createdUser.username == null) {
                return Users.updateOne({ _id: createdUser._id }, { username: createdUser._id })
                    .then(updatedUser => {
                        createdUser.username = createdUser._id
                        return { message: 'user created', data: createdUser, status: 201 }
                    })
                    .catch(err => errorHandler({ err }))
            }
            return { message: 'user created', data: createdUser, status: 201 }
        })
        .catch(err => errorHandler({ err }))
}

module.exports.signin = async ({user,req}) => {
    return await Users.findOne({ email: user.email }).lean().select('+password')
        .then(fetchedUser => {
            if (fetchedUser == null) {
                return { message: 'user not found', data: null, status: 404 }
            }
            //user found, check password
            const passwordCompare = bcrypt.compareSync(user.password, fetchedUser.password)

            delete fetchedUser.password//we dont need password anymore
            if (passwordCompare == false) {
                return { message: 'password incorrect', data: null, status: 409 }
            }
            const token = jwt.sign({ fetchedUser, ip: req.ip, userAgent: req.headers['user-agent'] }, authConf.jwt.privateKey, { expiresIn: '30d' })

            return Sessions.create({ token, user:fetchedUser, headers: req.headers,ip:req.ip })
                .then(session => {
                    return { status: 200, message: 'success', data: { user:fetchedUser, token }, }
                })
                .catch(err => errorHandler({ err }))
        })
        .catch(err => errorHandler({ err }))
}