import { httpRequest } from '../request'
import type { IChangePwd, IChangeUserInfo } from '@/types'

interface IVisit {
  year?: number
}

// 修改密码
export function changePasswordApi(data: IChangePwd) {
  return httpRequest.post({
    url: '/api/user/change_pwd',
    data
  })
}

// 判断token是否过期
export function judgeToken() {
  return httpRequest.get({
    url: '/api/user'
  })
}

// 修改用户信息
export function changeUserinfoApi(data: IChangeUserInfo) {
  return httpRequest.post({
    url: '/api/user/userinfo',
    data
  })
}

// 获取网站访问量
export function getWebSiteVisitsApi(params: IVisit) {
  return httpRequest.get({
    url: '/api/visits',
    params
  })
}
