import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import productRoute from './modules/product'
import permissionRoute from './modules/permission'
import mediaRoute from './modules/media'
import orderRoute from './modules/order'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* home */ '../views/home/index.vue')
      },
      productRoute,
      permissionRoute,
      mediaRoute,
      orderRoute
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
