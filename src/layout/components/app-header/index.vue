<template>
  <div class="header-left">
    <el-icon
      class="collapse-icon"
      @click="$store.commit('setIsCollapse', !$store.state.isCollapse)"
    >
      <expand v-if="$store.state.isCollapse" />
      <fold v-else />
    </el-icon>
    <breadcrumb />
  </div>
  <div class="header-right">
    <menu-search />
    <full-screen />
    <notification />
    <user-info />
  </div>
</template>

<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
import Breadcrumb from './Breadcrumb.vue'
import MenuSearch from './MenuSearch.vue'
import FullScreen from './FullScreen.vue'
import Notification from './Notification.vue'
import UserInfo from './UserInfo.vue'
</script>

<style scoped lang="scss">
.collapse-icon {
  cursor: pointer;
  font-size: 1.2em;
  margin-right: 20px;
}
.header-left {
  display: flex;
  align-items: center;
}
.header-right {
  display: flex;
  align-items: center;
  .el-input {
    width: 200px;
  }
}
</style>
