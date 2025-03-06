<template>
  <div>
    <h2>侦听器示例</h2>
    
    <div>
      <p>提示：输入包含问号的问题</p>
      <input v-model="question" placeholder="请输入问题" />
      <p>回答：{{ answer }}</p>
    </div>
    
    <div>
      <input v-model="searchQuery" placeholder="搜索" />
      <ul v-if="searchResults.length">
        <li v-for="(result, index) in searchResults" :key="index">
          {{ result }}
        </li>
      </ul>
      <p v-else>无搜索结果</p>
    </div>
    
    <div>
      <input v-model="user.name" placeholder="更改用户名" />
      <input v-model="user.address.city" placeholder="更改城市" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';

const question = ref('');
const answer = ref('请输入问题');
const searchQuery = ref('');
const searchResults = ref([]);
const user = reactive({
  name: '张三',
  address: {
    city: '北京'
  }
});

// 基本侦听器
watch(question, (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    answer.value = '思考中...';
    setTimeout(() => {
      answer.value = '这是一个很好的问题！';
    }, 500);
  }
});

// 深度侦听
watch(() => user, (newValue) => {
  console.log('用户信息变更：', newValue);
}, { deep: true });

// 即时侦听
watch(searchQuery, (newValue) => {
  if (newValue) {
    console.log('搜索：', newValue);
    // 模拟API调用
    searchResults.value = [
      `关于 "${newValue}" 的结果1`,
      `关于 "${newValue}" 的结果2`
    ];
  } else {
    searchResults.value = [];
  }
}, { immediate: true });
</script>

<style scoped>
div > div {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

input {
  padding: 8px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  padding: 5px;
  border-bottom: 1px solid #eee;
}
</style> 