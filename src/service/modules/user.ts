import { httpRequest } from '../request'
import type { IChangePwd, IChangeUserInfo } from '@/types'

interface IVisit {
  year?: number
}

// 修改密码
export function changePasswordApi(data: IChangePwd) {
  return httpRequest.post({
    url: '/user/change_pwd',
    data
  })
}

// 判断token是否过期
export function judgeToken() {
  return httpRequest.get({
    url: '/user'
  })
}

// 修改用户信息
export function changeUserinfoApi(data: IChangeUserInfo) {
  return httpRequest.post({
    url: '/user/userinfo',
    data
  })
}

// 获取网站访问量
export function getWebSiteVisitsApi(params: IVisit) {
  return httpRequest.get({
    url: '/visits',
    params
  })
}
