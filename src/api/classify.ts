/**
 * 商品分类相关接口
 */

import request from '@/utils/request'
import { CateForm, CateRule, ProductCategory, ProductCateQuery, TreeOption } from './types/classify'

// 获取树形选项分类
export const getTreeOptions = () => request<TreeOption[]>({
  method: 'GET',
  url: '/admin/product/category/tree/0'
})

// 获取商品分类列表
export const getProductClassify = (params: ProductCateQuery) => request<{
  count: number
  list: ProductCategory[]
}>({
  method: 'GET',
  url: '/admin/product/category',
  params
})

// 修改商品分类状态
export const changeCateStatus = (id: string | number, is_show: 0 | 1) => request({
  method: 'PUT',
  url: `/admin/product/category/set_show/${id}/${is_show}`
})

// 编辑商品分类
export const editProductCate = (id: number | string, data: CateForm) => request({
  method: 'PUT',
  url: `/admin/product/category/${id}`,
  data
})

// 获取添加分类表单
export const getCreateCateForm = (id: number | 'create' = 'create') => request<{
  rules: CateRule[]
}>({
  method: 'GET',
  url: `/admin/product/category/${id}`
})

// 新增商品分类
export const addProductCate = (data: CateForm) => request({
  method: 'POST',
  url: '/admin/product/category',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data
})

// 删除商品分类
export const deleteProductCate = (id: number) => request({
  method: 'DELETE',
  url: `/admin/product/category/${id}`
})
