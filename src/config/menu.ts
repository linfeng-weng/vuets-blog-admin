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
        name: '文章列表',
        url: '/main/articles/article-list',
        parentType: '2',
        component: () => import('@/views/articles/article/index.vue')
      },
      {
        type: '2-2',
        name: '分类列表',
        url: '/main/article/category',
        parentType: '2',
        component: () => import('@/views/articles/category/index.vue')
      },
      {
        type: '2-3',
        name: '标签列表',
        url: '/main/article/tag',
        parentType: '2',
        component: () => import('@/views/articles/tag/index.vue')
      },
      {
        type: '2-4',
        name: '草稿箱',
        url: '/main/article/draft',
        parentType: '2',
        component: () => import('@/views/articles/draft/index.vue')
      }
    ]
  },
  {
    type: 3,
    name: '系统设置',
    url: '/main/system-setting',
    icon: 'Setting',
    children: [
      {
        type: '3-1',
        name: '个人设置',
        url: '/main/system-setting/user-setting',
        parentType: '3',
        component: () => import('@/views/system-setting/user-setting/index.vue')
      },
      {
        type: '3-2',
        name: '功能设置',
        url: '/main/system-setting/function-setting',
        parentType: '3',
        component: () => import('@/views/system-setting/function-setting/index.vue')
      }
    ]
  },
  {
    type: 4,
    name: '辅助功能',
    url: '/main/auxiliary-function',
    icon: 'Box',
    children: [
      {
        type: '4-1',
        name: 'AI生图',
        url: '/main/auxiliary-function/ai-picture',
        parentType: '4',
        component: () => import('@/views/auxiliary-function/ai-picture/index.vue')
      }
    ]
  }
]
