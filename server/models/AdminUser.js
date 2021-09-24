const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	username:{type:String},
	password:{
		type:String,
		//set方法，自定义怎么修改保存后的数据
		//npm i bcrypt 加密，同一个字符都是不一样的加密方式
		//md5加密方式
		//hashSync同步方法，生成散列值，第二个加密指数
		//默认不显示，防止点击编辑之后，在更改是加密过后的密文
		select:false,
		set(val){
			return require('bcrypt').hashSync(val,10)
		}
	},
	parent:{
		type:mongoose.Schema.Types.ObjectId,//ObjectId mongoose的id名称
		ref:'Category'						//关联的是本身,关联谁
	}
})
/* 
	第一个参数：传入一个大写名词单数的字符串，表示你数据库的名称
			   mongoose会自动将大写名词单数的字符串生成小写复数的集合名称
	第二个参数：架构
 */
module.exports = mongoose.model('AdminUser',schema)