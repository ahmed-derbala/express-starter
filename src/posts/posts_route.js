const express = require('express');
const router = express.Router();
const posts_ctrl = require(`${appRootPath}/src/posts/posts_ctrl`)
const { check, query, param } = require('express-validator');
const validatorCheck = require(`${appRootPath}/utils/error`).validatorCheck;
const { authenticate } = require(`${appRootPath}/middlewares/authmw`)





router.route('/')
  .post(
    authenticate(),
    [
      check('text').isString().notEmpty(),
    ],
    validatorCheck,
    posts_ctrl.create)

module.exports = router;
