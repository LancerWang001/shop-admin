import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
import nprogress from 'nprogress'
import AppLayout from '@/layout/AppLayout.vue'
import productRoute from './modules/product'
import permissionRoute from './modules/permission'
import mediaRoute from './modules/media'
import orderRoute from './modules/order'
import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: {
      // 自定义路由元数据
      title: '首页'
    },
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

router.beforeEach(() => {
  nprogress.start() // 开始加载进度条
})

router.afterEach(() => {
  nprogress.done() // 结束加载进度条
})

export default router
