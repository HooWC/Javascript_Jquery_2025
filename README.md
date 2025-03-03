# JavaScript中级编程示例

本目录包含JavaScript中级编程示例和技巧，适合已经掌握JavaScript基础知识的开发者进一步学习。

## 文件说明

### 1. `javascript_intermediate.js`

这个文件包含以下JavaScript中级用法示例：

- **高级数组方法**：forEach, map, filter, reduce, some, every, find, findIndex
- **高级循环用法**：for...of, for...in, while, do...while, break/continue
- **字符串操作**：split, join, 模板字符串, 各种字符串方法
- **解构赋值**：数组解构, 对象解构, 函数参数解构
- **展开运算符**：用于数组和对象
- **闭包**：创建私有变量和方法
- **Promise和异步操作**：基本Promise用法, async/await
- **类和继承**：ES6 class语法, 继承

### 2. `javascript_advanced_patterns.js`

这个文件展示了JavaScript中的各种设计模式和高级概念：

- **模块模式**：创建私有作用域和公共API
- **工厂模式**：动态创建对象的方法
- **观察者模式**：实现事件系统
- **柯里化**：函数式编程技巧
- **节流和防抖**：控制函数执行频率
- **Proxy和Reflect**：拦截和自定义对象操作
- **生成器函数**：使用yield创建可迭代序列
- **WeakMap和WeakSet**：内存管理和私有数据存储

## 如何使用

这些示例可以直接在Node.js环境中运行：

```bash
node javascript_intermediate.js
node javascript_advanced_patterns.js
```

或者可以将代码片段复制到浏览器控制台中运行。

## 学习建议

1. 先阅读并理解每个例子的代码
2. 尝试修改参数和值，观察结果变化
3. 结合实际项目需求，应用这些技巧
4. 查阅MDN文档深入了解每个方法的详细用法

## 进阶学习资源

- [MDN Web文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [JavaScript.info](https://zh.javascript.info/)
- [现代JavaScript教程](https://zh.javascript.info/) 



### ========================

# React中级编程示例

本目录包含React中级编程示例和常用模式，适合已经掌握JavaScript基础知识的开发者学习React框架。

## 文件说明

### 1. `ReactBasics.jsx`

这个文件包含React基础和中级用法：

- **函数组件与JSX基础**：创建组件、使用JSX语法、条件渲染
- **使用状态(useState)**：基本计数器、表单处理
- **副作用(useEffect)**：数据获取、生命周期模拟、清理函数
- **引用(useRef)**：DOM引用、保存前一个值
- **回调和记忆化优化**：useCallback和useMemo的使用
- **列表渲染和key**：map方法渲染列表、使用key优化
- **字符串操作在React中的应用**：split、join、大小写转换等
- **组合组件**：组件嵌套和复用模式
- **Context API**：创建和使用上下文
- **错误边界**：错误捕获和处理

### 2. `ReactHooksAndState.jsx`

这个文件展示了React Hooks和状态管理的高级用法：

- **useState进阶用法**：完整的待办事项应用
- **useReducer示例**：复杂状态管理、购物车示例
- **自定义Hook示例**：useLocalStorage、useFetch的实现和使用
- **使用Context进行状态管理**：用户身份验证示例
- **高级状态管理**：结合useReducer和Context实现应用级状态管理

## 如何使用

这些示例文件可以作为参考来学习React的各种特性和模式。文件中的组件都是可导出的，可以在任何React应用中导入和使用。

要运行这些示例，您需要：

1. 在React项目中导入相关组件
2. 在您的组件树中渲染这些组件
3. 根据需要传入适当的props

例如：

```jsx
import { Counter, StringManipulator } from './ReactBasics';
import { TodoList, ShoppingCart } from './ReactHooksAndState';

function App() {
  return (
    <div className="app">
      <h1>React示例</h1>
      <Counter />
      <StringManipulator />
      <TodoList />
      <ShoppingCart />
    </div>
  );
}
```

## 学习建议

1. 先理解基础的React组件和JSX语法
2. 掌握React Hooks (useState, useEffect)的基本用法
3. 学习如何使用列表渲染和条件渲染
4. 深入研究状态管理模式和Context API
5. 尝试创建自己的自定义Hook
6. 理解性能优化技术（useCallback、useMemo）

## 进阶学习资源

- [React官方文档](https://zh-hans.reactjs.org/)
- [React Hooks文档](https://zh-hans.reactjs.org/docs/hooks-intro.html)
- [React Router](https://reactrouter.com/)
- [Redux](https://redux.js.org/) 或 [Zustand](https://github.com/pmndrs/zustand) 