<template>
  <div class="article-list container">
    <div class="header">
      <div class="title">文章列表</div>
      <div>
        <el-input
          v-model="titleSearch"
          style="width: 250px; margin-right: 10px"
          placeholder="文章标题"
        />
        <button class="yzx-default-btn btn-large" @click="reset">重置</button>
        <button class="yzx-primary-btn btn-large" @click="query">查询</button>
        <button class="yzx-primary-btn btn-large" @click="$emit('operateArticle')">新建文章</button>
      </div>
    </div>
    <div class="table">
      <CommonTable
        :tableData="tableData"
        :tableOption="tableOption"
        @deleteClick="handleDelete"
        @editClick="handleEdit"
      />
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @change="pageChange"
      />
    </div>
  </div>
  <!-- 弹框组件 -->
  <Dialog
    :dialogVisible="dialogVisible"
    :dialogContent="dialogContent"
    @closeAutoFocus="dialogVisible = false"
    @cancelHandle="dialogVisible = false"
    @confirmHandle="confirmHandle"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import CommonTable from '@/components/common-table/CommonTable.vue'
import { tableOption } from '../config/tableConfig'
import useArticleStore from '@/stores/modules/article'

const emit = defineEmits(['operateArticle'])

const dialogVisible = ref(false)
const dialogContent = '确定删除？'
const isSearch = ref(false)
const titleSearch = ref('')

const articleStore = useArticleStore()
const { currentPage, pageSize, total, tableData } = storeToRefs(articleStore)

const getArticle = () => {
  const params = { limit: pageSize.value, page: currentPage.value }
  if (!isSearch.value) {
    articleStore.getArticleAction(params)
  } else {
    articleStore.searchArticleAction(titleSearch.value.trim(), params)
    titleSearch.value = ''
  }
}

getArticle()

const reset = () => {
  isSearch.value = false
  pageSize.value = 10
  currentPage.value = 1
  getArticle()
}

const query = () => {
  isSearch.value = true
  pageSize.value = 10
  currentPage.value = 1
  getArticle()
}

const pageChange = () => {
  getArticle()
}

const handleEdit = async (rowData: any) => {
  await articleStore.getArticleByIdAction(rowData.id)
  emit('operateArticle')
}

const deleteID = ref('')
const handleDelete = (rowData: any) => {
  dialogVisible.value = true
  deleteID.value = rowData.id
}

const confirmHandle = async () => {
  const res = await articleStore.deleteArticleAction(deleteID.value)
  if (res.code !== 0) return ElMessage.error('删除失败')
  getArticle()
  ElMessage.success('删除成功')
  dialogVisible.value = false
}
</script>

<style lang="less" scoped>
.article-list {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-weight: 600;
    }
  }
  .table {
    margin-top: 20px;
  }
  .pagination {
    margin: 30px 0 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
