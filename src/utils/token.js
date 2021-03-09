//保存token
function saveToken (val) {
  window.localStorage.setItem('token', val)
}
//获取token
function getToken () {
  // 这里的 return 必须要写，否则将来外界取不到
  return window.localStorage.getItem('token')
}
//删除token
function removeToken () {
  window.localStorage.removeItem('token')
}
export { saveToken, getToken, removeToken }
