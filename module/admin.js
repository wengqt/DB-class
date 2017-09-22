module.exports = function(app){
    var session = require('express-session');
    var sql = require('./mysqlpool.js');

    app.get('/admin/getInfo',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var id = req.session.user;
            // var sid = req.params.sid;
            res.setHeader('Content-Type','application/json');
            sql(`select * from admin where a_id=${id} `,function(success_data){
                res.send({status:200,data:success_data[0],message:'成功获取admin信息'});
                
            },function(){

            });
        }
    });
    app.post('/admin/putInfo',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var id = req.session.user;
            var pw = req.body.password;
            var phone = req.body.phone;
            // var sid = req.params.sid;
            res.setHeader('Content-Type','application/json');
            sql(`update admin set a_password=${pw},a_phone=${phone} where a_id=${id} `,function(success_data){
                res.send({status:200,data:success_data[0],message:'成功获取admin信息'});
                
            },function(){

            });
        }
    });



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
            sql(`UPDATE student SET s_phone = '${sphone}',s_id = '${sid}',s_name = '${sname}',s_birth = '${sbirth}',s_idcard = '${sidCard}',s_password = '${spw}',
            s_gender = '${sgender}',s_grade = '${sgrade}',s_class = '${sclass}',m_id = '${mid}',l_id = '${lid}'
            WHERE s_id = ${sid} `,function(success_data){
                console.log(success_data)
                res.send({status:200,data:{},message:'成功修改学生信息'});
                
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

    app.post('/admin/deleteStudentExperience/:sid/:eid',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var sid = req.params.sid;
            var eid = req.params.eid;
            // console.log(sid);
            var id = req.session.user;
            // console.log(id);
            res.setHeader('Content-Type','application/json');

            sql(`delete from studentExperience where s_id=${sid} and e_id = ${eid}`,function(success_data){
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
            sql(`select * from teacher where t_id=${tid} `,function(success_data){
                res.send({status:200,data:success_data[0],message:'成功获取教师信息'});
                
            },function(){
                res.send({status:300,data:{},message:'获取教师信息失败'})
            });
        }
    });

    app.get('/admin/getteacherCourseList/:tid',(req,res)=>{
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
            var cid = req.params.cid;
            var tid = req.params.tid;
            res.setHeader('Content-Type','application/json');
            sql(`delete from teacherCourse where c_id ='${cid}' and t_id='${tid}' `,function(success_data){
                console.log(success_data);
                res.send({status:200,data:{},message:'删除课程成功'});
                
            },function(){
                res.send({status:300,data:{},message:'数据库操作失败'});
            });
        }



    })




    //学院、专业
    app.get('/admin/getmajorList',(req,res)=>{

        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            
            res.setHeader('Content-Type','application/json');
            sql(`select * from major`,function(success_data){
                console.log(success_data);
                res.send({status:200,data:success_data,message:'获取专业列表成功'});
                
            },function(){
                res.send({status:300,data:{},message:'数据库操作失败'});
            });
        }

    })
        app.get('/admin/getDormitoryList',(req,res)=>{
        
                if(!req.session.user){
                    res.send({status:303,data:{},message:'请登录'});
                    res.redirect('/');
                }else{
                    
                    res.setHeader('Content-Type','application/json');
                    sql(`select * from dormitory`,function(success_data){
                        console.log(success_data);
                        res.send({status:200,data:success_data,message:'获取专业列表成功'});
                        
                    },function(){
                        res.send({status:300,data:{},message:'数据库操作失败'});
                    });
                }
        
            });

            app.post('/admin/deleteMajor/:mid',(req,res)=>{
                
                        if(!req.session.user){
                            res.send({status:303,data:{},message:'请登录'});
                            res.redirect('/');
                        }else{
                            
                            var mid = req.params.mid;
                            res.setHeader('Content-Type','application/json');
                            sql(`delete from major where m_id =${mid} `,function(success_data){
                                console.log(success_data);
                                res.send({status:200,data:{},message:'删除专业成功'});
                                
                            },function(){
                                res.send({status:300,data:{},message:'数据库操作失败'});
                            });
                        }
                
                
                
                    })


                    app.post('/admin/deleteDormitory/:did',(req,res)=>{
                        
                                if(!req.session.user){
                                    res.send({status:303,data:{},message:'请登录'});
                                    res.redirect('/');
                                }else{
                                    
                                    var did = req.params.did;
                                    res.setHeader('Content-Type','application/json');
                                    sql(`delete from dormitory where d_id =${did} `,function(success_data){
                                        console.log(success_data);
                                        res.send({status:200,data:{},message:'删除学院成功'});
                                        
                                    },function(){
                                        res.send({status:300,data:{},message:'数据库操作失败'});
                                    });
                                }
                        
                        
                        
                            });
                            app.post('/admin/deleteCourse/:cid',(req,res)=>{
                                
                                        if(!req.session.user){
                                            res.send({status:303,data:{},message:'请登录'});
                                            res.redirect('/');
                                        }else{
                                            
                                            var cid = req.params.cid;
                                            res.setHeader('Content-Type','application/json');
                                            sql(`delete from course where c_id =${cid} `,function(success_data){
                                                console.log(success_data);
                                                res.send({status:200,data:{},message:'删除课程成功'});
                                                
                                            },function(){
                                                res.send({status:300,data:{},message:'数据库操作失败'});
                                            });
                                        }
                                
                                
                                
                                    });

        app.get('/admin/getCourseList',(req,res)=>{
                                
                 if(!req.session.user){
                                            res.send({status:303,data:{},message:'请登录'});
                                            res.redirect('/');
                                        }else{
                                            
                                            res.setHeader('Content-Type','application/json');
                                            sql(`select * from course`,function(success_data){
                                                console.log(success_data);
                                                res.send({status:200,data:success_data,message:'获取课程列表成功'});
                                                
                                            },function(){
                                                res.send({status:300,data:{},message:'数据库操作失败'});
                                            });
                                        }
                                
        });


        app.get('/admin/getTeacherCourse',(req,res)=>{

            if(!req.session.user){
                res.send({status:303,data:{},message:'请登录'});
                res.redirect('/');
            }else{
                var id = req.session.user;
                res.setHeader('Content-Type','application/json');
                sql(`select tc.c_id,c.c_name,tc.t_id,t.t_name from teacherCourse tc,teacher t,course c where tc.t_id = t.t_id and tc.c_id = c.c_id`,function(success_data){
                    res.send({status:200,data:success_data,message:'success get teacher course list'});
                    
                });
            }


        });

        // app.post('/admin/deleteTeachercourse/:tid/:cid',(req,res)=>{
            
        //             if(!req.session.user){
        //                 res.send({status:303,data:{},message:'请登录'});
        //                 res.redirect('/');
        //             }else{
                        
        //                 var tid = req.params.tid;
        //                 var cid = req.params.cid;
                        
        //                 res.setHeader('Content-Type','application/json');
        //                 sql(`delete from major teacherCourse t_id =${tid} and c_id = ${cid} `,function(success_data){
        //                     console.log(success_data);
        //                     res.send({status:200,data:{},message:'删除课程成功'});
                            
        //                 },function(){
        //                     res.send({status:300,data:{},message:'数据库操作失败'});
        //                 });
        //             }
            
            
            
        //         });


    app.post('/admin/addCourse',(req,res)=>{
        
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            
            var cname = req.body.cname;
            var ctime = req.body.ctime;
            var cadd = req.body.cadd;
            var ccredit = req.body.ccredit;
            var cprop = req.body.cprop;
            var tid =  req.body.tid;
            // var tname = req.body.tname;

            res.setHeader('Content-Type','application/json');
            sql(`insert into course (c_name,c_date,c_address,c_credit,c_property) values('${cname}','${ctime}','${cadd}','${ccredit}','${cprop}')`,function(success_data){
                console.log(success_data);
                sql(`insert into teacherCourse values(${success_data.insertId},${tid})`,function(data){
                    res.send({status:200,data:{},message:'添加课程成功'});
                },function(){
                    res.send({status:300,data:{},message:'数据库操作失败,绑定老师失败'});
                })
                
            },function(){
                res.send({status:300,data:{},message:'数据库操作失败,添加课程失败'});
            });
        }

    });

    app.get('/admin/getstudentCourseList',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            // var id = req.session.user;
            var sid = req.params.sid;
            res.setHeader('Content-Type','application/json');
            sql(`select c.c_name,c.c_id,c.c_date,c.c_address,t.t_name,c.c_property,c.c_credit,s.s_name,s.s_id,sc.score
            from studentCourse sc,course c,teacherCourse tc,teacher t,student s
            where  sc.c_id = c.c_id and tc.c_id = sc.c_id and t.t_id=tc.t_id and sc.s_id=s.s_id`,function(success_data){
                console.log(success_data);
                res.send({status:200,data:success_data,message:'获取课程成功'});
                
            },function(){
                res.send({status:300,data:{},message:'数据库操作失败'});
            });
        }
    });
    app.post('/admin/dropCourse/:sid/:cid',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var sid = req.params.sid;
            var cid = req.params.cid;
            var times = 1;
            res.setHeader('Content-Type','application/json');
            console.log(cid);
            sql(`select count(*) times from studentCourse
            where s_id = ${sid} and c_id = ${cid}
            group by s_id,c_id`,function(success_data){
                times = success_data[0].times;
                //  console.log(times);
                sql(`DELETE FROM studentCourse WHERE s_id=${sid} and c_id=${cid} and times =${times};
                
                `,function(success_data){
                    // console.log(success_data);
                    res.send({status:200,data:success_data,message:'退课成功'});
                    
                },function(){
                    res.send({status:300,data:{},message:'数据库操作失败'});
                });

            },function(){
                res.send({status:300,data:{},message:'课程不存在'});
            });
            
        }
    });
    
    //选课
    app.post('/admin/chooseCourse/:sid/:cid',(req,res)=>{
        if(!req.session.user){
            res.send({status:303,data:{},message:'请登录'});
            res.redirect('/');
        }else{
            var sid = req.params.sid;
            var cid = req.params.cid;
            var times = 1;
            res.setHeader('Content-Type','application/json');
            // console.log(cid);
            sql(`select c_id from course where c_id=${cid}`,function(da){
                if(da.length==0){
                    res.send({status:301,data:{},message:'不存在该课程'});
                }else{
                    sql(`select count(*) times from studentCourse
                    where s_id = ${sid} and c_id = ${cid}
                    group by s_id,c_id`,function(success_data){
                        if(success_data.length==0){
                            sql(`INSERT INTO studentCourse (s_id, c_id, times) VALUES (${sid}, ${cid}, ${times});
                            `,function(success_data){
                                // console.log(success_data);
                                res.send({status:200,data:{},message:'选课成功'});
                                
                            },function(){
                                res.send({status:300,data:{},message:'数据库操作失败'});
                            });
                        }else{
                            sql(`select score from studentCourse
                            where s_id = ${sid} and c_id = ${cid} and times = ${success_data[0].times}`,function(data){
                                console.log(data[0].score);
                                if(data[0].score != null){
                                    times = success_data[0].times+1;
                                    console.log(times);
                                   sql(`INSERT INTO studentCourse (s_id, c_id, times) VALUES (${sid}, ${cid}, ${times});
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
            },function(){});
            
            
        }
    });

        
        


   

    










}