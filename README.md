#全局约定
```
    时间格式 : 2017-12-31 23:59:59
    url: 'http://hostname:3000/'+interfacename
    303:"请先登录"
    200:"success"
    300:"failed"
```

##无权限接口

###login  
url:/login  
method:post  
req:
```json
    {  
        "type":"aastudnet,teacher,admin",
      "id":"string",
      "password":"string"
    }

```  
res:
```
    {
    	"status" : 200 ,
    	"message" : "OK" ,
    	"data":{}
    };
    {
    	"status" : 300 ,
    	"message" : "Username or password wrong" ,
    	"data":{}
    }
    
```



##学生权限接口
###getStudentInfo
url:/student/getStudentInfo  
method:get  
req:  
```json
    {}
```
res:
```json
    {
      "status" : 200 ,
      "message" : "OK" ,
      "data":{
			"s_id": "201500111002",
			"s_name": "aaa",
			"s_birth": null,
			"s_idcard": null,
			"s_password": "111",
			"s_gender": null,
			"s_phone": null,
			"s_grade": null,
			"s_class": null,
			"m_id": null,
			"l_id": null
        }
    
    }
```

###putStudentInfo
url:/student/putStudentInfo  
method:post  
req:
```json
    {
        "name":"string",
        "age":"int",
        "idCard":"string",
        "birth":"string",
        "gender":"string",
        "phone":"string"
    }
```
res:
```
    { 
        "status" : 200 ,
        "message" : "OK" 
        
    }
    {
        "status" : 300 ,
        "message" : "操作失败" 
        
    }
```

###getCourseList  
url:/student/getCourseList  
method:get  
req:
```json
    {}
```
res:
```json
    { 
      "status" : 200 ,
      "message" : "OK",
      "data": [{
          "c_name": "database",
            "c_id": "11111",
            "c_date": "1-2周$1-2,2-1,3-2,4-1",
            "c_address": "5-201",
            "t_name": "毛老师",
            "c_property": "必修"
      },{}]
    }
```
###getCourseScore  
url:/student/getCourseScore    
method:get  
req:
```json
    {}
```
res:
```json
    {
      "status":200,
      "message" : "ok",
      "data" : [
        {
          "c_name": "database",
            "c_id": "11111",
            "t_name": "毛老师",
            "c_property": "必修",
            "score": null,
            "times": 1
        },{}
      
      
      ]
      
    }
```

###studentChooseCourse  
url:/student/chooseCourse   
method:post  
req:
```json
    {
      "cid":"string"
    }
```
res:
```
    {
      "status":200,
      "message":"success",
      "data":{}
    },
    {
          "status":300,
          "message":"failed",
          "data":{}
        }
    
   
```

###studentDropCourse  
url:/student/dropCourse/  
method:post  
req:  
```json
    {
      "cid":"string"    
    }
```
res:  
```
    {
      "status":200,
      "message":"success",
      "data":{}
    },
    {
          "status":300,
          "message":"failed",
          "data":{}
        }
```
###getExperience  
url:/student/getExperience  
method:get  
req:  
```json
    { 
    }
```
res:  
```
    {
      "status":200,
      "message":"success",
      "data":{}
    },
    {
          "status":300,
          "message":"failed",
          "data":{}
        }
```


##teacher auth  

###getTeacherInfo  
获取个人信息  
url:/teacher/getTeacherInfo  
method:get  
req:
```json
    {}
```
res:
```json
    {"status":200,
      "message":"ok",
      "data":{
      
              "name":"string",
              "class":"int",
              "age":"int",
              "sid":"string",
              "idCard":"string",
              "birth":"string",
              "gender":"string",
              "phone":"string",
              "registerTime":"string"
      
      
      
      }
            }
```  

###putTeacherInfo  
修改个人信息  
url:/teacher/putTeacherInfo  
method:post  
req:
```json
    {           
     "phone":"string"
    }
```
res:
```
    {
      "status":200,
      "message":"ok",
      "data":{}
    }
    {
          "status":300,
          "message":"failed",
          "data":{}
        }
```
###t_getCourseList
url:/teacher/getCourseList  
method:get  
req:
```json
    {}
```
res:
```json
    {      "status":200,
           "message":"ok",
           "data":[
            {"c_name": "database",
            "c_id": "11111",
            "c_date": "1-2周$1-2,2-1,3-2,4-1",
            "c_address": "5-201"
            },{}
           ]
    
    }
```
###getCourseStudent
url:/teacher/getCourseStudent/${cid}  
method:get  
req:
```json
    {
      
    }
```
res:
```json
    {
                "status":200,
                 "message":"ok",
                 "data":[
                  {"sid":"a",
                   "sname":"a",
                   "score":""
                  },{}
                 ]
    }
```  

###getStudentEXperience
url:/teacher/getStudentEXperience/${sid}  
method:get  
req:
```json
    {
      
    }
```
res:
```json
    {
                "status":200,
                 "message":"ok",
                 "data":[
                  {
           			 "e_type": "1",
           			 "e_msg": "太帅了",
           			 "e_id": "001"
       			 },{}
                 ]
    }
```

###scoreStudent  
url:/teacher/scoreStudent  
method:post  
req:
```json
    {
    "sid":""
    "cid":"",
    "score":""
    }
```
res:
```json
    {"status":200,
      "message":"ok",
      "data":{}
    }
```
###发布奖惩
url:/teacher/addStudentExperience  
method:post  
req:
```
	{
	"sid":""
	"etype":"",
	"emsg":""
	}
```
res:
```json
    {
    	"status":200,
      "message":"ok",
      "data":{}
    }
```
###putCourseDetail
url:/teacher/putCourseDetail/${tid}  
method:post  
req:
res:

<!--####publishCourse-->
<!--url:/teacher/publishCourse/${tid}  -->
<!--method:post  -->
<!--req:-->
<!--res:-->

<!--####deleteCourse-->

####putStudentExperience
url:/teacher/putStudentExperience/${tid}  
method:post  
req:
res:

####publishStudentExperience
url:/teacher/publishStudentExperience/${tid}  
method:post  
req:
res:

