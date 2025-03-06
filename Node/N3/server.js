/**
 * Todo任务管理API - 服务器入口文件
 * 这是一个使用Node.js、Express和MongoDB构建的RESTful API
 * 支持用户认证和待办事项的CRUD操作
 */

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

// 加载环境变量
dotenv.config();

// 连接数据库
// connectDB();

// 路由文件
const auth = require('./routes/auth');
const todos = require('./routes/todos');

// 创建Express应用
const app = express();

// 中间件
app.use(express.json());
app.use(cors());

// 日志中间件
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// 挂载路由
app.use('/api/auth', auth);
app.use('/api/todos', todos);

// 基本路由
app.get('/', (req, res) => {
    res.json({
        message: '欢迎使用Todo API',
        description: '一个使用Node.js、Express和MongoDB构建的REST API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            todos: '/api/todos'
        }
    });
});

// 404处理
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: '未找到请求的资源',
        path: req.originalUrl
    });
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: '服务器内部错误',
        error: process.env.NODE_ENV === 'production' ? {} : err.message
    });
});

// 设置端口
const PORT = process.env.PORT || 5000;

// 启动服务器
// 在实际运行时取消注释下面的代码
/*
app.listen(PORT, () => {
  console.log(`服务器运行在${process.env.NODE_ENV}模式下的端口${PORT}`);
});
*/

console.log(`Todo API服务器示例 - 如果启动将监听 http://localhost:${PORT}/`);

// 处理未捕获的异常
process.on('uncaughtException', (err) => {
    console.error('未捕获的异常:', err.message);
    console.log('正在关闭服务器...');
    process.exit(1);
});

// 处理未处理的Promise拒绝
process.on('unhandledRejection', (err) => {
    console.error('未处理的Promise拒绝:', err.message);
    console.log('正在关闭服务器...');
    process.exit(1);
});

// 为了使这个文件可以作为模块导入
module.exports = app;

/**
 * 要运行此项目:
 * 
 * 1. 安装依赖:
 *    npm install
 * 
 * 2. 配置环境变量:
 *    确保.env文件已正确配置（MongoDB连接字符串、JWT密钥等）
 * 
 * 3. 启动服务器:
 *    npm run dev (开发模式)
 *    npm start (生产模式)
 * 
 * API使用示例:
 * 
 * 1. 注册用户:
 *    POST /api/auth/register
 *    Body: { "name": "测试用户", "email": "test@example.com", "password": "123456" }
 * 
 * 2. 用户登录:
 *    POST /api/auth/login
 *    Body: { "email": "test@example.com", "password": "123456" }
 * 
 * 3. 获取当前用户:
 *    GET /api/auth/me
 *    Header: Authorization: Bearer <token>
 * 
 * 4. 创建待办事项:
 *    POST /api/todos
 *    Header: Authorization: Bearer <token>
 *    Body: { "title": "完成项目", "description": "完成Node.js API项目", "priority": "高" }
 * 
 * 5. 获取所有待办事项:
 *    GET /api/todos
 *    Header: Authorization: Bearer <token>
 * 
 * 6. 更新待办事项:
 *    PUT /api/todos/:id
 *    Header: Authorization: Bearer <token>
 *    Body: { "completed": true }
 */ 