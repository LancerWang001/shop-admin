/**
 * 设置相关的接口
 */

import request from '@/utils/request'
import { AdminPostData, AdminResponse, ListParams } from './types/admin'
import { IFormData } from './types/form'

// 获取管理员列表
export const getAdmins = (params: ListParams) => request<AdminResponse>({
  method: 'GET',
  url: 'admin/setting/admin',
  params
})

// 管理员添加
export const createAdmin = (data: AdminPostData) => request({
  method: 'POST',
  url: 'admin/setting/admin',
  data
})

// 修改管理员信息
export const editAdmin = (id: number, data: AdminPostData) => request({
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
export const updateAdminStatus = (id: number, status: number) => request({
  method: 'PUT',
  url: `admin/setting/set_status/${id}/${status}`
})

// 管理员角色列表
export const getRoles = () => request<IFormData>({
  method: 'GET',
  url: 'admin/setting/admin/create'
}).then((data) => {
  const roles = data.rules.find(item => item.field === 'roles')
  return roles?.options ?? []
})

// 获取指定的管理员
export const getAdmin = (id: number) => request<IFormData>({
  method: 'GET',
  url: `/admin/setting/admin/${id}/edit`
}).then((data) => {
  const obj: Record<string, any> = {}
  data.rules.forEach(item => {
    obj[item.field] = item.value
  })
  return obj as AdminPostData
})
