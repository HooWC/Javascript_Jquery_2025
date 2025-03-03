/**
 * JavaScript中级设计模式和高级概念
 * 包含各种常用模式和技巧
 */

// ---------------- 1. 模块模式 ----------------

console.log("=== 模块模式示例 ===");
const counterModule = (function () {
    // 私有变量
    let count = 0;

    // 返回公共API
    return {
        increment() {
            return ++count;
        },
        decrement() {
            return --count;
        },
        getCount() {
            return count;
        },
        reset() {
            count = 0;
            return count;
        }
    };
})();

console.log(`当前计数: ${counterModule.getCount()}`);
console.log(`递增后: ${counterModule.increment()}`);
console.log(`递增后: ${counterModule.increment()}`);
console.log(`重置后: ${counterModule.reset()}`);

// ---------------- 2. 工厂模式 ----------------

console.log("\n=== 工厂模式示例 ===");
function createUser(type) {
    const userTypes = {
        admin() {
            return {
                type: 'admin',
                permissions: ['read', 'write', 'delete', 'manage'],
                describe() {
                    return `管理员 - 拥有权限: ${this.permissions.join(', ')}`;
                }
            };
        },
        editor() {
            return {
                type: 'editor',
                permissions: ['read', 'write', 'delete'],
                describe() {
                    return `编辑员 - 拥有权限: ${this.permissions.join(', ')}`;
                }
            };
        },
        viewer() {
            return {
                type: 'viewer',
                permissions: ['read'],
                describe() {
                    return `访客 - 拥有权限: ${this.permissions.join(', ')}`;
                }
            };
        }
    };

    if (!userTypes[type]) {
        throw new Error(`未知用户类型: ${type}`);
    }

    return userTypes[type]();
}

const admin = createUser('admin');
const editor = createUser('editor');
const viewer = createUser('viewer');

console.log(admin.describe());
console.log(editor.describe());
console.log(viewer.describe());

// ---------------- 3. 观察者模式 ----------------

console.log("\n=== 观察者模式示例 ===");
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
        return this; // 链式调用
    }

    emit(eventName, ...args) {
        const eventCallbacks = this.events[eventName];
        if (eventCallbacks) {
            eventCallbacks.forEach(callback => {
                callback.apply(this, args);
            });
        }
        return this; // 链式调用
    }

    off(eventName, callback) {
        if (this.events[eventName]) {
            if (callback) {
                this.events[eventName] = this.events[eventName].filter(
                    cb => cb !== callback
                );
            } else {
                delete this.events[eventName];
            }
        }
        return this; // 链式调用
    }
}

// 使用观察者模式
const emitter = new EventEmitter();

function dataChangeHandler(data) {
    console.log(`数据已更改: ${JSON.stringify(data)}`);
}

function logHandler(data) {
    console.log(`日志: 操作由${data.user}执行，时间: ${new Date().toLocaleString()}`);
}

emitter.on('dataChange', dataChangeHandler);
emitter.on('dataChange', logHandler);

// 触发事件
emitter.emit('dataChange', { user: '张三', action: '更新数据' });

// 移除特定处理程序
emitter.off('dataChange', logHandler);
console.log("\n移除日志处理程序后:");
emitter.emit('dataChange', { user: '李四', action: '删除数据' });

// ---------------- 4. 柯里化 ----------------

console.log("\n=== 柯里化示例 ===");
// 普通函数
function multiply(a, b, c) {
    return a * b * c;
}

// 柯里化版本
function curriedMultiply(a) {
    return function (b) {
        return function (c) {
            return a * b * c;
        };
    };
}

// 使用箭头函数简化
const arrowCurriedMultiply = a => b => c => a * b * c;

console.log(`普通调用: multiply(2, 3, 4) = ${multiply(2, 3, 4)}`);
console.log(`柯里化调用: curriedMultiply(2)(3)(4) = ${curriedMultiply(2)(3)(4)}`);
console.log(`箭头函数柯里化: arrowCurriedMultiply(2)(3)(4) = ${arrowCurriedMultiply(2)(3)(4)}`);

// 实用柯里化示例 - 格式化加前缀
const addPrefix = prefix => string => `${prefix}${string}`;
const addHttps = addPrefix('https://');
const addWww = addPrefix('www.');

console.log(addHttps('example.com')); // https://example.com
console.log(addWww('example.com'));   // www.example.com

// ---------------- 5. 节流和防抖 ----------------

