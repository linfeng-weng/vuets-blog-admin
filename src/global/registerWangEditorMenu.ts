import { type IButtonMenu, type IDomEditor, Boot } from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'

interface INewDomEditor extends IDomEditor {
  AIExecFn?: any
}

// AI
class AIButtonMenu implements IButtonMenu {
  title: string
  iconSvg?: string
  hotkey?: string
  alwaysEnable?: boolean
  tag: string
  width?: number

  constructor() {
    this.title = 'AI助手'
    this.iconSvg = `<svg t="1706854090516" class="icon" viewBox="0 0 1029 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6973" width="128" height="128"><path d="M513.128884 0.000513a512 512 0 1 0 511.281619 513.128884v-0.718381A511.28162 511.28162 0 0 0 513.744638 0.000513z m28.735217 694.673883l-36.124273-85.282021H365.245139l-36.124273 85.282021h-92.363199L389.977951 324.195342h90.515936l153.32291 370.479054z m210.998597 0h-78.919222v-370.479054h78.919222z" fill="#FD8F44" p-id="6974" data-spm-anchor-id="a313x.search_index.0.i5.b8c43a81nOECVU" class="selected"></path><path d="M382.999399 543.096123H488.498697l-52.749649-129.411104z" fill="#FF5E34" p-id="6975"></path></svg>`
    this.tag = 'button'
  }
  getValue(): string | boolean {
    return ''
  }

  isActive(): boolean {
    return false
  }

  isDisabled(editor: IDomEditor): boolean {
    return false
  }

  exec(editor: INewDomEditor) {
    if (this.isDisabled(editor)) return
    editor['AIExecFn']()
  }
}

const AIMenuConf = {
  key: 'AI',
  factory() {
    return new AIButtonMenu()
  }
}

export function registerWangEditorMenu() {
  Boot.registerMenu(AIMenuConf)
  Boot.registerModule(markdownModule)
}
