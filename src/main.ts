import 'normalize.css'
import 'element-plus/dist/index.css'
import './assets/css/index.less'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from './App.vue'
import { createApp } from 'vue'
import pinia from './stores'
import router from './router'
import registerIcons from './global/registerIcons'
import { registerWangEditorMenu } from '@/global/registerWangEditorMenu'

// wangeditor菜单、插件全局注册
registerWangEditorMenu()

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn
})
app.use(registerIcons)
app.use(pinia)
app.use(router)

app.mount('#app')
