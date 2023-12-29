<template>
  <div class="login">
    <div class="title" v-html="title"></div>
    <div class="panel">
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="帐号" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <button class="submit" @click="login">登录</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type FormRules, type FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
import useLoginStore from '@/stores/modules/login'

const loginStore = useLoginStore()

const title = import.meta.env.VITE_NAME

const form = reactive({
  username: '',
  password: ''
})

const rules: FormRules = {
  username: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
}

const formRef = ref<FormInstance>()

const login = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((valid) => {
    if (valid) {
      const account = { username: form.username.trim(), password: form.password.trim() }
      loginStore.loginAction(account)
    }
  })
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 35px;
  width: 100%;
  height: 100%;
  background: url('@/assets/img/login-bg.svg');
  .title {
    font-size: 42px;
    font-weight: 600;
    color: #fff;
  }
  .panel {
    padding: 45px 30px;
    padding-bottom: 10px;
    width: 350px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 0 8px #8d8d8d;
    .el-form-item {
      margin-bottom: 25px;
      font-weight: 600;
    }
    .submit {
      width: 100%;
      padding: 12px;
      border: none;
      background-color: var(--second-color);
      color: #fff;
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        background-color: var(--hover-color);
      }
    }
  }
}
</style>
