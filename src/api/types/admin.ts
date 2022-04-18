export type ListParams = {
  page: number
  limit: number
  name: string
  role: string
  status: 0 | 1 | ''
}

export type Admin = {
  id:number
  account:string
  head_pic:string
  pwd:string
  real_name:string
  roles:string
  last_ip:string
  last_time:number
  add_time:number
  login_count:number
  level:number
  status:number
  is_del:number
  _add_time:string
  _last_time:string
  count:number
}

export type AdminResponse = {
  count: number
  list: Admin[]
}

export type AdminReqBody = {
  account: string
  pwd: string
  conf_pwd: string
  roles: string[]
  status: number
  real_name: string
}
