<template>
  <div class="header-crumb">
    <el-breadcrumb>
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { menuList } from '@/config/menu'
import { computed } from 'vue'

interface IBreadcrumbs {
  name: string
  path: string
}

const route = useRoute()

const mapPathToBreadcrumbs = (path: string, menuList: any[]) => {
  const breadcrumbs: IBreadcrumbs[] = []
  menuList.forEach((menu) => {
    menu.children.forEach((subMenu: any) => {
      if (subMenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: subMenu.name, path: subMenu.url })
      }
    })
  })
  return breadcrumbs
}

const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, menuList)
})
</script>

<style lang="less" scoped>
.header-crumb {
  margin-left: 10px;
}
</style>
