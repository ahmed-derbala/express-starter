const mongoose = require('mongoose');
const Users = require(`../users/users.schema`)
const Sessions = require(`../sessions/sessions.schema`)
const bcrypt = require('bcrypt');
const { errorHandler } = require('../../utils/error');
const jwt = require('jsonwebtoken');
const authConf = require(`../../configs/auth.config`)

module.exports.signup = async (params) => {
    //console.log(params,"servc params")
    const salt = bcrypt.genSaltSync(authConf.saltRounds)
    params.user.password = bcrypt.hashSync(params.user.password, salt)
    if (!params.user.profile.displayname) params.user.profile.displayname = `${params.user.profile.firstname} ${params.user.profile.lastname}`

    for (phone of params.user.phones) {
        phone.countryCode = phone.countryCode.trim()
        phone.shortNUmber = phone.shortNumber.trim()
        phone.fullNumber = `${phone.countryCode}${phone.shortNumber}`
    }
    return Users.create(params.user)
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

module.exports.signin = async (params) => {
    return Users.findOne({ email: params.user.email }).lean().select('+password')
        .then(user => {
            if (user == null) {
                return { message: 'user not found', data: null, status: 404 }
            }
            //user found, check password
            const passwordCompare = bcrypt.compareSync(params.user.password, user.password)

            delete user.password//we dont need password anymore
            if (passwordCompare == false) {
                return { message: 'password incorrect', data: null, status: 409 }
            }
            const token = jwt.sign({ user, ip: params.req.ip, userAgent: params.req.headers['user-agent'] }, authConf.jwt.privateKey, { expiresIn: '30d' })

            return Sessions.create({ token, user, headers: params.req.headers,ip:params.req.ip })
                .then(session => {
                    return { status: 200, message: 'success', data: { user, token }, }
                })
                .catch(err => errorHandler({ err }))
        })
        .catch(err => errorHandler({ err }))
}