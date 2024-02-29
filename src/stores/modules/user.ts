import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { getWebSiteVisitsApi, changePasswordApi, changeUserinfoApi, uploadImgApi } from '@/service'
import { localCache } from '@/utils/cache'
import type { IVisit, IChangeUserInfo, IChangePwd } from '@/types'

interface IUser {
  yearOptions: any[]
  monthsData: number[]
}

const useUserStore = defineStore('user', {
  state: (): IUser => ({
    yearOptions: [],
    monthsData: []
  }),
  actions: {
    // 获取总访问量
    async getWebSiteVisitsAction() {
      const res = await getWebSiteVisitsApi({})
      const uniqueYears = Array.from(new Set(res.visit.map((item: any) => item.year)))
      this.yearOptions = uniqueYears.map((item) => ({ value: item, label: String(item) }))
    },
    // 根据年份获取每月访问量
    async getWebSiteYearVisitsAction(params: IVisit) {
      const res = await getWebSiteVisitsApi(params)
      this.monthsData = Array(12).fill(0)
      res.visit.forEach((item: any) => {
        const index = item.month - 1
        this.monthsData[index] = item.visits
      })
    },
    // 修改密码
    async changePasswordAction(data: IChangePwd) {
      const res = await changePasswordApi(data)
      return res
    },
    // 修改用户信息
    async changeUserinfoAction(data: IChangeUserInfo) {
      const res = await changeUserinfoApi(data)
      if (res.code === 0) {
        localCache.setCache('userinfo', res.data)
        ElMessage.success('修改成功')
      } else ElMessage.error('修改失败')
    },
    // 上传图片
    async uploadImgAction(data: FormData) {
      const res = await uploadImgApi(data)
      if (res.code === 0) return res.coverURL
      return ''
    }
  }
})

export default useUserStore
