/**
 * Node.js基础用法示例
 * 包含Node.js核心模块、API和常用操作
 */

// =============== 1. 模块系统 ===============

// 导入内置模块
const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const events = require('events');
const util = require('util');

// 导入自定义模块 (如果存在)
// const myModule = require('./myModule');

// ES模块导入 (需要在package.json中设置 "type": "module" 或使用 .mjs 扩展名)
// import fs from 'fs';
// import path from 'path';

// =============== 2. 文件系统操作 ===============

// 同步读取文件
console.log('\n--- 文件系统操作 ---');
try {
    // 同步读取文件示例
    // const data = fs.readFileSync(path.join(__dirname, 'example.txt'), 'utf8');
    // console.log('文件内容:', data);

    // 由于文件不存在，我们将创建一个示例文件
    fs.writeFileSync(path.join(__dirname, 'example.txt'), '这是一个示例文件内容');
    console.log('文件已创建');

    // 现在读取刚创建的文件
    const data = fs.readFileSync(path.join(__dirname, 'example.txt'), 'utf8');
    console.log('文件内容:', data);
} catch (err) {
    console.error('文件操作错误:', err);
}

// 异步读取文件
fs.readFile(path.join(__dirname, 'example.txt'), 'utf8', (err, data) => {
    if (err) {
        console.error('异步读取错误:', err);
        return;
    }
    console.log('异步读取文件内容:', data);
});

// Promise方式读取文件 (Node.js 10+)
const fsPromises = fs.promises;
async function readFileAsync() {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'example.txt'), 'utf8');
        console.log('Promise方式读取文件内容:', data);

        // 修改文件内容
        await fsPromises.writeFile(path.join(__dirname, 'example.txt'), '这是修改后的内容');
        console.log('文件内容已修改');

        // 读取修改后的内容
        const newData = await fsPromises.readFile(path.join(__dirname, 'example.txt'), 'utf8');
        console.log('修改后的内容:', newData);
    } catch (err) {
        console.error('Promise方式文件操作错误:', err);
    }
}

readFileAsync();

// 目录操作
// 创建目录
try {
    if (!fs.existsSync(path.join(__dirname, 'test-dir'))) {
        fs.mkdirSync(path.join(__dirname, 'test-dir'));
        console.log('目录已创建');
    }
} catch (err) {
    console.error('创建目录错误:', err);
}

// 读取目录内容
fs.readdir(__dirname, (err, files) => {
    if (err) {
        console.error('读取目录错误:', err);
        return;
    }
    console.log('目录内容:', files);
});

// =============== 3. 路径处理 ===============

console.log('\n--- 路径处理 ---');
console.log('当前文件:', __filename);
console.log('当前目录:', __dirname);
console.log('文件名:', path.basename(__filename));
console.log('目录名:', path.dirname(__filename));
console.log('扩展名:', path.extname(__filename));
console.log('路径解析:', path.parse(__filename));
console.log('路径组合:', path.join(__dirname, 'subdir', 'file.txt'));

// =============== 4. 系统信息 ===============

console.log('\n--- 系统信息 ---');
console.log('操作系统平台:', os.platform());
console.log('架构:', os.arch());
console.log('CPU信息:', os.cpus().length + '核心');
console.log('总内存:', (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2) + 'GB');
console.log('可用内存:', (os.freemem() / (1024 * 1024 * 1024)).toFixed(2) + 'GB');
console.log('用户主目录:', os.homedir());
console.log('系统运行时间:', (os.uptime() / 3600).toFixed(2) + '小时');

// =============== 5. HTTP服务器 ===============

console.log('\n--- HTTP服务器 ---');
// 创建简单的HTTP服务器
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<h1>你好，Node.js!</h1><p>这是一个简单的HTTP服务器</p>');
});

// 监听端口
const PORT = 3000;
// 我们不实际启动服务器，因为这只是一个演示
console.log(`HTTP服务器示例代码 - 如果启动将监听 http://localhost:${PORT}/`);

/*
server.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}/`);
});
*/

// =============== 6. 事件处理 ===============

console.log('\n--- 事件处理 ---');
// 创建事件发射器
class MyEmitter extends events.EventEmitter { }
const myEmitter = new MyEmitter();

// 注册事件处理程序
myEmitter.on('event', (a, b) => {
    console.log('事件触发:', a, b);
});

// 触发事件
myEmitter.emit('event', '参数1', '参数2');

// 只触发一次的事件
myEmitter.once('onceEvent', () => {
    console.log('这个事件只会触发一次');
});

myEmitter.emit('onceEvent'); // 输出消息
myEmitter.emit('onceEvent'); // 不会输出任何内容

// =============== 7. 流操作 ===============

