import { httpRequest } from '../request'

interface ITag {
  name: string
}

// 获取分类
export function getTagApi() {
  return httpRequest.get({
    url: '/api/tags'
  })
}

// 新建分类
export function createTagApi(data: ITag) {
  return httpRequest.post({
    url: '/api/tags',
    data
  })
}

// 根据id删除分类
export function deleteTagApi(id: string) {
  return httpRequest.delete({
    url: `/api/tags/${id}`
  })
}

// 根据id编辑分类
export function editTagApi(id: string, data: ITag) {
  return httpRequest.patch({
    url: `/api/tags/${id}`,
    data
  })
}

// 根据分类id获取文章列表
export function getArticleByTidApi(id: string) {
  return httpRequest.get({
    url: `/api/tags/${id}`
  })
}
