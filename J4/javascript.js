// 获取元素
var resultElement = document.getElementById('result');
var historyList = document.getElementById('historyList');

// 全局变量
var calculationHistory = [];

// 初始化函数
window.onload = function () {
    // 从本地存储加载历史记录
    loadHistory();

    // 设置键盘事件
    document.onkeydown = function (event) {
        var key = event.key;

        // 数字和运算符
        if (/[\d\+\-\*\/\.\%]/.test(key)) {
            appendToDisplay(key);
        }
        // 回车键计算
        else if (key === 'Enter') {
            calculate();
        }
        // 退格键删除
        else if (key === 'Backspace') {
            deleteLastChar();
        }
        // Escape键清除
        else if (key === 'Escape') {
            clearDisplay();
        }
    };
};

// 向显示区域添加内容
function appendToDisplay(value) {
    resultElement.value += value;
}

// 清除显示
function clearDisplay() {
    resultElement.value = '';
}

// 删除最后一个字符
function deleteLastChar() {
    var currentValue = resultElement.value;
    resultElement.value = currentValue.substring(0, currentValue.length - 1);
}

// 计算结果
function calculate() {
    try {
        var expression = resultElement.value;

        // 如果表达式为空，不进行计算
        if (!expression) {
            return;
        }

        // 替换%为/100
        expression = expression.replace(/%/g, '/100');

        // 使用 eval 计算表达式（仅在受控环境中使用）
        var result = eval(expression);

        // 保存到历史记录
        var calculation = expression + ' = ' + result;
        addToHistory(calculation);

        // 更新显示
        resultElement.value = result;
    } catch (error) {
        // 处理错误
        resultElement.value = '错误';
        setTimeout(function () {
            clearDisplay();
        }, 1000);
    }
}

// 添加到历史记录
function addToHistory(calculation) {
    // 限制历史记录数量
    if (calculationHistory.length >= 10) {
        calculationHistory.shift(); // 删除最旧的记录
    }

    calculationHistory.push(calculation);

    // 保存到本地存储
    saveHistory();

    // 更新历史记录显示
    updateHistoryDisplay();
}

// 更新历史记录显示
function updateHistoryDisplay() {
    // 清空当前列表
    historyList.innerHTML = '';

    // 添加新条目
    for (var i = calculationHistory.length - 1; i >= 0; i--) {
        var listItem = document.createElement('li');
        listItem.textContent = calculationHistory[i];

        // 添加点击事件，点击历史记录可以重新加载表达式
        listItem.onclick = function () {
            var parts = this.textContent.split(' = ');
            resultElement.value = parts[0];
        };

        historyList.appendChild(listItem);
    }
}

// 清除历史记录
function clearHistory() {
    calculationHistory = [];
    saveHistory();
    updateHistoryDisplay();
}

// 保存历史记录到本地存储
function saveHistory() {
    localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));
}

// 从本地存储加载历史记录
function loadHistory() {
    var savedHistory = localStorage.getItem('calculationHistory');
    if (savedHistory) {
        calculationHistory = JSON.parse(savedHistory);
        updateHistoryDisplay();
    }
} 