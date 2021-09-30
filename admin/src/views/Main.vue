<template>
  <div class="main">
    <el-container style="height: 100vh;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- 
		1.el-menu 添加router属性，开启路由模式
		2.unique-opened 一次只展开一个
		3.:default-openeds="['3']" el-submenu 对应的index的值 
		4.:default-active="$route.path" 默认激活选项
		 -->
		<el-menu 
		router
		:default-openeds="['3']"
		unique-opened
		:default-active="$route.path">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>信息管理</template>
            <el-menu-item-group>
              <template slot="title">学生管理</template>
              <el-menu-item index="/categories/create">录入学生信息</el-menu-item>
              <el-menu-item index="/categories/list">学生信息列表</el-menu-item>
			</el-menu-item-group>
			
			 <el-menu-item-group>
			<template slot="title">图书管理</template>
			  <el-menu-item index="/brands/create">录入图书详细</el-menu-item>
			  <el-menu-item index="/brands/list">图书信息列表</el-menu-item>
			</el-menu-item-group>

          </el-submenu>
			<el-submenu index="2">
		    	<template slot="title"><i class="el-icon-goods"></i>图书管理</template>
		    	<el-menu-item-group>
				<template slot="title">借阅管理</template>
			  	<el-menu-item index="/items/create">新建借阅图书</el-menu-item>
			  	<el-menu-item index="/items/list">图书借阅列表</el-menu-item>	
				</el-menu-item-group>
				<el-menu-item-group>
				<template slot="title">归还管理</template>
			  	<el-menu-item index="/item2s/list">图书归还状态表</el-menu-item>	
				</el-menu-item-group>
			</el-submenu>
			  
			<el-submenu index="3">
			  <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
			  	<el-menu-item-group>
			    <template slot="title">管理员</template>
			    <el-menu-item index="/adminUser/create">新建管理员</el-menu-item>
			    <el-menu-item index="/adminUser/list">管理员列表</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>
        
        <el-main>
		<!-- 动态显示区域 -->
         <router-view></router-view>
		 
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Main',
  
}
</script>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>