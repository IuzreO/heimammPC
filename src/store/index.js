//导入
import Vue from 'vue'
import Vuex from 'vuex'
//注册
Vue.use(Vuex)
//实例化
const store = new Vuex.Store({
    state: {
        msg: '共享数据',
        userInfo: {} //用户信息
    }
})
//暴露接口
export default store