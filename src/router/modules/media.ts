import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'media',
  name: 'media',
  component: () => import('@/views/media/index.vue'),
  meta: {
    // 自定义路由元数据
    title: '媒体'
  }
}

export default routes
