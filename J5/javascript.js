// 使用简洁的jQuery语法，等待DOM加载完成
$(function () {
    // 任务数组
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // 首次加载 - 清除示例任务并显示实际任务
    renderTasks();

    // 添加任务按钮点击事件
    $('#addButton').on('click', addTask);

    // 回车键添加任务
    $('#taskInput').on('keypress', function (e) {
        if (e.which === 13) {  // 13是回车键的键码
            addTask();
            return false;  // 阻止默认行为
        }
    });

    // 任务过滤器点击事件
    $('.filter-btn').on('click', function () {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        renderTasks();
    });

    // 使用事件委托绑定复选框变化事件
    $('#taskList').on('change', '.task-checkbox', function () {
        var $taskItem = $(this).closest('li');
        var index = $taskItem.data('index');

        // 更新任务状态
        tasks[index].completed = $(this).prop('checked');

        // 更新UI
        $taskItem.toggleClass('completed', tasks[index].completed);

        // 保存更新
        saveTasks();
        updateTaskCount();
    });

    // 使用事件委托绑定删除按钮点击事件
    $('#taskList').on('click', '.delete-btn', function () {
        var index = $(this).closest('li').data('index');
        tasks.splice(index, 1);
        renderTasks();
    });

    // 使用事件委托绑定任务文本双击事件
    $('#taskList').on('dblclick', '.task-text', function () {
        var $taskItem = $(this).closest('li');
        var index = $taskItem.data('index');
        var currentText = $(this).text();

        // 创建编辑输入框
        var $input = $('<input>')
            .attr('type', 'text')
            .addClass('edit-input')
            .val(currentText);

        // 替换文本为输入框
        $(this).replaceWith($input);
        $input.trigger('focus');

        // 处理编辑完成事件
        $input.on('blur keypress', function (e) {
            if (e.type === 'blur' || e.which === 13) {
                var newText = $(this).val().trim();

                if (newText) {
                    tasks[index].text = newText;
                    saveTasks();
                    renderTasks();
                }

                if (e.type === 'keypress') {
                    return false;  // 阻止回车键的默认行为
                }
            }
        });
    });

    // 清除已完成任务按钮点击事件
    $('#clearCompleted').on('click', function () {
        tasks = tasks.filter(function (task) {
            return !task.completed;
        });
        renderTasks();
    });

    // 添加新任务
    function addTask() {
        var taskText = $('#taskInput').val().trim();
        var taskPriority = $('#taskPriority').val();

        if (taskText) {
            tasks.push({
                text: taskText,
                priority: taskPriority,
                completed: false
            });

            // 清空输入框并重新获取焦点
            $('#taskInput').val('').trigger('focus');

            // 更新UI
            renderTasks();
        }
    }

    // 渲染任务列表
    function renderTasks() {
        // 清空列表
        $('#taskList').empty();

        // 获取当前过滤器
        var filter = $('.filter-btn.active').data('filter');

        // 根据过滤器筛选任务
        var filteredTasks = tasks;

        if (filter === 'active') {
            filteredTasks = $.grep(tasks, function (task) {
                return !task.completed;
            });
        } else if (filter === 'completed') {
            filteredTasks = $.grep(tasks, function (task) {
                return task.completed;
            });
        }

        // 添加任务到列表
        $.each(filteredTasks, function (index, task) {
            var $taskItem = $('<li>')
                .addClass('task-item')
                .addClass('priority-' + task.priority)
                .toggleClass('completed', task.completed)
                .data('index', index);

            var $checkbox = $('<input>')
                .addClass('task-checkbox')
                .attr('type', 'checkbox')
                .prop('checked', task.completed);

            var $taskText = $('<span>')
                .addClass('task-text')
                .text(task.text);

            var $priorityTag = $('<span>')
                .addClass('priority-tag')
                .text(task.priority + '优先级');

            var $deleteBtn = $('<button>')
                .addClass('delete-btn')
                .text('删除');

            // 组装任务项
            $taskItem.append($checkbox, $taskText, $priorityTag, $deleteBtn);
            $('#taskList').append($taskItem);
        });

        // 更新任务计数
        updateTaskCount();
        saveTasks();
    }

    // 更新任务计数
    function updateTaskCount() {
        var activeCount = $.grep(tasks, function (task) {
            return !task.completed;
        }).length;

        $('#taskCount').text(activeCount + ' 个未完成任务');
    }

    // 保存任务到本地存储
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}); 