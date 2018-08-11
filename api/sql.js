var mysql=require("mysql");
var key=require('../key.json');
/**
 * ../key.json
 {
    "sql": {
        "host": "",
        "user": "",
        "password": "",
        "database": ""
    }
}
 */
var pool = mysql.createPool(key.sql);

var query=function(sql,callback){
    console.log(sql);
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                console.log(qerr);
                console.log(vals);
                // console.log(fields);
                callback(qerr,vals,fields);
            });
        }
    });
};

module.exports=query;