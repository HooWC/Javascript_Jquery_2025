const express = require('express');
const {
    register,
    login,
    getMe,
    logout
} = require('../controllers/auth');

const router = express.Router();

// 引入认证中间件
const { protect } = require('../middleware/auth');

// 注册新用户
router.post('/register', register);

// 用户登录
router.post('/login', login);

// 获取当前用户
router.get('/me', protect, getMe);

// 用户退出
router.get('/logout', protect, logout);

module.exports = router; 