<template>
  <el-table :data="tableData" height="450px" stripe style="width: 100%" border>
    <template v-for="item in tableOption.tableHead" :key="item.label">
      <el-table-column
        :type="item.type"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align ?? tableOption.align"
        :showOverflowTooltip="item.showOverflowTooltip"
      >
        <!-- 操作按钮组件 -->
        <template v-if="item.editDeleteBtn" v-slot:default="scope">
          <button class="yzx-primary-btn" @click="editClick(scope.row)">编辑</button>
          <button class="yzx-danger-btn" @click="deleteClick(scope.row)">删除</button>
        </template>
        <!-- 自定义插槽 -->
        <template v-else-if="item.slot" v-slot:default="scope">
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

const editClick = (id: string) => {
  emit('editClick', id)
}
const deleteClick = (id: string) => {
  emit('deleteClick', id)
}
</script>

<style lang="less" scoped>
.yzx-primary-btn {
  margin: 0 5px;
  padding: 5px 10px;
  font-size: 12px;
}
.yzx-danger-btn {
  margin: 0 5px;
  padding: 5px 10px;
  font-size: 12px;
}
</style>
