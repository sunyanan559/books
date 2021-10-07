const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	class1:{type:String},
	stunum:{type:String},
	name:{type:String},
	phone:{type:String},
	address:{type:String},
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
module.exports = mongoose.model('Category',schema)