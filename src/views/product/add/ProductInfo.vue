<template>
  <el-form
    label-position="right"
    label-width="180px"
    :model="product"
    style="max-width: 460px"
  >
    <el-form-item
      label="商品名称"
      prop="store_name"
    >
      <el-input v-model="product.store_name" />
    </el-form-item>
    <el-form-item
      label="商品分类"
      prop="cate_id"
    >
      <el-select
        v-model="product.cate_id"
        multiple
        style="width: 50%;"
      >
        <el-option
          v-for="item in productCates"
          :key="item.id"
          :label="item.cate_name"
          :value="item.id"
          :disabled="item.pid === 0"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      label="商品关键字"
      prop="keyword"
    >
      <el-input v-model="product.keyword" />
    </el-form-item>
    <el-form-item
      label="单位"
      prop="unit_name"
    >
      <el-input v-model="product.unit_name" />
    </el-form-item>
    <el-form-item
      label="商品简介"
      prop="store_info"
    >
      <el-input
        type="textarea"
        v-model="product.store_info"
        autosize
      />
    </el-form-item>
    <el-form-item
      label="商品封面图(最多1张)"
      prop="image"
    >
      xxx
    </el-form-item>
    <el-form-item
      label="商品推荐图(最多1张)"
      prop="recommend_image"
    >
      xxx
    </el-form-item>
    <el-form-item
      label="商品轮播图(最多10张)"
      prop="slider_image"
    >
      xxx
    </el-form-item>
    <el-form-item>
      <el-button type="primary">
        下一步
      </el-button>
    </el-form-item>
    <el-form-item
      label="商品规格"
      prop="spec_type"
      class="auto-scroll"
    >
      <el-radio-group v-model="product.spec_type">
        <el-radio :label="0">
          单规格
        </el-radio>
        <el-radio :label="1">
          多规格
        </el-radio>
      </el-radio-group>
      <!-- 单规格 -->
      <!-- <AttrTable
        v-if="product.spec_type === 0"
        v-model="singleAttrData"
      /> -->
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from '@vue/runtime-core'
import type { ProductCategory } from '@/api/types/product'
import { getCategoryTree } from '@/api/product'

const product = reactive({
  store_name: '',
  cate_id: '',
  keyword: '',
  unit_name: '',
  store_info: '',
  image: '',
  recommend_image: '',
  slider_image: '',
  spec_type: ''
})

const productCates = ref<ProductCategory[]>([])
const loadCate = async () => {
  const data = await getCategoryTree(1)
  productCates.value = data
}
onMounted(() => {
  loadCate()
})
</script>

<style scoped>

</style>
