// 现代 JavaScript 待办事项应用
const todos = JSON.parse(localStorage.getItem('todos') || '[]');
const todoList = document.querySelector('#todoList');
const todoInput = document.querySelector('#todoInput');

// 渲染待办事项列表
const renderTodos = () => {
    todoList.innerHTML = todos
        .map((todo, index) => `
            <li>
                <span class="${todo.done ? 'done' : ''}">${todo.text}</span>
                <button onclick="toggleTodo(${index})">${todo.done ? '撤销' : '完成'}</button>
                <button onclick="deleteTodo(${index})">删除</button>
            </li>
        `)
        .join('');
    localStorage.setItem('todos', JSON.stringify(todos));
};

// 添加新待办事项
document.querySelector('#addTodo').onclick = () => {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, done: false });
        todoInput.value = '';
        renderTodos();
    }
};

// 切换待办事项状态
const toggleTodo = (index) => {
    todos[index].done = !todos[index].done;
    renderTodos();
};

// 删除待办事项
const deleteTodo = (index) => {
    todos.splice(index, 1);
    renderTodos();
};

// 初始渲染
renderTodos(); 