<template>
  <div
    class="uploader-container"
    :style="{ width: width + 'px', height: width + 'px' }"
  >
    <el-image
      v-if="props.modelValue"
      fit="cover"
      :src="props.modelValue"
    />
    <template v-else-if="$slots.default">
      {{ $slots.default }}
    </template>
    <el-icon
      v-else
      @click="editImage"
    >
      <Plus />
    </el-icon>
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="60%"
  >
    <div class="uploader-dialog">
      <div class="filter">
        <el-input>
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
        <div class="filter-pics">
          <span class="filter-item">全部图片</span>
        </div>
      </div>
      <div class="content">
        <div class="actions">
          <el-button type="primary">
            使用选中图片
          </el-button>
          <el-button type="primary">
            上传图片
          </el-button>
          <el-button type="primary">
            删除图片
          </el-button>
          <el-select
            @change="changeSelect"
            placeholder="图片移动至"
          >
            <el-option
              :key="''"
              label="全部图片"
              value=""
            />
          </el-select>
        </div>
        <div class="pics">
          <div
            v-for="image of images"
            :key="image.att_id"
            class="pic"
          >
            <el-image :src="image.satt_dir" />
          </div>
        </div>
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :small="false"
          layout="total, prev, pager, next, jumper"
          :total="100"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Search } from '@element-plus/icons-vue'
import { ImageFile } from '@/api/types/common'

const props = defineProps({
  modelValue: {
    type: String,
    default: undefined
  },
  width: {
    type: Number,
    default: 40
  },
  title: {
    type: String,
    default: ''
  }
})
// const emit = defineEmits<{(e: 'update:model-value', value: string): void}>()
const dialogVisible = ref<boolean>(false)
const pageSize = ref(21)
const currentPage = ref(1)
const images = ref<ImageFile[]>([])

const editImage = () => {
  dialogVisible.value = true
}

const changeSelect = (value: any) => {
  console.log(value)
}
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

// const loadImages = async () => {
//   // await getImages({ pid: 0,  })
// }
</script>

<style scoped lang="scss">
.uploader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ccc;
  cursor: pointer;
}
.actions {
  display: flex;
  align-items: center;
  &:deep(.el-select) {
    margin-left: 12px;
  }
}

.uploader-dialog {
  display: flex;
}

.filter {
  width: 25%;
  border-right: 1px solid #eee;
  margin-right: 10px;
}

.filter-pics {
  height: 374px;
  padding: 10px 0;
}

.filter-item {
  display: inline-block;
  width: 88%;
  height: 32px;
  line-height: 32px;
  margin-left: 17px;
  position: relative;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
}

.divider {
  height: 100%;
}

.el-input {
  padding-right: 17px;
}

.content {
  flex: 1;
}

.pics {
  padding-top: 10px;
  height: 300px;
}

.pic {
  margin: 0 10px 10px 0;
  position: relative;
  width: 100px;
  cursor: pointer;
}

.el-pagination {
  justify-content: flex-end;
  padding: 20px;
}
</style>
