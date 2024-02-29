<template>
  <div class="operate-article container">
    <div class="header">
      <span @click="back">返回</span>
      <div class="operate">
        <button class="yzx-default-btn" @click="saveDraft">存草稿</button>
        <button class="yzx-primary-btn" @click="createBtn">发布</button>
      </div>
    </div>
    <OperateOptionBox ref="optionBoxRef" />
    <WangEditor ref="editorRef" :clickAction="clickAction" />
    <AIArticleAbstract
      ref="aiAbstractRef"
      :articleContent="articleContent"
      @generateAbstract="generateAIAbstract"
    />
  </div>
  <!-- 弹框组件 -->
  <Dialog
    :dialogVisible="dialogVisible"
    :dialogContent="dialogContent"
    :dialogCancelContent="dialogCancelContent"
    @closeAutoFocus="closeAutoFocus"
    @cancelHandle="cancelHandle"
    @confirmHandle="confirmHandle"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, onBeforeUnmount } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import type { IArticleData } from '@/types'
import { ElMessage } from 'element-plus'
import OperateOptionBox from './OperateOptionBox.vue'
import AIArticleAbstract from './AIArticleAbstract.vue'
import WangEditor from '@/components/wangeditor/WangEditor.vue'
import useArticleStore from '@/stores/modules/article'

const articleStore = useArticleStore()
const { jumpId, isJumpById, isDraft } = storeToRefs(articleStore)

const dialogVisible = ref(false)
const dialogContent = ref('')
const dialogCancelContent = ref('取消')
const clickAction = ref(false)
const emit = defineEmits(['back'])

const optionBoxRef = ref<InstanceType<typeof OperateOptionBox>>()
const editorRef = ref<InstanceType<typeof WangEditor>>()
const aiAbstractRef = ref<InstanceType<typeof AIArticleAbstract>>()

const articleContent = ref('')

const status = ref<0 | 1>(0) // 0: 发布的文章 1: 存的草稿

const back = () => {
  status.value = 1
  dialogVisible.value = true
  dialogContent.value = '文章未保存，是否存为草稿？'
  dialogCancelContent.value = '离开'
  clickAction.value = true
}

const saveDraft = () => {
  status.value = 1
  dialogVisible.value = true
  dialogContent.value = '存为草稿？'
  clickAction.value = true
}

const createBtn = () => {
  status.value = 0
  dialogVisible.value = true
  dialogContent.value = '确认发布？'
  clickAction.value = true
}

const cancelHandle = () => {
  dialogVisible.value = false
  if (dialogCancelContent.value === '离开') emit('back')
}

// ai
const generateAIAbstract = () => {
  articleContent.value = editorRef.value?.getText()
}

const confirmHandle = async () => {
  let cover = optionBoxRef.value!.defaultCover
  // 判断是否上传了封面，如果是，上传封面获取文件名cover
  if (optionBoxRef.value!.fd.get('file')) {
    cover = await articleStore.uploadImgAction(optionBoxRef.value!.fd)
  }

  const data: IArticleData = {
    status: status.value,
    cover: cover ?? '',
    title: editorRef.value!.titleValue,
    content: editorRef.value!.valueHtml,
    abstract: editorRef.value!.abstractValue,
    aiAbstract: aiAbstractRef.value?.textarea,
    category: optionBoxRef.value!.categoryId,
    tags: optionBoxRef.value!.tagId,
    contentImg: editorRef.value!.contentImg,
    deleteImg: editorRef.value!.deleteImg
  }

  // 当为草稿时状态变更为发布文章时，文章时间设为最新
  if (isDraft.value && status.value === 0) data.created_at = Date.now()

  let res
  if (isJumpById.value) {
    res = await articleStore.editArticleAction(jumpId.value, data)
  } else {
    res = await articleStore.createArticleAction(data)
  }

  if (res.code !== 0) return ElMessage.error('操作失败')
  status.value === 0 ? ElMessage.success('发布成功！') : ElMessage.success('保存成功！')
  dialogVisible.value = false
  emit('back')
}

const closeAutoFocus = () => {
  dialogCancelContent.value = '返回'
  dialogVisible.value = false
  clickAction.value = false
}

onBeforeUnmount(() => {
  isJumpById.value = false
})

// 当文章未保存跳转到其他路由时询问是否保存
onBeforeRouteLeave(() => {
  back()
  return false
})
</script>

<style lang="less" scoped>
.operate-article {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 14px;
      color: #4e4e4e;
      cursor: pointer;
      &:hover {
        color: var(--second-color);
      }
    }
  }
}
</style>
