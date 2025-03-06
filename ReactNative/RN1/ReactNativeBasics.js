/**
 * React Native基础用法示例
 * 包含React Native核心概念和基础组件
 */

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Image,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Alert,
    Switch,
    ActivityIndicator,
    Platform,
    Dimensions,
} from 'react-native';

// =============== 1. 基础组件 ===============

// 基本组件示例
export const BasicComponents = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>基础组件示例</Text>

            {/* 文本显示 */}
            <Text style={styles.text}>这是一个文本组件</Text>
            <Text style={[styles.text, { fontWeight: 'bold' }]}>
                可以使用<Text style={{ color: 'red' }}>嵌套文本</Text>来实现不同样式
            </Text>

            {/* 图片组件 */}
            <Text style={styles.subtitle}>图片组件</Text>
            <Image
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                style={{ width: 50, height: 50 }}
            />

            {/* 按钮组件 */}
            <Text style={styles.subtitle}>按钮组件</Text>
            <Button
                title="点击按钮"
                onPress={() => Alert.alert('按钮被点击了')}
            />

            {/* 输入框组件 */}
            <Text style={styles.subtitle}>输入框组件</Text>
            <TextInput
                style={styles.input}
                placeholder="请输入文本"
            />
        </View>
    );
};

// =============== 2. 样式和布局 ===============

// 样式示例组件
export const StylesExample = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>样式和布局</Text>

            {/* 使用StyleSheet创建的样式 */}
            <View style={styles.box}>
                <Text style={styles.boxText}>使用StyleSheet</Text>
            </View>

            {/* 内联样式 */}
            <View style={{
                backgroundColor: 'orange',
                padding: 10,
                borderRadius: 5,
                marginVertical: 10
            }}>
                <Text style={{ color: 'white' }}>内联样式</Text>
            </View>

            {/* 组合样式 */}
            <View style={[styles.box, { backgroundColor: 'purple' }]}>
                <Text style={styles.boxText}>组合样式</Text>
            </View>

            {/* Flexbox布局 */}
            <Text style={styles.subtitle}>Flexbox布局</Text>
            <View style={styles.flexContainer}>
                <View style={[styles.flexBox, { backgroundColor: 'red' }]} />
                <View style={[styles.flexBox, { backgroundColor: 'green' }]} />
                <View style={[styles.flexBox, { backgroundColor: 'blue' }]} />
            </View>
        </View>
    );
};

// =============== 3. 状态和Props ===============

// 状态示例组件
export const StateExample = () => {
    // 使用useState Hook管理状态
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>状态(State)示例</Text>

            {/* 计数器示例 */}
            <Text style={styles.text}>计数: {count}</Text>
            <View style={styles.buttonRow}>
                <Button title="增加" onPress={() => setCount(count + 1)} />
                <Button title="减少" onPress={() => setCount(count - 1)} />
            </View>

            {/* 文本输入示例 */}
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="请输入文本"
            />
            <Text style={styles.text}>你输入的文本: {text}</Text>

            {/* 开关示例 */}
            <View style={styles.switchRow}>
                <Text style={styles.text}>启用功能: </Text>
                <Switch
                    value={isEnabled}
                    onValueChange={setIsEnabled}
                />
            </View>
            <Text style={styles.text}>
                功能当前已{isEnabled ? '启用' : '禁用'}
            </Text>
        </View>
    );
};

// Props示例组件
export const PropsExample = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>属性(Props)示例</Text>

            {/* 使用不同的props来渲染组件 */}
            <Greeting name="张三" />
            <Greeting name="李四" />
            <Greeting name="王五" />

            {/* 使用更多props的组件 */}
            <UserCard
                name="张三"
                age={28}
                isAdmin={true}
                avatar="https://reactnative.dev/img/tiny_logo.png"
            />
        </View>
    );
};

// 使用props的组件
const Greeting = ({ name }) => {
    return (
        <Text style={styles.text}>你好, {name}!</Text>
    );
};

