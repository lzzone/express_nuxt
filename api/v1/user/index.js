var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var sendMail=require("../../../config/email.js");

router.post('/login', function (req, res) {
  req.sql.query("SELECT * FROM user WHERE `name` = ? ", [req.body.name], function (err, result, fields) {
    if (result.length == 1) {
      
      if (bcrypt.compareSync(req.body.pwd, result[0].pwd)) {
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

// 邮箱
router.post('/sendMail',async function (req, res) {
var code= (Math.random()).toString().substring(2,8);
  var send=await sendMail(req.body.name,'adtk注册验证码',`<code>${code}<code><br /><span>此验证码仅用于账户注册</span><br /><span>网站不发任何形式广告</span>`);
  console.log(2);
  console.log(send);

  req.session.email={
    type:'register',
    email:req.body.name,
    code:code
  };
  res.back(1,req.session,'邮箱' );
});
// 注册
router.post('/register', function (req, res) {
  req.sql.query("SELECT * FROM user WHERE `name` = ? ", [req.body.name], function (err, result, fields) {
    if (err) {
      res.back(-1,err);
    }else if (result.length >= 1) {
      res.back(-1,'账户已被注册' );
    } else if (result.length == 0) {
      if (req.body.pwd) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.pwd, salt);
        console.log(hash);
        req.sql.query('insert into user set ?',{
          name:req.body.name,
          pwd:hash
        },function(err,result){
          if(err){
            res.back(-1,err,'注册失败');
          }else if (result){
            res.back(1,result,'添加成功');
          }
        });
      } else {
        res.back(-1, '密码为空');
      }
      
    } else {
      res.back(-1, '存在冲突账户');
    }

  });
})


// 退出登录
router.get('/logout', function (req, res,next) {

  delete req.session.user;
  res.back(1,req.session,'退出成功');
})

module.exports = router;