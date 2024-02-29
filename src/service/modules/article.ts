import { httpRequest } from '../request'
import type { IArticleData, IArticleParams } from '@/types'

// 发布文章
export function createArticleApi(data: IArticleData) {
  return httpRequest.post({
    url: '/api/articles',
    data
  })
}

// 获取文章列表(可分页，可根据年份筛选，可获取草稿)
export function getArticleApi(params: IArticleParams) {
  return httpRequest.get({
    url: '/api/articles',
    params
  })
}

// 根据id查看文章
export function getArticleByIdApi(id: string) {
  return httpRequest.get({
    url: `/api/articles/${id}`
  })
}

// 根据id删除文章
export function deleteArticleApi(id: string) {
  return httpRequest.delete({
    url: `/api/articles/${id}`
  })
}

// 根据id编辑文章
export function editArticleApi(id: string, data: IArticleData) {
  return httpRequest.patch({
    url: `/api/articles/${id}`,
    data
  })
}

// 搜索文章
export function searchArticleApi(s: string, params: IArticleParams) {
  return httpRequest.get({
    url: `/api/articles/search/${s}`,
    params
  })
}

// 获取近一年热门文章
export function getHotArticle() {
  return httpRequest.get({
    url: `/api/articles/hot_articles/top8`
  })
}

// 上传
export function uploadImgApi(data: FormData) {
  return httpRequest.post({
    url: '/api/uploads',
    data
  })
}
