//用来存放此项目的所有网络请求
//导入之前创建的axios实例
import _http from '@/utils/request.js'
//封装获取短信接口
export function getRcode(data) {
    //将方法中的内容返回出去
    return _http({
        url: "/sendsms",
        method: "post",
        data
    })
}
//封装注册接口
export function registerApi(data) {
    return _http({
        url: "/register",
        method: "post",
        data
    })
}
//封装登录接口
export function loginApi(data) {
    return _http({
        url: "/login",
        method: "post",
        data
    })
}
//封装获取用户信息接口
export function getUserInfoApi() {
    return _http({
        url: '/info',
    })
}
//封装退出登录接口Api
export function logoutApi() {
    return _http({
        url: '/logout',

    })
}
//封装获取列表数据Api
export function getSubjectDataApi(params) {
    return _http({
        url: '/subject/list',
        params
    })
}
//封装修改学科状态接口
export function changeStatusApi(data) {
    return _http({
        url: '/subject/status',
        method: 'post',
        data
    })
}
//封装增加学科接口
export function addSubjectApi(data) {
    return _http({
        url: '/subject/add',
        method: 'post',
        data
    })
}