<template>
  <el-form
    class="attr-edit"
    label-position="left"
    label-width="50px"
  >
    <el-form-item
      v-for="(item, itemIndex) of props.modelValue"
      :key="item.value"
      :label="item.value"
    >
      <template #label>
        <el-icon>
          <Menu />
        </el-icon>
      </template>
      <div>
        <el-tag
          closable
          effect="dark"
          @close="removeRule(itemIndex)"
        >
          {{ item.value }}
        </el-tag>
      </div>
      <div>
        <el-tag
          class="detail-item"
          v-for="(detail, detailIndex) of item.detail"
          :key="detail"
          closable
          effect="plain"
          @close="item.detail.splice(detailIndex, 1)"
        >
          {{ detail }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="item.inputVisible"
          v-model="item.inputValue"
          ref="InputRef"
          size="small"
          @keyup.enter.stop="handleInputConfirm(item)"
          @blur="handleInputConfirm(item)"
        />
        <el-button
          v-else
          class="button-new-tag ml-1"
          size="small"
          @click="showInput(item)"
        >
          + New Tag
        </el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">
        添加新规则
      </el-button>
      <el-button
        type="success"
        @click="handleGenerate"
      >
        立即生成
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { Menu } from '@element-plus/icons-vue'
import type { PropType } from 'vue'
import type { AttrRuleValue } from '@/api/types/product'
import { generateAttr } from '@/api/product'

const props = defineProps({
  modelValue: {
    type: Array as PropType<AttrRuleValue[]>,
    default: () => []
  }
})

const emit = defineEmits(['confirm', 'update:model-value'])

type RuleValue = AttrRuleValue & {
  inputValue?: string
  inputVisible?: boolean
}
const InputRef = ref<HTMLInputElement[]>([])

const removeRule = (itemIndex: number) => {
  const data = JSON.parse(JSON.stringify(props.modelValue))
  data.splice(itemIndex, 1)
  emit('update:model-value', data)
}

const handleInputConfirm = (item: RuleValue) => {
  if (item.inputValue) item.detail.push(item.inputValue)
  item.inputVisible = false
  item.inputValue = ''
}
const showInput = async (item: RuleValue) => {
  item.inputVisible = true
  await nextTick(() => {
    InputRef.value[0]?.focus()
  })
}

const handleGenerate = async () => {
  const data = await generateAttr(0, 1, {
    attrs: props.modelValue
  })
  emit('confirm', data.info)
}

</script>

<style scoped lang="scss">
.attr-edit {
  :deep(.el-form-item) {
    margin-bottom: 20px;
  }
  :deep(.el-form-item__content) {
    display: block;
  }
}
.detail-item + .detail-item {
  margin: 10px;
}

.input-new-tag {
  width: 90px;
}
</style>
