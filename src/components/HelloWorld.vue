<script setup lang="tsx">
import { ref } from 'vue'
import Foo1 from './foo'

const props = defineProps<{ msg: string }>()

const count = ref(0)
const increment = () => {
  count.value++
  emit('increment')
}

interface Emit {
  (e: 'increment'): void
  (e: 'change'): void
}

const emit = defineEmits<Emit>()

const abc = <h1>abc</h1>

</script>

<template>
  <h1>Hello World</h1>
  <p>{{ count }}</p>
  <p>{{ props.msg }}</p>
  <button @click="increment">
    点击
  </button>
  <abc />
  <Foo1 msg="这是一段文本" />
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
