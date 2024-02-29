<template>
  <div class="article animate__animated animate__fadeInRight" id="article">
    <ArticleList v-if="!isOperateArticle" @operate-article="operateArticleHandle" />
    <OperateArticle v-if="isOperateArticle" @back="isOperateArticle = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArticleList from './component/ArticleList.vue'
import OperateArticle from './component/OperateArticle.vue'

const isOperateArticle = ref(false)

const operateArticleHandle = () => {
  isOperateArticle.value = true
}
</script>

<style lang="less" scoped>
.article {
  display: flex;
  flex-direction: column;
}
</style>
