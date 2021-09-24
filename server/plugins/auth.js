module.exports = options =>{
	//jsonwebtoken
	const jwt = require('jsonwebtoken')
	//引入管理员模块
	const AdminUser = require('../models/AdminUser')
	
	 return async(req,res,next)=>{
		//获取前端请求头,前端是大写，后端是小写，自动匹配
		//转换了token 去掉了Bearer
		const token = String(req.headers.authorization || '').split(' ').pop()
		console.log('token',token);
		
		//token不存在的时候，报错
		if(!token){
			return res.status(401).send({
				message:'请先登录'
			})
		}
		//有token,是不是正确的
		const {id} = jwt.verify(token,req.app.get('secret'))
		console.log('id',id);
		//id错误了
		if(!id){
			return res.status(401).send({
				//message:'无效的token'
				message:'请先登录'
			})
		}
		//用户错误了
		req.user = await AdminUser.findById(id)
		
		if(!req.user){
			return res.status(401).send({
				//message:'无效的token'
				message:'用户不存在，请先登录'
			})
		}
		
		//向下继续执行
		next()
	}
}