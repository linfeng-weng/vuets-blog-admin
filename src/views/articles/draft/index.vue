<template>
  <div class="draft animate__animated animate__fadeInRight">
    <DraftList v-if="!isOperateArticle" @operate-article="operateArticleHandle" />
    <OperateArticle v-if="isOperateArticle" @back="isOperateArticle = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DraftList from './component/DraftList.vue'
import OperateArticle from '@/views/articles/article/component/OperateArticle.vue'

const isOperateArticle = ref(false)

const operateArticleHandle = () => {
  isOperateArticle.value = true
}
</script>

<style lang="less" scoped></style>
