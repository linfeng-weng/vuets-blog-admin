<template>
  <el-table :data="tableData" height="450px" stripe style="width: 100%" border>
    <template v-for="item in tableOption.tableHead" :key="item.label">
      <el-table-column
        :type="item.type"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align ?? tableOption.align"
      >
        <!-- 操作按钮组件 -->
        <template v-if="item.editDeleteBtn">
          <button class="yzx-primary-btn" @click="editClick">编辑</button>
          <button class="yzx-danger-btn" @click="deleteClick">删除</button>
        </template>
        <!-- 自定义插槽 -->
        <template v-if="item.slot" v-slot:default="scope">
          <slot :name="item.prop" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts">
defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  tableOption: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['editClick', 'deleteClick'])

const editClick = () => {
  emit('editClick')
}
const deleteClick = () => {
  emit('deleteClick')
}
</script>

<style lang="less" scoped></style>
