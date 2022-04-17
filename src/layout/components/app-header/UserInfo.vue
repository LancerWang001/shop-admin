<template>
  <el-dropdown class="user-info">
    <span class="el-dropdown-link">
      {{ $store.state.user?.account }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="handleLogout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { logout } from '@/api/common'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

const router = useRouter()
const store = useStore()

const handleLogout = async () => {
  // 退出提示
  try {
    await ElMessageBox.confirm('确认退出吗？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
    // 清除用户登录信息
    store.commit('setUser', null)
    ElMessage({
      type: 'success',
      message: '退出成功！'
    })
  } catch (err) {
    ElMessage({
      type: 'info',
      message: '已取消退出'
    })
  }
  // 确认发出退出请求
  await logout()
  // 跳转到登录页
  router.push({
    name: 'login'
  })
}
</script>

<style scoped>
.user-info {
  padding-left: 15px;
}
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
