<template>
	<div class="create">
		<h3>{{id?'编辑':'新建'}}借阅信息登记</h3>
		<!-- @submit.native.prevent 阻止默认提交，不要跳转页面，进行指定提交 -->
		<el-form  :model="model" label-width="120px" @submit.native.prevent="save">
		<el-form-item label="图书名称">
			  <!-- v-model动态绑定 -->
		    <el-input v-model="model.name"></el-input>
		</el-form-item>
		<el-form-item label="班级">
		  	<el-select v-model="model.categories" multiple>
		  	  <el-option 
		  				v-for="item in categories"
		  				:key="item._id"
		  				:label="item.name" 
		  				:value="item._id"></el-option>
		  	</el-select>
		    </el-form-item>
		<el-form-item label="学生姓名">
			  <!-- v-model动态绑定 -->
		    <el-input v-model="model.classname"></el-input>
		</el-form-item>
			  <el-form-item label="借阅时间">
			  			  <!-- v-model动态绑定 -->
			    <el-input v-model="model.time1"></el-input>
			  </el-form-item>
			<el-form-item label="归还时间">
			  			  <!-- v-model动态绑定 -->
			    <el-input v-model="model.time2"></el-input>
			  </el-form-item>
		  <el-form-item>
			  <!-- native-type="submit" 采取原生态提交 -->
		      <el-button type="primary" native-type="submit">保存</el-button>
		    </el-form-item>
		</el-form>
	</div>
</template>

<script>
	//import a from 'vue2-editor';a.VueEditor
	import { VueEditor } from "vue2-editor";
	
	export default {
	  name: 'BrandEdit',
	  props:{
		  id:{}
	  },
	  components:{VueEditor},
	  data(){
		  return{
			  model:{
				   icon:'',
				   
			  },
			  categories:[],
			  brands:{},
			  body:''
		  }
	  },
	  methods:{
		  //图片上传
		  afterUpload(res){
			  console.log('res',res)
			   this.model.icon = res.url
			  //在实例创建之后添加新的属性到实例上，它不会触发视图更新，利用下面语句才可以触发
			  //this.$set(this.model,'icon',res.url)
		  },
		  async save(){
			 /*  console.log('save')
			  console.log('model',this.model)
			  console.log('res',res) */
			  let res
			  if(this.id){
			  //更新
			  //---- 
			  res =await this.$http.put(`rest/items/${this.id}`,this.model)
			  }else{
				  // 创建--保存
				 res = await this.$http.post('rest/items',this.model) 
			  }
			 
			 
			 //跳转到分类列表页
			 this.$router.push('/items/list')
			 
			 this.$message({
			           message: '保存成功',
			           type: 'success'
			         });
	  },
	  //编辑详情
	  async fetch(){
		  //根据id来查询，请求接口
		  //  /categories/:id
		  const res = await this.$http.get(`rest/items/${this.id}`)
		  this.model = res.data
	  },
	  
	  //获取类型
	  async fetchCategories(){
		  const res = await this.$http.get(`rest/categories`)
		  this.categories = res.data
	  },
	  
	  //获取分类
	  async fethBrands(){
		  const res = await this.$http.get(`rest/brand`)
		  this.brands = res.data
	  },
	  //处理图片
	  async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
	        var formData = new FormData();
	        formData.append("file", file);
			const res = await this.$http.post('upload',formData)
	        console.log('res',res);
			Editor.insertEmbed(cursorLocation, "image", res.data.url);
	        resetUploader();
	      
	    }
	  },
	  created(){
		  this.fetchCategories();
		  this.fethBrands();
		  //this.fetchParents()
		  //当前面的为真的时候，才执行后面
		  this.id && this.fetch()
		  
		  // if(this.id){
			 //  this.fetch()
		  // }
	  }
	}
</script>

<style>
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	  }
	  .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	  }
</style>