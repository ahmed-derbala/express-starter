const express = require('express');
const router = express.Router();
const appConf = require(`../../configs/app.config`);



router.get('/', function (req, res, next) {
  return res.status(200).json({ message: `hello from ${appConf.name} version ${appConf.version}` });
});

module.exports = router;
