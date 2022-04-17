<template>
  <el-icon
    class="full-screen"
    @click="toggleFullScreen"
  >
    <full-screen />
  </el-icon>
</template>

<script setup lang="ts">
import { FullScreen } from '@element-plus/icons-vue'

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
</script>

<style scoped>
.full-screen {
  cursor: pointer;
  padding-left: 15px;
}
</style>
