<template>
  <div class="home">
    <h1>图书归还列表</h1>
	<el-table :data="items.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" >
			 <el-table-column>
				  
			      <template slot="header" slot-scope="scope">
			        <el-input
			          v-model="search"
			          placeholder="输入图书名称搜索"/>
			      </template>
		<!-- prop是绑定的数据字段，label是显示的名称 -->
	      <el-table-column
	        prop="_id"
	        label="ID"
	        width="240">
	      </el-table-column>
		  <el-table-column
	        prop="name"
	        label="图书名称"
	        width="200">
	      </el-table-column>
		  <el-table-column
		    prop="stuname"
		    label="姓名"
		    width="220">
		  </el-table-column>
		 <el-table-column
	        prop="time3"
	        label="实际归还日期"
	        width="200">
	      </el-table-column>
		  <el-table-column prop="time3" label="归还状态">
		  <template slot-scope="scope">
		  	<el-button type="info" size="mini" v-if="scope.row.time3 == null">未归还</el-button>
           <el-button type="success" size="mini" v-else>已归还</el-button>
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
		  search:''
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
		  this.$confirm(`是否删除信息${row.name}?`,'提示',{
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