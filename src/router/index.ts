import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: import(/* home */ '../views/home/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: import(/* login */ '../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes
})

export default router
