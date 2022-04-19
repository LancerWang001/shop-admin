/**
 * 权限规则相关接口
 */
import request from '@/utils/request'
import { IFormData } from './types/form'
import { Rule, RuleQueryParams } from './types/rules'

// 获取权限列表
export const getMenus = (params: RuleQueryParams) => request<Rule[]>({
  method: 'GET',
  url: '/admin/setting/menus',
  params
})

// 获取单个规则
export const getMenu = (id: number) => request<{
  path: number[]
} & Omit<Rule, 'path'>>({
  method: 'GET',
  url: `/admin/setting/menus/${id}`
})

// 添加权限
export const createMenu = (data: Partial<Omit<Rule, 'id' | 'children' | 'is_del' | 'path'>>) => request({
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
export const editMenu = (
  id: number,
  data: Partial<Omit<Rule, 'id' | 'children' | 'is_del' | 'path'>>
) => request({
  method: 'PUT',
  url: `/admin/setting/menus/${id}`,
  data
})

// 获取添加权限规则表单
export const getMenuTree = () => {
  return request<IFormData>({
    method: 'GET',
    url: '/admin/setting/menus/create'
  }).then(data => {
    const findData = data.rules.find(item => item.field === 'menu_list')
    return (findData && findData.props && findData.props.data) || []
  })
}

// 修改显示
export const changeRuleStatus = (id: number, is_show: 0 | 1) => request({
  method: 'PUT',
  url: `/admin/setting/menus/show/${id}`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: { is_show }
})
