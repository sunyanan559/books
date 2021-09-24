<template>
	<div class="create">
		<h3>{{id?'编辑':'新建'}}广告</h3>
		<!-- @submit.native.prevent 阻止默认提交，不要跳转页面，进行指定提交 -->
		<el-form  :model="model" 
					label-width="120px" 
					@submit.native.prevent="save">
			<!-- 左侧显示的名称 label     model进行绑定 -->
		  <el-form-item label="名称">
			  <!-- v-model动态绑定 -->
		    <el-input v-model="model.name"></el-input>
		  </el-form-item>
		  <!-- 广告位-->
		  <el-form-item label="广告">
		  	<el-button icon="el-icon-plus" @click="model.items.push({})">添加广告</el-button>
			<el-row>
			  <el-col :span="18" class="adRow" v-for="(item,index) in model.items" :key="index">
			    <el-card shadow="never" class="adForm">
					<div slot="header" class="clearfix">
					    <span>广告{{index+1}}</span>
					    <el-button style="float: right;" type="text"
						@click="model.items.splice(index,1)">删除</el-button>
					</div>
					<el-form label-width="80px">
						<el-form-item label="跳转连接">
							<el-input v-model="item.url"></el-input>
						</el-form-item>
					</el-form>
					<el-form-item label="图片">
						  <el-upload
							class="avatar-uploader"
							:action="$http.defaults.baseURL+'/upload'"
							:show-file-list="false"
							:on-success="res=>$set(item,'image',res.url)"
							>
							<img v-if="item.image" :src="item.image" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						  </el-upload>
					</el-form-item>
			    </el-card>
			  </el-col>
			</el-row>
		  </el-form-item>
		  <el-form-item>
			  <!-- native-type="submit" 采取原生态提交 -->
		      <el-button type="primary" native-type="submit">保存</el-button>
		    </el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
	  name: 'AdEdit',
	  props:{
		  id:{}
	  },
	  data(){
		  return{
			  model:{
				   icon:'',
				   items:[]
			  }
		  }
	  },
	  methods:{
		  async save(){
			 /*  console.log('save')
			  console.log('model',this.model)
			  console.log('res',res) */
			  let res
			  if(this.id){
			  //更新
			  //---- 
			  res =await this.$http.put(`rest/ads/${this.id}`,this.model)
			  }else{
				  // 创建--保存
				 res = await this.$http.post('rest/ads',this.model) 
			  }
			 
			 
			 //跳转到分类列表页
			 this.$router.push('/ads/list')
			 
			 this.$message({
			           message: '保存成功',
			           type: 'success'
			         });
	  },
	  //编辑详情
	  async fetch(){
		  //根据id来查询，请求接口
		  //  /categories/:id
		  const res = await this.$http.get(`rest/ads/${this.id}`)
		  //第一种完全覆盖
		  this.model = res.data
		  //es6展开运算符，对原有数据不进行改变，只是增加新属性
		  //this.model = {...this.model,...res.data}
		  console.log('this.model',this.model)
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

<style scoped>
	  /* 清除浮动*/
	  .clearfix:before,
	  .clearfix:after {
	      display: table;
	      content: "";
	    }
	    .clearfix:after {
	      clear: both
	    }
		.adRow{
			margin-top: 30px;
		}
		.adForm .el-card__header {
			padding: 10px 20px !important;
		}
		.adForm .el-form-item{
			padding-bottom: 15px;
		}
</style>