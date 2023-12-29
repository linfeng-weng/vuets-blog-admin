<template>
  <div class="article-list animate__animated animate__fadeInRight">
    <div class="header">
      <div class="title">文章列表</div>
      <el-button type="primary" @click="dialogVisible = true">新建文章</el-button>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <!-- 弹框组件 -->
  <el-dialog v-model="dialogVisible" title="新建文章" width="30%" center>
    <div style="text-align: center">
      <el-input v-model="name" placeholder="请输入名称" style="width: 80%"></el-input>
    </div>
    <template #footer>
      <button class="cancel yzx-default-btn" @click="handleCancel">取消</button>
      <button class="confirm yzx-primary-btn" @click="handleConfirm">确定</button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CommonTable from '@/components/common-table/CommonTable.vue'
import { tableData, tableOption } from './config/tableConfig'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)
const name = ref('')

const handleCancel = () => {
  name.value = ''
  dialogVisible.value = false
}

const handleConfirm = () => {
  ElMessage.success('新建文章成功')
  name.value = ''
  dialogVisible.value = false
}

const handleEdit = () => {
  console.log('edit')
}
const handleDelete = () => {
  console.log('delete')
}

const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(100)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style lang="less" scoped>
.article-list {
  padding: 20px;
  background-color: #fff;
  border: var(--border);
  border-radius: var(--border-radius);
  min-height: 100%;
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
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

.cancel,
.confirm {
  font-size: 16px;
  margin: 0 10px;
  padding: 5px 15px;
}
</style>
