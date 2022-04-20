<template>
  <el-card
    class="head-title"
  >
    <el-button size="small">
      <el-icon>
        <arrow-left />
      </el-icon>
      返回
    </el-button>
    <h1 class="add-title">
      添加商品
    </h1>
  </el-card>
  <el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane
        label="商品信息"
        name="prodInfo"
      >
        <product-info />
      </el-tab-pane>
      <el-tab-pane
        label="商品详情"
        name="prodDetail"
      >
        <product-detail />
      </el-tab-pane>
      <el-tab-pane
        label="其他设置"
        name="others"
      >
        其他设置
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from '@vue/runtime-core'
import { ArrowLeft } from '@element-plus/icons-vue'
import ProductInfo from './ProductInfo.vue'
import ProductDetail from './ProductDetail.vue'

const activeName = ref('prodInfo')
</script>

<style lang="scss" scoped>
.el-card + .el-card {
  margin-top: 20px;
}

.head-title :deep(.el-card__body) {
  display: flex;
  align-items: baseline;
  box-sizing: border-box;
}
.add-title {
  margin: 0 20px;
}
</style>
