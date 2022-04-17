import axios, { AxiosRequestConfig } from 'axios'

const request = axios.create({})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 登录授权
  return config
}, Promise.reject.bind(Promise))

// 响应拦截器
request.interceptors.response.use((config) => {
  // 统一处理接口响应错误
  return config
}, Promise.reject.bind(Promise))

export default <T = any>(config: AxiosRequestConfig) => request(config)
  .then(res => {
    return res.data.data as T
  })
