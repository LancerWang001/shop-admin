/**
 * 获取全部角色的接口查询参数
 */
export type QueryRoleReq = {
  page: number
  limit: number
  status: 0 | 1 | ''
  role_name: string
}

/**
 * 角色列表项数据
 */
export type Role = {
  id: number
  role_name: string
  rules: string
  level: number
  status: 0 | 1,
  statusLoading?: boolean
}

/**
 * 角色编辑/新增参数
 */
export type ModifyRole = {
  role_name: string
  status: 0 | 1
  checked_menus: number[]
}

/**
 * 角色权限
 */
export type Permission = {
  pid: number
  id: number
  title: string
  children: Permission[]
  expand: boolean
}
