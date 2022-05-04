/**
 * 通用的接口
 */
import request from '@/utils/request'
import type { LoginInfo, LoginResponse } from './types/common'

// 获取用户登录信息
export const getLoginInfo = () => request<LoginInfo>({
  method: 'GET',
  url: '/admin/login/info'
})

// 获取用户登录信息
export const getCaptch = () => request<Blob>({
  method: 'GET',
  url: '/admin/captcha_pro',
  params: { stamp: Date.now() },
  responseType: 'blob'
})

// 登录
export const login = (data: {
  account: string
  pwd: string
  imgcode: string
}) => request<LoginResponse>({
  method: 'POST',
  url: '/admin/login',
  data
})

// 登出
export const logout = () => request<LoginResponse>({
  method: 'GET',
  url: '/admin/setting/admin/logout'
})

// 获取商品图片列表
export const getImages = (params: {
  pid: number
  page: number
  limit: number
}) => request({
  method: 'GET',
  url: '/admin/file/file',
  params
})

// 获取图片种类列表
export const getImageCate = async (name: string = '') => request({
  method: 'GET',
  url: '/admin/file/category',
  params: { name }
})
