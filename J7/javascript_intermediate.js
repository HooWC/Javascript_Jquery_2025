/**
 * JavaScript中级用法示例
 * 包含各种数组方法、循环、字符串操作以及其他中级概念
 */

// ---------------- 1. 高级数组方法 ----------------

// forEach - 遍历数组的每个元素
console.log("=== forEach 示例 ===");
const fruits = ["苹果", "香蕉", "橙子", "葡萄"];
fruits.forEach((item, index, array) => {
    console.log(`索引 ${index}: ${item}`);
});

// map - 转换数组中的每个元素
console.log("\n=== map 示例 ===");
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log("原始数组:", numbers);
console.log("加倍后:", doubled);

// filter - 过滤数组元素
console.log("\n=== filter 示例 ===");
const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = allNumbers.filter(num => num % 2 === 0);
console.log("所有数字:", allNumbers);
console.log("偶数:", evenNumbers);

// reduce - 将数组减少为单个值
console.log("\n=== reduce 示例 ===");
const prices = [29.76, 41.85, 46.5];
const total = prices.reduce((sum, price) => sum + price, 0);
console.log("价格:", prices);
console.log("总计:", total.toFixed(2));

// some 和 every - 测试数组元素
console.log("\n=== some 和 every 示例 ===");
const ages = [16, 18, 21, 25, 30];
const hasAdult = ages.some(age => age >= 18);
const allAdults = ages.every(age => age >= 18);
console.log("是否有成年人?", hasAdult);
console.log("是否全是成年人?", allAdults);

// find 和 findIndex - 查找元素
console.log("\n=== find 和 findIndex 示例 ===");
const users = [
    { id: 1, name: "张三", age: 22 },
    { id: 2, name: "李四", age: 17 },
    { id: 3, name: "王五", age: 25 }
];
const adult = users.find(user => user.age >= 18);
const adultIndex = users.findIndex(user => user.age >= 18);
console.log("第一个成年人:", adult);
console.log("第一个成年人的索引:", adultIndex);

// ---------------- 2. 高级循环用法 ----------------

// for...of 循环 (用于可迭代对象)
console.log("\n=== for...of 示例 ===");
const colors = ["红", "绿", "蓝"];
for (const color of colors) {
    console.log(color);
}

// for...in 循环 (用于对象属性)
console.log("\n=== for...in 示例 ===");
const person = { name: "张三", age: 30, city: "北京" };
for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}

// while 和 do...while 循环
console.log("\n=== while 和 do...while 示例 ===");
let count = 0;
while (count < 3) {
    console.log(`while 计数: ${count}`);
    count++;
}

let doCount = 0;
do {
    console.log(`do-while 计数: ${doCount}`);
    doCount++;
} while (doCount < 3);

// 使用 break 和 continue
console.log("\n=== break 和 continue 示例 ===");
for (let i = 0; i < 10; i++) {
    if (i === 3) continue; // 跳过3
    if (i === 7) break;    // 在7时停止
    console.log(`当前数字: ${i}`);
}

// ---------------- 3. 字符串操作 ----------------

// split 和 join
console.log("\n=== split 和 join 示例 ===");
const sentence = "JavaScript是一种强大的编程语言";
const words = sentence.split("是");
console.log("拆分后:", words);
const recombined = words.join("-是-");
console.log("重组后:", recombined);

// 模板字符串和多行字符串
console.log("\n=== 模板字符串示例 ===");
const name = "Alice";
const greeting = `你好，${name}!
欢迎学习JavaScript。
这是一个多行字符串示例。`;
console.log(greeting);

// 字符串方法
console.log("\n=== 字符串方法示例 ===");
const text = "   JavaScript编程很有趣   ";
console.log(`原始文本: "${text}"`);
console.log(`trim(): "${text.trim()}"`);
console.log(`toUpperCase(): "${text.toUpperCase()}"`);
console.log(`toLowerCase(): "${text.toLowerCase()}"`);
console.log(`replace(): "${text.replace("有趣", "强大")}"`);
console.log(`slice(3, 8): "${text.slice(3, 8)}"`);
console.log(`indexOf("编程"): ${text.indexOf("编程")}`);
console.log(`startsWith("Java"): ${text.trim().startsWith("Java")}`);
console.log(`endsWith("趣"): ${text.trim().endsWith("趣")}`);

// ---------------- 4. 解构赋值 ----------------

console.log("\n=== 解构赋值示例 ===");
// 数组解构
const coordinates = [10, 20, 30];
const [x, y, z] = coordinates;
console.log(`x: ${x}, y: ${y}, z: ${z}`);

// 对象解构
const student = { id: 101, studentName: "李明", scores: { math: 95, english: 89 } };
const { studentName, scores: { math, english } } = student;
console.log(`学生: ${studentName}, 数学: ${math}, 英语: ${english}`);

// 函数参数解构
function displayPerson({ name, age }) {
    console.log(`姓名: ${name}, 年龄: ${age}`);
}
displayPerson({ name: "王小明", age: 25 });

// ---------------- 5. 展开运算符 ----------------

console.log("\n=== 展开运算符示例 ===");
// 数组展开
const firstArray = [1, 2, 3];
const secondArray = [4, 5, 6];
const combined = [...firstArray, ...secondArray];
console.log("合并数组:", combined);

// 对象展开
const defaultSettings = { theme: "默认", fontSize: 12 };
const userSettings = { fontSize: 16, showNotifications: true };
const mergedSettings = { ...defaultSettings, ...userSettings };
console.log("合并设置:", mergedSettings);

// ---------------- 6. 闭包 ----------------

console.log("\n=== 闭包示例 ===");
function createCounter() {
    let count = 0;

    return {
        increment: () => {
            count++;
            return count;
        },
        decrement: () => {
            count--;
            return count;
        },
        getCount: () => count
    };
}

const counter = createCounter();
console.log(`计数: ${counter.getCount()}`);
console.log(`递增: ${counter.increment()}`);
console.log(`递增: ${counter.increment()}`);
console.log(`递减: ${counter.decrement()}`);
console.log(`计数: ${counter.getCount()}`);

// ---------------- 7. Promise 和异步操作 ----------------

console.log("\n=== Promise 示例 ===");
function simulateAPICall(success = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve({ status: 200, data: "操作成功" });
            } else {
                reject({ status: 500, error: "服务器错误" });
            }
        }, 1000);
    });
}

// 使用Promise
console.log("开始调用API...");
simulateAPICall()
    .then(response => console.log("成功:", response))
    .catch(error => console.error("失败:", error))
    .finally(() => console.log("API调用结束"));

// async/await (异步代码像同步代码一样)
async function fetchData() {
    try {
        console.log("使用async/await调用API...");
        const response = await simulateAPICall();
        console.log("成功:", response);
    } catch (error) {
        console.error("失败:", error);
    } finally {
        console.log("async/await API调用结束");
    }
}

// 注释fetchData的调用，因为它会干扰示例中的其他同步代码
// fetchData();

// ---------------- 8. 类和继承 ----------------

console.log("\n=== 类和继承示例 ===");
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        return `${this.name}发出了声音`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    speak() {
        return `${this.name} (${this.breed})汪汪叫`;
    }
}

const animal = new Animal("动物");
const dog = new Dog("小黑", "拉布拉多");

console.log(animal.speak());
console.log(dog.speak()); 