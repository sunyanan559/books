import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

//引入模块，懒加载
const Main = ()=>import('../views/Main')
const CategoryEdit = ()=>import('../views/category/CategoryEdit')
const CategoryList = ()=>import('../views/category/CategoryList')
const CategoryListTree = ()=>import('../views/category/CategoryListTree')

const BrandEdit = ()=>import('../views/brand/BrandEdit')
const BrandList = ()=>import('../views/brand/BrandList')

const ItemEdit = ()=>import('../views/item/ItemEdit')
const ItemList = ()=>import('../views/item/ItemList')

const AdEdit = ()=>import('../views/ad/AdEdit')
const AdList = ()=>import('../views/ad/AdList')

const AdminUserEdit = ()=>import('../views/adminUser/AdminUserEdit')
const AdminUserList = ()=>import('../views/adminUser/AdminUserList')

const Login = ()=>import('../views/Login')

const routes = [
	{
		path:'/login',
		name:'Login',
		component:Login,
		meta:{isPublic:true}
	},
  {
    path: '/',
    name: 'Main',
    component: Main,
	children:[
		// id需要动态传递参数，同this.$routes.params,搭配组件中 props:{id:{}}
		{path:'/categories/create',component:CategoryEdit},
		{path:'/categories/edit/:id',component:CategoryEdit,props:true},
		{path:'/categories/list',component:CategoryList},
		{path:'/categories/listTree',component:CategoryListTree},
	
		{path:'/brands/create',component:BrandEdit},
		{path:'/brands/edit/:id',component:BrandEdit,props:true},
		{path:'/brands/list',component:BrandList},
		
		{path:'/items/create',component:ItemEdit},
		{path:'/items/edit/:id',component:ItemEdit,props:true},
		{path:'/items/list',component:ItemList},
		
		{path:'/ads/create',component:AdEdit},
		{path:'/ads/edit/:id',component:AdEdit,props:true},
		{path:'/ads/list',component:AdList},
		
		{path:'/adminUser/create',component:AdminUserEdit},
		{path:'/adminUser/edit/:id',component:AdminUserEdit,props:true},
		{path:'/adminUser/list',component:AdminUserList},
	]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//前置导航守卫
//路由元信息 meta
//to--即将要去哪
//from--来自哪
//next--要不要进去，做什么处理
router.beforeEach((to,from,next)=>{
	console.log('to',to);
	
	//没有meta的isPublic 没有token的情况下跳到登录页
	if(!to.meta.isPublic && !localStorage.token){
		return next('/login')
	}
	//下一步
	next()
})



export default router
