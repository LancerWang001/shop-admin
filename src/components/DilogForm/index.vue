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
          @click="emit('confirm')"
        >确 认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { IElDialog } from '@/types/element-plus'
import { ref } from '@vue/runtime-core'

type DialogEmits = {
  (e: 'confirm'): void
}
const emit = defineEmits<DialogEmits>()
const dialog = ref<IElDialog>()
const handleCancel = () => {
  if (dialog.value?.visible) dialog.value.visible = false
}
</script>

<style scoped>

</style>
