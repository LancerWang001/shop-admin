<template>
  <h1>首页</h1>
  <p>{{ store.state.count }}</p>
  <p>{{ $store.state.count }}</p>
</template>

<script setup lang="ts">
import { useStore } from '../../store'

const store = useStore()
</script>

<style scoped>

</style>
