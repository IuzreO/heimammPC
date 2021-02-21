import Vue from 'vue'
import App from './App.vue'
// 路由插件导入
import router from '@/router/index.js'
//饿了么插件导入
import ElementUI from 'element-ui';
//饿了么css导入
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
//注册Vue.use(ElementUI)
Vue.use(ElementUI);
//将路由挂载到vue中
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
