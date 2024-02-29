import { defineStore } from 'pinia'
import {
  getHotArticle,
  getArticleApi,
  getArticleByIdApi,
  createArticleApi,
  editArticleApi,
  deleteArticleApi,
  searchArticleApi,
  uploadImgApi
} from '@/service'
import type { IArticleData, IArticleParams, IArticleResData } from '@/types'
import { formatDate } from '@/utils/formatDate'

interface IArticle {
  hotArticleList: any[]
  heatMapYearData: any[]
  tableData: any[]
  total: number
  currentPage: number
  pageSize: number
  isJumpById: boolean
  isDraft: boolean
  jumpId: string
  articleEditData: IArticleResData
}

// 获取热力图数据
const getHeatMapData = (store: IArticle, res: any) => {
  const dateCounts = res.data.reduce((counts: any, item: any) => {
    const date = formatDate(item.created_at)
    counts[date] = (counts[date] || 0) + 1
    return counts
  }, {})
  store.heatMapYearData = Object.entries(dateCounts).map(([date, count]) => {
    const color =
      count === 1 ? '#c6e48b' : count === 2 ? '#7bc96f' : count === 3 ? '#239a3b' : '#196027'
    return {
      value: [date, count],
      itemStyle: { color }
    }
  })
}

// 获取文章数据
const getArticleData = (store: IArticle, res: any) => {
  store.total = res.total
  store.tableData = res.data.map((item: any) => {
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

// Store
const useArticleStore = defineStore('article', {
  state: (): IArticle => ({
    hotArticleList: [],
    heatMapYearData: [],
    tableData: [],
    total: 0,
    currentPage: 1,
    pageSize: 10,
    isJumpById: false,
    isDraft: false,
    jumpId: '',
    articleEditData: {}
  }),
  actions: {
    // 获取热门文章
    async getHotArticleAction() {
      const res = await getHotArticle()
      this.hotArticleList = res.result.map((item: any) => ({ value: item.views, name: item.title }))
    },

    // 获取文章信息
    async getArticleAction(params: IArticleParams, type?: string) {
      const res = await getArticleApi(params)
      if (type === '热力图') return getHeatMapData(this, res)
      else return getArticleData(this, res)
    },

    // 根据id获取文章
    async getArticleByIdAction(id: string) {
      const res = await getArticleByIdApi(id)
      this.jumpId = id
      this.isJumpById = true
      this.articleEditData = res.data
      if (res.data.status === 1) this.isDraft = true
    },

    // 创建文章
    async createArticleAction(data: IArticleData) {
      const res = await createArticleApi(data)
      return res
    },

    // 编辑文章
    async editArticleAction(id: string, data: IArticleData) {
      const res = await editArticleApi(id, data)
      return res
    },

    // 删除文章
    async deleteArticleAction(id: string) {
      const res = await deleteArticleApi(id)
      return res
    },

    // 搜索文章
    async searchArticleAction(s: string, params: IArticleParams) {
      const res = await searchArticleApi(s, params)
      getArticleData(this, res)
    },

    // 上传
    async uploadImgAction(data: FormData) {
      const res = await uploadImgApi(data)
      if (res.code === 0) return res.coverURL
      return ''
    }
  }
})

export default useArticleStore
