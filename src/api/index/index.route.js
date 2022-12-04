const express = require('express');
const router = express.Router();
const  conf  = require(`../../utils/loadConf`)



router.get('/', function (req, res, next) {
  return res.status(200).json({ message: `hello from ${conf().app.name} version ${conf().app.version}` });
});

module.exports = router;
