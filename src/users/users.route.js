const express = require('express');
const router = express.Router();
const usersCtrl = require(`./users.controller`)
const { check, query, param } = require('express-validator');
const validatorCheck = require(`../../utils/error`).validatorCheck;
const { authenticate } = require(`../../middlewares/authmw`)




/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/


router.get('/',
  authenticate(),
  usersCtrl.getUsers)

/*
router.post('/signin',
[
    check('email').isEmail(),
    check('password').isString().notEmpty()
],
validatorCheck,
auth_ctrl.signin)
*/

/*
router.post('/signup',
[
    check('email').isEmail(),
    check('password').isString().notEmpty()
],
validatorCheck,
authController.signup)*/

module.exports = router;
