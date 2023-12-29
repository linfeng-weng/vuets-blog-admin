import { BASE_URL, TIMEOUT } from './config'
import HTTP from './request'

const httpRequest = new HTTP({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestSuccessFn: (config) => {
      return config
    }
  }
})

export { httpRequest }
