const { validationResult } = require('express-validator');
const { log } = require(`./log`)

/**
 * handle errors
 * @param {Object} error 
 * @param {Object | String} error.err the error message or object
 * @param {Request} error.req request object
 * @param {Response} error.res response object
 * @param {Next} error.next next object
 */
exports.errorHandler = ({ err, req, res, next }) => {
     console.log('errorHandler...')
    // console.error({ err,  })

    if (typeof err == 'string') err = { message: err }
    let status = 500
    let errObject = {}
    errObject.level = 'error'

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
    if (req) {
        errObject.req = {}
        errObject.req.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        errObject.req.user = req.user
    }
    if (res) {
        res.status(status).json(errObject)
    } else {
        throw err
    }

    // return log(errObject)
};

/**
 * checking errors returned by validator, it should be called directly after validator on routes
 */
exports.validatorCheck = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        log({
            label: 'VALIDATION_ERROR',
            message: JSON.stringify(errors.errors),
            req,
        });
        return res.status(422).json({ message: `validation error`, err: errors.errors });
    }
    return next();
};
