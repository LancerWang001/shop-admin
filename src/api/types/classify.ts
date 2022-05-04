export type TreeOption = {
  id: string
  cate_name: string
  html: string
  add_time: string
  big_pic: string
  is_show: number
  pic: string
  pid: number
  sort: number
}

export type ProductCateQuery = {
  page?: number
  limit?: number
  is_show?: 1 | 0
  pid?: string
  cate_name?: string
}

export type ProductCategory = {
  id: number
  pid: number
  cate_name: string
  sort: number
  pic: string
  is_show: 0 | 1
  add_time: string
  big_pic: string
  children: ProductCategory[]
  isLoading?: boolean
}

export type CateForm = {
  pid: number
  cate_name: string
  pic: string
  sort: string
  is_show: 1 | 0
}

export type CatePidOption = {
  value: number
  label: string
}

export type CateRule = {
  field: string
  options: CatePidOption[]
  props: Record<string, any>
  title: string
  type: string
  value: any
}
