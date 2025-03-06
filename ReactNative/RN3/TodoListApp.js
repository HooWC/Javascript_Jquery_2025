/**
 * React Native示例项目 - 待办事项应用
 * 一个简单但功能完整的待办事项(Todo)应用，展示了React Native的基本项目架构
 */

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Modal,
    Alert,
    StatusBar,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Animated,
    AsyncStorage,
} from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';

// 模拟AsyncStorage（在实际应用中使用真实的AsyncStorage或其他存储方式）
const saveData = async (key, value) => {
    try {
        console.log(`保存数据: ${key}, 值:`, value);
        // await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('保存数据失败:', error);
    }
};

const loadData = async (key) => {
    try {
        // const value = await AsyncStorage.getItem(key);
        // return value ? JSON.parse(value) : null;
        return null; // 模拟返回空数据
    } catch (error) {
        console.error('加载数据失败:', error);
        return null;
    }
};

// =============== 1. 头部组件 ===============

const Header = ({ openModal }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>待办事项</Text>
            <TouchableOpacity onPress={openModal}>
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

// =============== 2. 任务项组件 ===============

const TodoItem = ({ item, toggleComplete, deleteTodo, editTodo }) => {
    const [scaleValue] = useState(new Animated.Value(1));

    // 删除动画
    const animateDelete = (callback) => {
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 0.8,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(callback);
    };

    // 处理删除
    const handleDelete = () => {
        Alert.alert(
            '删除任务',
            `确定要删除"${item.title}"吗？`,
            [
                {
                    text: '取消',
                    style: 'cancel',
                },
                {
                    text: '删除',
                    onPress: () => {
                        animateDelete(() => deleteTodo(item.id));
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    return (
        <Animated.View style={[
            styles.todoItem,
            { transform: [{ scale: scaleValue }] }
        ]}>
            <TouchableOpacity
                style={styles.todoCheckbox}
                onPress={() => toggleComplete(item.id)}
            >
                {item.completed ? (
                    <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                ) : (
                    <Ionicons name="ellipse-outline" size={24} color="#757575" />
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.todoText}
                onPress={() => editTodo(item)}
            >
                <Text style={[
                    styles.todoTitle,
                    item.completed && styles.completedText
                ]}>
                    {item.title}
                </Text>
                {item.description ? (
                    <Text style={[
                        styles.todoDescription,
                        item.completed && styles.completedText
                    ]}>
                        {item.description}
                    </Text>
                ) : null}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
            >
                <MaterialIcons name="delete-outline" size={24} color="#FF5252" />
            </TouchableOpacity>
        </Animated.View>
    );
};

// =============== 3. 添加/编辑任务模态框 ===============

const TodoModal = ({ visible, closeModal, addTodo, editingTodo, updateTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // 当编辑模式激活时，设置初始值
    useEffect(() => {
        if (editingTodo) {
            setTitle(editingTodo.title);
            setDescription(editingTodo.description || '');
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editingTodo, visible]);

    const handleSubmit = () => {
        if (title.trim() === '') {
            Alert.alert('错误', '任务标题不能为空');
            return;
        }

        if (editingTodo) {
            updateTodo({
                ...editingTodo,
                title: title.trim(),
                description: description.trim(),
            });
        } else {
            addTodo({
                id: Date.now().toString(),
                title: title.trim(),
                description: description.trim(),
                completed: false,
                createdAt: new Date(),
            });
        }

        closeModal();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>
                                    {editingTodo ? '编辑任务' : '添加新任务'}
                                </Text>
                                <TouchableOpacity onPress={closeModal}>
                                    <AntDesign name="close" size={24} color="#333" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>标题</Text>
                                <TextInput
                                    style={styles.input}
                                    value={title}
                                    onChangeText={setTitle}
                                    placeholder="输入任务标题"
                                    autoFocus
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>描述 (可选)</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    value={description}
                                    onChangeText={setDescription}
                                    placeholder="输入任务描述"
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                />
                            </View>

                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.submitButtonText}>
                                    {editingTodo ? '更新' : '添加'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

// =============== 4. 空状态组件 ===============

const EmptyState = () => {
    return (
        <View style={styles.emptyState}>
            <Ionicons name="checkmark-done-circle-outline" size={80} color="#BDBDBD" />
            <Text style={styles.emptyTitle}>没有待办事项</Text>
            <Text style={styles.emptyDescription}>
                点击右上角的加号添加你的第一个任务
            </Text>
        </View>
    );
};

// =============== 5. 待办事项统计 ===============

const TodoStats = ({ todos }) => {
    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.completed).length;
    const pendingTodos = totalTodos - completedTodos;

    // 计算完成百分比
    const completionPercentage = totalTodos > 0
        ? Math.round((completedTodos / totalTodos) * 100)
        : 0;

    return (
        <View style={styles.statsContainer}>
            <View style={styles.statsItem}>
                <Text style={styles.statsNumber}>{totalTodos}</Text>
                <Text style={styles.statsLabel}>总计</Text>
            </View>

            <View style={styles.statsItem}>
                <Text style={[styles.statsNumber, { color: '#4CAF50' }]}>
                    {completedTodos}
                </Text>
                <Text style={styles.statsLabel}>已完成</Text>
            </View>

            <View style={styles.statsItem}>
                <Text style={[styles.statsNumber, { color: '#FF9800' }]}>
                    {pendingTodos}
                </Text>
                <Text style={styles.statsLabel}>待办</Text>
            </View>

            <View style={styles.statsItem}>
                <Text style={styles.statsNumber}>{completionPercentage}%</Text>
                <Text style={styles.statsLabel}>完成率</Text>
            </View>
        </View>
    );
};

// =============== 6. 主应用组件 ===============

export default function TodoApp() {
    // 状态
    const [todos, setTodos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);

    // 加载本地数据
    useEffect(() => {
        const fetchData = async () => {
            const savedTodos = await loadData('todos');
            if (savedTodos) {
                setTodos(savedTodos);
            } else {
                // 设置一些示例数据
                const exampleTodos = [
                    {
                        id: '1',
                        title: '学习React Native',
                        description: '完成基础组件和API的学习',
                        completed: true,
                        createdAt: new Date(),
                    },
                    {
                        id: '2',
                        title: '构建待办事项应用',
                        description: '实现一个简单但功能完整的Todo应用示例',
                        completed: false,
                        createdAt: new Date(),
                    },
                    {
                        id: '3',
                        title: '添加动画效果',
                        description: '',
                        completed: false,
                        createdAt: new Date(),
                    },
                ];
                setTodos(exampleTodos);
            }
        };

        fetchData();
    }, []);

    // 保存数据到本地
    useEffect(() => {
        if (todos.length > 0) {
            saveData('todos', todos);
        }
    }, [todos]);

    // 添加新任务
    const addTodo = (newTodo) => {
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
    };

    // 切换任务完成状态
    const toggleComplete = (id) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id
                ? { ...todo, completed: !todo.completed }
                : todo
        );
        setTodos(updatedTodos);
    };

    // 删除任务
    const deleteTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    // 编辑任务
    const editTodo = (todo) => {
        setEditingTodo(todo);
        setModalVisible(true);
    };

    // 更新任务
    const updateTodo = (updatedTodo) => {
        const updatedTodos = todos.map(todo =>
            todo.id === updatedTodo.id ? updatedTodo : todo
        );
        setTodos(updatedTodos);
        setEditingTodo(null);
    };

    // 打开模态框
    const openModal = () => {
        setEditingTodo(null);
        setModalVisible(true);
    };

    // 关闭模态框
    const closeModal = () => {
        setModalVisible(false);
        setEditingTodo(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2196F3" />

            <Header openModal={openModal} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.content}>
                    {todos.length > 0 && <TodoStats todos={todos} />}

                    {todos.length > 0 ? (
                        <FlatList
                            data={todos}
                            renderItem={({ item }) => (
                                <TodoItem
                                    item={item}
                                    toggleComplete={toggleComplete}
                                    deleteTodo={deleteTodo}
                                    editTodo={editTodo}
                                />
                            )}
                            keyExtractor={item => item.id}
                            contentContainerStyle={styles.listContainer}
                        />
                    ) : (
                        <EmptyState />
                    )}
                </View>
            </KeyboardAvoidingView>

            <TodoModal
                visible={modalVisible}
                closeModal={closeModal}
                addTodo={addTodo}
                editingTodo={editingTodo}
                updateTodo={updateTodo}
            />
        </SafeAreaView>
    );
}

// =============== 样式 ===============

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2196F3',
        paddingHorizontal: 20,
        paddingVertical: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 15,
    },
    listContainer: {
        paddingBottom: 20,
    },
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    todoCheckbox: {
        marginRight: 10,
    },
    todoText: {
        flex: 1,
    },
    todoTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    todoDescription: {
        fontSize: 14,
        color: '#757575',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#BDBDBD',
    },
    deleteButton: {
        padding: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '85%',
        maxHeight: '70%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#F9F9F9',
    },
    textArea: {
        height: 100,
    },
    submitButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#757575',
        marginTop: 16,
    },
    emptyDescription: {
        fontSize: 14,
        color: '#9E9E9E',
        textAlign: 'center',
        marginTop: 8,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    statsItem: {
        alignItems: 'center',
    },
    statsNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2196F3',
    },
    statsLabel: {
        fontSize: 12,
        color: '#757575',
        marginTop: 4,
    },
});

/**
 * 说明：
 * 
 * 这是一个简单但功能完整的待办事项应用示例，主要功能包括：
 * 1. 添加、编辑、删除待办事项
 * 2. 标记待办事项为已完成/未完成
 * 3. 显示待办事项统计信息
 * 4. 使用本地存储保存待办事项（这里用模拟方式实现）
 * 5. 添加基本动画效果
 * 
 * 在实际应用中，你可能需要添加以下功能：
 * - 实际的数据持久化（AsyncStorage、SQLite等）
 * - 分类和筛选功能
 * - 搜索功能
 * - 更丰富的动画和交互
 * - 日期/提醒功能
 * - 用户账户和云同步
 */ 