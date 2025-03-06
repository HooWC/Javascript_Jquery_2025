const User = require('../models/User');

// @desc    注册用户
// @route   POST /api/auth/register
// @access  公开
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 创建用户
        const user = await User.create({
            name,
            email,
            password
        });

        sendTokenResponse(user, 201, res);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// @desc    用户登录
// @route   POST /api/auth/login
// @access  公开
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 验证邮箱和密码
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: '请提供邮箱和密码'
            });
        }

        // 检查用户是否存在
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: '无效的凭据'
            });
        }

        // 检查密码是否匹配
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: '无效的凭据'
            });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: '登录失败'
        });
    }
};

// @desc    获取当前登录用户
// @route   GET /api/auth/me
// @access  私有
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: '无法获取用户信息'
        });
    }
};

// @desc    用户退出
// @route   GET /api/auth/logout
// @access  私有
exports.logout = (req, res) => {
    res.status(200).json({
        success: true,
        message: '用户已退出'
    });
};

// 生成token响应
const sendTokenResponse = (user, statusCode, res) => {
    // 创建token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .json({
            success: true,
            token
        });
}; 