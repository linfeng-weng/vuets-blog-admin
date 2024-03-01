<template>
  <div class="wang-editor">
    <Toolbar class="toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <div class="title">
      <input v-model="titleValue" placeholder="文章标题..." />
    </div>
    <Editor
      style="min-height: 600px; padding: 20px"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onFocus="editorFocus"
    />
    <Dialog
      dialogTitle="AI助手"
      :dialogVisible="dialogVisible"
      @closeAutoFocus="closeAutoFocus"
      :showFooter="false"
      :center="true"
      width="60%"
    >
      <template #content>
        <AIAssistant :title="titleValue" :content="valueText"></AIAssistant>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { ElMessage } from 'element-plus'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IEditorConfig, SlateElement } from '@wangeditor/editor'
import { localCache } from '@/utils/cache'
import useArticleStore from '@/stores/modules/article'
import Dialog from '../dialog/Dialog.vue'
import AIAssistant from '@/views/articles/article/component/AIAssistant.vue'

type InsertFnType = (url: string, alt?: string, href?: string) => void
type ImageElement = SlateElement & {
  src: string
  alt: string
  url: string
  href: string
}

const props = defineProps({
  clickAction: {
    type: Boolean,
    default: false
  }
})

const serverURL = import.meta.env.VITE_SERVER_URL
const articleStore = useArticleStore()
const { isJumpById, articleEditData } = storeToRefs(articleStore)

const titleValue = ref('')
const valueHtml = ref('')
const valueText = ref('')
const editorRef = shallowRef()
const mode = 'simple'
const abstractValue = ref('')
const contentImg = ref<string[]>([])
const deleteImg = ref<string[]>([])
let imageList_upload: string[] = [] //已上传的图片数组
let imageList_current: ImageElement[] = [] //当前编辑器的所有图片数组
let editorFocusFlag = false

const dialogVisible = ref(false)

const closeAutoFocus = () => {
  dialogVisible.value = false
}

const AIexecFn = () => {
  valueText.value = editorRef.value.getText()
  dialogVisible.value = true
}

const handleCreated = (editor: any) => {
  editor['AIExecFn'] = AIexecFn
  editorRef.value = editor // 记录 editor 实例
  if (isJumpById.value) {
    titleValue.value = articleEditData.value.title ?? ''
    valueHtml.value = articleEditData.value.content ?? ''
  }
  // const EditorImg = editorRef.value.getElemsByType('image')
}

const editorFocus = () => {
  if (!editorFocusFlag) {
    editorFocusFlag = true
    const editorImgList: ImageElement[] = editorRef.value.getElemsByType('image')
    imageList_upload = editorImgList.map((item) => item.alt)
  }
}

const getAbstract = () => {
  const valueText = editorRef.value.getText().trim().replace(/\n/g, ' ')
  abstractValue.value = valueText.substring(0, 120)
}

const getImageList = () => {
  imageList_current = editorRef.value.getElemsByType('image')
  contentImg.value = imageList_current.map((item) => item.alt)
  deleteImg.value = imageList_upload.filter((item) => !contentImg.value.includes(item))
}

const getText = () => {
  const text = editorRef.value.getText()
  return text
}

watch(
  () => props.clickAction,
  (newValue) => {
    if (!newValue) return
    getAbstract()
    getImageList()
  }
)

// 编辑器配置
const toolbarConfig = {
  excludeKeys: ['fullScreen', 'insertVideo'],
  insertKeys: { index: 0, keys: ['AI'] }
}
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入文章内容...',
  scroll: false,
  autoFocus: false,
  MENU_CONF: {}
}
// 插入图片
editorConfig.MENU_CONF!['insertImage'] = {
  onInsertedImage(imageNode: ImageElement | null) {
    if (imageNode == null) return
    imageList_upload.push(imageNode.alt)
  }
}
// 上传图片
editorConfig.MENU_CONF!['uploadImage'] = {
  server: `${serverURL}/api/uploads`,
  fieldName: 'file',
  maxFileSize: 3 * 1024 * 1024,
  headers: { Authorization: 'Bearer ' + localCache.getCache('token') },
  customInsert(res: any, insertFn: InsertFnType) {
    const url = res.coverURL
    const alt = res.coverURL
    insertFn(url, alt)
  },
  onSuccess() {
    ElMessage.success('上传成功')
  },
  onFailed() {
    ElMessage.error('上传失败')
  },
  onError() {
    ElMessage.error('上传出错')
  }
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

defineExpose({ titleValue, valueHtml, abstractValue, contentImg, deleteImg, getText })
</script>

<style lang="less" scoped>
.wang-editor {
  border: 1px solid #ccc;
  .toolbar {
    position: sticky;
    top: -20px;
    z-index: 9;
    border-bottom: 1px solid #ccc;
  }

  .title {
    padding: 10px 20px;
    border-bottom: 1px solid #e8e8e8;

    input {
      font-size: 32px;
      border: 0;
      outline: none;
      width: 100%;
      line-height: 1;
    }
  }
}

//

:deep(.w-e-text-container [data-slate-editor]) {
  h1 {
    font-size: 28px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e5e7eb;
  }
  h2 {
    font-size: 24px;
  }
  h3 {
    font-size: 20px;
  }
  em {
    font-style: italic;
  }
  a {
    color: #0269c8;
    text-decoration: underline;
  }
  blockquote {
    background-color: #f7f7f7;
    border-left: 5px solid var(--second-color);
    padding: 10px;
    margin: 10px 0;
  }

  pre > code {
    background-color: #fafafa;
    text-shadow: none;
    padding: 20px;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 14px;
    line-height: 1.5;
  }
}
</style>
