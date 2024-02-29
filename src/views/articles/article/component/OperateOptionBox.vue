<template>
  <div class="option-box">
    <div class="upload">
      <input type="file" id="file-upload" accept="image/*" @change="handleFileUpload" />
      <label for="file-upload" class="upload-label">
        <span>+</span>
        <span>上传封面</span>
        <img :src="previewImage" id="preview-image" v-if="previewImage" />
      </label>
    </div>
    <div class="category">
      <p>选择分类：</p>
      <el-select v-model="categoryName" @change="categoryChange" clearable placeholder="Select">
        <el-option v-for="item in categoryItems" :key="item.name" :value="item.name" />
      </el-select>
    </div>
    <div class="tags">
      <p>选择标签：</p>
      <el-select
        v-model="tagName"
        @change="tagChange"
        multiple
        placeholder="Select"
        style="width: 240px"
      >
        <el-option v-for="item in tagItems" :key="item.name" :value="item.name" />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { compressImage } from '@/utils/compressImage'
import useCategoryStore from '@/stores/modules/category'
import useTagStore from '@/stores/modules/tag'
import useArticleStore from '@/stores/modules/article'

const categoryStore = useCategoryStore()
const tagStore = useTagStore()
const articleStore = useArticleStore()

categoryStore.getCategoryAction()
tagStore.getTagAction()

const { tableDataAll: categoryItems } = storeToRefs(categoryStore)
const { tableDataAll: tagItems } = storeToRefs(tagStore)
const { isJumpById, articleEditData } = storeToRefs(articleStore)

// 分类 标签
const categoryName = ref('')
const categoryId = ref('0'.repeat(24))
const tagName = ref<string[]>([])
const tagId = ref<string[]>([])
// 封面图片
const previewImage = ref('')
const defaultCover = ref('')

onMounted(() => {
  if (isJumpById.value) {
    categoryId.value = articleEditData.value.category?._id
    tagId.value = articleEditData.value.tags!.map((item: any) => item._id)
    categoryName.value = articleEditData.value.category?.name ?? ''
    if (articleEditData.value.tags!.length > 0) {
      tagName.value = articleEditData.value.tags!.map((item: any) => item.name)
    }
    if (articleEditData.value.cover) {
      previewImage.value = import.meta.env.VITE_SERVER_URL + articleEditData.value.cover
      defaultCover.value = articleEditData.value.cover
    }
  }
})

const categoryChange = (selectValue: string) => {
  if (!selectValue) return (categoryId.value = '0'.repeat(24)) //如果没有选择category，则用24位的0代表后端objectID
  categoryId.value = categoryItems.value.find((item) => item.name === selectValue).id
}

const tagChange = (selectValue: string[]) => {
  if (!selectValue.length) return (tagId.value = [])
  tagId.value = selectValue.map((name) => {
    const matchingObject = tagItems.value.find((item) => item.name === name)
    return matchingObject ? matchingObject.id : null
  })
}

const fd = new FormData()
const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input || !input.files || !input.files[0]) return
  const file = input.files[0]
  const compressFile = await compressImage(file)
  fd.append('file', compressFile)
  previewImage.value = URL.createObjectURL(compressFile)
}

defineExpose({ fd, categoryId, tagId, defaultCover })
</script>

<style lang="less" scoped>
.option-box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 30px 0;
  .upload {
    position: relative;
    width: 250px;
    height: 170px;
    background-color: #fafafa;
    border: 1px dashed #e5e6eb;

    #file-upload {
      visibility: hidden;
    }
    .upload-label {
      width: 250px;
      height: 170px;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      span {
        &:first-child {
          font-size: 48px;
          font-weight: 100;
          color: #d6d6d6;
        }

        &:last-child {
          color: #747474;
        }
      }

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 250px;
        height: 170px;
        object-fit: cover;
        object-position: center;
      }
    }
  }
  .category,
  .tags {
    display: flex;
    align-items: center;
  }
}
</style>
