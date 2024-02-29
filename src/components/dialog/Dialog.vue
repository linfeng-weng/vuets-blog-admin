<template>
  <el-dialog
    v-model="visible"
    :title="dialogTitle"
    :width="width"
    :center="center"
    append-to-body
    @close-auto-focus="closeAutoFocus"
  >
    <slot name="content">
      <span>{{ dialogContent }}</span>
    </slot>
    <template #footer v-if="showFooter">
      <slot name="footer">
        <span>
          <button class="yzx-default-btn" @click="cancelHandle">{{ dialogCancelContent }}</button>
          <button class="yzx-primary-btn" @click="confirmHandle">{{ dialogConfirmContent }}</button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'

const props = defineProps({
  width: {
    type: String,
    default: '30%'
  },
  center: {
    type: Boolean,
    default: false
  },
  dialogVisible: {
    type: Boolean,
    default: false
  },
  dialogTitle: {
    type: String,
    default: '提示'
  },
  dialogContent: {
    type: String,
    default: '[弹框内容]'
  },
  dialogCancelContent: {
    type: String,
    default: '取消'
  },
  dialogConfirmContent: {
    type: String,
    default: '确定'
  },
  showFooter: {
    type: Boolean,
    default: true
  }
})

const visible = ref(false)

watch(
  () => props.dialogVisible,
  (newValue) => {
    visible.value = newValue
  }
)

const emit = defineEmits(['closeAutoFocus', 'cancelHandle', 'confirmHandle'])

const closeAutoFocus = () => {
  emit('closeAutoFocus')
}

const cancelHandle = () => {
  emit('cancelHandle')
}

const confirmHandle = () => {
  emit('confirmHandle')
}
</script>

<style lang="less" scoped></style>
