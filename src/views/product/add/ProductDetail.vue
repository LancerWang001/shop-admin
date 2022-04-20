<template>
  <el-form
    label-position="right"
    label-width="180px"
    :model="product"
  >
    <el-form-item
      label="商品详情"
      prop="description"
    >
      <app-text-editor v-model="product.description" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from '@vue/runtime-core'

const product = reactive({
  description: '<h1>描述</h1>'
})
</script>

<style scoped>

</style>
