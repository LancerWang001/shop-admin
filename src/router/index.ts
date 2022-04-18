import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
import nprogress from 'nprogress'
import AppLayout from '@/layout/AppLayout.vue'
import productRoute from './modules/product'
import settingRoute from './modules/setting'
import systemRoute from './modules/system'
import store from '@/store'
import 'nprogress/nprogress.css'

export const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: AppLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* home */ '../views/home/index.vue')
      },
      productRoute,
      settingRoute,
      systemRoute
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: import(/* login */ '../views/login/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: import(/* 404 */ '../views/error/404.vue')
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
