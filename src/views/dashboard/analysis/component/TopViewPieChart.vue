<template>
  <div class="top-view-pie-chart">
    <div class="title">
      <div>
        <span>热门文章&nbsp;</span>
        <span style="font-weight: normal; font-size: 12px">(近一年)</span>
      </div>
    </div>
    <BaseChart class="top-view-pie" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import BaseChart from '@/components/echarts/BaseChart.vue'
import type { EChartsOption } from 'echarts'
import useArticleStore from '@/stores/modules/article'

const articleStore = useArticleStore()
articleStore.getHotArticleAction()
const { hotArticleList } = storeToRefs(articleStore)

const option = computed<EChartsOption>(() => {
  return {
    tooltip: {},
    series: [
      {
        type: 'pie',
        roseType: 'area',
        itemStyle: {
          borderRadius: 4
        },
        data: hotArticleList.value,
        animationDurationUpdate: 1000
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.top-view-pie-chart {
  position: relative;
  margin-top: 20px;
  padding: 10px;
  border: var(--border);
  height: 400px;
  background-color: #fff;
  overflow: hidden;

  .title {
    // position: absolute;
    display: flex;
    align-items: center;
    font-weight: 600;
    margin: 0 20px;
    height: 40px;
  }

  .top-view-pie {
    height: 350px;
  }
}
</style>
