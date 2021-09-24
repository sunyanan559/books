//module.exports = function(app){}
//导出一个函数，函数接收一个参数叫app
module.exports = app =>{
	//引入路由
	const express = require('express')
	const router = express.Router({
		mergeParams:true //导入父级参数到子级的配置
	})
	//调用生成树文档
	const toTreeByRecursion =  require('../../plugins/tree.js')
	//jsonwebtoken
	const jwt= require('jsonwebtoken')
	//引入管理员模块
	const AdminUser = require('../../models/AdminUser')
	
	//引入分类模块
	// const Category = require('../../models/Category')
	
	// 抽取共通
	const authMiddel = require('../../plugins/auth.js')
	//分类的创建
	router.post('/',authMiddel(),async (req,res)=>{
	    const model = await req.Model.create(req.body)
		res.send(model)
	})
	//分类列表
	router.get('/',authMiddel(),async(req,res,next)=>{
		//获取前端请求头，前端大写，后端小写自动匹配
		//转换了token  去掉Bearer
		// async(req,res)=>{
		console.log('req.params',req.params)
		//引入分类模块----- req.params{resource:'categories'}
		//npm i inflection  进行单复数的转换，转换成大写单数
	
		//populate关联取什么东西 toTreeByRecursion(source, 'id',  'parentId', null, 'children')
		const items = await req.Model.find().populate('parent').limit(10)
		res.send(items)
	})
	
	
	//分类列表树
	router.get('/tree',authMiddel(),async(req,res)=>{
		
		const items = await req.Model.find().populate('parent').limit(10)
		/* var jsonData = [
		    {
		        id: '7',
		        name: '2-2-2',
		        parentId: '6',
		        rank: 1
		    }
		] */
		let jsonData = []
		for(let item of items){
			let jsonItem = {}
			jsonItem.id = item._id
			jsonItem.name = item.name 
			
			jsonItem.parentId = null
			if(item.parent){
				jsonItem.parentId = item.parent._id
			}
			jsonData.push(jsonItem)
		}
		const treeData = toTreeByRecursion(jsonData,'id','parentId',null,'children')
		
		res.send(treeData)
	})
	//分类编辑的详情
	router.get('/:id',authMiddel(),async (req,res)=>{
		//http://localhost:3000/10111111
		//一般请求是get，req.params.id就可以获取到前端传递过来的参数
		const model = await req.Model.findById(req.params.id)
		res.send(model)
	})
	//分类更新
	router.put('/:id',authMiddel(),async (req,res)=>{
		
		const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
		res.send(model)
	})
	//分类的删除
	router.delete('/:id',authMiddel(),async (req,res)=>{
		await req.Model.findByIdAndDelete(req.params.id,req.body)
		res.send({
			success:true
		})
	})
	
	
	
	/*将子路由挂载到上面去
	当一个路由有好多个子路由的时候用
	app.use(path,router)
	就会自动匹配到上面去
	例：/categories
	app.use('/admin/api/categories',router)	
	
	-----
	表示通用增删改查的接口，增加动态请求参数：resource
	resource是前端请求地址的参数
	给通用接口增加rest， 是与其他接口进行区别，不会冲突
	*/
    app.use('/admin/api/rest/:resource',async(req,res,next)=>{
		
		const modelName = require('inflection').classify(req.params.resource)
		/* 把Model挂载到req上,其他地方访问的时候均为req.Model */
		req.Model = require(`../../models/${modelName}`)
		//继续向下执行
		next()
	},router)	
	
	
	//图片上传
	//npm i multer处理图片中间件
	const multer = require('multer')
	//存储路径
	//_dirname当前文件所在的绝对路径，c盘等，所在文件夹admin从这找
	const upload = multer({dest:__dirname + '/../../uploads'})
	app.post('/admin/api/upload',upload.single('file'),async (req,res) =>{
		//中间件把file挂载在上面
		const file = req.file
		//挂在静态资源后，将url挂载到file上，可以在浏览器看到url参数
		file.url = `http://localhost:5000/uploads/${file.filename}`
		res.send(file)
	})


//登录接口  定义接口
app.post('/admin/api/login',async(req,res)=>{
	// res.send('ok')
	//结构赋值
	const {username ,password} = req.body
	
	//根据用户找用户名找用户
	const AdminUser = require('../../models/AdminUser')
	//"+"强制取某个值， "-"是被排除
	const user = await AdminUser.findOne({username}).select('+password')
	//console.log('user',user)
	if(!user){
		return res.status(422).send({
			message:'用户名不存在'
		})
	}
	
	//2.校验密码
	//解密 返回的是布尔值
	const isValid = require('bcrypt').compareSync(password,user.password)
	console.log("isValid",isValid)
	if(!isValid){
		return res.status(400).send({
			message:'密码错误'
		})
	}
	
	//3.返回token
	//npm i jsonwebtoken
	//jwt.sign(payload,secretOrPrivateKey)
	//payload是对象，secretOrPrivateKey秘钥
	// const jwt= require('jsonwebtoken')
	const token = jwt.sign({id:user._id},app.get('secret'))
	//发送token，用户名
	res.send({token})
	
})

//全局捕获错误
  app.use(async(err,req,res,next)=>{
	  console.log("err",err)
	  res.status(err.statusCode).send({
		  message:err.message
	  })
  })
}