<template>
  <div class="statistical-card">
    <template v-for="item in cardList" :key="item.label">
      <div class="card">
        <div class="icon"><img :src="item.icon" /></div>
        <div class="right">
          <div class="num" ref="numRef">{{ item.num }}</div>
          <div class="label">{{ item.label }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import articleIcon from '@/assets/img/article.png'
import categoryIcon from '@/assets/img/category.png'
import tagIcon from '@/assets/img/tag.png'
import viewIcon from '@/assets/img/view.png'
import countNumber from '@/utils/count'
const cardList = [
  {
    icon: articleIcon,
    label: '文章总数',
    num: 221
  },
  {
    icon: categoryIcon,
    label: '分类数量',
    num: 121
  },
  {
    icon: tagIcon,
    label: '标签数量',
    num: 21
  },
  {
    icon: viewIcon,
    label: '浏览数量',
    num: 61
  }
]

const numRef = ref()
onMounted(() => {
  console.log(numRef.value)
  Array.from(numRef.value).forEach((el) => {
    const element = el as HTMLElement
    countNumber(element)
  })
})
</script>

<style lang="less" scoped>
.statistical-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 20px;
  width: 100%;
  height: 120px;
  .card {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    height: 100%;
    padding: 20px 35px;
    border: var(--border);
    border-radius: var(--border-radius);
    .icon {
      img {
        width: 45px;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      .label {
        color: #4e4e4e;
      }
      .num {
        font-size: 32px;
        color: var(--text-color);
      }
    }
  }
}
</style>
