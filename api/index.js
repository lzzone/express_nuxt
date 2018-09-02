var express = require("express");
var router = express.Router();

var sql = require("../config/sqlConfig.js"); //封装的sql函数

router.use(function(req, res, next) {
    req.sql = sql;
    res.back = function(errno = 1, data = [], errmsg = "正确") {
        console.log("body", req.body);
        console.log("query", req.query);

        if (errno !== 1) {
            errmsg = data;
            data=[];
        }
        res.send({ errno, data, errmsg });
    };
    next();
});

var v1 = require("./v1/index.js");
/* 加载版本号 */
router.use("/v1", v1);

module.exports = router;
