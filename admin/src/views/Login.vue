<template>
  <div class="login-container">
	  <el-card header="登录" class="login-card">
		  <!-- native. 监听表达原生的事件。prevent表示阻止跳转页面 -->
		  <el-form v-model="model" @submit.native.prevent="login">
			  <el-form-item label="用户名">
				  <el-input v-model="model.username"></el-input>
			  </el-form-item>
			  <el-form-item label="密码">
			  	  <el-input v-model="model.password"></el-input>
			  </el-form-item>
			  <el-form-item label="">
			  	<el-button type="primary" native-type="submit">登录</el-button>
			  </el-form-item>
		  </el-form>
	  </el-card>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data(){
	  return{
		  model:{}
	  }
  },
  methods:{
	  async login(){
		  console.log('this.model',this.model);
		  const res = await this.$http.post('login',this.model)
		  console.log('res.data',res.data);
		  //存储token关闭之后还有
		  localStorage.token = res.data.token
		  //关闭之后没有，sessionStorage
		  this.$router.push('/');
		  this.$message({
			  type:'success',
			  message:'登录成功'
		  })
	  }
  }
  
}
</script>
<style scoped>
	.login-container{
		width: 25rem;
		margin: 6rem auto;
	}
	
</style>