
module.exports = function (sql,success,failed){
    success = typeof success ==='function'?success:new Function();
    failed = typeof failed ==='function'?failed:new Function();


    var mysql = require('mysql');
    var pool = mysql.createPool({
        host:'localhost',
        port:3306,
        database:'mydb',
        user:'root',
        password:'root'
    
    });
    
    pool.getConnection(function(err,poolconnect){
        if(err) {console.log('连接failed');
            failed('连接数据库失败');
        }
        else {
            // console.log('连接success');
        poolconnect.query(sql,function(err,result){
            
            
            if(err) {console.log('查询失败');
            // failed_data = {status:300,data:{},message:'fail to operate the DataBase'};
            failed();
        }
            else{
                data = result;
                
                // console.log(data);
                success(data);
            }
            
        })
    
        }
        poolconnect.release();
    })
}