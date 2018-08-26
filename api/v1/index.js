var express = require('express');
var router = express.Router();

/* 加载此版本所有api */

var user = require('./user/index.js');
var bbs = require('./bbs/index.js');

router.use('/user',user);
router.use('/bbs',bbs);

module.exports = router;