<template>
  <el-dialog
    ref="dialog"
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
          :loading="confirmLoading"
        >确 认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { IElDialog } from '@/types/element-plus'
import { ref } from '@vue/runtime-core'
import type { PropType } from '@vue/runtime-core'

const props = defineProps({
  confirm: {
    type: Function as PropType<() => Promise<any>>,
    default: () => Promise.resolve()
  }
})
const confirmLoading = ref(false)
const dialog = ref<IElDialog>()
const handleCancel = () => {
  if (dialog.value?.visible) dialog.value.visible = false
}
const handleConfirm = async () => {
  try {
    confirmLoading.value = true
    await props.confirm?.()
  } finally {
    confirmLoading.value = false
  }
}
</script>

<style scoped>

</style>
