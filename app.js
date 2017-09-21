var  http  = require('http');
var  express= require('express');
var mysql = require('mysql');
var superviser = require('supervisor');
var app = express();
var login = require('./module/login');
var student = require('./module/student');
var teacher = require('./module/teacher');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(cookieParser());
app.use(bodyParser());
var jsonParser = bodyParser.json()
app.all('*', function(req, res, next) {  
    // res.header('Access-Control-Allow-Origin', "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    // res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8"); 
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    
        //将外源设为指定的域，比如：http://localhost:8080
    //将Access-Control-Allow-Credentials设为true
    res.header('Access-Control-Allow-Credentials', true); 
    //  console.log(req.headers);
    
    next();  
});  
// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))
 app.use(session({
     secret: '12345',
        //这里的name值得是cookie的name，默认cookie的name是：connect.sid
     cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
     resave: false,
     saveUninitialized: true,
 }));


 app.use(function(req,res,next){ 
      
    if (!req.session.user) { 
        console.log(req._parsedUrl.pathname); 
        if(req._parsedUrl.pathname=="/login"){  
            next();//如果请求的地址是登录则通过，进行下一个请求 
            // console.log(111) 
        }  
        else  
        {  
            // req.session.originalUrl = req.originalUrl ? req.originalUrl : null; 
            res.send({status:303,data:{},message:'请先登录'}) 
        }  
    } else if (req.session.user) {  
        next();  
    }  
});  
login(app);
student(app);
teacher(app);



// var pool = mysql.createPool({
//     host:'localhost',
//     port:3306,
//     database:'mydb',
//     user:'root',
//     password:'root'

// })

// pool.getConnection(function(err,poolconnect){
//     if(err) console.log('failed');
//     else {console.log('success');
//     poolconnect.query('INSERT INTO user SET ?',{username:'hhh',password:'123'},function(err,result){
//             if(err) console.log('插入失败');
//             else {
//                 poolconnect.query('select * from ??',['user'],function(errr,resultt){
//                     if(errr) console.log('查询失败');
//                     else{
//                         console.log(resultt);
//                         poolconnect.release();
//                         pool.end();
//                     }
//                 })
//             }
//         })

//     }
// })
app.get('/favicon.ico',(req,res)=>{
    

})

// app.get('/:id',(req,res)=>{
//     console.log(req.params);
//     var id = req.params.id;
//     var data ={ };
//     pool.getConnection(function(err,poolconnect){
//         if(err) console.log('连接failed');
//         else {console.log('连接success');
//         poolconnect.query(`select * from user where id = ${id}`,function(err,result){
            
            
//             if(err) console.log('查询失败');
//             else{
//                 data = result;
                
//                 console.log(data);
//                 res.send(result)
//             }
            
//         })
    
//         }
//         poolconnect.release();
//     })
    // res.setHeader('Content-Type','application/json')
    // res.setHeader('Access-Control-Allow-Origin','http://localhost')    
    // res.json(data);
    

// })

app.listen(3000,function(){

})




