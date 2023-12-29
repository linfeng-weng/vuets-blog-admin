<template>
  <div class="header-info">
    <el-dropdown>
      <span class="user-info">
        <el-avatar :size="30" :src="avatar" />
        <span class="name">欲知新</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">
            <el-icon><SwitchButton /></el-icon>
            <span>退出系统</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-icon><InfoFilled /></el-icon>
            <span>个人信息</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import avatar from '@/assets/img/avatar.jpg'
import router from '@/router'
import { localCache } from '@/utils/cache'
import { ElMessage } from 'element-plus'

const logout = () => {
  localCache.clear()
  router.push('/login')
  ElMessage.success('退出成功')
}
</script>

<style lang="less" scoped>
.header-info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      font-size: 14px;
      margin-left: 10px;
    }
  }
  :deep(.el-tooltip__trigger:focus-visible) {
    outline: none;
  }
}

:global(.el-dropdown-menu__item) {
  // line-height: 36px !important;
  background-color: #fff !important;
  // padding: 6px 22px;
}
</style>
