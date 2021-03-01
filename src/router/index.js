//1.配置router
//2.导入
import Vue from 'vue'
import VueRouter from 'vue-router'
//导入子组件
import test from '@/views/test.vue'
import login from '@/views/login/login.vue'
import index from '@/views/home/index.vue'
// 分别导入子路由文件
import chart from '@/views/home/chart/chart.vue'
import userList from '@/views/home/userList/userList.vue'
import question from '@/views/home/question/question.vue'
import business from '@/views/home/business/business.vue'
import subject from '@/views/home/subject/subject.vue'
//导入进度条加载,模板
import NProgress from 'nprogress'
//导入nprogress样式
import 'nprogress/nprogress.css'
//3.注册Vue.use(vueRouter)
Vue.use(VueRouter)
//4.实例化和配置
const router = new VueRouter({
    routes: [
        {
            path: '/test',
            component: test,
            meta: {
                title: "测试页"
            }

        },
        {
            path: '/login',
            component: login,
            meta: {
                title: "登录页"
            }
        },
        {
            path: '/index',
            component: index,
            meta: {
                title: "首页"
            },
            // 嵌套的路由规则
            children: [
                // 地址不需要写/
                // 最终解析的是 /index/heme/chart
                {
                    path: '/home/chart',
                    component: chart,
                    // ## 路由 - 路由元信息
                    meta: {
                        title: "数据概览"
                    }
                },

                {
                    path: '/home/userList',
                    component: userList,
                    meta: {
                        title: "用户列表"
                    }
                },
                {
                    path: '/home/question',
                    component: question,
                    meta: {
                        title: "题库列表"
                    }
                },
                {
                    path: '/home/business',
                    component: business,
                    meta: {
                        title: "企业列表"
                    }
                },
                {
                    path: '/home/subject',
                    component: subject,
                    meta: {
                        title: "学科列表"
                    }
                },
            ]
        },
        //路由重定向
        {
            path: '*',
            redirect: '/index'
        }
    ]
})
//导航守卫
router.beforeEach((to, from, next) => {
    console.log(to, from);
    NProgress.start()
    next()
})
router.afterEach((to, from) => {
    console.log(to, from);
    NProgress.done()
    //to.meta是固定写法，meta之后的是根据定义的进行获取
    document.title = to.meta.title


})

//5.暴露给外界
export default router