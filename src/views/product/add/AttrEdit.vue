<template>
  <el-form
    class="attr-edit"
    label-position="left"
    label-width="50px"
  >
    <app-draggable v-model="draggableData">
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
          <app-draggable
            style="display: inline-block;"
            v-model="item.detail"
          >
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
          </app-draggable>
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
    </app-draggable>
    <el-form-item v-if="!isAdd">
      <el-button
        type="primary"
        @click="isAdd = true"
      >
        添加新规则
      </el-button>
      <el-button
        type="success"
        @click="handleGenerate"
      >
        立即生成
      </el-button>
    </el-form-item>
    <el-form-item v-else>
      <el-form
        :model="attrForm"
        :rules="formRules"
        ref="form"
        inline
      >
        <el-form-item
          label="规格名称"
          prop="value"
        >
          <el-input v-model="attrForm.value" />
        </el-form-item>
        <el-form-item
          label="规格值"
          prop="detail"
        >
          <el-input v-model="attrForm.detail[0]" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleAddAttr"
          >
            确认
          </el-button>
          <el-button @click="isAdd = false">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import { Menu } from '@element-plus/icons-vue'
import type { PropType } from 'vue'
import type { AttrRuleValue } from '@/api/types/product'
import type { IElForm } from '@/types/element-plus'
import { generateAttr } from '@/api/product'

const props = defineProps({
  modelValue: {
    type: Array as PropType<AttrRuleValue[]>,
    default: () => []
  }
})

const emit = defineEmits(['confirm', 'update:model-value'])

const draggableData = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:model-value', value)
  }
})

const isAdd = ref<boolean>(false)
const form = ref<IElForm | null>(null)
const attrForm = ref({
  value: '',
  detail: ['']
})
const formRules = {
  value: [
    { required: true, message: '请输入规则名称', trigger: 'change' }
  ],
  detail: [
    { required: true, message: '请输入规则值', trigger: 'change' }
  ]
}
const handleAddAttr = async () => {
  const valid = await form.value?.validate()
  if (!valid) return
  const data = JSON.parse(JSON.stringify(props.modelValue))
  data.push({
    value: attrForm.value.value,
    detail: attrForm.value.detail,
    inputVisible: false,
    inputValue: ''
  })
  emit('update:model-value', data)
  isAdd.value = false
  form.value?.resetFields()
}

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

// const onDragRow = (e: any) => {
//   console.log(e)
// }
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
.detail-item {
  margin-right: 10px;
}

.input-new-tag {
  width: 90px;
}
</style>
