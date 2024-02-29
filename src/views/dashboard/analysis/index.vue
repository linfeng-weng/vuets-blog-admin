<template>
  <div class="analysis">
    <StatisticalCard />
    <div class="two-column-layout animate__animated animate__fadeInRight">
      <ViewBarChart />
      <TopViewPieChart />
    </div>
    <HeatMapChart />
  </div>
</template>

<script setup lang="ts">
import StatisticalCard from './component/StatisticalCard.vue'
import HeatMapChart from './component/HeatMapChart.vue'
import ViewBarChart from './component/ViewBarChart.vue'
import TopViewPieChart from './component/TopViewPieChart.vue'
</script>

<style lang="less" scoped>
.analysis {
  .two-column-layout {
    display: flex;
    column-gap: 20px;
    animation-duration: 0.8s;

    .view-bar-chart,
    .top-view-pie-chart {
      flex: 1;
    }
  }
}
</style>
