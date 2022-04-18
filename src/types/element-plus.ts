import { ElForm, ElDialog } from 'element-plus'
import type { FormItemRule } from 'element-plus'

export type IElForm = InstanceType<typeof ElForm>
export type IElDialog = InstanceType<typeof ElDialog>

export type IFormItem = Record<string, FormItemRule[]>
