<template>
  <div ref="draggableContainer">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { PropType } from 'vue'
import Sortable from 'sortablejs'

const props = defineProps({
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  options: {
    type: Object as PropType<Sortable.Options>,
    default: () => ({})
  }
})

interface DraggableEmit {
  (e: 'update:model-value', value: any[]): void
}

const emit = defineEmits<DraggableEmit>()

const draggableContainer = ref<HTMLDivElement>()

onMounted(() => {
  initDraggable()
})

const initDraggable = () => {
  if (!draggableContainer.value) return console.error('容器不能为空')
  Sortable.create(draggableContainer.value, {
    animation: 300,
    onUpdate (e) {
      if (e.oldIndex !== undefined && e.newIndex !== undefined) {
        // 删除拖拽元素
        const list = props.modelValue.slice(0)
        const item = list.splice(e.oldIndex, 1)[0]
        list.splice(e.newIndex, 0, item)
        // 把删除的元素放到新的位置
        emit('update:model-value', list)
      }
    },
    ...props.options
  })
}

</script>

<style scoped lang="scss">
:deep(.el-tag) {
  margin-right: 5px;
}
</style>
