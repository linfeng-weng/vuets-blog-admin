<template>
  <div class="function-setting container animate__animated animate__fadeInRight">
    <div class="header">
      <div class="title">功能设置</div>
      <button class="yzx-primary-btn" @click="editform">编辑</button>
    </div>
    <div class="form">
      <el-form :model="form" label-width="120px" :disabled="!isedit">
        <el-form-item label="公告栏">
          <el-switch v-model="noticeOn"></el-switch>
          <el-input v-model="form.noticeContent" :disabled="!noticeOn" />
        </el-form-item>
        <el-form-item label="热门音乐">
          <div class="music">
            <el-switch v-model="musicOn"></el-switch>

            <el-radio-group v-model="form.musicId" :disabled="!musicOn">
              <template v-for="item in musicList" :key="item.name">
                <el-radio :label="item.id">{{ item.name }}</el-radio>
              </template>
            </el-radio-group>
          </div>
        </el-form-item>
      </el-form>
      <div class="operate" v-if="isedit">
        <button class="yzx-primary-btn" @click="saveInfo">保存</button>
        <button class="yzx-default-btn" @click="isedit = false">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { localCache } from '@/utils/cache'
import type { IChangeUserInfo } from '@/types'
import useUserStore from '@/stores/modules/user'

const userinfo = ref(localCache.getCache('userinfo'))

const userStore = useUserStore()

const musicList = [
  { id: 3778678, name: '热歌榜' },
  { id: 19723756, name: '飙升榜' },
  { id: 3779629, name: '新歌榜' },
  { id: 2884035, name: '原创榜' }
]

const isedit = ref(false)
const noticeOn = ref(userinfo.value.noticeOn)
const musicOn = ref(userinfo.value.musicOn)

const form = reactive({
  noticeContent: userinfo.value.noticeContent,
  musicId: userinfo.value.musicId
})

const editform = () => {
  isedit.value = !isedit.value
}

const saveInfo = async () => {
  const data: IChangeUserInfo = {
    noticeOn: noticeOn.value,
    noticeContent: form.noticeContent,
    musicOn: musicOn.value,
    musicId: form.musicId
  }

  await userStore.changeUserinfoAction(data)
  userinfo.value = localCache.getCache('userinfo')
  isedit.value = false
}
</script>

<style lang="less" scoped>
.function-setting {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 4px;
    border-bottom: var(--border);
    font-weight: 600;
  }

  .form {
    margin-top: 30px;
    width: 700px;

    .operate {
      margin-top: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .music {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
