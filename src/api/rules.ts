/**
 * 权限规则相关接口
 */
import request from '@/utils/request'
import { Rule, RuleQueryParams } from './types/rules'

// 获取权限列表
export const getMenus = (params: RuleQueryParams) => request<Rule[]>({
  method: 'GET',
  url: '/admin/setting/menus',
  params
})

// 获取单个规则
export const getMenu = (id: number) => request<Rule>({
  method: 'GET',
  url: `/admin/setting/menus/${id}`
})

// 添加权限
export const createMenu = (data: Omit<Rule, 'id'>) => request({
  method: 'POST',
  url: '/admin/setting/menus',
  data
})

// 删除规则
export const deleteMenu = (id: number) => request({
  method: 'DELETE',
  url: `/admin/setting/menus/${id}`
})

// 修改权限规则
export const editMenu = (id: number, data: Omit<Rule, 'id'>) => request({
  method: 'PUT',
  url: `/admin/setting/menus/${id}`,
  data
})
