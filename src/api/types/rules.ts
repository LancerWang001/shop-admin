/**
 * 规则类型
 */
export type Rule = {
  id: number
  pid: number
  icon: string
  menu_name: string
  module: string
  controller: string
  action: string
  api_url: string
  methods: string
  params: string
  sort: number
  is_show: number
  is_show_path: number
  access: number
  menu_path: string
  path: string
  auth_type: number
  header: string
  is_header: number
  unique_auth: string
  is_del: number
  children?: Rule[]
}

/**
 * 查询规则参数
 */
export type RuleQueryParams = {
  is_show: '' | 1 | 0
  keyword: string
}
