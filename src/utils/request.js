//专门存放在处理网络请求的代码]
//导入axios
import axios from 'axios'
//创建一个axios副本
let instance = axios.create({
    baseURL: 'http://127.0.0.1/heimamm/public'
})
//暴露接口
export default instance