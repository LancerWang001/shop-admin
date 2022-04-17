<template>
  <el-input
    class="w-50 m-2"
    placeholder="请输入内容"
    :prefix-icon="Search"
  />
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
</script>

<style scoped>
.el-input {
  width: 200px;
}
</style>