// 使用多个props的组件
const UserCard = ({ name, age, isAdmin, avatar }) => {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: avatar }}
                style={styles.avatar}
            />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{name}</Text>
                <Text style={styles.cardText}>年龄: {age}</Text>
                <Text style={styles.cardText}>
                    角色: {isAdmin ? '管理员' : '普通用户'}
                </Text>
            </View>
        </View>
    );
};

// =============== 4. 处理用户交互 ===============

// 事件处理示例
export const EventHandlingExample = () => {
    const [pressCount, setPressCount] = useState(0);
    const [longPressCount, setLongPressCount] = useState(0);
    const [inputText, setInputText] = useState('');

    // 简单点击处理
    const handlePress = () => {
        setPressCount(pressCount + 1);
        Alert.alert('按钮被点击');
    };

    // 长按处理
    const handleLongPress = () => {
        setLongPressCount(longPressCount + 1);
        Alert.alert('按钮被长按');
    };

    // 文本输入处理
    const handleTextChange = (text) => {
        setInputText(text);
    };

    // 提交处理
    const handleSubmit = () => {
        Alert.alert('提交的文本', inputText);
        setInputText('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>事件处理示例</Text>

            {/* 基本按钮事件 */}
            <Button
                title="点击按钮"
                onPress={handlePress}
            />
            <Text style={styles.text}>点击次数: {pressCount}</Text>

            {/* 可触摸组件 */}
            <TouchableOpacity
                style={styles.touchable}
                onPress={() => Alert.alert('TouchableOpacity被点击')}
            >
                <Text style={styles.touchableText}>TouchableOpacity</Text>
            </TouchableOpacity>

            <TouchableHighlight
                style={styles.touchable}
                underlayColor="#DDDDDD"
                onPress={() => Alert.alert('TouchableHighlight被点击')}
                onLongPress={handleLongPress}
            >
                <Text style={styles.touchableText}>
                    TouchableHighlight (长按我)
                </Text>
            </TouchableHighlight>
            <Text style={styles.text}>长按次数: {longPressCount}</Text>

            {/* 文本输入处理 */}
            <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={handleTextChange}
                placeholder="请输入文本"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
            />
            <Button
                title="提交"
                onPress={handleSubmit}
            />
        </View>
    );
};

// =============== 5. 生命周期和Hooks ===============

// 使用Hooks的组件示例
export const HooksExample = () => {
    // 状态Hook
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    // 副作用Hook
    useEffect(() => {
        // 组件挂载时执行
        console.log('组件已挂载');

        // 定时器示例
        const timer = setTimeout(() => {
            console.log('定时器触发');
        }, 2000);

        // 清理函数 - 组件卸载时执行
        return () => {
            console.log('组件将卸载');
            clearTimeout(timer);
        };
    }, []); // 空依赖数组表示只在挂载和卸载时执行

    // 带有依赖的副作用
    useEffect(() => {
        console.log('计数发生变化:', count);
        // 这里可以执行依赖于count的副作用操作
    }, [count]); // 当count变化时执行

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hooks示例</Text>

            <Text style={styles.text}>计数: {count}</Text>
            <Button
                title="增加计数"
                onPress={() => setCount(count + 1)}
            />

            <Button
                title={isVisible ? "隐藏子组件" : "显示子组件"}
                onPress={() => setIsVisible(!isVisible)}
            />

            {isVisible && <ChildComponent />}
        </View>
    );
};

// 子组件，用于演示挂载/卸载生命周期
const ChildComponent = () => {
    useEffect(() => {
        console.log('子组件已挂载');
        return () => {
            console.log('子组件将卸载');
        };
    }, []);

    return (
        <View style={styles.box}>
            <Text style={styles.boxText}>子组件</Text>
        </View>
    );
};

// =============== 6. 条件渲染和列表 ===============

