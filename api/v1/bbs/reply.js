var express = require("express");
var router = express.Router();
const querystring = require('querystring');

router.post("/add", function(req, res) {
    if(!req.session.user||!req.session.user.id){
        res.back(-1,  "用户未登录");
        return 
    }
    if(!req.body.bbsid){
        res.back(-1,  "缺少帖子id");
        return 
    }
    if(!req.body.reply_content){
        res.back(-1,  "缺少回复内容");
        return 
    }

    req.sql.query("insert into bbs_reply set ?",{
        bbs_id:req.body.bbsid,
        reply_content:req.body.reply_content,
        user_id:req.session.user.id
    },function(err,result){
        console.log(err,result)
        if(err){
            res.back(-1,  "回复失败");
        }else if(result){
            if(result.insertId){
                res.back(1, {id:result.insertId}, "回复成功");
            }else{
                res.back(-1,  "回复失败");
            }
        }else{
            res.back(-1,  "回复失败");
        }
    })
})
router.get("/get/:bbsid", function(req, res) {
    if(!req.params.bbsid){
        res.back(-1,  "缺少帖子id");
        return 
    }
    req.sql.query("SELECT bbs_reply.*,user.name,user.is_admin,user.status FROM bbs_reply left join user on bbs_reply.user_id=user.id where bbs_id=? order by id desc", [req.params.bbsid], function(
        err,
        result,
        fields
    ) {
        if(err){
            res.back(1,  "数据库错误");
        }else if (result.length >= 1) {
            res.back(1, result, "获取成功");
        } else {
            res.back(-1,  "没有数据");
        }
    });
}); 

module.exports = router;
