/**
 * 设置相关的接口
 */

import request from '@/utils/request'
import { AdminReqBody, AdminResponse, ListParams } from './types/admin'

// 获取管理员列表
export const getAdmins = (params: ListParams) => request<AdminResponse>({
  method: 'GET',
  url: 'admin/setting/admin',
  params
})

// 管理员添加
export const createAdmin = (data: AdminReqBody) => request({
  method: 'POST',
  url: 'admin/setting/admin',
  data
})

// 修改管理员信息
export const editAdmin = (id: number, data: AdminReqBody) => request({
  method: 'PUT',
  url: `admin/setting/admin/${id}`,
  data
})

// 删除管理员信息
export const deleteAdmin = (id: number) => request({
  method: 'DELETE',
  url: `admin/setting/admin/${id}`
})

// 修改管理员状态
export const updateAdminStatus = (id: number, status: string) => request({
  method: 'PUT',
  url: `admin/setting/set_status/${id}/${status}`
})
