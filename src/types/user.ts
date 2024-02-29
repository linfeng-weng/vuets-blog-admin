export interface IVisit {
  year?: number
}

export interface IChangePwd {
  originalPassword: string
  newPassword: string
}

export interface IChangeUserInfo {
  username?: string
  avatar?: string
  nickname?: string
  motto?: string
  blogLink?: string
  github?: string
  noticeOn?: boolean
  noticeContent?: string
  musicOn?: boolean
  musicId?: number
}
