//专门存放在处理网络请求的代码]
//导入axios
import axios from 'axios'
// 在js中使用element组件 导入响应组件
import { Message } from 'element-ui'
//创建一个axios副本
let instance = axios.create({
    baseURL: 'http://127.0.0.1/heimamm/public',
    // 携带cookie到服务器
    withCredentials: true
})
//请求拦截器
instance.interceptors.request.use(function (config) {
    // console.log('请求拦截器');
    // console.log(config);
    // 请求成功 返回config
    return config
}, function (error) {
    //如果请求出错 返回error
    return Promise.reject(error)
})
//响应拦截器
instance.interceptors.response.use(function (response) {
    // console.log('响应拦截器');
    console.log(response.data);
    if (response.data.code == 200) {
        //请求成功 返回response
        return response.data
    } else if (response.data.code == 0) {
        // 等效于VUE中的this.$message
        Message.error('手机号已注册或验证码不正确')
        return Promise.reject(new Error())
    } else if (response.data.code == 202) {
        Message.error('验证码错误')
        return Promise.reject(new Error())
    }
}, function (error) {
    //请求失败 返回error
    return Promise.reject(error)
})
//暴露接口
export default instance