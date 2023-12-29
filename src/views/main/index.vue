<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isFold ? '60px' : '200px'">
        <MainMenu :isFold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader @fold-change="foldChange" />
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainMenu from './component/MainMenu.vue'
import MainHeader from './component/MainHeader.vue'

const isFold = ref(false)
const foldChange = (flag: boolean) => {
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  background-color: #f5f5f5;
  .main-container {
    height: 100%;
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      text-align: left;
      cursor: pointer;
      background-color: var(--container-color);
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */
      transition: width 0.3s ease;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .el-header {
      padding: 0;
    }
  }
}
</style>
