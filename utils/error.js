const { validationResult } = require('express-validator');
const { log } = require(`./log`)
const caller = require('caller-id');


exports.errorHandler = ({ err, req, res, next }) => {
   // if (!req) req = {}
    // console.log(req.headers,'req11')

    let status = 500
    let errObject = {}
    errObject.level = 'error'
    errObject.caller = caller.getDetailedString()


    if (err) {
        errObject.error = err
        if (typeof err == 'object') {
            if (err.errors) errObject.error = err.errors
            if (err.message) {
                errObject.message = err.message
            }
            if (err.name) {
                if (err.name == 'ValidationError') {
                    status = 409
                }
                if (err.name == 'TokenExpiredError') {
                    status = 401
                }
            }
        }
    }

    errObject.status = status
    if (!errObject.message) errObject.message = 'error'

    // console.log(errObject,'object')
    if (res) {
          res.status(status).json(errObject)
    }
    if (req) {
        errObject.req = {}
        errObject.req.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        errObject.req.user = req.user
    }

    return log(errObject)
};

/**
 * checking errors returned by validator, it should be called directly after validator on routes
 */
exports.validatorCheck = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error({
            label: 'VALIDATION_ERROR',
            message: JSON.stringify(errors.errors),
            body: req.body,
        });
        return res.status(422).json({ message: `validation error`, err: errors.errors });
    }
    return next();
};
