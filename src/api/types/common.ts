/**
 * @type LoginInfo
 * @description 登录用户信息
 */
export type LoginInfo = {
  login_logo: string
  logo_rectangle: string
  logo_square: string
  slide: string[]
}

export type UserInfo = {
  id: number
  account: string
  head_pic: string
}

export type Menu = {
  path: string
  title: string
  icon: string
  header: string
  is_header: number
  children?: Menu[]
}

export type LoginResponse = {
  token?: string
  expires_time?: number
  menus?: Menu[]
  unique_auth: string[]
  user_info: UserInfo
  logo: string
  logo_square: string
  version: string
  newOrderAudioLink: string
}
