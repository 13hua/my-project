import axios from 'axios'

const service = axios.create()

// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为token
service.interceptors.request.use(
  config => {
    config.headers.Authorization = `${token}`
    return config
  }
)

export default service
