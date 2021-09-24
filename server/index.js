const express = require('express')

const app = express()

//静态资源的暴露
app.use('/uploads',express.static(__dirname + '/uploads'))

//配置模版引擎
//app.use(bodyParser.json())
app.use(express.json())

//跨域
app.use(require('cors')())

//admin路由导入
require('./routes/admin/index')(app)

//导入数据库
require('./db/db')(app)

//设置密钥
app.set('secret','uuuwww');


app.listen(5000,()=>{
	console.log('http://localhost:5000')
})