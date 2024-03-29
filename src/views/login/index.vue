<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :rules="rules"
      ref="form"
      :model="user"
      size="default"
      @submit.prevent="handleSubmit"
    >
      <div class="login-form__header">
        <img
          class="login-logo"
          src="../../assets/login_logo.png"
          alt="拉勾心选"
        >
      </div>
      <el-form-item prop="account">
        <el-input
          v-model="user.account"
          placeholder="请输入用户名"
        >
          <template #prefix>
            <i class="el-input__icon el-icon-user" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input
          v-model="user.pwd"
          type="password"
          placeholder="请输入密码"
        >
          <template #prefix>
            <i class="el-input__icon el-icon-lock" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="imgcode">
        <div class="imgcode-wrap">
          <el-input
            v-model="user.imgcode"
            placeholder="请输入验证码"
          >
            <template #prefix>
              <i class="el-input__icon el-icon-key" />
            </template>
          </el-input>
          <img
            v-if="captchaSrc"
            @click="loadCaptcha"
            class="imgcode"
            alt="验证码"
            :src="captchaSrc"
          >
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          class="submit-button"
          type="primary"
          :loading="loading"
          native-type="submit"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { getCaptch, login } from '@/api/common'
import type { IElForm, IFormItem } from '@/types/element-plus'
import store from '@/store'

const form = ref<IElForm>()
const router = useRouter()
const route = useRoute()

const captchaSrc = ref('')
const user = reactive({
  account: 'zce',
  pwd: 'wanglei',
  imgcode: ''
})
const loading = ref(false)
const rules = ref<IFormItem>({
  account: [
    { required: true, message: '请输入账号', trigger: 'change' }
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'change' }
  ],
  imgcode: [
    { required: true, message: '请输入验证码', trigger: 'change' }
  ]
})

onMounted(() => {
  loadCaptcha()
})

const loadCaptcha = async () => {
  const data = await getCaptch()
  captchaSrc.value = URL.createObjectURL(data)
}

const handleSubmit = async () => {
  // 表单验证
  const valid = await form.value?.validate()
  if (!valid) return false
  // 验证通过，展示 loading
  loading.value = true
  // 请求提交
  const data = await login(user).finally(() => {
    loading.value = false
  })
  store.commit('setUser', {
    ...data.user_info,
    token: data.token
  })
  store.commit('setMenus', data.menus)
  const redirect = route.query.redirect || '/admin'
  router.replace(redirect as string)
  // 处理响应
}

</script>

<style lang="scss" scoped>
.login-container {
  min-width: 400px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
}

.login-form {
  padding: 30px;
  border-radius: 6px;
  background: #fff;
  min-width: 350px;
  .login-form__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
  }

  .el-form-item:last-child {
    margin-bottom: 0;
  }

  .login__form-title {
    display: flex;
    justify-content: center;
    color: #fff;
  }

  .submit-button {
    width: 100%;
  }

  .login-logo {
    width: 271px;
    height: 74px;
  }
  .imgcode-wrap {
    display: flex;
    align-items: center;
    .imgcode {
      height: 37px;
    }
  }
}
</style>
