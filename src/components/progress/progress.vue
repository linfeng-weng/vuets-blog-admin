<template>
  <div class="progress" @mousemove="dragProgress" @mouseup="endDrag" @click="clickProcess">
    <div class="line" ref="lineRef">
      <div class="fill" :style="{ width: `${progress}%` }"></div>
      <div class="spot" @mousedown="startDrag" :style="{ left: `${progress}%` }"></div>
    </div>
    <div class="num">{{ chooseValue }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  intervalArr: number[]
  interval: number
  defaultValue: number
}

const props = defineProps<Props>()

const minNum = props.intervalArr[0]
const maxNum = props.intervalArr[1]
const totalValues = maxNum - minNum

const lineRef = ref<HTMLElement>()
const isDragging = ref(false)
const progress = ref(((props.defaultValue - minNum) / totalValues) * 100)
const chooseValue = ref(props.defaultValue ?? props.intervalArr[0])

const startDrag = () => {
  isDragging.value = true
}

const dragProgress = (event: MouseEvent) => {
  if (isDragging.value) {
    updateProgress(event)
  }
}

const endDrag = () => {
  isDragging.value = false
}

const clickProcess = (event: MouseEvent) => {
  if (!isDragging.value) {
    updateProgress(event)
  }
}

const updateProgress = (event: MouseEvent) => {
  const lineWidth = lineRef.value!.clientWidth
  const clickX = event.clientX - lineRef.value!.getBoundingClientRect().left

  const valuePerPixel = totalValues / lineWidth
  let clickedValue = Math.round((valuePerPixel * clickX) / props.interval) * props.interval + minNum

  progress.value = ((clickedValue - minNum) / totalValues) * 100

  if (clickedValue <= minNum) {
    clickedValue = minNum
    progress.value = 0
  }
  if (clickedValue >= maxNum) {
    clickedValue = maxNum
    progress.value = 100
  }

  chooseValue.value = clickedValue
}

defineExpose({ chooseValue })
</script>

<style lang="less" scoped>
.progress {
  display: flex;
  align-items: center;
  column-gap: 16px;
  cursor: pointer;
  padding: 0 10px;
  height: 20px;

  .line {
    position: relative;
    width: 200px;
    height: 5px;
    border-radius: 5px;
    background-color: #e8e9eb;

    .fill {
      height: 5px;
      border-radius: 5px 0 0 5px;
      background-color: var(--second-color);
    }
    .spot {
      position: absolute;
      top: -3px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #fff;
      border: 1px solid var(--second-color);

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
