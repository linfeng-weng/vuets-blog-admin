import { httpRequest } from '../request'
import type { IAiImage } from '@/types'

export function GenerateAbstractApi(input: string) {
  return httpRequest.post({
    url: '/api/baidu_ai/qcl_2_13b',
    data: {
      type: 'ArticleAbstract',
      input
    }
  })
}

export function GenerateArticleMessageApi(input: any, type: string) {
  return httpRequest.post({
    url: '/api/baidu_ai/qcl_2_13b',
    data: {
      type,
      input
    }
  })
}

export function GenerateImageApi(data: IAiImage) {
  return httpRequest.post({
    url: '/api/baidu_ai/sd_xl',
    data
  })
}
