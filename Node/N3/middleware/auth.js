const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 保护路由中间件
exports.protect = async (req, res, next) => {
    let token;

    // 检查请求头中的授权头
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // 从Bearer令牌中提取JWT
        token = req.headers.authorization.split(' ')[1];
    }

    // 确保令牌存在
    if (!token) {
        return res.status(401).json({
            success: false,
            message: '未授权访问此路由'
        });
    }

    try {
        // 验证令牌
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 查找对应的用户
        req.user = await User.findById(decoded.id);

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: '未授权访问此路由'
        });
    }
};

// 授权角色访问
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `用户角色 ${req.user.role} 未被授权访问此路由`
            });
        }
        next();
    };
}; 