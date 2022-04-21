<template>
  <el-form
    label-position="right"
    label-width="180px"
    :model="product"
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
      <AttrTable
        v-if="product.spec_type === 0"
        v-model="singleAttrData"
      />
    </el-form-item>
    <!-- 多规格 -->
    <el-form-item
      v-if="product.spec_type === 1"
      class="multi-attr-form_item"
    >
      <el-space
        direction="vertical"
        fill
        style="width: 100%;"
        alignment="flex-start"
      >
        <AttrTemplate @confirm="attrTpl = $event" />
        <AttrEdit
          v-if="attrTpl.length"
          v-model="attrTpl"
          @confirm="handleAttrEditConfirm"
        />
        <template v-if="multiAttrData.length">
          <div>批量设置：</div>
          <AttrTable
            v-model="batchData"
          >
            <template #append>
              <el-table-column
                label="操作"
                fixed="right"
                min-width="140"
              >
                <template #default>
                  <el-button
                    type="text"
                    @click="handleBatchSet"
                  >
                    批量设置
                  </el-button>
                  <el-button
                    type="text"
                    @click="handleClearBatch"
                  >
                    清除
                  </el-button>
                </template>
              </el-table-column>
            </template>
          </AttrTable>
          <div>商品属性：</div>
          <AttrTable v-model="multiAttrData">
            <template #prepend>
              <el-table-column
                v-for="item of tableHeader"
                :key="item.key"
                :prop="item.key"
                :label="item.title"
              />
            </template>
            <template #append>
              <el-table-column
                label="操作"
                fixed="right"
              >
                <template #default="{ $index }">
                  <el-button
                    type="text"
                    @click="handleDeleteAttr($index)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </template>
          </AttrTable>
        </template>
      </el-space>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">
        下一步
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from '@vue/runtime-core'
import type { ProductCategory, ProductAttr, AttrRuleValue, AttrTableHeader } from '@/api/types/product'
import { getCategoryTree } from '@/api/product'
import AttrTable from './AttrTable.vue'
import AttrTemplate from './AttrTemplate.vue'
import AttrEdit from './AttrEdit.vue'

const attrTpl = ref<AttrRuleValue[]>([])

const product = ref({
  store_name: '',
  attrs: [] as ProductAttr[], // 商品规格
  cate_id: [] as number[],
  keyword: '',
  unit_name: '',
  store_info: '',
  image: '',
  recommend_image: '',
  slider_image: '',
  spec_type: 0 as 0 | 1, // 0 单规格、1 多规格
  header: [] as AttrTableHeader[],
  items: [] as AttrRuleValue[]
})

const productCates = ref<ProductCategory[]>([])
const loadCate = async () => {
  const data = await getCategoryTree(1)
  productCates.value = data
}
onMounted(() => {
  loadCate()
})
const singleAttrData = ref([{
  pic: '',
  vip_price: 0,
  price: 0,
  cost: 0,
  ot_price: 0,
  stock: 0,
  bar_code: '',
  weight: 0,
  volume: 0,
  brokerage: 0,
  brokerage_two: 0
}])
const multiAttrData = ref<ProductAttr[]>([])
const defaultAttrData = [{
  pic: '',
  vip_price: 0,
  price: 0,
  cost: 0,
  ot_price: 0,
  stock: 0,
  bar_code: '',
  weight: 0,
  volume: 0,
  brokerage: 0,
  brokerage_two: 0
}]
const batchData = ref(JSON.parse(JSON.stringify(defaultAttrData)))

watch([singleAttrData, multiAttrData, () => product.value.spec_type], () => {
  product.value.attrs = product.value.spec_type === 0
    ? singleAttrData.value
    : multiAttrData.value
}, {
  immediate: true, // 立即执行
  deep: true // 深度监视
})

const handleAttrEditConfirm = (data: {
  attr: AttrRuleValue[]
  header: AttrTableHeader[]
  value: ProductAttr[]
}) => {
  multiAttrData.value = data.value
  product.value.header = data.header
  product.value.items = data.attr
}

const tableHeader = computed(() => product.value.header.filter(
  item => item.key && item.key.startsWith('value')
))

const handleDeleteAttr = (index: number) => {
  multiAttrData.value.splice(index, 1)
}

const handleBatchSet = () => {
  // 过滤无效数据
  const data = batchData.value[0]
  const validData: Record<string, any> = {}
  let key: keyof typeof data
  for (key in data) {
    if (data[key]) validData[key] = data[key]
  }
  // 批量设置 multiAttrData
  multiAttrData.value.forEach(item => {
    Object.assign(item, validData)
  })
}

const handleClearBatch = () => {
  batchData.value = JSON.parse(JSON.stringify(defaultAttrData))
}
</script>

<style scoped lang="scss">
:deep(.el-space) {
  max-width: 100%;
  .el-space__item {
    max-width: 100%;
  }
}
.el-icon-menu {
  font-size: 20px;
  cursor: move;
}
.detail-item {
  margin-right: 10px;
}

.el-form-item {
  align-items: center;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
