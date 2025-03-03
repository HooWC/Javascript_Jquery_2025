/**
 * React Hooks和状态管理
 * 展示各种React Hooks的实际应用和高级状态管理模式
 */

import React, { useState, useEffect, useReducer, useContext, useMemo, useCallback, useRef } from 'react';

// =============== 1. useState进阶用法 ===============

// 功能完整的待办事项列表组件
export function TodoList() {
  // 多个状态变量管理
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleAddTodo = () => {
    if (inputValue.trim() === '') return;
    
    // 使用函数式更新，基于之前的状态计算新状态
    setTodos(prevTodos => [
      ...prevTodos, 
      { 
        id: Date.now(), 
        text: inputValue, 
        completed: false 
      }
    ]);
    setInputValue('');
  };
  
  const handleToggleTodo = (id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const handleDeleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };
  
  // 使用派生状态过滤待办事项
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);
  
  return (
    <div className="todo-app">
      <h2>待办事项列表</h2>
      
      <div className="add-todo">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="添加新待办事项..."
        />
        <button onClick={handleAddTodo}>添加</button>
      </div>
      
      <div className="filters">
        <button 
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          全部
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          未完成
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          已完成
        </button>
      </div>
      
      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <li className="empty-message">暂无待办事项</li>
        ) : (
          filteredTodos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
              <button onClick={() => handleDeleteTodo(todo.id)}>删除</button>
            </li>
          ))
        )}
      </ul>
      
      <div className="todo-stats">
        <p>总计: {todos.length} 项</p>
        <p>已完成: {todos.filter(todo => todo.completed).length} 项</p>
        <p>未完成: {todos.filter(todo => !todo.completed).length} 项</p>
      </div>
    </div>
  );
}

// =============== 2. useReducer示例 ===============

// 使用reducer管理复杂状态
export function ReducerCounter() {
  // 定义reducer函数
  const counterReducer = (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { count: state.count + 1 };
      case 'DECREMENT':
        return { count: state.count - 1 };
      case 'RESET':
        return { count: 0 };
      case 'SET':
        return { count: action.payload };
      default:
        return state;
    }
  };
  
  // 使用useReducer
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div>
      <h3>使用useReducer的计数器</h3>
      <p>当前计数: {state.count}</p>
      <div>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>增加</button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>减少</button>
        <button onClick={() => dispatch({ type: 'RESET' })}>重置</button>
        <button onClick={() => dispatch({ type: 'SET', payload: 100 })}>设为100</button>
      </div>
    </div>
  );
}

// 使用useReducer管理购物车
export function ShoppingCart() {
  // 购物车reducer
  const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_ITEM': {
        const { product } = action.payload;
        const existingItem = state.items.find(item => item.id === product.id);
        
        if (existingItem) {
          // 如果商品已存在，增加数量
          return {
            ...state,
            items: state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        } else {
          // 添加新商品
          return {
            ...state,
            items: [...state.items, { ...product, quantity: 1 }]
          };
        }
      }
      
      case 'REMOVE_ITEM':
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id)
        };
        
      case 'UPDATE_QUANTITY':
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
        };
        
      case 'CLEAR_CART':
        return {
          ...state,
          items: []
        };
        
      default:
        return state;
    }
  };
  
  // 初始状态
  const initialState = {
    items: []
  };
  
  // 使用useReducer
  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);
  
  // 模拟可用产品
  const availableProducts = [
    { id: 1, name: '笔记本电脑', price: 6999 },
    { id: 2, name: '智能手机', price: 3999 },
    { id: 3, name: '无线耳机', price: 899 }
  ];
  
  // 计算购物车总价
  const cartTotal = cartState.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  return (
    <div className="shopping-cart">
      <h3>购物车示例 (useReducer)</h3>
      
      <div className="products">
        <h4>可用产品</h4>
        <ul>
          {availableProducts.map(product => (
            <li key={product.id}>
              {product.name} - ¥{product.price}
              <button
                onClick={() =>
                  cartDispatch({
                    type: 'ADD_ITEM',
                    payload: { product }
                  })
                }
              >
                添加到购物车
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="cart-items">
        <h4>购物车物品</h4>
        {cartState.items.length === 0 ? (
          <p>购物车为空</p>
        ) : (
          <ul>
            {cartState.items.map(item => (
              <li key={item.id}>
                {item.name} - ¥{item.price} x 
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => {
                    const quantity = parseInt(e.target.value, 10);
                    if (quantity >= 1) {
                      cartDispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: { id: item.id, quantity }
                      });
                    }
                  }}
                  style={{ width: '50px' }}
                />
                = ¥{item.price * item.quantity}
                <button
                  onClick={() =>
                    cartDispatch({
                      type: 'REMOVE_ITEM',
                      payload: { id: item.id }
                    })
                  }
                >
                  移除
                </button>
              </li>
            ))}
          </ul>
        )}
        
        <div className="cart-summary">
          <p><strong>总计:</strong> ¥{cartTotal}</p>
          <button
            onClick={() => cartDispatch({ type: 'CLEAR_CART' })}
            disabled={cartState.items.length === 0}
          >
            清空购物车
          </button>
        </div>
      </div>
    </div>
  );
}

// =============== 3. 自定义Hook示例 ===============

