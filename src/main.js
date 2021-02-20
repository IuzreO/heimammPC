import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
//注册Vue.use(ElementUI)
Vue.use(ElementUI);
//将路由挂载到vue中
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
