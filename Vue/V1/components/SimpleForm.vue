<template>
  <div class="form-container">
    <h2>表单示例</h2>
    <form @submit="handleSubmit">
      <div>
        <label for="username">用户名：</label>
        <input id="username" v-model="username" type="text" required />
      </div>
      
      <div>
        <label for="email">邮箱：</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      
      <div>
        <label for="preference">偏好：</label>
        <select id="preference" v-model="preference">
          <option value="">-- 请选择 --</option>
          <option value="vue">Vue</option>
          <option value="react">React</option>
          <option value="angular">Angular</option>
        </select>
      </div>
      
      <div>
        <input id="terms" v-model="acceptTerms" type="checkbox" required />
        <label for="terms">我同意服务条款</label>
      </div>
      
      <button type="submit">提交</button>
    </form>
    
    <div v-if="submitted">
      <h3>提交的数据：</h3>
      <p>用户名：{{ username }}</p>
      <p>邮箱：{{ email }}</p>
      <p>偏好：{{ preference }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const email = ref('');
const preference = ref('');
const acceptTerms = ref(false);
const submitted = ref(false);

function handleSubmit(e) {
  e.preventDefault();
  submitted.value = true;
  console.log('表单数据：', {
    username: username.value,
    email: email.value,
    preference: preference.value,
    acceptTerms: acceptTerms.value
  });
}
</script>

<style scoped>
.form-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

form div {
  margin-bottom: 15px;
}

label {
  display: inline-block;
  width: 80px;
  margin-right: 10px;
}

input[type="text"],
input[type="email"],
select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 250px;
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