<template>
  <div>
    <div v-if="isLoggedIn">
      <h3>欢迎回来，{{ username }}!</h3>
      <button>退出登录</button>
    </div>
    <div v-else>
      <h3>请登录</h3>
      <button>登录</button>
    </div>
    
    <!-- v-show示例 -->
    <p v-show="isLoggedIn">这段内容只在登录时显示（使用v-show）</p>
  </div>
</template>

<script setup>
// 使用defineProps声明props
defineProps({
  isLoggedIn: Boolean,
  username: String
});
</script>

<style scoped>
h3 {
  margin-bottom: 10px;
}

button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
}
</style> 