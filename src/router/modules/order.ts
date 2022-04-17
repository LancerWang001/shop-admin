import {
  RouteRecordRaw, RouterView
} from 'vue-router'

const routes: RouteRecordRaw = {
  path: '/order',
  name: 'order',
  component: RouterView,
  meta: {
    // 自定义路由元数据
    title: '订单'
  },
  children: [
    {
      path: 'list',
      name: 'order_list',
      component: () => import('@/views/order/list/index.vue'),
      meta: {
        // 自定义路由元数据
        title: '订单列表'
      }
    },
    {
      path: 'offline',
      name: 'order-offline',
      component: () => import('@/views/order/offline/index.vue'),
      meta: {
        // 自定义路由元数据
        title: '线下订单'
      }
    }
  ]
}

export default routes
