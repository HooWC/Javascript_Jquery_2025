<template>
  <div>
    <h2>{{ message }}</h2>
    <p>计数器：{{ counter }}</p>
    <button @click="counter++">手动增加</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue';

const message = ref('生命周期示例');
const counter = ref(0);
let timer = null;

console.log('setup - 组件实例被创建');

onMounted(() => {
  console.log('mounted - 组件已挂载到DOM');
  // DOM操作通常在这里进行
  timer = setInterval(() => {
    counter.value++;
  }, 1000);
});

onUpdated(() => {
  console.log('updated - DOM已更新');
});

onUnmounted(() => {
  console.log('unmounted - 组件已卸载');
  // 清理工作
  clearInterval(timer);
});
</script>

<style scoped>
div {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
</style> 