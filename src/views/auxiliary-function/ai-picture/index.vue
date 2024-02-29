<template>
  <div class="ai-picture container animate__animated animate__fadeInRight">
    <div class="header">AI生图</div>
    <div class="content">
      <div class="form">
        <el-form label-width="120">
          <el-form-item required label="提示词">
            <el-input
              type="textarea"
              :rows="2"
              v-model="form.input"
              style="width: 60%"
              placeholder="请输入提示词，内部自动优化"
            />
          </el-form-item>
          <el-form-item label="风格">
            <el-select v-model="form.styleValue">
              <el-option
                v-for="item in styleOption"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="图片分辨率">
            <el-radio v-model="form.size" label="1024x768" disabled>1024x768</el-radio>
          </el-form-item>
          <el-form-item label="提示词相关性">
            <el-select v-model="form.correlation">
              <el-option
                v-for="item in correlationOption"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="采样步数">
            <Progress :intervalArr="[10, 50]" :interval="1" :defaultValue="20" ref="progressRef" />
          </el-form-item>
          <el-form-item label="采样方式">
            <el-radio v-model="form.sampler" label="Euler" disabled>Euler</el-radio>
          </el-form-item>
          <el-form-item label="随机种子">
            <el-input
              v-model="form.seed"
              type="number"
              placeholder="自动设置为随机数"
              style="width: 40%"
              @blur="seedBlur"
            />
          </el-form-item>
        </el-form>
        <div class="operate">
          <button
            class="yzx-primary-btn"
            :class="{ 'is-disabled': isLoading }"
            @click="generateImg"
          >
            生成图片
          </button>
        </div>
      </div>
      <div class="image-area">
        <div class="image" v-loading="isLoading">
          <img src="@/assets/img/default_cover.webp" alt="" ref="imgRef" />
        </div>
        <div class="save" v-if="loadingDone">
          <button class="yzx-default-btn" @click="saveImg">保存到本地</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { IAiImage } from '@/types'
import { GenerateImageApi } from '@/service/modules/ai'
import { ElMessage } from 'element-plus'
import Progress from '@/components/progress/progress.vue'

interface IForm {
  input: string
  styleValue: string
  size: string
  correlation: number
  sampler: string
  steps: number
  seed: number | any
}

const progressRef = ref<InstanceType<typeof Progress>>()

const styleOption = [
  { label: '基础风格', value: 'Base' },
  { label: '3D模型', value: '3D Model' },
  { label: '模拟胶片', value: 'Analog Film' },
  { label: '动漫', value: 'Anime' },
  { label: '电影', value: 'Cinematic' },
  { label: '漫画', value: 'Comic Book' },
  { label: '工艺黏土', value: 'Craft Clay' },
  { label: '数字艺术', value: 'Digital Art' },
  { label: '增强', value: 'Enhance' },
  { label: '幻想艺术', value: 'Fantasy Art' },
  { label: '等距风格', value: 'Isometric' }, // 注意：这里应该是"Isometric"，而不是"lsometric"
  { label: '线条艺术', value: 'Line Art' },
  { label: '低多边形', value: 'Lowpoly' },
  { label: '霓虹朋克', value: 'Neonpunk' },
  { label: '折纸', value: 'Origami' },
  { label: '摄影', value: 'Photographic' },
  { label: '像素艺术', value: 'Pixel Art' },
  { label: '纹理', value: 'Texture' }
]

const correlationOption = [
  { label: '自由 (5)', value: 5 },
  { label: '普通 (7.5)', value: 7.5 },
  { label: '严格 (12.5)', value: 12.5 }
]

const form = reactive<IForm>({
  input: '',
  styleValue: 'Base',
  size: '1024x768',
  correlation: 5,
  sampler: 'Euler',
  steps: progressRef.value?.chooseValue ?? 20,
  seed: ''
})

const seedBlur = () => {
  if (form.seed < 0 || form.seed > 4294967295) form.seed = 0
}

const isLoading = ref(false)
const loadingDone = ref(false)
const imgRef = ref()
const imgBase64 = ref('')

const generateImg = async () => {
  if (form.input.trim() === '') return ElMessage.error('提示词不能为空')
  if (form.seed === '') form.seed = Math.floor(Math.random() * 4294967296)
  loadingDone.value = false
  isLoading.value = true
  const data: IAiImage = {
    input: form.input.trim(),
    size: form.size,
    style: form.styleValue,
    cfg_scale: form.correlation,
    steps: form.steps,
    seed: Number(form.seed)
  }
  const res = await GenerateImageApi(data)
  if (res.code === 1) {
    ElMessage.error('生成失败，请调整提示词重试！')
    isLoading.value = false
    return
  }
  isLoading.value = false
  loadingDone.value = true
  imgBase64.value = res.result.data[0].b64_image
  imgRef.value.src = `data:image/jpeg;base64,${imgBase64.value}`
}

const saveImg = () => {
  const link = document.createElement('a')
  link.download = `AI_image${new Date().getTime()}.jpg`
  link.href = `data:image/jpeg;base64,${imgBase64.value}`
  link.click()
}
</script>

<style lang="less" scoped>
.ai-picture {
  .header {
    font-weight: 600;
  }
  .content {
    display: flex;
    align-items: center;
    margin-top: 30px;
    .form {
      width: 50%;
      .operate {
        padding: 20px 70px;
        text-align: center;
        .yzx-primary-btn {
          width: 100%;
          height: 30px;
        }
      }
    }
    .image-area {
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      // justify-content: center;
      align-items: center;
      width: 50%;
      .image {
        width: 512px;
        height: 384px;
        // border: 1px solid #000;

        img {
          width: 512px;
          height: 384px;
        }
      }
    }
  }
}
</style>
