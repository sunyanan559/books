<template>
  <div class="home">
    <h1>商品列表</h1>
	<el-table :data="items">
		<!-- prop是绑定的数据字段，label是显示的名称 -->
	      <el-table-column
	        prop="_id"
	        label="ID"
	        width="240">
	      </el-table-column>
		  </el-table-column>
	      <el-table-column
	        prop="name"
	        label="商品名称"
	        width="240">
	      </el-table-column>
		  <!-- 图标 -->
		  <el-table-column
		    prop="icon"
		    label="图标"
				>
			<template slot-scope="scope">
				<img :src="scope.row.icon" style="height: 3rem;"/>
			</template>
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
		  
	    </el-table>
  </div>
</template>

<script>

export default {
  name: 'brandsList',
  data(){
	  return{
		  items:[]
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
