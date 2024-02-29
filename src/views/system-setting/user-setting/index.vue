<template>
  <div class="user-setting container animate__animated animate__fadeInRight">
    <div class="header">
      <div class="title">个人信息</div>
      <button class="yzx-primary-btn" @click="editform">编辑</button>
    </div>
    <div class="form">
      <el-form :model="form" label-width="120px" :disabled="!isedit">
        <el-form-item label="头像">
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            @change="handleFileUpload"
            :disabled="!isedit"
          />
          <label for="file-upload"><img class="avatar" :src="form.avatar" /></label>
        </el-form-item>
        <el-form-item label="账号">
          <el-input disabled v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <button
            class="yzx-default-btn"
            :class="{ 'is-disabled': !isedit }"
            @click="editPwd"
            type="button"
            :disabled="!isedit"
          >
            修改密码
          </button>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="座右铭" prop="motto">
          <el-input v-model="form.motto"></el-input>
        </el-form-item>
        <el-form-item label="博客链接" prop="blogLink">
          <el-input v-model="form.blogLink"></el-input>
        </el-form-item>
        <el-form-item label="GitHub" prop="github">
          <el-input v-model="form.github"></el-input>
        </el-form-item>
      </el-form>
      <div class="operate" v-if="isedit">
        <button class="yzx-primary-btn" @click="saveUserInfo">保存</button>
        <button class="yzx-default-btn" @click="isedit = false">取消</button>
      </div>
    </div>
  </div>
  <Dialog
    :dialogVisible="dialogVisible"
    dialogTitle="修改密码"
    dialogConfirmContent="提交"
    @closeAutoFocus="dialogVisible = false"
    @cancelHandle="dialogVisible = false"
    @confirmHandle="confirmHandle"
  >
    <template #content>
      <div class="pwd">
        <span>原密码</span><el-input v-model="originalPassword" show-password></el-input>
      </div>
      <div class="pwd">
        <span>新密码</span><el-input v-model="newPassword" show-password></el-input>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { localCache } from '@/utils/cache'
import defaultAvatar from '@/assets/img/avatar.jpg'
import type { IChangeUserInfo } from '@/types'
import router from '@/router'
import Dialog from '@/components/dialog/Dialog.vue'
import useUserStore from '@/stores/modules/user'
import EventBus from '@/utils/eventBus'
import { compressImage } from '@/utils/compressImage'

const userStore = useUserStore()

const isedit = ref(false)
const dialogVisible = ref(false)

const editform = () => {
  isedit.value = !isedit.value
}

const userinfo = ref(localCache.getCache('userinfo'))

const avatarURL = userinfo.value.avatar
  ? import.meta.env.VITE_SERVER_URL + userinfo.value.avatar
  : defaultAvatar

const form = reactive({
  avatar: avatarURL,
  username: userinfo.value.username,
  nickname: userinfo.value.nickname,
  blogLink: userinfo.value.blogLink,
  motto: userinfo.value.motto,
  github: userinfo.value.github
})

const fd = new FormData()
const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input || !input.files || !input.files[0]) return
  const file = input.files[0]
  const compressFile = await compressImage(file)
  fd.append('file', compressFile)
  form.avatar = URL.createObjectURL(compressFile)
}

const originalPassword = ref('')
const newPassword = ref('')

const editPwd = () => {
  dialogVisible.value = true
}

const confirmHandle = async () => {
  const data = {
    originalPassword: originalPassword.value,
    newPassword: newPassword.value
  }
  const res = await userStore.changePasswordAction(data)
  if (res.code !== 0) return ElMessage.error('原密码错误！')
  dialogVisible.value = false
  ElMessage.success('密码修改成功，请重新登录！')
  localCache.clear()
  router.push('login')
}

const saveUserInfo = async () => {
  let cover
  if (fd.get('file')) {
    cover = await userStore.uploadImgAction(fd)
    fd.delete('file')
    form.avatar = import.meta.env.VITE_SERVER_URL + cover
  } else {
    cover = userinfo.value.avatar
  }
  const data: IChangeUserInfo = {
    avatar: cover,
    username: form.username,
    nickname: form.nickname,
    motto: form.motto,
    blogLink: form.blogLink,
    github: form.github
  }
  await userStore.changeUserinfoAction(data)
  userinfo.value = localCache.getCache('userinfo')
  EventBus.emit('refreshUserinfo')
  isedit.value = false
}
</script>

<style lang="less" scoped>
.user-setting {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 4px;
    font-weight: 600;
    border-bottom: var(--border);
  }
  .form {
    margin-top: 30px;
    width: 400px;

    .operate {
      margin-top: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #file-upload {
      visibility: hidden;
    }

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }

  :deep(.el-form-item__label) {
    padding-right: 30px;
  }
}

.pwd {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;

  span {
    width: 50px;
  }

  .el-input {
    width: 200px;
  }

  &:first-child {
    margin-bottom: 20px;
  }
}
</style>
