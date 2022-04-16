<template>
  <h1>登录</h1>
  <img
    :src="list?.login_logo"
    alt=""
  >
  <img
    :src="list?.logo_rectangle"
    alt=""
  >
  <img
    :src="list?.logo_square"
    alt=""
  >
</template>

<script setup lang="ts">
import { getLoginInfo } from '@/api/common'
import { onMounted, ref } from '@vue/runtime-core'
import { LoginInfo } from '@/api/types/common'

const list = ref<LoginInfo>()

onMounted(() => {
  getLoginInfo().then((r) => { list.value = r })
})
</script>

<style scoped>

</style>
