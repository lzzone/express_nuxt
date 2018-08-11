var express = require('express');
var router = express.Router();

/* 加载此版本所有api */

var user = require('./user/index.js');

router.use('/user',user);


module.exports = router;