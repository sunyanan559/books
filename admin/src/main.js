import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//axios模块引入实例
import http from './http'

//引入全局样式
import './style.css'

Vue.config.productionTip = false

//每个vue都拥有，在任何位置都可以用
Vue.mixin({
	methods:{
		getAuthHeader(){
			return {
				Authorization:`Bearer ${localStorage.token || ''}`
			}
		}
	}
})

//挂载到Vue实例上,任意地方都可以用this访问它,this.$http
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
