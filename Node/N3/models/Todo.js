const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '请添加任务标题'],
        trim: true,
        maxlength: [100, '标题不能超过100个字符']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, '描述不能超过500个字符']
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['低', '中', '高'],
        default: '中'
    },
    dueDate: {
        type: Date
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Todo', TodoSchema); 