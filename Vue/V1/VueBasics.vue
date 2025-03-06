<!--
  Vue基础用法示例
  包含常用Vue特性、指令和组合式API
-->

<script>
// 这是一个Vue基础用法示例文件，展示了多个小型组件和功能
// 注意：在实际应用中，这些组件通常会分散在不同文件中
import { h, ref, reactive, computed, watch, onMounted, onUpdated, 
         onUnmounted, provide, inject, defineComponent } from 'vue';

// =============== 1. 选项式API组件 ===============

// 基本Vue组件
export default {
  name: 'VueBasics',
  components: {
    HelloWorld,
    Counter,
    ConditionalRendering,
    SimpleForm,
    ListRendering,
    ComputedDemo,
    WatchDemo,
    LifecycleDemo
  },
  data() {
    return {
      message: '欢迎学习Vue!',
      user: {
        name: '张三',
        isLoggedIn: true
      },
      items: ['苹果', '香蕉', '橙子'],
      formData: {
        username: '',
        email: ''
      }
    };
  },
  methods: {
    handleClick() {
      alert('按钮被点击了!');
    },
    handleFormSubmit() {
      console.log('表单提交：', this.formData);
    }
  },
  template: `
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
    </div>
  `
};

// 基本组件
export const HelloWorld = {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  template: `<h2>你好, {{ name }}</h2>`
};

// =============== 2. 状态管理和事件 ===============

// 计数器组件
export const Counter = {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    }
  },
  template: `
    <div class="counter">
      <h2>计数器: {{ count }}</h2>
      <button @click="increment">增加</button>
      <button @click="decrement">减少</button>
    </div>
  `
};

// =============== 3. 条件渲染 ===============

export const ConditionalRendering = {
  props: {
    isLoggedIn: Boolean,
    username: String
  },
  template: `
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
  `
};

// =============== 4. 表单处理 ===============

export const SimpleForm = {
  data() {
    return {
      username: '',
      email: '',
      preference: '',
      acceptTerms: false,
      submitted: false
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.submitted = true;
      console.log('表单数据：', {
        username: this.username,
        email: this.email,
        preference: this.preference,
        acceptTerms: this.acceptTerms
      });
    }
  },
  template: `
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
  `
};

// =============== 5. 列表渲染 ===============

export const ListRendering = {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      users: [
        { id: 1, name: '张三', age: 25 },
        { id: 2, name: '李四', age: 30 },
        { id: 3, name: '王五', age: 22 }
      ]
    };
  },
  methods: {
    removeUser(id) {
      this.users = this.users.filter(user => user.id !== id);
    }
  },
  template: `
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
  `
};

// =============== 6. 计算属性 ===============

export const ComputedDemo = {
  data() {
    return {
      firstName: '张',
      lastName: '三',
      price: 100,
      quantity: 2
    };
  },
  computed: {
    // 基本计算属性
    fullName() {
      return this.firstName + this.lastName;
    },
    // 带有依赖的计算属性
    total() {
      return this.price * this.quantity;
    },
    // 带有getter和setter的计算属性
    discountedPrice: {
      get() {
        return this.price * 0.9;
      },
      set(newValue) {
        this.price = newValue / 0.9;
      }
    }
  },
  template: `
    <div>
      <h2>计算属性示例</h2>
      <div>
        <label>姓：</label>
        <input v-model="firstName" />
      </div>
      <div>
        <label>名：</label>
        <input v-model="lastName" />
      </div>
      <p>全名：{{ fullName }}</p>
      
      <div>
        <label>单价：</label>
        <input type="number" v-model.number="price" />
      </div>
      <div>
        <label>数量：</label>
        <input type="number" v-model.number="quantity" />
      </div>
      <p>总价：{{ total }}</p>
      <p>折扣价：{{ discountedPrice }}</p>
    </div>
  `
};

// =============== 7. 侦听器 ===============

export const WatchDemo = {
  data() {
    return {
      question: '',
      answer: '请输入问题',
      searchQuery: '',
      searchResults: [],
      user: {
        name: '张三',
        address: {
          city: '北京'
        }
      }
    };
  },
  watch: {
    // 基本侦听器
    question(newQuestion, oldQuestion) {
      if (newQuestion.includes('?')) {
        this.answer = '思考中...';
        setTimeout(() => {
          this.answer = '这是一个很好的问题！';
        }, 500);
      }
    },
    // 深度侦听
    user: {
      handler(newValue) {
        console.log('用户信息变更：', newValue);
      },
      deep: true
    },
    // 即时侦听
    searchQuery: {
      handler(newValue) {
        if (newValue) {
          console.log('搜索：', newValue);
          // 模拟API调用
          this.searchResults = [
            `关于 "${newValue}" 的结果1`,
            `关于 "${newValue}" 的结果2`
          ];
        } else {
          this.searchResults = [];
        }
      },
      immediate: true
    }
  },
  template: `
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
  `
};

// =============== 8. 生命周期钩子 ===============

export const LifecycleDemo = {
  data() {
    return {
      message: '生命周期示例',
      counter: 0
    };
  },
  beforeCreate() {
    console.log('beforeCreate - 组件实例被创建前');
  },
  created() {
    console.log('created - 组件实例已创建');
    // 通常在这里进行API调用
  },
  beforeMount() {
    console.log('beforeMount - 组件挂载前');
  },
  mounted() {
    console.log('mounted - 组件已挂载到DOM');
    // DOM操作通常在这里进行
    this.timer = setInterval(() => {
      this.counter++;
    }, 1000);
  },
  beforeUpdate() {
    console.log('beforeUpdate - 数据更新，DOM更新前');
  },
  updated() {
    console.log('updated - DOM已更新');
  },
  beforeUnmount() {
    console.log('beforeUnmount - 组件卸载前');
    // 清理工作
    clearInterval(this.timer);
  },
  unmounted() {
    console.log('unmounted - 组件已卸载');
  },
  template: `
    <div>
      <h2>{{ message }}</h2>
      <p>计数器：{{ counter }}</p>
      <button @click="counter++">手动增加</button>
    </div>
  `
};
</script>

<script setup>
// =============== 9. 组合式API示例 ===============

import { ref, reactive, computed, watch, onMounted, 
         onUnmounted, provide, inject } from 'vue';

// 基本响应式状态
const count = ref(0);
const user = reactive({
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
  user.age++;
}

// 监听器
watch(count, (newValue, oldValue) => {
  console.log(`计数从 ${oldValue} 变为 ${newValue}`);
});

// 生命周期钩子
onMounted(() => {
  console.log('组件已挂载 - 组合式API');
});

onUnmounted(() => {
  console.log('组件已卸载 - 组合式API');
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
      <p>用户名: {{ user.name }}</p>
      <p>年龄: {{ user.age }}</p>
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
</template>

<style scoped>
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