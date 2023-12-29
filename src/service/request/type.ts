import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

interface HTTPInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: any) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface HTTPRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HTTPInterceptors<T>
}
