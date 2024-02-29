<template>
  <div class="ai-article-abstract">
    <div class="robot mt-4"><img :src="isloading ? robotGif : robotImg" /></div>
    <div style="width: 600px">
      <el-input
        v-model="textarea"
        autosize
        type="textarea"
        placeholder="AI-文章摘要"
        :disabled="!inputAbled"
      />
    </div>
    <div>
      <button class="yzx-primary-btn mt-4" v-if="showGenerate" @click="generateHandle">生成</button>
      <button class="yzx-primary-btn mt-4" v-if="showSave" @click="saveHandle">保存</button>
      <button class="yzx-primary-btn mt-4" v-if="showBtn && !showSave" @click="editHandle">
        编辑
      </button>
      <button class="yzx-default-btn mt-4" v-if="showBtn" @click="regenerateHandle">
        重新生成
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import robotImg from '@/assets/img/AI.png'
import robotGif from '@/assets/img/AI-lighting.gif'
import { GenerateAbstractApi } from '@/service'
import useArticleStore from '@/stores/modules/article'

const articleStore = useArticleStore()
const { isJumpById, articleEditData } = storeToRefs(articleStore)

const emit = defineEmits(['generateAbstract'])

const props = defineProps({
  articleContent: {
    type: String,
    default: ''
  }
})
const textarea = ref('')
const isloading = ref(false)
const showGenerate = ref(true)
const showBtn = ref(false)
const showSave = ref(false)
const inputAbled = ref(false)

onMounted(() => {
  if (isJumpById.value) {
    textarea.value = articleEditData.value.aiAbstract ?? ''
    showGenerate.value = textarea.value === '' ? true : false
    showBtn.value = !showGenerate.value
  }
})

const typeWord = (abstractTxt: string) => {
  const data = abstractTxt.split('')
  let index = 0
  const writing = () => {
    if (index < data.length) {
      textarea.value += data[index++]
      setTimeout(writing, 30)
    } else {
      isloading.value = false
      showBtn.value = true
    }
  }
  writing()
}

const fetchToGenerate = () => {
  isloading.value = true
  Promise.resolve(emit('generateAbstract')).then(async () => {
    const res = await GenerateAbstractApi(props.articleContent)
    typeWord(res.result)
  })
}

const generateHandle = () => {
  showGenerate.value = false
  fetchToGenerate()
}

const editHandle = () => {
  inputAbled.value = true
  showSave.value = true
  showBtn.value = false
}

const saveHandle = () => {
  inputAbled.value = false
  showSave.value = false
  showBtn.value = true
}

const regenerateHandle = () => {
  textarea.value = ''
  showBtn.value = false
  fetchToGenerate()
}

defineExpose({ textarea })
</script>

<style lang="less" scoped>
.mt-4 {
  margin-top: 4px;
}
.ai-article-abstract {
  display: flex;
  align-items: start;
  column-gap: 10px;
  margin: 30px 0;
  .robot {
    width: 30px;
    height: 30px;
  }
}
</style>
