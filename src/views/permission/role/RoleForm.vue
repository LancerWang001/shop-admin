<template>
  <app-dialog
    :title="props.roleId ? '编辑角色' : '添加角色'"
    :confirm="handleConfirm"
    @open="handleDialogOpen"
    @close="handleDialogClose"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item
        label="角色名称"
        prop="role_name"
      >
        <el-input
          v-model="formData.role_name"
          placeholder="请输入管理员账号"
        />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio-group v-model="formData.status">
          <el-radio
            :label="1"
          >
            开启
          </el-radio>
          <el-radio
            :label="0"
          >
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-tree
          ref="tree"
          show-checkbox
          node-key="id"
          :data="menus"
          :props="defaultProps"
          :default-checked-keys="formData.checked_menus"
        />
      </el-form-item>
    </el-form>
  </app-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PropType } from 'vue'
import type { IElForm, IElTree, IFormItem } from '@/types/element-plus'
import { ElMessage } from 'element-plus'
import { createOrEditRole, getRole, getRolePermissions } from '@/api/role'
import { ModifyRole, Permission } from '@/api/types/role'

const defaultProps = {
  children: 'children',
  label: 'title'
}

const menus = ref<Permission[]>([])
const tree = ref<IElTree>()

const props = defineProps({
  roleId: {
    type: Number as PropType<number | null>,
    default: null
  }
})
type AdminFormEmit = {
  (e: 'update:role-id', value: number | null): void
  (e: 'success'): void
}
const emit = defineEmits<AdminFormEmit>()

const formLoading = ref(false)
const form = ref<IElForm | null>(null)
const formData = ref<ModifyRole>({
  role_name: '',
  status: 0,
  checked_menus: []
})

const formRules: IFormItem = {
  role_name: [
    { required: true, message: '请输入管理员账号', trigger: 'blur' }
  ]
}

const loadMenus = async () => {
  const data = await getRolePermissions()
  menus.value = data.menus
}

const loadRole = async () => {
  if (!props.roleId) return
  const { menus: roleMenus, role } = await getRole(props.roleId)
  menus.value = roleMenus
  formData.value.role_name = role.role_name
  formData.value.status = role.status
  formData.value.checked_menus = role.rules.split(',').map(Number.parseInt)
}

const handleDialogOpen = async () => {
  try {
    formLoading.value = true
    if (!props.roleId) await loadMenus()
    else await loadRole()
  } finally {
    formLoading.value = false
  }
}

// 清除状态
const handleDialogClose = () => {
  emit('update:role-id', 0)
  form.value?.clearValidate() // 清除验证结果
  form.value?.resetFields() // 清除表单数据
}

// 处理确认事件
const handleConfirm = async () => {
  const valid = await form.value?.validate()
  if (!valid) return
  const checkedKeys = tree.value?.getCheckedKeys(true)
  formData.value.checked_menus = checkedKeys as number[] ?? []
  const roleId = props.roleId ?? 0
  await createOrEditRole(roleId, formData.value)
  emit('success')
  ElMessage.success('保存成功')
}
</script>

<style>
.el-tree {
  width: 100%;
}
</style>
