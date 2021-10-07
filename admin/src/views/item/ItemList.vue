<template>
  <div class="home">
    <h1>图书借阅列表</h1>
	<el-table :data="items.filter(data => !search || data.stuname.toLowerCase().includes(search.toLowerCase()))" >
			 <el-table-column
			      align="right">
				  
			      <template slot="header" slot-scope="scope">
			        <el-input
			          v-model="search"
			          placeholder="输入学生姓名搜索"/>
			      </template>
	      <el-table-column
	        prop="_id"
	        label="ID"
	        width="150">
	      </el-table-column>
		  <el-table-column
	        prop="name"
	        label="图书名称"
	        width="120">
	      </el-table-column>
		  <el-table-column
		    prop="stuname"
		    label="学生姓名"
		    width="100">
		  </el-table-column>
		  <el-table-column
		    prop="phone"
		    label="联系电话"
		    width="120">
		  </el-table-column>
		  <el-table-column
	        prop="time1"
	        label="借阅日期"
	        width="120">
	      </el-table-column>
		  <el-table-column
	        prop="time2"
	        label="预计归还日期"
	        width="120">
	      </el-table-column>
		  <el-table-column
		    prop="time3"
		    label="实际归还日期"
		    width="120">
		  </el-table-column>
		  <!-- 操作 -->
		  <el-table-column label="操作">
		  	<template slot-scope="scope">
		  	<el-button 
				size="mini" 
		  		@click="$router.push(`/items/edit/${scope.row._id}`)">编辑</el-button>
		  	<el-button 
				size="mini" type="danger" 
		  		@click="remove(scope.row)">删除</el-button>
		  	</template>
		  	</el-table-column>
		      </el-table-column>
	    </el-table>
  </div>
</template>

<script>

export default {
  name: 'brandsList',
  data(){
	  return{
		  items:[],
		  search:'',
	  }
  },
  methods:{
	  //获取分类
	async fetch(){
		const res = await this.$http.get('rest/items')
		this.items = res.data
		console.log('items',this.items)
	},
	//删除操作
	 async remove(row){
		 console.log('row',row)
		  this.$confirm(`是否删除品牌${row.name}?`,'提示',{
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		          }).then(async () => {
					  //删除接口
					const res = await this.$http.delete(`rest/items/${row._id}`)
		            console.log('res',res)
					//弹框
					this.$message({
		              type: 'success',
		              message: '删除成功!'
		            });
					//更新数据
					this.fetch();
		          }).catch(() => {
		            this.$message({
		              type: 'info',
		              message: '已取消删除'
		            });          
		          });
	  } 
  },
 
  //页面刚刚初进入的时候需要做什么
  created() {
  	this.fetch();
  }
}
</script>