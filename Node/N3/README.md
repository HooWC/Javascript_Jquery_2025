# Node.js Todo API

这是一个使用Node.js、Express和MongoDB构建的RESTful API，用于管理待办事项（Todo）。

## 功能特性

- 用户认证（注册/登录/注销）
- JWT认证保护路由
- 待办事项CRUD操作
- 用户角色和权限控制
- 错误处理
- 安全中间件

## 项目结构

```
└── Note/N3/
    ├── config/             # 配置文件
    │   └── db.js           # 数据库连接
    ├── controllers/        # 控制器
    │   ├── auth.js         # 认证控制器
    │   └── todos.js        # 待办事项控制器
    ├── middleware/         # 中间件
    │   └── auth.js         # 认证中间件
    ├── models/             # 数据模型
    │   ├── Todo.js         # 待办事项模型
    │   └── User.js         # 用户模型
    ├── routes/             # 路由
    │   ├── auth.js         # 认证路由
    │   └── todos.js        # 待办事项路由
    ├── .env                # 环境变量
    ├── package.json        # 项目依赖
    ├── README.md           # 项目说明
    └── server.js           # 服务器入口
```

## 开始使用

### 前提条件

- Node.js (v12+)
- MongoDB

### 安装步骤

1. 克隆仓库或下载代码

2. 安装依赖
   ```
   npm install
   ```

3. 配置环境变量
   创建`.env`文件并添加以下内容：
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/todo-api
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

4. 启动服务器
   ```
   # 开发模式
   npm run dev
   
   # 生产模式
   npm start
   ```

## API端点

### 认证

- `POST /api/auth/register` - 注册新用户
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取当前用户信息 (需要认证)
- `GET /api/auth/logout` - 用户注销 (需要认证)

### 待办事项

- `GET /api/todos` - 获取当前用户的所有待办事项 (需要认证)
- `GET /api/todos/:id` - 获取单个待办事项 (需要认证)
- `POST /api/todos` - 创建新待办事项 (需要认证)
- `PUT /api/todos/:id` - 更新待办事项 (需要认证)
- `DELETE /api/todos/:id` - 删除待办事项 (需要认证)

## 使用示例

### 注册用户

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"测试用户","email":"test@example.com","password":"123456"}'
```

### 用户登录

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

### 创建待办事项

```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"完成项目","description":"完成Node.js API项目","priority":"高"}'
```

### 获取所有待办事项

```bash
curl -X GET http://localhost:5000/api/todos \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 安全注意事项

- JWT密钥应该保密并且足够复杂
- 生产环境中启用HTTPS
- 定期更新依赖包以应对安全漏洞
- 避免在代码中硬编码敏感信息

## 依赖项

主要依赖项：
- express - Web框架
- mongoose - MongoDB对象建模
- jsonwebtoken - JWT认证
- bcryptjs - 密码哈希
- dotenv - 环境变量
- express-validator - 请求验证

开发依赖项：
- nodemon - 开发热重载 