// 自定义Hook: useLocalStorage
export function useLocalStorage(key, initialValue) {
  // 创建状态，初始值从localStorage获取，如果没有则使用传入的初始值
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 创建更新函数，同时更新状态和localStorage
  const setValue = (value) => {
    try {
      // 支持函数式更新和直接设置
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// 使用自定义Hook
export function LocalStorageForm() {
  const [formValues, setFormValues] = useLocalStorage('formData', {
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('表单已提交并保存到localStorage');
  };

  const handleReset = () => {
    setFormValues({
      name: '',
      email: ''
    });
  };

  return (
    <div>
      <h3>LocalStorage表单 (自定义Hook)</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            姓名:
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            邮箱:
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <button type="submit">提交</button>
          <button type="button" onClick={handleReset}>重置</button>
        </div>
        <p>表单数据会自动保存到localStorage，刷新页面后仍然存在。</p>
      </form>
    </div>
  );
}

// 自定义Hook: useFetch
export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // 保存最后一个url，用于防止组件卸载后设置状态
  const lastUrlRef = useRef(url);

  useEffect(() => {
    lastUrlRef.current = url;
    
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(jsonData => {
        if (isMounted && lastUrlRef.current === url) {
          setData(jsonData);
          setLoading(false);
        }
      })
      .catch(error => {
        if (isMounted && lastUrlRef.current === url) {
          setError(error.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url, options.method, options.headers, options.body]);

  // 提供重新加载数据的函数
  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    
    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(jsonData => {
        if (lastUrlRef.current === url) {
          setData(jsonData);
          setLoading(false);
        }
      })
      .catch(error => {
        if (lastUrlRef.current === url) {
          setError(error.message);
          setLoading(false);
        }
      });
  }, [url, options.method, options.headers, options.body]);

  return { data, loading, error, refetch };
}

// 使用useFetch自定义Hook
export function FetchDemo() {
  const [postId, setPostId] = useState(1);
  const { data, loading, error, refetch } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  return (
    <div>
      <h3>useFetch自定义Hook示例</h3>
      <div>
        <label>
          选择帖子ID:
          <select
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
          >
            {[1, 2, 3, 4, 5].map(id => (
              <option key={id} value={id}>
                帖子 {id}
              </option>
            ))}
          </select>
        </label>
        <button onClick={refetch}>重新加载</button>
      </div>

      {loading ? (
        <p>加载中...</p>
      ) : error ? (
        <p>错误: {error}</p>
      ) : data ? (
        <div>
          <h4>{data.title}</h4>
          <p>{data.body}</p>
        </div>
      ) : null}
    </div>
  );
}

// =============== 4. 使用Context进行状态管理 ===============

// 创建用户上下文
export const UserContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {}
});

// 用户上下文提供者
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  // 登录函数
  const login = (userData) => {
    setUser(userData);
  };
  
  // 登出函数
  const logout = () => {
    setUser(null);
  };
  
  const value = { user, login, logout };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// 使用用户上下文的登录组件
export function LoginForm() {
  const { user, login, logout } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // 模拟登录
    login({
      id: 1,
      username: formData.username,
      name: '测试用户',
      role: 'user'
    });
  };
  
  if (user) {
    return (
      <div>
        <h3>欢迎, {user.name}!</h3>
        <p>用户名: {user.username}</p>
        <p>角色: {user.role}</p>
        <button onClick={logout}>登出</button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <h3>登录</h3>
      <div>
        <label>
          用户名:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          密码:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit">登录</button>
    </form>
  );
}

// =============== 5. 高级状态管理 ===============

// 创建应用状态上下文
export const AppStateContext = React.createContext();

// 定义应用状态reducer
const appStateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    default:
      return state;
  }
};

// 应用状态提供者
export function AppStateProvider({ children }) {
  const initialState = {
    theme: 'light',
    language: 'zh',
    notifications: []
  };
  
  const [state, dispatch] = useReducer(appStateReducer, initialState);
  
  // 创建便捷的action creators
  const actions = {
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    setLanguage: (language) => dispatch({ type: 'SET_LANGUAGE', payload: language }),
    addNotification: (notification) => {
      const id = Date.now();
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { id, ...notification }
      });
      
      // 自动移除通知
      if (notification.autoClose !== false) {
        setTimeout(() => {
          dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
        }, notification.duration || 3000);
      }
      
      return id;
    },
    removeNotification: (id) => dispatch({ type: 'REMOVE_NOTIFICATION', payload: id }),
    clearNotifications: () => dispatch({ type: 'CLEAR_NOTIFICATIONS' })
  };
  
  return (
    <AppStateContext.Provider value={{ state, actions }}>
      {children}
    </AppStateContext.Provider>
  );
}

// 使用应用状态的组件
export function AppSettingsPanel() {
  const { state, actions } = useContext(AppStateContext);
  
  return (
    <div>
      <h3>应用设置</h3>
      <div>
        <h4>主题设置</h4>
        <select 
          value={state.theme}
          onChange={(e) => actions.setTheme(e.target.value)}
        >
          <option value="light">浅色主题</option>
          <option value="dark">深色主题</option>
          <option value="system">跟随系统</option>
        </select>
      </div>
      
      <div>
        <h4>语言设置</h4>
        <select 
          value={state.language}
          onChange={(e) => actions.setLanguage(e.target.value)}
        >
          <option value="zh">中文</option>
          <option value="en">英文</option>
        </select>
      </div>
      
      <div>
        <h4>测试通知</h4>
        <button
          onClick={() =>
            actions.addNotification({
              type: 'success',
              message: '操作成功',
              duration: 2000
            })
          }
        >
          成功通知
        </button>
        <button
          onClick={() =>
            actions.addNotification({
              type: 'error',
              message: '出现错误',
              duration: 2000
            })
          }
        >
          错误通知
        </button>
      </div>
      
      <div>
        <h4>当前通知 ({state.notifications.length})</h4>
        {state.notifications.length > 0 && (
          <button onClick={actions.clearNotifications}>
            清除所有通知
          </button>
        )}
        <ul>
          {state.notifications.map(notification => (
            <li key={notification.id}>
              <strong>{notification.type}:</strong> {notification.message}
              <button
                onClick={() => actions.removeNotification(notification.id)}
              >
                关闭
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 