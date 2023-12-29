<template>
  <div class="analysis animate__animated animate__fadeInRight">
    <StatisticalCard />
    <div style="height: 300px">
      <BaseChart :option="option"></BaseChart>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatisticalCard from './component/StatisticalCard.vue'
import BaseChart from '@/components/echarts/BaseChart.vue'
import type { EChartsOption } from 'echarts'

const option: EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}
</script>

<style lang="less" scoped>
.analysis {
  color: #000;
}
</style>
