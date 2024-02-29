<template>
  <div class="heat-map-chart animate__animated animate__fadeInRight">
    <div class="date-select">
      <div class="title">热力图</div>
      <el-select style="width: 120px" v-model="yearValue" placeholder="Select">
        <el-option
          v-for="item in yearOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <BaseChart class="heat-map" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed, watch } from 'vue'
import BaseChart from '@/components/echarts/BaseChart.vue'
import type { EChartsOption } from 'echarts'
import useUserStore from '@/stores/modules/user'
import useArticleStore from '@/stores/modules/article'

const userStore = useUserStore()
const articleStore = useArticleStore()
userStore.getWebSiteVisitsAction()
const { yearOptions } = storeToRefs(userStore)
const { heatMapYearData } = storeToRefs(articleStore)

const currentYear = new Date().getFullYear()
const yearValue = ref(currentYear)

watch(
  yearValue,
  () => {
    articleStore.getArticleAction({ year: yearValue.value }, '热力图')
  },
  { immediate: true }
)

// color: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196027']
const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      position: 'top',
      formatter: function (params: any) {
        return `${params.value[0]} 发布 : ${params.value[1]}(篇)`
      }
    },
    calendar: [
      {
        left: 'center',
        top: 'center',
        range: yearValue.value,
        cellSize: 22,
        splitLine: { show: false },
        itemStyle: {
          color: '#ededed',
          borderColor: '#fff',
          borderWidth: 4
        },
        monthLabel: { nameMap: 'ZH', fontSize: 14 },
        dayLabel: { nameMap: 'ZH', fontSize: 14 },
        yearLabel: { show: false }
      }
    ],
    visualMap: { show: false },
    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 0,
        data: heatMapYearData.value
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.heat-map-chart {
  margin-top: 20px;
  padding: 10px;
  border: var(--border);
  width: 100%;
  height: 300px;
  background-color: #fff;
  overflow: hidden;
  animation-duration: 1s;

  .date-select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 20px;
    height: 50px;
    .title {
      font-weight: 600;
    }
  }
  .heat-map {
    height: 250px;
  }
}
</style>
