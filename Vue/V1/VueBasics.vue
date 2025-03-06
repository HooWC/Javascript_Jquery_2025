<!--
  Vue基础用法示例
  包含常用Vue特性、指令和组合式API
-->

<script setup>
// 这是Vue基础用法示例文件，展示了多个小型组件
import { ref, reactive, computed, watch, onMounted, provide } from 'vue';

// 导入所有子组件
import HelloWorld from './components/HelloWorld.vue';
import Counter from './components/Counter.vue';
import ConditionalRendering from './components/ConditionalRendering.vue';
import SimpleForm from './components/SimpleForm.vue';
import ListRendering from './components/ListRendering.vue';
import ComputedDemo from './components/ComputedDemo.vue';
import WatchDemo from './components/WatchDemo.vue';
import LifecycleDemo from './components/LifecycleDemo.vue';

// =============== 1. 根组件状态和方法 ===============
const message = ref('欢迎学习Vue!');
const user = reactive({
  name: '张三',
  isLoggedIn: true
});
const items = ref(['苹果', '香蕉', '橙子']);
const formData = reactive({
  username: '',
  email: ''
});

function handleClick() {
  alert('按钮被点击了!');
}

function handleFormSubmit() {
  console.log('表单提交：', formData);
}

// =============== 9. 组合式API示例 ===============

// 基本响应式状态
const count = ref(0);
const compUser = reactive({
  name: '李四',
  age: 25
});

// 计算属性
const doubleCount = computed(() => count.value * 2);

// 方法
function increment() {
  count.value++;
}

function updateUser() {
  compUser.age++;
}

// 监听器
watch(count, (newValue, oldValue) => {
  console.log(`计数从 ${oldValue} 变为 ${newValue}`);
});

// 生命周期钩子
onMounted(() => {
  console.log('组件已挂载 - 组合式API');
});

// 提供/注入系统
provide('theme', ref('light'));

// =============== 10. 自定义组合函数 ===============

// 可复用的计数器逻辑
function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  
  function increment() {
    count.value++;
  }
  
  function decrement() {
    count.value--;
  }
  
  return {
    count,
    increment,
    decrement
  };
}

// 可复用的获取数据逻辑
function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);
  
  fetch(url)
    .then(res => res.json())
    .then(json => {
      data.value = json;
      loading.value = false;
    })
    .catch(err => {
      error.value = err;
      loading.value = false;
    });
    
  return { data, error, loading };
}

// 使用自定义组合函数
const { count: counterA, increment: incrementA } = useCounter(10);
// 假设API调用
// const { data, loading, error } = useFetch('https://api.example.com/data');
</script>

<template>
  <div class="vue-basics">
    <h1>{{ message }}</h1>
    <HelloWorld :name="user.name" />
    <Counter />
    <ConditionalRendering :is-logged-in="user.isLoggedIn" :username="user.name" />
    <SimpleForm />
    <ListRendering :items="items" />
    <ComputedDemo />
    <WatchDemo />
    <LifecycleDemo />
    
    <div class="composition-api-demo">
      <h1>组合式API示例</h1>
      
      <div class="counter-section">
        <h2>响应式状态</h2>
        <p>计数: {{ count }}</p>
        <p>双倍计数: {{ doubleCount }}</p>
        <button @click="increment">增加</button>
      </div>
      
      <div class="user-section">
        <h2>响应式对象</h2>
        <p>用户名: {{ compUser.name }}</p>
        <p>年龄: {{ compUser.age }}</p>
        <button @click="updateUser">年龄+1</button>
      </div>
      
      <div class="custom-composable">
        <h2>自定义组合函数</h2>
        <p>计数器A: {{ counterA }}</p>
        <button @click="incrementA">增加</button>
      </div>
      
      <!-- 
      <div v-if="loading">加载中...</div>
      <div v-else-if="error">加载出错: {{ error.message }}</div>
      <div v-else>
        <h2>API数据</h2>
        <pre>{{ data }}</pre>
      </div>
      -->
    </div>
  </div>
</template>

<style scoped>
.vue-basics {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.composition-api-demo {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.counter-section, .user-section, .custom-composable {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

h1 {
  color: #42b883;
}

h2 {
  color: #35495e;
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

pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}
</style> 