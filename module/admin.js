module.exports = function(app){
    var session = require('express-session');
    var sql = require('./mysqlpool.js');
//student
    app.get('/admin/getStudentList',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var id = req.session.user;
            res.setHeader('Content-Type','application/json');
            sql(`select s_id,s_name from student`,function(success_data){
                res.send({status:200,data:success_data,message:'success get student list'});
                
            });
        }



    });
    
    app.get('/admin/getStudentInfo/:sid',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var id = req.session.user;
            var sid = req.params.sid;
            res.setHeader('Content-Type','application/json');
            sql(`select * from student where s_id=${sid} `,function(success_data){
                res.send({status:200,data:success_data[0],message:'成功获取学生信息'});
                
            },function(){

            });
        }
    });

    app.post('/admin/putStudentInfo/:sid',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var id = req.session.user;
            var sid = req.params.sid;
            var sname = req.body.sname;
            var sbirth = req.body.sbirth;
            var sidCard = req.body.sidCard;
            var spw = req.body.spassword;
            var sgender = req.body.sgender;
            var sphone = req.body.sphone;
            var sgrade = req.body.sgrade;
            var sclass = req.body.sclass;
            var mid = req.body.mid;
            var lid = req.body.lid;
            res.setHeader('Content-Type','application/json');
            sql(`UPDATE student SET s_phone = ${sphone},s_id = ${sid},s_name = ${sname},s_birth = ${birth},s_idcard = ${sidCard},s_password = ${spw},
            s_gender = ${sgender},s_grade = ${sgrade},s_class = ${sclass},mid = ${mid},lid = ${lid}
            WHERE s_id = ${id} `,function(success_data){
                res.send({status:200,data:{},message:'成功获取学生信息'});
                
            },function(){
                res.send({status:300,data:{},message:'数据解析失败'});
            });
        }
    });

    app.get('/admin/getStudentExperience/:sid',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var sid = req.params.sid;
            
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

    app.get('/admin/putStudentExperience/:sid',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var sid = req.params.sid;
            var etype = req.body.etype;
            var emsg = req.body.emsg;
            var eid = req.body.eid;
            // console.log(sid);
            var id = req.session.user;
            // console.log(id);
            res.setHeader('Content-Type','application/json');

            sql(`update studentExperience set e_type=${etype},e_msg = ${emsg}where e_id=${eid} `,function(success_data){
                res.send({status:200,data:{},message:'修改奖惩记录成功'});
                
            },function(){
                res.send({status:300,data:{},message:'修改奖惩失败'});
                
            })
        }
    });

    app.get('/admin/deleteStudentExperience/:sid',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var sid = req.params.sid;
            var eid = req.body.eid;
            // console.log(sid);
            var id = req.session.user;
            // console.log(id);
            res.setHeader('Content-Type','application/json');

            sql(`update studentExperience set e_type=${etype},e_msg = ${emsg}where e_id=${eid} `,function(success_data){
                res.send({status:200,data:{},message:'修改奖惩记录成功'});
                
            },function(){
                res.send({status:300,data:{},message:'修改奖惩失败'});
                
            })
        }
    });

    
//teacher 

    app.get('/admin/getTeacherList',(req,res)=>{
    if(!req.session.user){
        res.send({status:303,data:{},message:'请登录'});
        res.redirect('/');
    }else{
        var id = req.session.user;
        res.setHeader('Content-Type','application/json');
        sql(`select t_id,t_name from teacher`,function(success_data){
            res.send({status:200,data:success_data,message:'success get teacher list'});
            
        });
    }

    });


    app.get('/admin/getTeacherInfo/:tid',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var id = req.session.user;
            var tid = req.params.tid;
            res.setHeader('Content-Type','application/json');
            sql(`select * from student where t_id=${tid} `,function(success_data){
                res.send({status:200,data:success_data[0],message:'成功获取教师信息'});
                
            },function(){
                res.send({status:300,data:{},message:'修改奖惩失败'})
            });
        }
    });

    app.get('/admin/getCourseList/:tid',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var id = req.session.user;
            var tid = req.params.tid;
            res.setHeader('Content-Type','application/json');
            sql(`select c.c_name,c.c_id,c.c_date,c.c_address
            from course c,teacherCourse tc
            where tc.t_id = ${tid} and tc.c_id = c.c_id`,function(success_data){
                console.log(success_data);
                res.send({status:200,data:success_data,message:'获取课程成功'});
                
            },function(){
                res.send({status:300,data:{},message:'数据库操作失败'});
            });
        }
    });

    app.post('/admin/deleteTeacherCourse/:tid/:cid',(req,res)=>{

        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var cid = req.params.tid;
            var tid = req.params.tid;
            res.setHeader('Content-Type','application/json');
            sql(`delete from teacherCourse where c_id =${cid} t_id = ${tid} `,function(success_data){
                console.log(success_data);
                res.send({status:200,data:success_data,message:'删除课程成功'});
                
            },function(){
                res.send({status:300,data:{},message:'数据库操作失败'});
            });
        }



    })




    //学院、专业
    app.get('/admin/getmajorList',function(){
        
    },function(){

    })


   

    










}