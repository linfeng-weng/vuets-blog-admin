<template>
  <div class="draft-list container">
    <div class="header">
      <div class="title">草稿箱</div>
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
import Dialog from '@/components/dialog/Dialog.vue'
import { tableOption } from '../config/tableConfig'
import useDraftStore from '@/stores/modules/draft'
import useArticleStore from '@/stores/modules/article'

const emit = defineEmits(['operateArticle'])

const dialogVisible = ref(false)
const dialogContent = '确定删除？'

const draftStore = useDraftStore()
const articleStore = useArticleStore()

const { currentPage, pageSize, total, tableData } = storeToRefs(draftStore)

const getDraft = () => {
  draftStore.getDraftAction({ limit: pageSize.value, page: currentPage.value })
}

getDraft()

const pageChange = () => {
  getDraft()
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
  getDraft()
  ElMessage.success('删除成功')
  dialogVisible.value = false
}
</script>

<style lang="less" scoped>
.draft-list {
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
