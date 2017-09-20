module.exports = function(app){
    var session = require('express-session');
    var sql = require('./mysqlpool.js');
    app.post('/login',(req,res)=>{
        
        var id = req.body.sid;
        var type = req.body.type;
        var pw = req.body.password;
        //    console.log(id);
        res.setHeader('Content-Type','application/json');
        if(type == 'teacher'){
            var eee = 't_id';
            var ppp = 't_password';
        }else if(type == 'student'){
            var eee = 's_id';
            var ppp = 's_password';
        }else{
            var eee = 'a_id';
            var ppp = 'a_password';
        }
        //   console.log(eee,type);
        sql(`select * from ${type} where ${eee}=${id}`,function(success_data){
            if(success_data.length==0){

            }else{
                if(success_data[0][ppp]==pw){
                    // var  user = JSON.parse(success_data);
                    req.session.user = success_data[0][eee];  // 将用户信息写入 session
                    // if (req.session.originalUrl) {  // 如果存在原始请求路径，将用户重定向到原始请求路径
                    //   var redirectUrl = req.session.originalUrl;
                    //   req.session.originalUrl = null;  // 清空 session 中存储的原始请求路径
                    // } else {  // 不存在原始请求路径，将用户重定向到根路径
                    //   var redirectUrl = '/';
                    // }
                    // res.redirect(redirectUrl);
                    res.cookie('user_id', success_data[0][eee],{withCredentials:true});
                    res.send({status:200,data:{},message:'登录成功'});
                }else{
                    res.send({status:300,data:{},message:'用户名或密码错误'});
                }

            }
            
           
            
        },function (){
            
            res.send({status:300,data:{},message:'用户名或密码错误'});
        });
    });

    app.get('/logout',(req,res)=>{
        req.session.user ='';
        res.cookie('user_id', '');
        res.redirect('/');
    })
    
}