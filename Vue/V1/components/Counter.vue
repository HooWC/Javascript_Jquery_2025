<template>
  <div class="counter">
    <h2>计数器: {{ count }}</h2>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);

function increment() {
  count.value++;
}

function decrement() {
  count.value--;
}
</script>

<style scoped>
.counter {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #33a06f;
}
</style> 