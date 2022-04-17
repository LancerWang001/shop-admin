<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <app-menu />
      </el-aside>
      <el-container>
        <el-header>
          <app-header />
        </el-header>
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
import AppHeader from './components/app-header/index.vue'
</script>

<style lang="scss" scoped>
.common-layout {
  .el-header,
  .el-footer,
  .el-aside {
    display: flex;
    width: auto;
  }

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
    border-right: 0;
    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }

  .el-header {
    background-color: #fff;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
