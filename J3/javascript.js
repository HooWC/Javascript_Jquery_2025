// 获取 DOM 元素
const input = document.querySelector('#input');
const preview = document.querySelector('#preview');
const saveBtn = document.querySelector('#saveBtn');
const clearBtn = document.querySelector('#clearBtn');
const noteTitle = document.querySelector('#noteTitle');
const notesList = document.querySelector('#notesList');
const exportTxtBtn = document.querySelector('#exportTxtBtn');
const exportHtmlBtn = document.querySelector('#exportHtmlBtn');

// 笔记管理
let notes = JSON.parse(localStorage.getItem('markdown-notes') || '[]');
let currentNoteId = localStorage.getItem('current-note-id') || '';

// 实时预览功能
const updatePreview = () => {
    preview.innerHTML = marked.parse(input.value || '');
};

// 加载笔记列表
const loadNotesList = () => {
    if (notes.length === 0) {
        notesList.innerHTML = '<li class="empty-list">没有保存的笔记</li>';
        return;
    }

    notesList.innerHTML = notes.map((note, index) => `
        <li data-id="${note.id}" data-index="${index}" class="note-item">
            <span class="note-title">${note.title || '未命名笔记'}</span>
            <div class="note-actions">
                <button class="load-note" data-index="${index}">打开</button>
                <button class="delete-note" data-index="${index}">删除</button>
            </div>
        </li>
    `).join('');
};

// 使用事件委托处理笔记列表的点击事件
notesList.addEventListener('click', (event) => {
    const target = event.target;

    // 如果点击的是打开按钮
    if (target.classList.contains('load-note')) {
        const index = parseInt(target.dataset.index);
        loadNote(index);
        return;
    }

    // 如果点击的是删除按钮
    if (target.classList.contains('delete-note')) {
        const index = parseInt(target.dataset.index);
        deleteNote(index);
        return;
    }

    // 如果点击的是笔记项本身或标题
    if (target.classList.contains('note-item') || target.classList.contains('note-title')) {
        // 向上查找最近的li元素
        const li = target.closest('li');
        if (li && li.dataset.index) {
            const index = parseInt(li.dataset.index);
            loadNote(index);
        }
    }
});

// 保存当前笔记
const saveNote = () => {
    const title = noteTitle.value.trim() || '未命名笔记';
    const content = input.value;

    if (!content) {
        alert('笔记内容不能为空！');
        return;
    }

    // 生成唯一ID
    const id = Date.now().toString();

    // 保存到笔记列表
    notes.push({ id, title, content });
    localStorage.setItem('markdown-notes', JSON.stringify(notes));

    currentNoteId = id;
    localStorage.setItem('current-note-id', id);

    // 更新界面
    noteTitle.value = title;
    loadNotesList();

    // 高亮显示新保存的笔记
    setTimeout(() => {
        const noteIndex = notes.length - 1;
        const noteElement = document.querySelector(`li[data-index="${noteIndex}"]`);
        if (noteElement) {
            noteElement.classList.add('active');
            noteElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);

    alert('笔记已保存！');
};

// 加载笔记
const loadNote = (index) => {
    if (index < 0 || index >= notes.length) {
        return;
    }

    try {
        const note = notes[index];
        if (!note) return;

        // 将笔记内容加载到编辑器
        input.value = note.content || '';
        noteTitle.value = note.title || '';
        currentNoteId = note.id;
        localStorage.setItem('current-note-id', note.id);

        // 更新预览
        updatePreview();

        // 添加视觉反馈
        document.querySelectorAll('#notesList li').forEach(item => {
            item.classList.remove('active');
        });

        const noteElement = document.querySelector(`li[data-index="${index}"]`);
        if (noteElement) {
            noteElement.classList.add('active');
            noteElement.scrollIntoView({ behavior: 'smooth' });
        }

        // 显示提示
        const snackbar = document.createElement('div');
        snackbar.className = 'snackbar';
        snackbar.textContent = `已加载: ${note.title || '未命名笔记'}`;
        document.body.appendChild(snackbar);

        setTimeout(() => {
            snackbar.classList.add('show');
            setTimeout(() => {
                snackbar.classList.remove('show');
                setTimeout(() => document.body.removeChild(snackbar), 300);
            }, 2000);
        }, 100);

    } catch (error) {
        alert('加载笔记时出错');
    }
};

// 删除笔记
const deleteNote = (index) => {
    if (confirm('确定删除此笔记？')) {
        const deletedNote = notes[index];
        notes.splice(index, 1);
        localStorage.setItem('markdown-notes', JSON.stringify(notes));

        // 如果删除的是当前笔记，清空编辑区
        if (deletedNote.id === currentNoteId) {
            clearEditor();
        }

        loadNotesList();
    }
};

// 清除编辑区
const clearEditor = () => {
    input.value = '';
    noteTitle.value = '';
    currentNoteId = '';
    localStorage.setItem('current-note-id', '');
    updatePreview();

    // 移除所有选中项的高亮
    document.querySelectorAll('#notesList li').forEach(item => {
        item.classList.remove('active');
    });
};

// 导出为TXT文件
const exportAsTxt = () => {
    if (!input.value.trim()) {
        alert('笔记内容为空，无法导出！');
        return;
    }

    const title = noteTitle.value.trim() || '未命名笔记';
    const content = input.value;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

    // 创建下载链接
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${title}.txt`;

    // 添加到文档并模拟点击
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // 清理
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
};

// 导出为HTML文件
const exportAsHtml = () => {
    if (!input.value.trim()) {
        alert('笔记内容为空，无法导出！');
        return;
    }

    const title = noteTitle.value.trim() || '未命名笔记';
    const markdownContent = input.value;
    const htmlContent = marked.parse(markdownContent);

    // 创建完整的HTML文档
    const fullHtml = `
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        h1, h2 {
            border-bottom: 1px solid #eee;
            padding-bottom: 0.3em;
        }
        code {
            background: #f0f0f0;
            padding: 2px 4px;
            border-radius: 3px;
        }
        pre {
            background: #f6f8fa;
            padding: 16px;
            border-radius: 6px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <h1>${title}</h1>
    ${htmlContent}
</body>
</html>
    `;

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });

    // 创建下载链接
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${title}.html`;

    // 添加到文档并模拟点击
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // 清理
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
};

// 事件监听
input.addEventListener('input', updatePreview);
saveBtn.addEventListener('click', saveNote);
clearBtn.addEventListener('click', clearEditor);
exportTxtBtn.addEventListener('click', exportAsTxt);
exportHtmlBtn.addEventListener('click', exportAsHtml);

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    // 初始化
    loadNotesList();

    // 手动添加事件监听器
    const reattachEvents = () => {
        document.querySelectorAll('.load-note').forEach((btn) => {
            btn.onclick = function () {
                const index = parseInt(this.dataset.index);
                loadNote(index);
            };
        });

        document.querySelectorAll('.delete-note').forEach((btn) => {
            btn.onclick = function () {
                const index = parseInt(this.dataset.index);
                deleteNote(index);
            };
        });
    };

    // 初始时绑定一次
    reattachEvents();

    // 监视DOM变化，确保新添加的元素也有事件
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.target.id === 'notesList') {
                reattachEvents();
            }
        });
    });

    observer.observe(notesList, { childList: true });

    // 如果有当前笔记ID，尝试加载它
    if (currentNoteId) {
        const noteIndex = notes.findIndex(note => note.id === currentNoteId);
        if (noteIndex !== -1) {
            setTimeout(() => loadNote(noteIndex), 300);
        }
    }
});

// 初始预览
updatePreview(); 