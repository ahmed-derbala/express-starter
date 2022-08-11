const express = require('express');
const router = express.Router();
const packagejson = require(`../../package.json`);



router.get('/', function (req, res, next) {
  return res.status(200).json({ message: `hello ${packagejson}` });
});

module.exports = router;