console.log("\n=== 节流和防抖示例 ===");

// 防抖函数
function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
        const context = this;

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle = false;

    return function (...args) {
        const context = this;

        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// 模拟使用场景
function expensiveOperation(id) {
    console.log(`执行昂贵操作，ID: ${id}, 时间: ${new Date().toLocaleTimeString()}`);
}

const debouncedOperation = debounce(expensiveOperation, 1000);
const throttledOperation = throttle(expensiveOperation, 1000);

console.log("防抖函数调用:");
console.log("这些调用会合并为一个，只有最后一个会执行");
// 在实际使用中，这些调用会在不同时间点触发
debouncedOperation(1); // 会被取消
debouncedOperation(2); // 会被取消
debouncedOperation(3); // 只有这个会执行

console.log("\n节流函数调用:");
console.log("第一个调用会立即执行，其余在冷却时间内的调用将被忽略");
// 在实际使用中，这些调用会在不同时间点触发
throttledOperation(1); // 立即执行
throttledOperation(2); // 被忽略
throttledOperation(3); // 被忽略

// ---------------- 6. Proxy 和 Reflect ----------------

console.log("\n=== Proxy 和 Reflect 示例 ===");
const user = {
    firstName: '张',
    lastName: '三',
    age: 30
};

const userProxy = new Proxy(user, {
    get(target, property, receiver) {
        console.log(`访问属性: ${property}`);
        if (property === 'fullName') {
            return `${target.firstName}${target.lastName}`;
        }
        return Reflect.get(target, property, receiver);
    },

    set(target, property, value, receiver) {
        if (property === 'age') {
            if (typeof value !== 'number') {
                throw new TypeError('年龄必须是数字');
            }
            if (value < 0 || value > 150) {
                throw new RangeError('年龄必须在0到150之间');
            }
        }
        console.log(`设置属性 ${property} = ${value}`);
        return Reflect.set(target, property, value, receiver);
    }
});

// 使用proxy
console.log(`姓: ${userProxy.firstName}`);
console.log(`名: ${userProxy.lastName}`);
console.log(`全名: ${userProxy.fullName}`);

try {
    userProxy.age = 35;
    console.log(`新年龄: ${userProxy.age}`);
    userProxy.age = '不是数字';
} catch (error) {
    console.error(`错误: ${error.message}`);
}

// ---------------- 7. 生成器函数 ----------------

console.log("\n=== 生成器函数示例 ===");
function* countGenerator() {
    let count = 1;
    while (true) {
        const reset = yield count++;
        if (reset) {
            count = 1;
        }
    }
}

const counter2 = countGenerator();
console.log(counter2.next().value); // 1
console.log(counter2.next().value); // 2
console.log(counter2.next().value); // 3
console.log(counter2.next(true).value); // 重置后返回1
console.log(counter2.next().value); // 2

// ID生成器示例
function* createIdGenerator(prefix = 'ID-') {
    let index = 1;
    while (true) {
        yield `${prefix}${index++}`;
    }
}

const idGenerator = createIdGenerator('USER-');
console.log(idGenerator.next().value); // USER-1
console.log(idGenerator.next().value); // USER-2
console.log(idGenerator.next().value); // USER-3

// ---------------- 8. WeakMap 和 WeakSet ----------------

console.log("\n=== WeakMap 和 WeakSet 示例 ===");
// 使用WeakMap存储对象的私有数据
const privateData = new WeakMap();

class Person {
    constructor(name, age) {
        privateData.set(this, { name, age });
    }

    getName() {
        return privateData.get(this).name;
    }

    getAge() {
        return privateData.get(this).age;
    }

    setName(name) {
        const data = privateData.get(this);
        data.name = name;
        privateData.set(this, data);
    }
}

const person1 = new Person('李四', 25);
console.log(`姓名: ${person1.getName()}`);
console.log(`年龄: ${person1.getAge()}`);
person1.setName('李小四');
console.log(`新姓名: ${person1.getName()}`);

// WeakSet用于存储不重复的对象引用
const visitedObjects = new WeakSet();

function processObject(obj) {
    if (visitedObjects.has(obj)) {
        console.log('此对象已被处理过');
        return;
    }

    console.log('处理对象:', obj);
    visitedObjects.add(obj);
}

const obj1 = { id: 1, name: '对象1' };
const obj2 = { id: 2, name: '对象2' };

processObject(obj1);
processObject(obj2);
processObject(obj1); // 已被处理过 