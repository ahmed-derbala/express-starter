const express = require('express');
const router = express.Router();
const authCtrl = require(`${process.cwd()}/src/auth/auth.controller`)
const { check, query, param } = require('express-validator');
const validatorCheck = require(`${process.cwd()}/utils/error`).validatorCheck;
const { authenticate } = require(`${process.cwd()}/mw/auth`)






router.post('/signup',
  [
    //  check('user').exists(),
    check('user.email').isEmail(),
    check('user.password').isString().notEmpty(),
    //   check('user.phones').isArray(),
    //  check('user.phones.*.countryCode').isString().notEmpty(),
    //  check('user.phones.*.shortNumber').isString().notEmpty()

  ],
  validatorCheck,
  authCtrl.signup)

router.post('/signin',
  [
    check('user.email').isEmail(),
    check('user.password').isString().notEmpty()
  ],
  validatorCheck,
  authCtrl.signin)

router.post('/signout',
  authenticate(),
  authCtrl.signout)

module.exports = router;
