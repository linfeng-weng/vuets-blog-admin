import { defineStore } from 'pinia'
import { getCategoryApi, createCategoryApi, editCategoryApi, deleteCategoryApi } from '@/service'
import { formatDate } from '@/utils/formatDate'
import type { ICategory } from '@/types'
// import { ElMessage } from 'element-plus'

interface ICategoryState {
  tableDataAll: any[]
  tableData: any[]
  total: number
  currentPage: number
  pageSize: number
}

const useCategoryStore = defineStore('category', {
  state: (): ICategoryState => ({
    tableDataAll: [],
    tableData: [],
    total: 0,
    currentPage: 1,
    pageSize: 10
  }),
  actions: {
    // 获取分类操作
    async getCategoryAction() {
      const res = await getCategoryApi()
      this.total = res.total
      this.tableDataAll = res.data.map((item: any) => {
        return {
          id: item._id,
          date: formatDate(item.created_at),
          name: item.name,
          articleNum: item.num
        }
      })
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = this.currentPage * this.pageSize
      this.tableData = this.tableDataAll.slice(startIndex, endIndex)
    },
    // 新建分类
    async createCategoryAction(data: ICategory) {
      const res = await createCategoryApi(data)
      return res
    },
    // 编辑分类
    async editCategoryAction(id: string, data: ICategory) {
      const res = await editCategoryApi(id, data)
      return res
    },
    // 删除分类
    async deleteCategoryAction(id: string) {
      const res = await deleteCategoryApi(id)
      return res
    }
  }
})

export default useCategoryStore
