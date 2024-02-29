<template>
  <div class="tag container animate__animated animate__fadeInRight">
    <div class="header">
      <div class="title">标签列表</div>
      <el-button type="primary" @click="createNewBtn">新建标签</el-button>
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
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="30%"
    center
    @close-auto-focus="closeAutoFocus"
  >
    <div style="text-align: center">
      <el-input v-model="name" placeholder="请输入名称" style="width: 80%" :disabled="isDisabled" />
    </div>
    <template #footer>
      <button class="yzx-default-btn" @click="handleCancel">取消</button>
      <button class="yzx-primary-btn" @click="handleConfirm">确定</button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import CommonTable from '@/components/common-table/CommonTable.vue'
import { tableOption } from './config/tableConfig'
import { ElMessage } from 'element-plus'
import useTagStore from '@/stores/modules/tag'

interface ITableRowData {
  id: string
  date: string
  name: string
  articleNum: number
}

const tagStore = useTagStore()
tagStore.getTagAction()
const { tableData, total, pageSize, currentPage } = storeToRefs(tagStore)

const dialogTitle = ref('')
const dialogVisible = ref(false)
const isDisabled = ref(false)
const name = ref('')
const cid = ref('')

const pageChange = () => {
  tagStore.getTagAction()
}

// 新建标签
const createNewBtn = () => {
  dialogTitle.value = '新建标签'
  dialogVisible.value = true
}

const createTag = async () => {
  const data = { name: name.value }
  const res = await tagStore.createTagAction(data)
  if (res.code === 0) {
    ElMessage.success('新建标签成功')
    tagStore.getTagAction()
  } else {
    ElMessage.error('新建失败')
  }
  dialogVisible.value = false
}

// 编辑标签
const handleEdit = (rowData: ITableRowData) => {
  dialogTitle.value = '编辑标签'
  dialogVisible.value = true
  name.value = rowData.name
  cid.value = rowData.id
}

const editTag = async () => {
  const data = { name: name.value }
  const id = cid.value
  const res = await tagStore.editTagAction(id, data)
  if (res.code === 0) {
    ElMessage.success('编辑标签成功')
    tagStore.getTagAction()
  } else {
    ElMessage.error('编辑失败')
  }
  dialogVisible.value = false
}

// 删除标签
const handleDelete = (rowData: any) => {
  dialogTitle.value = '删除标签'
  dialogVisible.value = true
  name.value = rowData.name
  cid.value = rowData.id
  isDisabled.value = true
}

const deleteTag = async () => {
  const id = cid.value
  const res = await tagStore.deleteTagAction(id)
  if (res.code === 0) {
    ElMessage.success('删除标签成功')
    tagStore.getTagAction()
  } else {
    ElMessage.error('删除失败')
  }
  dialogVisible.value = false
}

// 事件控制
const eventControls: any = {
  新建标签: createTag,
  编辑标签: editTag,
  删除标签: deleteTag
}

// 弹框事件
const handleCancel = () => {
  dialogVisible.value = false
}

const handleConfirm = () => {
  eventControls[dialogTitle.value]()
}

// 弹框蒙版关闭的回调
const closeAutoFocus = async () => {
  name.value = ''
  cid.value = ''
  isDisabled.value = false
}
</script>

<style lang="less" scoped>
.tag {
  // min-height: 100%;
  // animation: slideInLeft;
  // animation-duration: 0.5s;
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
