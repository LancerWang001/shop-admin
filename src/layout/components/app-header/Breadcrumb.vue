<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      :key="route.path"
      v-for="route of routes"
      :to="route.path"
    >
      {{ route.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { computed } from '@vue/runtime-core'
import { useRouter } from 'vue-router'

const router = useRouter()
const routes = computed(() => {
  return router.currentRoute.value.matched.filter(item => item.meta.title)
})

</script>

<style scoped>

</style>
