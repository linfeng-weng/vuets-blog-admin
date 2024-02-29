<template>
  <div class="main-menu">
    <div class="logo">
      <img src="@/assets/img/boy.png" />
      <div v-html="title" v-show="!isFold"></div>
    </div>
    <div class="menu">
      <el-menu
        :collapse="isFold"
        background-color="#1A1E21"
        text-color="#fff"
        active-text-color="#fd8f44"
        :default-active="defaultActive"
        router
      >
        <template v-for="item in menuList" :key="item.type">
          <el-sub-menu :index="item.url">
            <template #title>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.type">
              <el-menu-item :index="subitem.url">
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { menuList } from '@/config/menu'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()

const title = import.meta.env.VITE_NAME

const defaultActive = computed(() => {
  return route.path
})
</script>

<style lang="less" scoped>
.main-menu {
  color: #fff;
  .logo {
    display: flex;
    // align-items: center;
    align-items: flex-end;
    padding: 0 20px;
    column-gap: 5px;
    height: 40px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    img {
      width: 20px;
    }
  }
  .el-menu {
    border-right: none;
    user-select: none;
  }
}
</style>
