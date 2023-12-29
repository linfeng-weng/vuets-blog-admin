export const menuList = [
  {
    type: '1',
    name: 'Dashboard',
    url: '/main/dashboard',
    icon: 'Odometer',
    children: [
      {
        type: '1-1',
        name: '分析页',
        url: '/main/dashboard/analysis',
        parentType: '1',
        component: () => import('@/views/dashboard/analysis/index.vue')
      }
    ]
  },
  {
    type: '2',
    name: '文章管理',
    url: '/main/article',
    icon: 'Notebook',
    children: [
      {
        type: '2-1',
        name: '发布文章',
        url: '/main/article/create-article',
        parentType: '2',
        component: () => import('@/views/article/create-article/index.vue')
      },
      {
        type: '2-2',
        name: '文章列表',
        url: '/main/article/article-list',
        parentType: '2',
        component: () => import('@/views/article/article-list/index.vue')
      },
      {
        type: '2-3',
        name: '分类列表',
        url: '/main/article/category',
        parentType: '2',
        component: () => import('@/views/article/category/index.vue')
      },
      {
        type: '2-4',
        name: '标签列表',
        url: '/main/article/tag',
        parentType: '2',
        component: () => import('@/views/article/tag/index.vue')
      }
    ]
  }
]
