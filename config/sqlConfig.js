var mysql=require("mysql");
var key=require('./key.json');
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

var query=function(){
   
    var data=[];
    var callback=function(){};

    if(arguments.length<=1){
        // 无意义
        return 
    }else if(arguments.length==2){
        // 第二个参数是callback
        callback=arguments[1];
    }else if(arguments.length==3){
        // 第二个参数是数组，第三个参数是callback
        data=arguments[1];
        callback=arguments[2];
    }
    var sql= mysql.format(arguments[0], data);

    console.log(sql);
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,result,fields){
                //释放连接
                conn.release();
                // .release()方法使连接返回到连接池
                if(qerr){
                    console.log(qerr);
                }
                if(result){
                    console.log(result);
                }
                

                // result.insertId:插入行的id
                // result.affectedRows：受影响行数（insert，update 或者 delete）
                // result.changedRows：被改变的行数update

                // console.log(fields);
                callback(qerr,result,fields);
            });
        }
    });
};
var sql={
    // 获取连接,用于事务之类未封装的获取连接
    connection:function(callback) {
        pool.getConnection(function(err,conn){
            callback(err,conn);
        })
    },
    query:query
}
module.exports=sql;