//用来存放此项目的所有网络请求
//导入之前创建的axios实例
import _http from '@/utils/request.js'
//封装获取短信接口
export function getRcode({ code, phone }) {
    //将方法中的内容返回出去
    return _http({
        url: "/sendsms",
        method: "post",
        data: {
            code,
            phone
        },

    })
}
//封装注册接口
export function registerApi({ username, phone, email, avatar, password, rcode }) {
    return _http({
        url: "/register",
        method: "post",
        data: {
            username,
            phone,
            email,
            avatar,
            password,
            rcode
        },
    })
}
//封装登录接口
export function loginApi({ phone, password, code }) {
    return _http({
        url: "/login",
        method: "post",
        data: {
            phone,
            password,
            code
        },
    })
}
//获取用户信息接口
export function getUserInfo() {
    return _http({
        url: '/info',
    })
}
//退出登录接口
export function logoutApi() {
    return _http({
        url: '/logout',

    })
}