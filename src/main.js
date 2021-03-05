import Vue from 'vue'
import App from './App.vue'
// 路由插件导入
import router from '@/router/index.js'
// 饿了么插件导入
import ElementUI from 'element-ui'
// 饿了么css导入
import 'element-ui/lib/theme-chalk/index.css'
// 导入vuex
// import Vuex from 'vuex'
// 导入store
import store from '@/store/index'
Vue.config.productionTip = false
//在全局中使用axios
// import axios from 'axios'
// Vue.prototype.$axios = axios.create({
//   baseURL: process.env.VUE_APP_BASEURL
// })
//注册Vue.use(ElementUI)
Vue.use(ElementUI)
// 注册 vuex
// Vue.use(Vuex)
// 实例化Vuex
// const store = new Vuex.Store({
// 共享数据储存的地方
//   state: {
//     msg: '共享数据'
//   }
// })
//将路由挂载到vue中
//注入到Vue实例中
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
