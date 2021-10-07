const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name:{type:String},
	//唯一的写法就是{},进行多选数组显示多数据
	categories:
		{
			type:mongoose.Schema.Types.ObjectId,//ObjectId mongoose的id名称
			ref:'Category'						//关联的是本身,关联谁
		},
	stuname:{type:String},
	time1:{type:String},
	time2:{type:String},
	time3:{type:String},
	phone:{type:String},
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
module.exports = mongoose.model('Item',schema)