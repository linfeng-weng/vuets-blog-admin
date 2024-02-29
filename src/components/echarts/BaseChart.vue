<template>
  <div class="base-chart" ref="echartsRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import EventBus from '@/utils/eventBus'

interface Props {
  option: EChartsOption
}

const props = defineProps<Props>()

const echartsRef = ref<HTMLElement>()
let myChart: echarts.ECharts

const resizeEchart = () => {
  myChart.resize()
}

onMounted(() => {
  myChart = echarts.init(echartsRef.value)
  watchEffect(() => myChart.setOption(props.option))
  window.addEventListener('resize', resizeEchart)
  EventBus.on('echartsResize', () => setTimeout(resizeEchart, 300))
})

onBeforeUnmount(() => {
  if (myChart) myChart.dispose()
  window.removeEventListener('resize', resizeEchart)
})
</script>

<style lang="less" scoped>
.base-chart {
  // width: 100%;
  height: 100%;
}
</style>
