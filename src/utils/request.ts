import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router/'
import store from '@/store'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 登录授权
  const user = store.state.user
  if (user && user.token) {
    (config.headers = (config.headers || {})).Authorization = `Bearer ${user.token}`
  }
  return config
}, Promise.reject.bind(Promise))

let refreshing = false
// 响应拦截器
request.interceptors.response.use(async (response) => {
  // 统一处理接口响应错误
  const status = response.data.status
  if (!status || status === 200) {
    return response
  }
  // 处理登录过期
  if (status === 410000) {
    if (refreshing) return Promise.reject(response)
    refreshing = true
    try {
      await ElMessageBox.confirm('您的登录已过期，您可以取消停留在此页面，或确认重新登录', '登录过期', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
      // 清除过期的登录状态
      store.commit('setUser', null)
      // 跳转登录页面
      router.push({
        name: 'login',
        query: { redirect: router.currentRoute.value.fullPath }
      })
    } finally {
      refreshing = false
    }
  }
  // 内部消化掉业务异常
  ElMessage.error(response.data.msg || '请求失败，请稍候重试')
  return Promise.reject(response)
  // return response
}, Promise.reject.bind(Promise))

export default <T = any>(config: AxiosRequestConfig) => request(config)
  .then(res => {
    return (res.data.data || res.data) as T
  })
