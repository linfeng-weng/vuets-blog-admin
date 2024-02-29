import { defineStore } from 'pinia'
import { getTagApi, createTagApi, editTagApi, deleteTagApi } from '@/service'
import { formatDate } from '@/utils/formatDate'
import type { ITag } from '@/types'
// import { ElMessage } from 'element-plus'

interface ITagState {
  tableDataAll: any[]
  tableData: any[]
  total: number
  currentPage: number
  pageSize: number
}

const useTagStore = defineStore('tag', {
  state: (): ITagState => ({
    tableDataAll: [],
    tableData: [],
    total: 0,
    currentPage: 1,
    pageSize: 10
  }),
  actions: {
    // 获取标签操作
    async getTagAction() {
      const res = await getTagApi()
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
    // 新建标签
    async createTagAction(data: ITag) {
      const res = await createTagApi(data)
      return res
    },
    // 编辑标签
    async editTagAction(id: string, data: ITag) {
      const res = await editTagApi(id, data)
      return res
    },
    // 删除标签
    async deleteTagAction(id: string) {
      const res = await deleteTagApi(id)
      return res
    }
  }
})

export default useTagStore
