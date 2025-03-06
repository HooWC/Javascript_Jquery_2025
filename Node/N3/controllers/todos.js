const Todo = require('../models/Todo');

// @desc    获取所有待办事项
// @route   GET /api/todos
// @access  私有
exports.getTodos = async (req, res) => {
    try {
        // 只返回当前用户的待办事项
        const todos = await Todo.find({ user: req.user.id });

        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: '无法获取待办事项'
        });
    }
};

// @desc    获取单个待办事项
// @route   GET /api/todos/:id
// @access  私有
exports.getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: `未找到ID为${req.params.id}的待办事项`
            });
        }

        // 确保用户只能访问自己的待办事项
        if (todo.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: '未授权访问此待办事项'
            });
        }

        res.status(200).json({
            success: true,
            data: todo
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: '无法获取待办事项'
        });
    }
};

// @desc    创建待办事项
// @route   POST /api/todos
// @access  私有
exports.createTodo = async (req, res) => {
    try {
        // 添加用户ID到请求体
        req.body.user = req.user.id;

        const todo = await Todo.create(req.body);

        res.status(201).json({
            success: true,
            data: todo
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// @desc    更新待办事项
// @route   PUT /api/todos/:id
// @access  私有
exports.updateTodo = async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: `未找到ID为${req.params.id}的待办事项`
            });
        }

        // 确保用户只能更新自己的待办事项
        if (todo.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: '未授权更新此待办事项'
            });
        }

        todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: todo
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// @desc    删除待办事项
// @route   DELETE /api/todos/:id
// @access  私有
exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: `未找到ID为${req.params.id}的待办事项`
            });
        }

        // 确保用户只能删除自己的待办事项
        if (todo.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: '未授权删除此待办事项'
            });
        }

        await todo.remove();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: '无法删除待办事项'
        });
    }
}; 