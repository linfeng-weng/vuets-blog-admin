<template>
  <div class="main-header">
    <div class="menu-icon" @click="menuIconClick">
      <el-icon size="20px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <HeaderCrumb />
      <HeaderInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './HeaderInfo.vue'
import HeaderCrumb from './HeaderCrumb.vue'
import EventBus from '@/utils/eventBus'

const emit = defineEmits(['foldChange'])

const isFold = ref(false)
const menuIconClick = () => {
  EventBus.emit('echartsResize')
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  height: 100%;
  background-color: #fff;
  padding: 0 20px;
  border-bottom: var(--border);
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }
}
</style>
