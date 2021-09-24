<template>
 <div class="create">
  <h3>{{id?'编辑':'新建'}}管理员</h3>
  
  <el-form :model="model" label-width="120px" @submit.native.prevent="save">
   <el-form-item label="名称">
   <el-input v-model="model.username"></el-input>
   </el-form-item>
   <el-form-item label="密码">
   <el-input v-model="model.password"></el-input>
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
  name: 'adminUserEdit',
  props: {
   id: {}
  },
  data() {
   return {
    model: {
     
    }
   }
  },
  methods: {
   async save() {
    /*  console.log('save')
     console.log('model',this.model)
     console.log('res',res) */
    let res
    if (this.id) {
     //更新
     //---- 
     res = await this.$http.put(`rest/adminUser/${this.id}`, this.model)
    } else {
     // 创建--保存
     res = await this.$http.post('rest/adminUser', this.model)
    }


    //跳转到分类列表页
    this.$router.push('/adminUser/list')

    this.$message({
     message: '保存成功',
     type: 'success'
    });
   },
   //编辑详情
   async fetch() {
    //根据id来查询，请求接口
    //  /categories/:id
    const res = await this.$http.get(`rest/adminUser/${this.id}`)
    // 第一种完全覆盖
    this.model = res.data
    // es6展开运算符,对原来有数据不进行改变,只增加新属性
    // this.model =>{...this.model,...res data}
    console.log('this.model',this.model)
   }
  },
  created() {
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
	 
	  
</style>