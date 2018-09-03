var express = require("express");
var router = express.Router();
const querystring = require('querystring');

router.get("/get", function(req, res) {
    var str='';
    var arr=[];
    var obj={};
    var likeobj={};

    if(req.query.uid && parseInt(req.query.uid)>0){
        obj.user="?";
        arr.push(parseInt(req.query.uid))
    }
    if(req.query.title){
        likeobj.title="?";
        arr.push("%"+req.sql.pool.escape(req.query.title)+"%");
    }
    var where=querystring.stringify(obj,' and ','=',{encodeURIComponent:function(str){
        return str
    }});
    var likeStr=querystring.stringify(likeobj,' and ',' like ',{encodeURIComponent:function(str){
        return str
    }});
    
    if(where){
        str=' where '+where;
    }
    if(likeStr){
        if(str){
            str+=' and '+likeStr;
        }else{
            str=' where '+likeStr;
        }
    }
    if(req.query.desc=="true"){
        str+=` ORDER BY bbs.id DESC`
    }
    if(req.query.limit && parseInt(req.query.limit)>0){
        str+=` limit ?`;
        arr.push(parseInt(req.query.limit)||15)
    }else{
        str+=` limit ?`;
        arr.push(15)
    }
    if(req.query.offset && parseInt(req.query.offset)>0){
        str+=` offset ?`
        arr.push(parseInt(req.query.offset))
    }


    // console.log(str)

    req.sql.query(
        `SELECT bbs.id,bbs.user,user.name as username,title,content,updatetime FROM bbs left join user on bbs.user=user.id ${str}`,arr,
        function(err, result, fields) {
            if (err) {
                res.back(-1, "sql查询错误");
            } else if (result.length >= 1) {
                res.back(1, result, "获取成功");
            } else {
                res.back(-1, "没有数据");
            }
        }
    );

});
router.get("/get/:id", function(req, res) {
    if(!req.params.id){
        res.back(-1, "缺少帖子id");
        return 
    }
    req.sql.query("SELECT * FROM bbs where id=?", [req.params.id], function(
        err,
        result,
        fields
    ) {
        if (result.length == 1) {
            res.back(1, result, "获取成功");
        } else {
            res.back(-1, "没有数据");
        }
    });
});


module.exports = router;
