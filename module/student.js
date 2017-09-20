module.exports = function(app){
    var session = require('express-session');
    var sql = require('./mysqlpool.js');
    //获取个人信息
    app.get('/student/getStudentInfo',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var id = req.session.user;
            res.setHeader('Content-Type','application/json');
            sql(`select * from student where s_id=${id} `,function(success_data){
                res.send({status:200,data:success_data[0],message:''});
                
            });
        }
    });


    //修改个人信息
    app.post('/student/putStudentInfo',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var id = req.session.user;
            res.setHeader('Content-Type','application/json');
            sql(`UPDATE student SET s_phone = ${req.params.phone}
            WHERE s_id = ${id} `,function(success_data){
                res.send({status:200,data:{},message:'个人信息修改成功'});
                
            },function(){
                res.send({status:300,data:{},message:'数据库操作失败'});
            });
        }
    });

    //获取课程列表
    app.get('/student/getCourseList',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var id = req.session.user;
            res.setHeader('Content-Type','application/json');
            sql(`select c.c_name,c.c_id,c.c_date,c.c_address,t.t_name,c.c_property
            from studentCourse sc,course c,teacherCourse tc,teacher t
            where sc.s_id = ${id} and sc.c_id = c.c_id and tc.c_id = sc.c_id and t.t_id=tc.t_id and sc.score is null`,function(success_data){
                console.log(success_data);
                res.send({status:200,data:success_data,message:'获取课程成功'});
                
            },function(){
                res.send({status:300,data:{},message:'数据库操作失败'});
            });
        }
    });


    //查询课程成绩
    app.get('/student/getCourseScore',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var id = req.session.user;
            res.setHeader('Content-Type','application/json');
            sql(`select c.c_name,c.c_id,t.t_name,c.c_property,sc.score,sc.times
            from studentCourse sc,course c,teacherCourse tc,teacher t
            where sc.s_id = ${id} and sc.c_id = c.c_id and tc.c_id = sc.c_id and t.t_id=tc.t_id and sc.score is not null`,function(success_data){
                console.log(success_data);
                res.send({status:200,data:success_data,message:'获取成绩成功'});
                
            },function(){
                res.send({status:300,data:{},message:'数据库操作失败'});
            });
        }
    });

    //选课
    app.post('/student/chooseCourse',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var id = req.session.user;
            var cid = req.body.cid;
            var times = 1;
            res.setHeader('Content-Type','application/json');
            // console.log(cid);
            sql(`select count(*) times from studentCourse
            where s_id = ${id} and c_id = ${cid}
            group by s_id,c_id`,function(success_data){
                if(success_data.length==0){
                    sql(`INSERT INTO studentCourse (s_id, c_id, times) VALUES (${id}, ${cid}, ${times});
                    `,function(success_data){
                        // console.log(success_data);
                        res.send({status:200,data:{},message:'选课成功'});
                        
                    },function(){
                        res.send({status:300,data:{},message:'数据库操作失败'});
                    });
                }else{
                    sql(`select score from studentCourse
                    where s_id = ${id} and c_id = ${cid} and times = ${success_data[0].times}`,function(data){
                        console.log(data[0].score);
                        if(data[0].score != null){
                            times = success_data[0].times+1;
                            console.log(times);
                           sql(`INSERT INTO studentCourse (s_id, c_id, times) VALUES (${id}, ${cid}, ${times});
                           `,function(success_data){
                               // console.log(success_data);
                               res.send({status:200,data:{},message:'选课成功'});
                               
                           },function(){
                               res.send({status:300,data:{},message:'数据库操作失败'});
                           });
                        }else{
                            res.send({status:300,data:{},message:'你已经选过该课程'});
                        }
                    },function(){
                        res.send({status:300,data:{},message:'课程不存在'});
                    })
                }
                


                

            },function(){
                // sql(`INSERT INTO studentCourse (s_id, c_id, times) VALUES (${id}, ${cid}, ${times});
                // `,function(success_data){
                //     // console.log(success_data);
                //     res.send({status:200,data:{},message:'选课成功'});
                    
                // },function(){
                //     res.send({status:300,data:{},message:'数据库操作失败'});
                // });
                 res.send({status:300,data:{},message:'课程不存在'});
            });
            
        }
    });

    //退课
    app.post('/student/dropCourse',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var id = req.session.user;
            var cid = req.body.cid;
            var times = 1;
            res.setHeader('Content-Type','application/json');
            console.log(cid);
            sql(`select count(*) times from studentCourse
            where s_id = ${id} and c_id = ${cid}
            group by s_id,c_id`,function(success_data){
                times = success_data[0].times;
                //  console.log(times);
                sql(`DELETE FROM studentCourse WHERE s_id=${id} and c_id=${cid} and times =${times};
                
                `,function(success_data){
                    // console.log(success_data);
                    res.send({status:200,data:success_data,message:'选课成功'});
                    
                },function(){
                    res.send({status:300,data:{},message:'数据库操作失败'});
                });

            },function(){
                res.send({status:300,data:{},message:'课程不存在'});
            });
            
        }
    });



    app.get('/student/getExperience',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var id = req.session.user;
            // console.log(id);
            res.setHeader('Content-Type','application/json');
            sql(`select e.e_type,e.e_msg,e.e_id
            from experience e,studentExperience se
            where se.s_id = ${id} and se.e_id = e.e_id `,function(success_data){
                 console.log(success_data);
                res.send({status:200,data:success_data,message:'获取奖惩记录成功'});
                
            },function(){
                res.send({status:300,data:{},message:'数据库操作失败'});
            });
        }
    });





    

  

    
    
}