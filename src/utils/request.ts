import store from '@/store'
import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 登录授权
  const user = store.state.user
  if (user && user.token) {
    (config.headers = (config.headers || {})).Authorization = `Bearer ${user.token}`
  }
  return config
}, Promise.reject.bind(Promise))

// 响应拦截器
request.interceptors.response.use((response) => {
  // 统一处理接口响应错误
  if (response.data.status && response.data.status !== 200) {
    ElMessage.error(response.data.msg || '请求失败，请稍候重试')
    return Promise.reject(response.data)
  }
  return response
}, Promise.reject.bind(Promise))

export default <T = any>(config: AxiosRequestConfig) => request(config)
  .then(res => {
    return (res.data.data || res.data) as T
  })
