<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <app-menu />
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <!-- 子路由出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import AppMenu from './components/AppMenu.vue'
</script>

<style lang="scss" scoped>
.common-layout {
  .el-header,
  .el-footer,
  .el-aside {
    display: flex;
    // justify-content: center;
    // align-items: center;
  }

  .el-header,
  .el-footer {
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }

  .el-aside {
    background-color: #304156;
    color: var(--el-text-color-primary);
  }

  .el-main {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-text-color-primary);
    height: 150px;
  }

  .el-container {
    height: 100vh;
  }
  .el-menu {
    width: 100%;
  }
}
</style>
