/**
 * Node.js REST API示例
 * 使用Express框架构建RESTful API
 * 
 * 这个示例创建了一个简单的用户管理API，支持常见的CRUD操作
 * 实际应用中，你可能需要连接真实的数据库如MongoDB或MySQL
 */

// 导入所需模块
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件配置
app.use(bodyParser.json()); // 解析JSON请求体
app.use(bodyParser.urlencoded({ extended: true })); // 解析URL编码的请求体
app.use(cors()); // 启用CORS
app.use(morgan('dev')); // 日志记录

// 用于存储模拟用户数据的文件路径
const dataPath = path.join(__dirname, 'users.json');

// 确保数据文件存在
if (!fs.existsSync(dataPath)) {
    // 创建示例用户数据
    const initialData = {
        users: [
            { id: 1, name: '张三', email: 'zhangsan@example.com', age: 28 },
            { id: 2, name: '李四', email: 'lisi@example.com', age: 32 },
            { id: 3, name: '王五', email: 'wangwu@example.com', age: 25 }
        ]
    };

    // 写入初始数据
    fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2), 'utf8');
    console.log('创建了示例用户数据文件');
}

// 辅助函数：读取用户数据
const readUsers = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('读取用户数据出错:', error);
        return { users: [] };
    }
};

// 辅助函数：写入用户数据
const writeUsers = (data) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('写入用户数据出错:', error);
        return false;
    }
};

// =============== API路由 ===============

// 获取API状态
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        message: 'API服务正常运行',
        timestamp: new Date().toISOString()
    });
});

// =============== 用户API路由 ===============

// 获取所有用户
app.get('/api/users', (req, res) => {
    const data = readUsers();
    res.json(data.users);
});

// 获取单个用户
app.get('/api/users/:id', (req, res) => {
    const data = readUsers();
    const user = data.users.find(user => user.id === parseInt(req.params.id));

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: '用户不存在' });
    }
});

// 创建新用户
app.post('/api/users', (req, res) => {
    const data = readUsers();

    // 验证请求体
    const { name, email, age } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: '名称和邮箱是必填字段' });
    }

    // 生成新ID
    const newId = data.users.length > 0
        ? Math.max(...data.users.map(user => user.id)) + 1
        : 1;

    // 创建新用户对象
    const newUser = {
        id: newId,
        name,
        email,
        age: age || null,
        createdAt: new Date().toISOString()
    };

    // 添加到用户列表
    data.users.push(newUser);

    // 保存数据
    if (writeUsers(data)) {
        res.status(201).json(newUser);
    } else {
        res.status(500).json({ message: '创建用户失败' });
    }
});

// 更新用户
app.put('/api/users/:id', (req, res) => {
    const data = readUsers();
    const userId = parseInt(req.params.id);
    const userIndex = data.users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: '用户不存在' });
    }

    // 获取当前用户对象
    const user = data.users[userIndex];

    // 更新字段
    const { name, email, age } = req.body;
    data.users[userIndex] = {
        ...user,
        name: name || user.name,
        email: email || user.email,
        age: age !== undefined ? age : user.age,
        updatedAt: new Date().toISOString()
    };

    // 保存数据
    if (writeUsers(data)) {
        res.json(data.users[userIndex]);
    } else {
        res.status(500).json({ message: '更新用户失败' });
    }
});

// 部分更新用户 (PATCH)
app.patch('/api/users/:id', (req, res) => {
    const data = readUsers();
    const userId = parseInt(req.params.id);
    const userIndex = data.users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: '用户不存在' });
    }

    // 获取当前用户对象
    const user = data.users[userIndex];

    // 更新提供的字段
    Object.keys(req.body).forEach(key => {
        // 排除id字段，不允许更新
        if (key !== 'id') {
            user[key] = req.body[key];
        }
    });

    // 添加更新时间
    user.updatedAt = new Date().toISOString();

    // 保存数据
    if (writeUsers(data)) {
        res.json(user);
    } else {
        res.status(500).json({ message: '更新用户失败' });
    }
});

// 删除用户
app.delete('/api/users/:id', (req, res) => {
    const data = readUsers();
    const userId = parseInt(req.params.id);
    const userIndex = data.users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: '用户不存在' });
    }

    // 保存被删除的用户信息
    const deletedUser = data.users[userIndex];

    // 删除用户
    data.users.splice(userIndex, 1);

    // 保存数据
    if (writeUsers(data)) {
        res.json({
            message: '用户已删除',
            deletedUser
        });
    } else {
        res.status(500).json({ message: '删除用户失败' });
    }
});

// =============== 查询参数示例 ===============

// 用户搜索
app.get('/api/search/users', (req, res) => {
    const data = readUsers();
    let results = [...data.users];

    // 按名称搜索
    if (req.query.name) {
        results = results.filter(user =>
            user.name.toLowerCase().includes(req.query.name.toLowerCase())
        );
    }

    // 按年龄范围筛选
    if (req.query.minAge) {
        results = results.filter(user =>
            user.age >= parseInt(req.query.minAge)
        );
    }

    if (req.query.maxAge) {
        results = results.filter(user =>
            user.age <= parseInt(req.query.maxAge)
        );
    }

    // 分页
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // 构建分页信息
    const pagination = {};

    if (endIndex < results.length) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }

    // 返回结果
    res.json({
        count: results.length,
        pagination,
        results: results.slice(startIndex, endIndex)
    });
});

// =============== 错误处理中间件 ===============

// 404处理
app.use((req, res, next) => {
    res.status(404).json({
        message: '未找到请求的资源',
        path: req.path
    });
});

// 错误处理
app.use((err, req, res, next) => {
    console.error('服务器错误:', err);
    res.status(500).json({
        message: '服务器内部错误',
        error: process.env.NODE_ENV === 'production' ? {} : err
    });
});

// =============== 启动服务器 ===============

// 在实际运行时取消注释下面的代码
/*
app.listen(PORT, () => {
  console.log(`API服务器运行在 http://localhost:${PORT}/`);
});
*/

console.log(`API服务器代码示例 - 如果启动将监听 http://localhost:${PORT}/`);

// 为了使这个文件可以作为模块导入
module.exports = app;

// =============== 额外信息 ===============

/**
 * 要运行此REST API示例，需要安装以下依赖:
 * npm init -y
 * npm install express body-parser cors morgan
 * 
 * 然后运行:
 * node RestAPI.js
 * 
 * API测试:
 * 1. 获取所有用户: GET http://localhost:3000/api/users
 * 2. 获取单个用户: GET http://localhost:3000/api/users/1
 * 3. 创建用户: POST http://localhost:3000/api/users
 *    Body: { "name": "赵六", "email": "zhaoliu@example.com", "age": 40 }
 * 4. 更新用户: PUT http://localhost:3000/api/users/1
 *    Body: { "name": "张三 (已更新)", "age": 29 }
 * 5. 删除用户: DELETE http://localhost:3000/api/users/2
 * 6. 搜索用户: GET http://localhost:3000/api/search/users?name=张&minAge=25
 */ 