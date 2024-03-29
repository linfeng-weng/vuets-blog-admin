import { defineStore } from 'pinia'
import { login } from '@/service'
import { localCache } from '@/utils/cache'
import type { IAccount } from '@/types'
import router from '@/router'
import { ElMessage } from 'element-plus'

const useLoginStore = defineStore('login', {
  state: () => ({
    token: localCache.getCache('token') ?? '',
    userinfo: localCache.getCache('userinfo') ?? ''
  }),

  actions: {
    async loginAction(account: IAccount) {
      try {
        const loginRes = await login(account)
        localCache.setCache('token', loginRes.token)
        localCache.setCache('userinfo', loginRes.data)
        ElMessage.success('登录成功')
        router.push('/main')
      } catch (error: any) {
        const errMsg = `${error.response.data.message} (${error.response.status})`
        ElMessage.error(errMsg)
      }
    }
  }
})

export default useLoginStore
