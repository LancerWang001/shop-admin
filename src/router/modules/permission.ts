import {
  RouteRecordRaw, RouterView
} from 'vue-router'

const routes: RouteRecordRaw = {
  path: '/permission',
  name: 'permission',
  component: RouterView,
  meta: {
    // 自定义路由元数据
    title: '权限'
  },
  children: [
    {
      path: 'role',
      name: 'permission-role',
      component: () => import('@/views/permission/role/index.vue'),
      meta: {
        // 自定义路由元数据
        title: '角色权限'
      }
    },
    {
      path: 'admin',
      name: 'permission-admin',
      component: () => import('@/views/permission/admin/index.vue'),
      meta: {
        // 自定义路由元数据
        title: '用户权限'
      }
    },
    {
      path: 'rule',
      name: 'permission-rule',
      component: () => import('@/views/permission/rule/index.vue'),
      meta: {
        // 自定义路由元数据
        title: '权限规则'
      }
    }
  ]
}

export default routes
