<template>
  <app-card>
    <template #header>
      <h3 style="margin: 0;">
        商品分类
      </h3>
    </template>
    <el-form :label-width="100">
      <el-row>
        <el-form-item
          label="商品分类"
          prop="pid"
        >
          <el-select
            clearable
            v-model="form.pid"
            @change="loadProductCates"
          >
            <el-option
              v-for="item of treeOptions"
              :key="item.id"
              :value="item.id"
              :label="item.html + item.cate_name"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="状态"
          prop="is_show"
        >
          <el-select
            clearable
            v-model="form.is_show"
            @change="loadProductCates"
          >
            <el-option
              :key="1"
              :value="1"
              label="显示"
            />
            <el-option
              :key="0"
              :value="0"
              label="隐藏"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input
            clearable
            v-model="form.cate_name"
          >
            <template #append>
              <el-button
                :icon="Search"
                @click="loadProductCates"
              />
            </template>
          </el-input>
        </el-form-item>
      </el-row>
    </el-form>
  </app-card>
  <br>
  <app-card>
    <template #header>
      <el-button type="primary">
        添加分类
      </el-button>
    </template>
    <vxe-table
      :data="productCates"
      row-id="id"
      :tree-config="{ children: 'children' }"
      v-loading="isLoadingProductCates"
    >
      <vxe-column
        field="id"
        title="ID"
      />
      <vxe-column
        field="cate_name"
        title="分类名称"
        tree-node
      />
      <vxe-column
        field="pic"
        title="分类图标"
      >
        <template #default="{ row }">
          <el-image
            style="width: 25px; height: 25px"
            :src="row.pic"
            fit="cover"
          />
        </template>
      </vxe-column>
      <vxe-column
        field="sort"
        title="排序"
      />
      <vxe-column title="状态">
        <template #default="{ row }">
          <el-switch
            v-model="row.is_show"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            :loading="row.isLoading"
            @change="handleStatusChange(row)"
          />
        </template>
      </vxe-column>
      <vxe-column
        title="操作"
        min-width="100"
      >
        <template #default>
          <el-button type="text">
            编辑
          </el-button>
          <el-button type="text">
            删除
          </el-button>
        </template>
      </vxe-column>
    </vxe-table>
  </app-card>
  <cate-form
    v-model="cateFormVisible"
  />
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ProductCategory, ProductCateQuery, TreeOption } from '@/api/types/classify'
import { changeCateStatus, getProductClassify, getTreeOptions } from '@/api/classify'
import CateForm from './CateForm.vue'

const form = reactive<ProductCateQuery>({
  is_show: undefined,
  pid: undefined,
  cate_name: '',
  page: 1,
  limit: 10
})

const treeOptions = ref<TreeOption[]>([])
const productCates = ref<ProductCategory[]>([])
const isLoadingProductCates = ref<boolean>(false)
const cateFormVisible = ref<boolean>(true)

onMounted(async () => {
  try {
    isLoadingProductCates.value = true
    await Promise.all([
      loadTreeOptions(),
      loadProductCates()
    ])
  } finally {
    isLoadingProductCates.value = false
  }
})

const loadTreeOptions = async () => {
  treeOptions.value = await getTreeOptions()
}
const loadProductCates = async () => {
  const { list } = await getProductClassify(form)
  productCates.value = list
}
const handleStatusChange = async (cate: ProductCategory) => {
  try {
    cate.isLoading = true
    await changeCateStatus(cate.id as number, cate.is_show)
  } finally {
    cate.isLoading = false
  }
}
</script>

<style scoped>

</style>
