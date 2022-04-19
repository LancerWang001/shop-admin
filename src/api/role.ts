/**
 * 角色相关接口
 */
import request from '@/utils/request'
import { ModifyRole, Permission, QueryRoleReq, Role } from './types/role'

// 获取全部角色
export const getRoles = (params: QueryRoleReq) => request<{
  count: number
  list: Role[]
}>({
  method: 'GET',
  url: '/admin/setting/role',
  params
})

// 保存新建或编辑
export const createOrEditRole = (id: number, data: ModifyRole) => request({
  method: 'POST',
  url: `/admin/setting/role/${id}`,
  data
})

// 修改状态
export const changeRoleStatus = (id: number, status: 0 | 1) => request({
  method: 'PUT',
  url: `/admin/setting/role/set_status/${id}/${status}`
})

// 删除角色
export const deleteRole = (id: number) => request({
  method: 'DELETE',
  url: `/admin/setting/role/${id}`
})

// 获取角色列表菜单
export const getRolePermissions = () => request<{
  menus: Permission[]
}>({
  method: 'GET',
  url: '/admin/setting/role/create'
})

// 获取角色
export const getRole = (id: number) => request<{
  role: Role
  menus: Permission[]
}>({
  method: 'GET',
  url: `/admin/setting/role/${id}/edit`
})