// 条件渲染示例
export const ConditionalRenderingExample = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // 模拟登录
    const handleLogin = () => {
        setIsLoading(true);
        // 模拟网络请求
        setTimeout(() => {
            setIsLoggedIn(true);
            setIsLoading(false);
        }, 1500);
    };

    // 模拟登出
    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>条件渲染示例</Text>

            {/* 加载指示器条件渲染 */}
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    {/* 基于条件渲染不同内容 */}
                    {isLoggedIn ? (
                        <View>
                            <Text style={styles.text}>欢迎回来!</Text>
                            <Button title="登出" onPress={handleLogout} />
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.text}>请登录以继续</Text>
                            <Button title="登录" onPress={handleLogin} />
                        </View>
                    )}
                </>
            )}

            {/* 使用逻辑与运算符的条件渲染 */}
            {isLoggedIn && (
                <View style={styles.box}>
                    <Text style={styles.boxText}>
                        这仅在登录后显示
                    </Text>
                </View>
            )}

            {/* 三元运算符内联条件 */}
            <Text style={styles.text}>
                状态: {isLoggedIn ? '已登录' : '未登录'}
            </Text>
        </View>
    );
};

// 列表渲染示例
export const ListRenderingExample = () => {
    // 示例数据
    const items = ['苹果', '香蕉', '橙子', '葡萄', '西瓜'];

    const users = [
        { id: 1, name: '张三', age: 28 },
        { id: 2, name: '李四', age: 32 },
        { id: 3, name: '王五', age: 25 },
        { id: 4, name: '赵六', age: 40 },
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>列表渲染示例</Text>

            {/* 简单数组映射 */}
            <Text style={styles.subtitle}>简单列表:</Text>
            <View style={styles.list}>
                {items.map((item, index) => (
                    <Text key={index} style={styles.listItem}>
                        • {item}
                    </Text>
                ))}
            </View>

            {/* 对象数组映射 */}
            <Text style={styles.subtitle}>用户列表:</Text>
            <View style={styles.list}>
                {users.map(user => (
                    <View key={user.id} style={styles.userItem}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userAge}>年龄: {user.age}</Text>
                    </View>
                ))}
            </View>

            {/* FlatList通常是更好的选择，但这里简单演示 */}
            <Text style={styles.note}>
                注意: 在实际应用中，应该使用FlatList来渲染长列表以获得更好的性能
            </Text>
        </ScrollView>
    );
};

// =============== 7. 平台特定代码 ===============

// 平台特定代码示例
export const PlatformSpecificExample = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>平台特定代码示例</Text>

            {/* 使用Platform模块 */}
            <Text style={styles.text}>
                当前平台: {Platform.OS}
            </Text>
            <Text style={styles.text}>
                版本: {Platform.Version}
            </Text>

            {/* 平台特定代码风格 */}
            <View style={platformStyles.box}>
                <Text style={platformStyles.text}>
                    平台特定样式
                </Text>
            </View>

            {/* 平台特定组件 */}
            {Platform.OS === 'ios' ? (
                <Text style={styles.text}>这段内容只在iOS上显示</Text>
            ) : (
                <Text style={styles.text}>这段内容只在Android上显示</Text>
            )}

            {/* Platform.select使用 */}
            <Text style={styles.text}>
                {Platform.select({
                    ios: 'iOS特定文本',
                    android: 'Android特定文本',
                    default: '其他平台文本'
                })}
            </Text>

            {/* 平台特定扩展名文件 */}
            <Text style={styles.note}>
                也可以使用平台特定文件如:
                Component.ios.js 和 Component.android.js
            </Text>
        </View>
    );
};

