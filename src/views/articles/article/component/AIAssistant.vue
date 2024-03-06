<template>
  <div class="ai-assistant">
    <div class="function">
      <template v-for="(item, index) in functionConfig" :key="item.name">
        <span :class="{ active: index === currentIndex }" @click="functionClick(index, item.type)">
          {{ item.name }}
        </span>
        <div class="description" :class="{ active: index === currentIndex }">
          {{ item.description }}
        </div>
      </template>
    </div>
    <div class="content" v-html="AIContent" v-loading="isloading"></div>
    <div class="footer">
      <button class="yzx-primary-btn" @click="generate">生成</button>
    </div>
    <div class="statement">以上内容为 AI 生成，仅供参考</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GenerateArticleMessageApi } from '@/service'

type DataType = 'TextPolishing' | 'TitleGeneration' | 'ArticleOutline'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  }
})

const functionConfig = [
  {
    name: '文本润色',
    description: '对文章进行修改和改进，使其更加精炼、准确、易读并符合语言规范',
    type: 'TextPolishing'
  },
  {
    name: '标题生成',
    description: '根据文章的内容自动生成合适的标题',
    type: 'TitleGeneration'
  },
  {
    name: '文章大纲',
    description: '根据文章的标题和内容，生成文章的逻辑结构和提纲',
    type: 'ArticleOutline'
  }
]

const isloading = ref(false)
const currentIndex = ref(0)
const typeChoose = ref(functionConfig[0].type)
const AIContent = ref('')

const functionClick = (index: number, type: string) => {
  currentIndex.value = index
  typeChoose.value = type
}

const getData = (type: DataType) => {
  const dataObj = {
    TextPolishing: props.content,
    TitleGeneration: props.content,
    ArticleOutline: { title: props.title, content: props.content }
  }
  return dataObj[type]
}

const generate = async () => {
  isloading.value = true
  const input = getData(typeChoose.value as DataType)
  const res = await GenerateArticleMessageApi(input, typeChoose.value)
  isloading.value = false
  AIContent.value = contentProcess(res.result)
}

const contentProcess = (text: string) => {
  return text.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;')
}
</script>

<style lang="less" scoped>
.ai-assistant {
  .function {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-wrap: wrap;
    column-gap: 20px;
    color: #fff;

    span {
      padding: 8px 10px;
      border-radius: 5px;
      background-color: #ffbd91;
      cursor: pointer;

      &.active {
        background-color: #fd8f44;
      }
    }
    .description {
      position: absolute;
      bottom: -20px;
      color: #767676;
      font-size: 12px;
      display: none;
      &.active {
        display: block;
      }
    }
  }
  .content {
    padding: 10px;
    margin: 30px 50px 0;
    border: 1px solid #eee;
    height: 300px;
    overflow-y: auto;
    line-height: 20px;
    letter-spacing: 0.3px;
    text-align: justify;
  }
  .footer {
    margin-top: 20px;
    text-align: center;
  }
  .statement {
    margin-top: 10px;
    text-align: center;
    font-size: 10px;
    color: #9c9ebc;
  }
}
</style>
