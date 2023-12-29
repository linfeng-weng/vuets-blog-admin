import { httpRequest } from '../request'
import type { IAccount } from '@/types'

export function login(account: IAccount) {
  return httpRequest.post({
    url: '/api/user/login',
    data: account
  })
}
