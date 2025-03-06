<template>
  <h2>你好, {{ name }}</h2>
</template>

<script setup>
// 使用defineProps声明props
const props = defineProps({
  name: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
h2 {
  color: #35495e;
  margin-bottom: 10px;
}
</style> 