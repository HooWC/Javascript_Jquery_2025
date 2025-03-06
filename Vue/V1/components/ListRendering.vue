<template>
  <div>
    <h2>简单列表</h2>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ index + 1 }}. {{ item }}
      </li>
    </ul>
    
    <h2>用户列表</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
          <td><button @click="removeUser(user.id)">删除</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 接收外部传入的items列表
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});

// 用户列表
const users = ref([
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
  { id: 3, name: '王五', age: 22 }
]);

function removeUser(id) {
  users.value = users.value.filter(user => user.id !== id);
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #c0392b;
}
</style> 