import { BASE_URL, TIMEOUT } from './config'
import HTTP from './request'
import { localCache } from '@/utils/cache'

const httpRequest = new HTTP({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 为每一个请求都携带token
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

export { httpRequest }
