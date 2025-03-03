/**
 * React基础用法示例
 * 包含常用React方法、Hook和模式
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// =============== 1. 函数组件与JSX基础 ===============

// 基本函数组件
export function Welcome(props) {
  return <h1>你好, {props.name}</h1>;
}

// 使用箭头函数创建组件
export const Greeting = ({ name, title }) => {
  return (
    <div className="greeting">
      <h2>{title}</h2>
      <p>欢迎您, {name}!</p>
    </div>
  );
};

// JSX中的条件渲染
export function ConditionalRendering({ isLoggedIn, username }) {
  return (
    <div>
      {isLoggedIn ? (
        <h2>欢迎回来, {username}!</h2>
      ) : (
        <h2>请登录</h2>
      )}
      
      {/* 使用&&进行条件渲染 */}
      {isLoggedIn && <p>您已登录为: {username}</p>}
    </div>
  );
}

// =============== 2. 使用状态(useState) ===============

export function Counter() {
  // 声明状态变量count，初始值为0
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击增加
      </button>
      <button onClick={() => setCount(count - 1)}>
        点击减少
      </button>
      <button onClick={() => setCount(0)}>
        重置
      </button>
    </div>
  );
}

// 使用useState处理表单
export function SimpleForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    agreement: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`提交的数据: ${JSON.stringify(formData, null, 2)}`);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          用户名:
          <input
            type="text"
            name="username"
            value={formData.username}
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
            value={formData.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="agreement"
            checked={formData.agreement}
            onChange={handleChange}
          />
          我同意条款和条件
        </label>
      </div>
      <button type="submit">提交</button>
    </form>
  );
}

// =============== 3. 副作用(useEffect) ===============

export function DataFetcher({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // 重置状态
    setLoading(true);
    setError(null);
    
    // 获取数据
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('网络响应不正常');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
      
    // 清理函数
    return () => {
      // 这里可以取消请求（如果使用axios）或清理其他资源
      console.log('组件卸载或url改变，清理资源');
    };
  }, [url]); // 依赖项数组 - 仅在url变化时重新运行
  
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  
  return (
    <div>
      <h3>获取的数据:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

// 使用useEffect实现文档标题更新
export function DocumentTitleUpdater({ title }) {
  useEffect(() => {
    // 更新文档标题
    document.title = title;
    
    // 组件卸载时恢复原始标题
    return () => {
      document.title = '我的React应用';
    };
  }, [title]); // 仅在title变化时执行
  
  return <p>当前页面标题: {title}</p>;
}

// =============== 4. 引用(useRef) ===============

export function FocusInput() {
  // 创建一个ref
  const inputRef = useRef(null);
  
  // 聚焦输入框
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" placeholder="点击按钮聚焦这里" />
      <button onClick={focusInput}>聚焦输入框</button>
    </div>
  );
}

// 使用useRef跟踪前一个值
export function CounterWithPrevious() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  
  useEffect(() => {
    // 更新ref以保存前一个count值
    prevCountRef.current = count;
  }, [count]);
  
  // 第一次渲染时，prevCount是undefined
  const prevCount = prevCountRef.current;
  
  return (
    <div>
      <p>当前: {count}, 前一个: {prevCount !== undefined ? prevCount : '无'}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}

// =============== 5. 回调和记忆优化 ===============

export function OptimizedList({ items }) {
  const [selectedId, setSelectedId] = useState(null);
  
  // 使用useCallback记忆回调函数
  const handleItemClick = useCallback((id) => {
    setSelectedId(id);
    console.log(`选中项目: ${id}`);
  }, []); // 空依赖数组表示此函数不会改变
  
  // 使用useMemo优化计算
  const sortedItems = useMemo(() => {
    console.log('重新排序项目');
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }, [items]); // 仅在items改变时重新计算
  
  return (
    <div>
      <h3>排序后的项目:</h3>
      <ul>
        {sortedItems.map(item => (
          <li 
            key={item.id}
            style={{ fontWeight: item.id === selectedId ? 'bold' : 'normal' }}
            onClick={() => handleItemClick(item.id)}
          >
            {item.name}
          </li>
        ))}
      </ul>
      {selectedId && <p>已选择ID: {selectedId}</p>}
    </div>
  );
}

// =============== 6. 列表渲染和key ===============

export function UserList({ users }) {
  // 使用Array.map()渲染列表
  return (
    <div className="user-list">
      <h2>用户列表</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <div>{user.name}</div>
            <div>邮箱: {user.email}</div>
          </li>
        ))}
      </ul>
      
      <h3>按角色分组的用户</h3>
      {Object.entries(
        // 使用reduce方法按角色分组
        users.reduce((groups, user) => {
          const { role } = user;
          groups[role] = groups[role] || [];
          groups[role].push(user);
          return groups;
        }, {})
      ).map(([role, users]) => (
        <div key={role}>
          <h4>{role}</h4>
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// =============== 7. 字符串操作在React中的应用 ===============

export function StringManipulator() {
  const [text, setText] = useState('React,Vue,Angular,Svelte');
  const [separator, setSeparator] = useState(',');
  
  // 使用split处理字符串
  const splitText = text.split(separator);
  
  return (
    <div>
      <h3>字符串操作</h3>
      <div>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          style={{ width: '300px' }}
        />
      </div>
      <div>
        分隔符: 
        <input 
          type="text" 
          value={separator} 
          onChange={(e) => setSeparator(e.target.value)} 
        />
      </div>
      
      <h4>结果:</h4>
      <ul>
        {splitText.map((item, index) => (
          <li key={index}>{item.trim()}</li>
        ))}
      </ul>
      
      <h4>重新连接:</h4>
      <p>{splitText.join(' | ')}</p>
      
      <h4>大写转换:</h4>
      <p>{text.toUpperCase()}</p>
      
      <h4>小写转换:</h4>
      <p>{text.toLowerCase()}</p>
    </div>
  );
}

// =============== 8. 组合组件 ===============

// 容器组件
export function Card({ title, children }) {
  return (
    <div className="card" style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '16px', margin: '8px 0' }}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// 使用组合模式
export function UserProfile({ user }) {
  return (
    <Card title={`${user.name}的个人资料`}>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>邮箱:</strong> {user.email}</p>
      <p><strong>角色:</strong> {user.role}</p>
    </Card>
  );
}

// =============== 9. Context API ===============

// 创建上下文
export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {}
});

// 上下文提供者组件
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const value = { theme, toggleTheme };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 使用上下文的组件
export function ThemedButton() {
  // 使用上下文
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <button
          onClick={toggleTheme}
          style={{
            backgroundColor: theme === 'light' ? '#fff' : '#333',
            color: theme === 'light' ? '#333' : '#fff',
            border: `1px solid ${theme === 'light' ? '#ccc' : '#666'}`,
            padding: '8px 16px',
            borderRadius: '4px'
          }}
        >
          当前主题: {theme} (点击切换)
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

// =============== 10. 错误边界 ===============

// 错误边界组件
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    // 更新状态，下次渲染时显示备用UI
    return { hasError: true, error: error };
  }
  
  componentDidCatch(error, errorInfo) {
    // 可以将错误日志上报给服务
    console.error('错误边界捕获到错误:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', border: '1px solid #f44336', borderRadius: '4px' }}>
          <h2>出错了!</h2>
          <p>{this.state.error && this.state.error.toString()}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            重试
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
} 