import { createRouter, createWebHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { menuList } from '../config/menu'

import type { RouteRecordRaw } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main/dashboard/analysis'
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      name: 'main',
      path: '/main',
      component: () => import('@/views/main/index.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

const addRoutes = () => {
  const routes: RouteRecordRaw[] = []
  menuList.forEach((menu) => {
    menu.children.forEach((subMenu) => {
      if (!routes.find((item) => item.path === menu.url)) {
        routes.push({ path: menu.url, redirect: subMenu.url })
      }
      routes.push({ path: subMenu.url, component: subMenu.component })
    })
  })
  routes.forEach((route) => router.addRoute('main', route))
}

addRoutes()

router.beforeEach((to) => {
  const token = localCache.getCache('token')
  if (to.path !== '/login' && !token) {
    return '/login'
  }
  if (to.path === '/main') {
    return '/main/dashboard/analysis'
  }
})

export default router
