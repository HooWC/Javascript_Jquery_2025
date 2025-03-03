// 简洁的现代 JavaScript 代码
document.querySelector('#app').innerHTML = `
    <button class="action-btn">点击我</button>
`;

document.querySelector('.action-btn').onclick = () => alert('你点击了按钮！'); 