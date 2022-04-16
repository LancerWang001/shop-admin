/**
 * 通用的接口
 */
import request from '@/utils/request'
import type { LoginInfo } from './types/common'

// 获取用户登录信息
export const getLoginInfo = () => request<LoginInfo>({
  method: 'GET',
  url: '/admin/login/info'
})
