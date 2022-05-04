<template>
  <app-dialog
    :model-value="props.modelValue"
    @update:model-value="updateModelValue"
  >
    <el-form>
      <el-form-item
        v-for="cate of cateForm"
        :key="cate.field"
        :label="cate.title"
        :prop="cate.field"
        :label-width="200"
      >
        <el-select
          v-if="cate.type === 'select'"
          v-model="cate.value"
          v-bind="cate.props"
        >
          <el-option
            v-for="option of cate.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <el-input
          v-else-if="cate.type === 'input'"
          v-model="cate.value"
          v-bind="cate.props"
        />
        <el-input-number
          v-else-if="cate.type === 'inputNumber'"
          v-model="cate.value"
          v-bind="cate.props"
        />
        <el-radio-group
          v-else-if="cate.type === 'radio'"
          v-model="cate.value"
          v-bind="cate.props"
        >
          <el-radio
            v-for="option of cate.options"
            :key="option.value"
            :label="option.value"
          >
            {{ option.label }}
          </el-radio>
        </el-radio-group>
        <app-uploader v-else-if="cate.type === 'frame'" />
      </el-form-item>
    </el-form>
  </app-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getCreateCateForm } from '@/api/classify'
import { CateRule } from '@/api/types/classify'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  cateId: {
    type: Number,
    default: undefined
  }
})

const cateForm = ref<CateRule[]>([])

const emit = defineEmits<{(e: 'update:model-value', value: boolean): void}>()
const updateModelValue = (visible: boolean) => {
  emit('update:model-value', visible)
}

onMounted(() => {
  loadCateForm()
})

const loadCateForm = async () => {
  const { rules } = await getCreateCateForm(props.cateId)
  cateForm.value = rules
}
</script>

<style scoped>

</style>
