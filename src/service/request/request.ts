import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HTTPRequestConfig } from './type.ts'
import { localCache } from '@/utils/cache.js'
import { ElMessage } from 'element-plus'
import router from '@/router'

class HTTP {
  instance: AxiosInstance
  constructor(config: HTTPRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        if (err.response?.status === 401) {
          localCache.clear()
          ElMessage.error('无效的token,请重新登录!')
          router.push('login')
        }
        return Promise.reject(err)
      }
    )

    // 针对特定的HTTP实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  request<T = any>(config: HTTPRequestConfig<T>) {
    // 针对单次请求的请求拦截
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    return new Promise<T>((reslove, reject) => {
      this.instance.request<any, T>(config).then(
        (res) => {
          // 单次请求的响应拦截
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          reslove(res)
        },
        (err) => {
          reject(err)
        }
      )
    })
  }

  get<T = any>(config: HTTPRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: HTTPRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HTTPRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HTTPRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HTTP
