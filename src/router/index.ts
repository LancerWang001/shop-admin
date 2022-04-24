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
import Login from '../views/login/index.vue'
import 'nprogress/nprogress.css'

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
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
    path: '/:pathMatch(.*)*',
    name: '404',
    component: import(/* 404 */ '../views/error/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory('/admin'), // 路由模式
  routes
})

router.beforeEach((to) => {
  nprogress.start() // 开始加载进度条
  if (to.meta.requiresAuth && !store.state.user) {
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