console.log('\n--- 流操作 ---');
// 创建一个可读流
const readStream = fs.createReadStream(path.join(__dirname, 'example.txt'), 'utf8');
// 创建一个可写流
const writeStream = fs.createWriteStream(path.join(__dirname, 'output.txt'));

// 处理流事件
readStream.on('data', (chunk) => {
    console.log('接收到数据块:', chunk);
});

readStream.on('end', () => {
    console.log('读取完成');
});

// 通过管道连接流 (从可读流到可写流)
// readStream.pipe(writeStream);
console.log('使用管道将一个文件复制到另一个文件');

// =============== 8. 进程和子进程 ===============

console.log('\n--- 进程信息 ---');
console.log('进程ID:', process.pid);
console.log('进程标题:', process.title);
console.log('Node.js版本:', process.version);
console.log('进程平台:', process.platform);
console.log('当前工作目录:', process.cwd());
console.log('环境变量PATH:', process.env.PATH);

// 命令行参数
console.log('命令行参数:', process.argv);

// 子进程示例 - 执行系统命令
const { exec, spawn } = require('child_process');

exec('echo 子进程示例输出', (error, stdout, stderr) => {
    if (error) {
        console.error(`执行错误: ${error}`);
        return;
    }
    console.log(`标准输出: ${stdout}`);
    if (stderr) console.error(`标准错误: ${stderr}`);
});

// =============== 9. 定时器 ===============

console.log('\n--- 定时器 ---');
// setTimeout - 延迟执行
const timeoutId = setTimeout(() => {
    console.log('这条消息在1秒后显示');
}, 1000);

// setImmediate - 当前事件循环结束时执行
setImmediate(() => {
    console.log('这条消息在当前事件循环结束时显示');
});

// setInterval - 定期执行
const intervalId = setInterval(() => {
    console.log('这条消息每2秒显示一次');
    // 输出3次后清除定时器
    clearInterval(intervalId);
}, 2000);

// 使用Promise和setTimeout结合
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function timerDemo() {
    console.log('开始定时器演示');
    await delay(2000);
    console.log('2秒后执行');
}

timerDemo();

// =============== 10. 错误处理 ===============

console.log('\n--- 错误处理 ---');
// try/catch捕获同步错误
try {
    const result = nonExistentFunction(); // 这将导致错误
} catch (error) {
    console.error('捕获到同步错误:', error.message);
}

// 使用回调处理异步错误
fs.readFile('不存在的文件.txt', (err, data) => {
    if (err) {
        console.error('异步操作错误 (回调方式):', err.message);
        return;
    }
    // 处理数据
});

// 使用Promise处理异步错误
fsPromises.readFile('不存在的文件.txt')
    .then(data => {
        // 处理数据
    })
    .catch(err => {
        console.error('异步操作错误 (Promise方式):', err.message);
    });

// 未捕获的异常处理
process.on('uncaughtException', (err) => {
    console.error('未捕获的异常:', err.message);
    // 注意：在生产环境中，一般在记录错误后应该退出进程
    // process.exit(1);
});

// 处理Promise中未捕获的拒绝
process.on('unhandledRejection', (reason, promise) => {
    console.error('未处理的Promise拒绝:', reason);
});

// =============== 11. 缓冲区 (Buffer) ===============

console.log('\n--- Buffer 操作 ---');
// 创建Buffer
const buf1 = Buffer.from('Hello, Node.js!');
console.log('Buffer内容:', buf1.toString());
console.log('Buffer原始格式:', buf1);
console.log('Buffer长度:', buf1.length);

// 创建特定大小的Buffer
const buf2 = Buffer.alloc(10);
console.log('分配的空Buffer:', buf2);

// 写入Buffer
buf2.write('Hi!');
console.log('写入后的Buffer:', buf2.toString());

// Buffer连接
const buf3 = Buffer.from(' World');
const combinedBuffer = Buffer.concat([buf1, buf3]);
console.log('连接后的Buffer:', combinedBuffer.toString());

// =============== 12. URL处理 ===============

console.log('\n--- URL处理 ---');
const { URL } = require('url');

const myURL = new URL('https://example.com:8080/path/to/page?query=string#hash');
console.log('协议:', myURL.protocol);
console.log('主机:', myURL.host);
console.log('主机名:', myURL.hostname);
console.log('端口:', myURL.port);
console.log('路径:', myURL.pathname);
console.log('查询参数:', myURL.search);
console.log('解析的查询参数:', myURL.searchParams.get('query'));
console.log('锚点:', myURL.hash);

// =============== 结束信息 ===============

console.log('\n--- 示例运行完毕 ---');
console.log('这个文件展示了Node.js的基本功能和API');
console.log('更多信息请访问: https://nodejs.org/docs/'); 