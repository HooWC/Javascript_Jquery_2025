const express = require('express');
const {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/todos');

const router = express.Router();

// 引入认证中间件
const { protect } = require('../middleware/auth');

// 保护所有路由需要授权
router.use(protect);

// 获取所有待办事项和创建新待办事项
router.route('/')
    .get(getTodos)
    .post(createTodo);

// 获取、更新和删除单个待办事项
router.route('/:id')
    .get(getTodo)
    .put(updateTodo)
    .delete(deleteTodo);

module.exports = router; 