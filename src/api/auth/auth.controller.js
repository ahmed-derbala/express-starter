const mongoose = require('mongoose');
const Users = require(`../users/users.schema`)
const Sessions = require(`../sessions/sessions.schema`)
const bcrypt = require('bcrypt');
const { errorHandler } = require('../../utils/error');
const jwt = require('jsonwebtoken');
const authConfig = require(`../../../configs/auth.config`)
const authSrvc = require(`./auth.service`)

module.exports.signup = async (req, res) => {
    const { user } = req.body

    return authSrvc.signup({ user })
        .then(result => {
            return res.status(result.status).json(result)
        })
        .catch(err => errorHandler({ err, res }))
}

module.exports.signin = async (req, res) => {
    const { user } = req.body
    return authSrvc.signin({ user, req })
        .then(result => {
            return res.status(result.status).json(result)
        })
        .catch(err => errorHandler({ err,req, res }))
}

module.exports.signout = async (req, res) => {
    return Sessions.deleteOne({ token: req.headers.token })
        .then(deletedSession => {
            return res.status(200).json({ msg: 'singedout', data: deletedSession })
        })
        .catch(err => errorHandler({ err, res }))
}