<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
    />
    <Editor
      style="height: 500px; overflow-y: hidden;"
      :model-value="valueHtml"
      @update:model-value="onChange"
      :default-config="editorConfig"
      @on-created="handleCreated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, ShallowRef, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits<{(e: 'update:modelValue', value: string): void }>()

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

watch(() => props.modelValue, (value) => {
  if (valueHtml.value !== value) valueHtml.value = value
}, {
  immediate: true
})

const onChange = (value: string) => {
  valueHtml.value = value
  emit('update:modelValue', value)
}

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
const handleCreated = (editor: ShallowRef<any>) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<style scoped>

</style>
