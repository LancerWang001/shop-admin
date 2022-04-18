import { IFormItem } from '@/types/element-plus'

export type ISelectOptions = {
  label: string
  value: number
}

export type IFormRule = {
  title: string
  field: string
  props?: Record<string, any>
  type: string
  validate?: IFormItem[]
  value: string
  options?: ISelectOptions[]
}

export type IFormData = {
  action: string
  info: string
  method: string
  status: boolean
  title: string
  rules: IFormRule[]
}
