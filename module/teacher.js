module.exports = function(app){
    var session = require('express-session');
    var sql = require('./mysqlpool.js');
    //获取个人信息
    app.get('/teacher/getTeacherInfo',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var id = req.session.user;
            res.setHeader('Content-Type','application/json');
            sql(`select * from teacher where t_id=${id} `,function(success_data){
                res.send({status:200,data:success_data[0],message:''});
                
            });
        }
    });


    //修改个人信息
    app.post('/teacher/putTeacherInfo',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var id = req.session.user;
            res.setHeader('Content-Type','application/json');
            sql(`UPDATE student SET t_phone = ${req.params.phone}
            WHERE t_id = ${id} `,function(success_data){
                res.send({status:200,data:{},message:'个人信息修改成功'});
                
            },function(){
                res.send({status:300,data:{},message:'数据库操作失败'});
            });
        }
    });

    //获取课程列表
    app.get('/teacher/getCourseList',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var id = req.session.user;
            res.setHeader('Content-Type','application/json');
            sql(`select c.c_name,c.c_id,c.c_date,c.c_address
            from course c,teacherCourse tc
            where tc.t_id = ${id} and tc.c_id = c.c_id`,function(success_data){
                console.log(success_data);
                res.send({status:200,data:success_data,message:'获取课程成功'});
                
            },function(){
                res.send({status:300,data:{},message:'数据库操作失败'});
            });
        }
    });


    //获取课堂学生
    app.get('/teacher/getCourseStudent/:cid',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var cid = req.params.cid;
            var id = req.session.user;
            res.setHeader('Content-Type','application/json');
            sql(`select s.s_id s.s_name sc.score
            from studentCourse sc,course c,student s
            where sc.c_id = ${cid} and sc.s_id = s.s_id`,function(success_data){
                console.log(success_data);
                res.send({status:200,data:success_data,message:'获取成绩成功'});
                
            },function(){
                res.send({status:300,data:{},message:'数据库操作失败'});
            });
        }
    });


    //getStudentEXperience
    
    app.get('/teacher/getStudentEXperience/:sid',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var sid = req.params.sid;
            // console.log(sid);
            var id = req.session.user;
            // console.log(id);
            res.setHeader('Content-Type','application/json');
            sql(`select e.e_type,e.e_msg,e.e_id
            from experience e,studentExperience se
            where se.s_id = ${sid} and se.e_id = e.e_id `,function(success_data){
                 console.log(success_data);
                res.send({status:200,data:success_data,message:'获取奖惩记录成功'});
                
            },function(){
                res.send({status:300,data:{},message:'数据库操作失败'});
            });
        }
    });



    //给学生打分
    app.post('/teacher/scoreStudent',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var sid = req.body.sid;
            var cid = req.body.cid;
            var score = req.body.score;
            // console.log(sid);
            var id = req.session.user;
            // console.log(id);
            res.setHeader('Content-Type','application/json');
            sql(`select max(times) times from studentCourse where s_id=${sid} and c_id=${cid} group by s_id,c_id `,function(times){
             console.log(times);
                sql(`UPDATE studentCourse SET score=${score} WHERE s_id=${sid} and c_id=${cid} and times=${times[0].times};
                `,function(success_data){
                     console.log(success_data);
                    res.send({status:200,data:{},message:'打分成功'});
                    
                },function(){
                    res.send({status:300,data:{},message:'数据库操作失败'});
                });

            },function(){
                res.send({status:300,data:{},message:'数据库操作失败'});
            });
            
        }
    });

    //发布学生奖惩情况

    app.post('/teacher/addStudentExperience',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var sid = req.body.sid;
            var etype = req.body.etype;
            var emsg = req.body.emsg;
            
            // console.log(sid);
            var id = req.session.user;
            // console.log(id);
            res.setHeader('Content-Type','application/json');

            sql(`insert into experience (e_type,e_msg) values(${etype},${emsg})`,function(success_data){
                 console.log(success_data.insertId);
                
                sql(`insert into studentExperience (e_id,s_id) values (${success_data.insertId},${sid})`,function(success_data1){
                    res.send({status:200,data:{},message:'发布奖惩记录成功'});
                    
                },function(){
                res.send({status:300,data:{},message:'发布奖惩失败'});
                
                });
                
            },function(){
                res.send({status:300,data:{},message:'数据库操作失败'});
            });
        }
    });











    

  

    
    
}