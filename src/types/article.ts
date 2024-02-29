export interface IArticleData {
  cover?: string
  title?: string
  content?: string
  abstract?: string
  aiAbstract?: string
  category?: string
  tags?: string[]
  status?: number
  contentImg?: string[]
  deleteImg?: string[]
  created_at?: number
}

export interface IArticleParams {
  limit?: number
  page?: number
  year?: number
  status?: number
}

export interface IArticleResData extends IArticleData {
  _id?: string
  views?: string
  created_at?: number
  updated_at?: number
  category?: any
  tag?: any
}
