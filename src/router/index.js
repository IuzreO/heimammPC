//1.配置router
//2.导入
import Vue from 'vue'
import VueRouter from 'vue-router'
//导入子组件
import test from '@/views/test.vue'
import login from '@/views/login/login.vue'
//3.注册Vue.use(vueRouter)
Vue.use(VueRouter)
//4.实例化和配置
const router = new VueRouter({
    routes: [
        {
            path: '/test',
            component: test
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '*',
            redirect: '/login'
        }

    ]
})
//5.暴露给外界
export default router