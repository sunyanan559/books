<template>
  <div class="home">
      <h1>{{id?'编辑':'新建'}}图书信息</h1>
	  <!--@submit.native.prevent 阻止默认提交，不要跳转页面，进行指定提交 -->
	  <el-form :model="model" 
	           label-width="120px" 
			   @submit.native.prevent="save">
	    <el-form-item label="图书名称">
	      <el-input v-model="model.name"></el-input>
	    </el-form-item>
		<el-form-item label="图书详情">
	      <el-input v-model="model.details"></el-input>
	    </el-form-item>
		<el-form-item label="图书图标">
			<el-upload
			  class="avatar-uploader"
			  :action="$http.defaults.baseURL+'/upload'"
			  :headers="getAuthHeader()"
			  :show-file-list="false"
			  :on-success="afterUpload"
			  >
			  <!-- v-if="model.icon" 有图片就展示图片 ，没有icon就显示图标-->
			  <img v-if="model.icon" :src="model.icon" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</el-form-item>
		<el-form-item>
			<!-- native-type="submit" 采取原生提交方式-->
			<el-button type="primary" native-type="submit">保存</el-button>
		</el-form-item>
		</el-form>
  </div>
</template>

<script>
export default {
  name: 'BrandEdit',
  props:{
	id:{}  
  },
  data(){
	  return{
		  model:{
		
		  }
	  }
  },
  methods:{
	  //图片上传
	  afterUpload(res){
		  console.log('res',res)
		  //this.model.icon = res.url
		  this.$set(this.model,'icon',res.url)
	  },
	  async save(){	
		  let res
		  if(this.id){
			  //更新
			  //----/categories/:id
			  res = await this.$http.put(`rest/brands/${this.id}`,this.model)
		  }else{
			  //创建--保存
			  res = await this.$http.post('rest/brands',this.model)
		  }
									  
		  //跳转到分类列表页
		  //router index.js path
		  this.$router.push('/brands/list')
		  //弹出提示框保存成功
		  this.$message({
			message: '保存成功',
			type: 'success'
		   });		  		  
	  },
	  //编辑详情
	  async fetch(){
		  //根据id来查询，请求接口
		  //  /brands/:id
		  const res = await this.$http.get(`rest/brands/${this.id}`)
		  this.model = res.data
	  }
  },
  created(){
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
	
</style>