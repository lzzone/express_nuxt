var express = require('express');
var router = express.Router();

router.post('/login', function (req, res) {
  
  req.sql.query("SELECT * FROM user WHERE `name` = ? ", [req.body.name], function (err, result, fields) {
    if (result.length == 1) {
      if (req.body.pwd == result[0].pwd) {
        delete result[0].pwd;
        req.session.user = result[0];
        res.back(1,req.session,'登录成功');
      } else {
        res.back(-1, '密码错误');
      }
    } else if (result.length == 0) {
      res.back(-1,'未注册' );
    } else {
      res.back(-1, '存在冲突账户');
    }

  });
})

router.get('/logout', function (req, res,next) {

  delete req.session.user;
  res.back(1,req.session,'退出成功');
})

module.exports = router;