// 平台特定样式
const platformStyles = StyleSheet.create({
    box: {
        ...Platform.select({
            ios: {
                backgroundColor: '#CCCCFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                backgroundColor: '#CCFFCC',
                elevation: 4,
            },
            default: {
                backgroundColor: '#FFCCCC',
            }
        }),
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    text: {
        ...Platform.select({
            ios: {
                fontWeight: '600',
                color: 'blue',
            },
            android: {
                fontWeight: 'bold',
                color: 'green',
            },
            default: {
                color: 'black',
            }
        }),
        textAlign: 'center',
    }
});

// =============== 8. 响应式布局 ===============

// 响应式设计示例
export const ResponsiveLayoutExample = () => {
    // 获取屏幕尺寸
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    // 根据屏幕宽度计算布局
    const isTablet = windowWidth >= 768;
    const columnCount = isTablet ? 2 : 1;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>响应式布局示例</Text>

            <Text style={styles.text}>
                屏幕宽度: {windowWidth}px, 高度: {windowHeight}px
            </Text>
            <Text style={styles.text}>
                设备类型: {isTablet ? '平板' : '手机'}
            </Text>

            {/* 响应式网格布局 */}
            <Text style={styles.subtitle}>响应式网格:</Text>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
            }}>
                {[1, 2, 3, 4].map((item) => (
                    <View
                        key={item}
                        style={{
                            width: windowWidth / columnCount - 20,
                            height: 100,
                            backgroundColor: `rgba(0, 0, 255, 0.${item * 2})`,
                            margin: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: 'white' }}>项目 {item}</Text>
                    </View>
                ))}
            </View>

            {/* 响应式字体 */}
            <Text style={styles.subtitle}>响应式字体:</Text>
            <Text style={{
                fontSize: windowWidth * 0.05, // 字体大小为屏幕宽度的5%
                fontWeight: 'bold',
                textAlign: 'center',
                margin: 10,
            }}>
                这是响应式字体大小
            </Text>

            {/* 根据设备类型的布局 */}
            <View style={{
                flexDirection: isTablet ? 'row' : 'column',
                padding: 10,
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#FFCCCC',
                    padding: 10,
                    margin: 5,
                }}>
                    <Text>区域1</Text>
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: '#CCFFCC',
                    padding: 10,
                    margin: 5,
                }}>
                    <Text>区域2</Text>
                </View>
            </View>
        </ScrollView>
    );
};

// =============== 通用样式 ===============

const styles = StyleSheet.create({
    // 容器样式
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    // 标题样式
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
        color: '#444',
    },
    // 文本样式
    text: {
        fontSize: 16,
        marginVertical: 5,
        color: '#333',
    },
    // 输入框样式
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    // 盒子样式
    box: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    boxText: {
        color: 'white',
        textAlign: 'center',
    },
    // Flex布局容器
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    flexBox: {
        width: 50,
        height: 50,
        borderRadius: 4,
    },
    // 按钮行
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    // 开关行
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    // 可触摸元素
    touchable: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
    },
    touchableText: {
        color: 'white',
        fontWeight: 'bold',
    },
    // 卡片样式
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    cardContent: {
        marginLeft: 15,
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardText: {
        fontSize: 14,
        color: '#666',
    },
    // 列表样式
    list: {
        marginVertical: 10,
    },
    listItem: {
        fontSize: 16,
        marginVertical: 5,
        paddingLeft: 10,
    },
    userItem: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userAge: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    // 注释文本
    note: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#666',
        marginTop: 15,
        textAlign: 'center',
    },
});

// =============== 主应用组件 ===============

// 主应用组件示例
export default function App() {
    // 这里只是为了展示每个示例组件，实际应用可能会使用导航
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <ScrollView style={styles.container}>
                <Text style={[styles.title, { fontSize: 24 }]}>
                    React Native基础示例
                </Text>

                {/* 取消注释下面的组件以查看不同的示例 */}
                <BasicComponents />
                {/* <StylesExample /> */}
                {/* <StateExample /> */}
                {/* <PropsExample /> */}
                {/* <EventHandlingExample /> */}
                {/* <HooksExample /> */}
                {/* <ConditionalRenderingExample /> */}
                {/* <ListRenderingExample /> */}
                {/* <PlatformSpecificExample /> */}
                {/* <ResponsiveLayoutExample /> */}

                <Text style={styles.note}>
                    注意: 请在文件中取消注释以查看其他示例组件
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

/**
 * 额外说明：
 * 
 * 1. 这个文件包含了多个React Native基础示例组件
 * 2. 默认只渲染了BasicComponents，可以在App组件中取消注释其他组件
 * 3. 在实际应用中，这些组件通常会分散在不同的文件中
 * 4. 为了简单起见，这里没有包含导航功能
 * 5. 如需查看运行效果，需要在React Native项目中使用此文件
 */ 