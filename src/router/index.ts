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
import store from '@/store'
import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* home */ '../views/home/index.vue'),
        meta: { title: '首页' }
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

router.beforeEach((to) => {
  nprogress.start() // 开始加载进度条
  const user = store.state.user
  if (to.meta.requiresAuth && !user) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  }
})

router.afterEach(() => {
  nprogress.done() // 结束加载进度条
})

export default router
