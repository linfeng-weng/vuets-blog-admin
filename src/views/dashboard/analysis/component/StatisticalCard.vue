<template>
  <div class="statistical-card animate__animated animate__fadeInRight">
    <template v-for="item in cardDataList" :key="item.label">
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
import visitIcon from '@/assets/img/visit.png'
import countNumber from '@/utils/count'
import { getArticleApi, getCategoryApi, getTagApi, getWebSiteVisitsApi } from '@/service'

const cardList = [
  {
    type: 'article',
    icon: articleIcon,
    label: '文章总数',
    num: 0
  },
  {
    type: 'category',
    icon: categoryIcon,
    label: '分类数量',
    num: 0
  },
  {
    type: 'tag',
    icon: tagIcon,
    label: '标签数量',
    num: 0
  },
  {
    type: 'visit',
    icon: visitIcon,
    label: '访问总数',
    num: 0
  }
]

const cardDataList = ref(cardList)

const fetchCardData = async () => {
  const res_A = await getArticleApi({ status: 1 })
  const res_C = await getCategoryApi()
  const res_T = await getTagApi()
  const res_W = await getWebSiteVisitsApi({})
  const obj: any = {
    article: res_A.total,
    category: res_C.total,
    tag: res_T.total,
    visit: res_W.total
  }
  cardDataList.value.forEach((item) => {
    if (item.type in obj) item.num = obj[item.type]
  })
}

const numRef = ref()
onMounted(async () => {
  await fetchCardData()
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
  animation-duration: 0.6s;
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
