<template>
  <div class="header-info">
    <el-dropdown>
      <span class="user-info">
        <el-avatar :size="30" :src="avatar" />
        <span class="name">{{ nickname ?? '欲知新' }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">
            <el-icon><SwitchButton /></el-icon>
            <span>退出系统</span>
          </el-dropdown-item>
          <el-dropdown-item @click="jump" divided>
            <el-icon><Promotion /></el-icon>
            <span>博客主页</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import defaultAvatar from '@/assets/img/avatar.jpg'
import router from '@/router'
import { localCache } from '@/utils/cache'
import { ElMessage } from 'element-plus'
import EventBus from '@/utils/eventBus'

const userinfo = localCache.getCache('userinfo')

const severUrl = import.meta.env.VITE_SERVER_URL
const avatarURL = userinfo.avatar ? severUrl + userinfo.avatar : defaultAvatar

const nickname = ref(userinfo.nickname)
const avatar = ref(avatarURL)
const blogLink = ref(userinfo.blogLink)

EventBus.on('refreshUserinfo', () => {
  const userinfo = localCache.getCache('userinfo')
  nickname.value = userinfo.nickname
  avatar.value = severUrl + userinfo.avatar
  blogLink.value = userinfo.blogLink
})

const logout = () => {
  localCache.clear()
  router.push('/login')
  ElMessage.success('退出成功')
}

const jump = () => {
  window.open(blogLink.value, '_blank')
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
