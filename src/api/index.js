//用来存放此项目的所有网络请求
//导入之前创建的axios实例
import _http from '@/utils/request.js'
//封装获取短信接口
export function getRcode (data) {
  //将方法中的内容返回出去
  return _http({
    url: '/sendsms',
    method: 'post',
    data
  })
}
//封装注册接口
export function registerApi (data) {
  return _http({
    url: '/register',
    method: 'post',
    data
  })
}
//封装登录接口
export function loginApi (data) {
  return _http({
    url: '/login',
    method: 'post',
    data
  })
}
//封装获取用户信息接口
export function getUserInfoApi () {
  return _http({
    url: '/info'
  })
}
//封装退出登录接口Api
export function logoutApi () {
  return _http({
    url: '/logout'
  })
}
//封装获取列表数据Api
export function getSubjectDataApi (params) {
  return _http({
    url: '/subject/list',
    params
  })
}
//封装修改学科状态接口
export function changeStatusApi (data) {
  return _http({
    url: '/subject/status',
    method: 'post',
    data
  })
}
//封装增加学科接口
export function addSubjectApi (data) {
  return _http({
    url: '/subject/add',
    method: 'post',
    data
  })
}
//封装学科编辑接口
export function editSubjectApi (data) {
  return _http({
    url: '/subject/edit',
    method: 'post',
    data
  })
}
//封装删除学科接口
export function delSubjectApi (id) {
  return _http({
    url: '/subject/remove',
    method: 'post',
    data: {
      id
    }
  })
}
//封装企业列表信息接口
export function getBusinessDataApi (params) {
  return _http({
    url: '/enterprise/list',
    params
  })
}
//封装题库列表信息接口
export function getQuestionDataApi (params) {
  return _http({
    url: '/question/list',
    params
  })
}
//封装题库状态修改接口
export function editQuestionStatusApi (data) {
  return _http({
    url: '/question/status',
    method: 'post',
    data
  })
}
//封装面板数据接口
export function dataTitleApi () {
  return _http({
    url: '/data/title',
    method: 'post'
  })
}
//封装企业题目数据接口
export function dataStatisticsApi () {
  return _http({
    url: '/data/statistics',
    method: 'post'
  })
}
//封装新增题库提交接口
export function addQuestionDataApi (data) {
  return _http({
    url: '/question/add',
    method: 'post',
    data
  })
}
//封装编辑题库提交接口
export function editQuestionDataApi (data) {
  return _http({
    url: '/question/edit',
    method: 'post',
    data
  })
}
//封装删除题库提交接口
export function removeQuestionDataApi (data) {
  return _http({
    url: '/question/remove',
    method: 'post',
    data
  })
}
