import { defineStore } from 'pinia'
import { getArticleApi } from '@/service'
import type { IArticleParams } from '@/types'
import { formatDate } from '@/utils/formatDate'

interface IDraft {
  tableData: any[]
  total: number
  currentPage: number
  pageSize: number
}

const useDraftStore = defineStore('draft', {
  state: (): IDraft => ({
    tableData: [],
    total: 0,
    currentPage: 1,
    pageSize: 10
  }),
  actions: {
    async getDraftAction(query: IArticleParams) {
      const params: IArticleParams = { status: 1, ...query }
      const res = await getArticleApi(params)
      this.total = res.draftTotal
      this.tableData = res.data.map((item: any) => {
        let tags
        if (item.tags.length !== 0) tags = item.tags.map((tag: any) => tag.name)
        return {
          id: item._id,
          title: item.title !== '' ? item.title : '[无标题]',
          category: item.category?.name ?? '[无分类]',
          tags: tags ?? '[无标签]',
          create_date: formatDate(item.created_at),
          update_date: formatDate(item.updated_at)
        }
      })
    }
  }
})

export default useDraftStore
