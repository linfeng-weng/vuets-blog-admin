<template>
  <div class="view-bar-chart">
    <div class="date-select">
      <div class="title">访问量</div>
      <el-select style="width: 120px" v-model="yearValue" placeholder="Select">
        <el-option
          v-for="item in yearOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <BaseChart class="view-bar" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed, watch } from 'vue'
import BaseChart from '@/components/echarts/BaseChart.vue'
import type { EChartsOption } from 'echarts'
import useUserStore from '@/stores/modules/user'

const userStore = useUserStore()
userStore.getWebSiteVisitsAction()
const { yearOptions, monthsData } = storeToRefs(userStore)

const currentYear = new Date().getFullYear()
const yearValue = ref(currentYear)

watch(
  yearValue,
  () => {
    userStore.getWebSiteYearVisitsAction({ year: yearValue.value })
  },
  { immediate: true }
)

const option = computed<EChartsOption>(() => {
  return {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: monthsData.value,
        type: 'bar'
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.view-bar-chart {
  margin-top: 20px;
  padding: 10px;
  border: var(--border);
  height: 400px;
  background-color: #fff;
  overflow: hidden;

  .date-select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 20px;
    height: 40px;
    .title {
      font-weight: 600;
    }
  }

  .view-bar {
    height: 350px;
  }
}
</style>
