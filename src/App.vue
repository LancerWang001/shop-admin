<script setup lang="ts">
import locale from 'element-plus/lib/locale/lang/zh-cn'

</script>

<template>
  <el-config-provider :locale="locale">
    <!-- 路由的出口 -->
    <router-view />
  </el-config-provider>
</template>

<style>

</style>
