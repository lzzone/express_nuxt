var express = require("express");
var router = express.Router();
const querystring = require('querystring');

router.post("/add", function(req, res,next) {
    if(!req.session.user||!req.session.user.id){
        res.back(-1,  "用户未登录");
        return 
    }
    if(!req.body.bbsid){
        res.back(-1,  "缺少帖子id");
        return 
    }
    req.sql.query('select * from collect where bbs_id=? and user_id = ?' ,[req.body.bbsid,req.session.user.id],function(err,result){
        console.log(err,result)
        if(err){
            res.back(-1,  "查询收藏失败");
        }else if(result){
            if(result.length>=1){
                res.back(-1,  '已经收藏过');
            }else{
                next()
            }
        }
    })
},function(req,res){
    req.sql.query("insert into collect set ?",{
        bbs_id:req.body.bbsid,
        user_id:req.session.user.id
    },function(err,result){

        if(err){
            res.back(-1,  "收藏失败");
        }else if(result){
            if(result.affectedRows== 1){
                // result.insertId 插入id
                res.back(1,[],  "收藏成功");
            }else{
                res.back(-1,  "收藏失败");
            }
        }else{
            res.back(-1,  "收藏失败");
        }
        console.log(err,result)
    })
})
router.get("/get/:bbsid", function(req, res) {
    // if(!req.params.bbsid){
    //     res.back(-1,  "缺少帖子id");
    //     return 
    // }
    // req.sql.query("SELECT bbs_reply.*,user.name,user.is_admin,user.status FROM bbs_reply left join user on bbs_reply.user_id=user.id where bbs_id=? order by id desc", [req.params.bbsid], function(
    //     err,
    //     result,
    //     fields
    // ) {
    //     if(err){
    //         res.back(1,  "数据库错误");
    //     }else if (result.length >= 1) {
    //         res.back(1, result, "获取成功");
    //     } else {
    //         res.back(-1,  "没有数据");
    //     }
    // });
}); 

module.exports = router;
