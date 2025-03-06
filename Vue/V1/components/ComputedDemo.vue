<template>
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
</template>

<script setup>
import { ref, computed } from 'vue';

const firstName = ref('张');
const lastName = ref('三');
const price = ref(100);
const quantity = ref(2);

// 基本计算属性
const fullName = computed(() => {
  return firstName.value + lastName.value;
});

// 带有依赖的计算属性
const total = computed(() => {
  return price.value * quantity.value;
});

// 带有getter和setter的计算属性
const discountedPrice = computed({
  get() {
    return price.value * 0.9;
  },
  set(newValue) {
    price.value = newValue / 0.9;
  }
});
</script>

<style scoped>
div > div {
  margin-bottom: 10px;
}

label {
  display: inline-block;
  width: 60px;
}

input {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

p {
  margin: 5px 0;
  color: #333;
}
</style> 