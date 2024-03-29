import { httpRequest } from '../request'
import type { ICategory } from '@/types'

// 获取分类
export function getCategoryApi() {
  return httpRequest.get({
    url: '/categories'
  })
}

// 新建分类
export function createCategoryApi(data: ICategory) {
  return httpRequest.post({
    url: '/categories',
    data
  })
}

// 根据id删除分类
export function deleteCategoryApi(id: string) {
  return httpRequest.delete({
    url: `/categories/${id}`
  })
}

// 根据id编辑分类
export function editCategoryApi(id: string, data: ICategory) {
  return httpRequest.patch({
    url: `/categories/${id}`,
    data
  })
}

// 根据分类id获取文章列表
export function getArticleByCidApi(id: string) {
  return httpRequest.get({
    url: `/categories/${id}`
  })
}
