const mongoose = require('mongoose');
require('dotenv').config();

// 数据库连接函数
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB已连接: ${conn.connection.host}`);
    } catch (error) {
        console.error(`数据库连接错误: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB; 