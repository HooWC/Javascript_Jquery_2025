/**
 * React Native常用组件和API示例
 * 包含进阶组件、导航、动画和常用API
 */

import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SectionList,
    ScrollView,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    Alert,
    Animated,
    Easing,
    Image,
    Button,
    RefreshControl,
    Linking,
    Vibration,
    Switch,
    Pressable,
    Share,
    useWindowDimensions,
    StatusBar,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    Platform,
} from 'react-native';

// =============== 1. 高级列表组件 ===============

// FlatList示例 - 用于长列表的高性能渲染
export const FlatListExample = () => {
    // 生成测试数据
    const generateData = (count) => {
        return Array(count).fill().map((_, index) => ({
            id: `item-${index}`,
            title: `项目 ${index + 1}`,
            description: `这是项目${index + 1}的描述文本`,
        }));
    };

    const [data, setData] = useState(generateData(50));
    const [refreshing, setRefreshing] = useState(false);

    // 模拟下拉刷新
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setData(generateData(50));
            setRefreshing(false);
        }, 1500);
    };

    // 渲染列表项
    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => Alert.alert('点击项目', `你点击了 ${item.title}`)}
        >
            <Text style={styles.listItemTitle}>{item.title}</Text>
            <Text style={styles.listItemDesc}>{item.description}</Text>
        </TouchableOpacity>
    );

    // 列表项分隔线
    const ItemSeparator = () => <View style={styles.separator} />;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>FlatList示例</Text>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={ItemSeparator}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#007AFF']}
                        tintColor="#007AFF"
                    />
                }
                ListHeaderComponent={
                    <Text style={styles.listHeader}>这是列表头部</Text>
                }
                ListFooterComponent={
                    <Text style={styles.listFooter}>共 {data.length} 个项目</Text>
                }
                initialNumToRender={10}
                windowSize={5}
                maxToRenderPerBatch={5}
            />
        </View>
    );
};

// SectionList示例 - 用于分组列表
export const SectionListExample = () => {
    // 分组数据
    const DATA = [
        {
            title: '水果',
            data: ['苹果', '香蕉', '橙子', '葡萄', '西瓜'],
        },
        {
            title: '蔬菜',
            data: ['土豆', '番茄', '黄瓜', '白菜', '胡萝卜'],
        },
        {
            title: '肉类',
            data: ['牛肉', '猪肉', '羊肉', '鸡肉', '鱼肉'],
        },
    ];

    // 渲染分组标题
    const renderSectionHeader = ({ section: { title } }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
    );

    // 渲染列表项
    const renderItem = ({ item, index, section }) => (
        <TouchableOpacity
            style={styles.sectionItem}
            onPress={() => Alert.alert('点击项目', `你点击了 ${section.title} 类别中的 ${item}`)}
        >
            <Text style={styles.sectionItemText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SectionList示例</Text>

            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                stickySectionHeadersEnabled={true}
                ListHeaderComponent={
                    <Text style={styles.listHeader}>分组列表示例</Text>
                }
                ListFooterComponent={
                    <Text style={styles.listFooter}>共 {DATA.length} 个分组</Text>
                }
            />
        </View>
    );
};

// =============== 2. 模态框和弹窗 ===============

// 模态框示例
export const ModalExample = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modal示例</Text>

            <Button
                title="显示模态框"
                onPress={() => setModalVisible(true)}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('模态框已关闭');
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>这是一个模态框！</Text>

                        <Text style={styles.modalContent}>
                            模态框可以用来显示重要信息，或者需要用户完成的任务。
                        </Text>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>关闭模态框</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// 弹窗API示例
export const AlertExample = () => {
    const showSimpleAlert = () => {
        Alert.alert(
            '简单提示',
            '这是一个简单的提示信息',
            [
                { text: '确定', onPress: () => console.log('确定按钮已按下') }
            ]
        );
    };

    const showConfirmAlert = () => {
        Alert.alert(
            '确认操作',
            '您确定要执行此操作吗？',
            [
                {
                    text: '取消',
                    onPress: () => console.log('取消按钮已按下'),
                    style: 'cancel'
                },
                {
                    text: '确定',
                    onPress: () => console.log('确定按钮已按下')
                }
            ],
            { cancelable: false }
        );
    };

    const showThreeButtonAlert = () => {
        Alert.alert(
            '选择操作',
            '请选择以下操作之一',
            [
                {
                    text: '稍后询问',
                    onPress: () => console.log('稍后询问按钮已按下'),
                    style: 'cancel'
                },
                {
                    text: '取消',
                    onPress: () => console.log('取消按钮已按下')
                },
                {
                    text: '确定',
                    onPress: () => console.log('确定按钮已按下')
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alert弹窗示例</Text>

            <View style={styles.buttonContainer}>
                <Button
                    title="简单提示"
                    onPress={showSimpleAlert}
                />

                <Button
                    title="确认操作"
                    onPress={showConfirmAlert}
                />

                <Button
                    title="三按钮弹窗"
                    onPress={showThreeButtonAlert}
                />
            </View>
        </View>
    );
};

// =============== 3. 动画 ===============

// 基本动画示例
export const BasicAnimationExample = () => {
    // 创建动画值
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateAnim = useRef(new Animated.Value(-100)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        // 组合动画序列
        Animated.sequence([
            // 淡入动画
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            // 移动动画
            Animated.timing(translateAnim, {
                toValue: 0,
                duration: 800,
                easing: Easing.bounce,
                useNativeDriver: true,
            }),
            // 缩放动画
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const restartAnimation = () => {
        // 重置动画值
        fadeAnim.setValue(0);
        translateAnim.setValue(-100);
        scaleAnim.setValue(0.5);

        // 重新启动动画
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(translateAnim, {
                toValue: 0,
                duration: An800,
                easing: Easing.bounce,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>基本动画示例</Text>

            {/* 淡入、移动和缩放的组合动画 */}
            <Animated.View
                style={[
                    styles.animatedBox,
                    {
                        opacity: fadeAnim,
                        transform: [
                            { translateX: translateAnim },
                            { scale: scaleAnim }
                        ],
                    },
                ]}
            >
                <Text style={styles.animatedBoxText}>动画盒子</Text>
            </Animated.View>

            <Button
                title="重新播放动画"
                onPress={restartAnimation}
            />
        </View>
    );
};

// 复杂动画示例
export const AdvancedAnimationExample = () => {
    // 动画值
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const bounceAnim = useRef(new Animated.Value(0)).current;

    // 动画控制状态
    const [isAnimating, setIsAnimating] = useState(false);

    // 启动/停止动画
    const toggleAnimation = () => {
        if (isAnimating) {
            // 停止动画
            Animated.loop(Animated.parallel([
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.sequence([
                    Animated.timing(bounceAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(bounceAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
            ])).stop();
        } else {
            // 重置动画值
            rotateAnim.setValue(0);
            bounceAnim.setValue(0);

            // 启动动画
            Animated.loop(Animated.parallel([
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.sequence([
                    Animated.timing(bounceAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(bounceAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
            ])).start();
        }

        setIsAnimating(!isAnimating);
    };

    // 计算旋转角度
    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    // 计算弹跳效果
    const bounce = bounceAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -30],
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>高级动画示例</Text>

            <Animated.View
                style={[
                    styles.complexAnimatedBox,
                    {
                        transform: [
                            { rotate },
                            { translateY: bounce },
                        ],
                    },
                ]}
            >
                <Text style={styles.animatedBoxText}>旋转弹跳</Text>
            </Animated.View>

            <Button
                title={isAnimating ? "停止动画" : "开始动画"}
                onPress={toggleAnimation}
            />
        </View>
    );
};

// =============== 4. 设备API和功能 ===============

// 设备API示例
export const DeviceAPIsExample = () => {
    // 处理链接打开
    const handleOpenURL = async (url) => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert('错误', `无法打开URL: ${url}`);
        }
    };

    // 振动设备
    const handleVibration = () => {
        // 简单振动
        Vibration.vibrate();
    };

    // 振动设备（自定义模式）
    const handlePatternVibration = () => {
        // 振动模式：震动400ms，暂停100ms，震动400ms
        Vibration.vibrate([400, 100, 400]);
    };

    // 分享内容
    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: '查看这个很棒的React Native示例!',
                url: 'https://reactnative.dev',
                title: 'React Native示例',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log(`分享成功，活动类型: ${result.activityType}`);
                } else {
                    console.log('分享成功');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('分享被取消');
            }
        } catch (error) {
            Alert.alert('错误', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>设备API示例</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>链接</Text>
                <Button
                    title="打开网页"
                    onPress={() => handleOpenURL('https://reactnative.dev')}
                />
                <Button
                    title="打开设置"
                    onPress={() => Linking.openSettings()}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>振动</Text>
                <Button
                    title="简单振动"
                    onPress={handleVibration}
                />
                <Button
                    title="自定义振动模式"
                    onPress={handlePatternVibration}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>分享</Text>
                <Button
                    title="分享内容"
                    onPress={handleShare}
                />
            </View>
        </View>
    );
};

// =============== 5. 表单和输入处理 ===============

// 表单和输入示例
export const FormInputExample = () => {
    // 表单状态
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });

    // 错误信息状态
    const [errors, setErrors] = useState({});

    // 处理输入变化
    const handleChange = (name, value) => {
        setForm({
            ...form,
            [name]: value,
        });

        // 清除错误
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null,
            });
        }
    };

    // 验证表单
    const validateForm = () => {
        let newErrors = {};

        // 验证用户名
        if (!form.username) {
            newErrors.username = '请输入用户名';
        }

        // 验证邮箱
        if (!form.email) {
            newErrors.email = '请输入邮箱';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = '请输入有效的邮箱地址';
        }

        // 验证密码
        if (!form.password) {
            newErrors.password = '请输入密码';
        } else if (form.password.length < 6) {
            newErrors.password = '密码长度至少为6个字符';
        }

        // 验证确认密码
        if (form.password && form.confirmPassword !== form.password) {
            newErrors.confirmPassword = '两次输入的密码不一致';
        }

        // 验证条款同意
        if (!form.agreeToTerms) {
            newErrors.agreeToTerms = '请同意使用条款';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 提交表单
    const handleSubmit = () => {
        if (validateForm()) {
            Alert.alert(
                '表单提交成功',
                `用户名: ${form.username}\n邮箱: ${form.email}`
            );
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView style={styles.formContainer}>
                <Text style={styles.title}>表单和输入示例</Text>

                {/* 用户名 */}
                <Text style={styles.label}>用户名</Text>
                <TextInput
                    style={[styles.input, errors.username ? styles.inputError : null]}
                    value={form.username}
                    onChangeText={(text) => handleChange('username', text)}
                    placeholder="请输入用户名"
                />
                {errors.username ? (
                    <Text style={styles.errorText}>{errors.username}</Text>
                ) : null}

                {/* 邮箱 */}
                <Text style={styles.label}>邮箱</Text>
                <TextInput
                    style={[styles.input, errors.email ? styles.inputError : null]}
                    value={form.email}
                    onChangeText={(text) => handleChange('email', text)}
                    placeholder="请输入邮箱"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {errors.email ? (
                    <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}

                {/* 密码 */}
                <Text style={styles.label}>密码</Text>
                <TextInput
                    style={[styles.input, errors.password ? styles.inputError : null]}
                    value={form.password}
                    onChangeText={(text) => handleChange('password', text)}
                    placeholder="请输入密码"
                    secureTextEntry
                />
                {errors.password ? (
                    <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}

                {/* 确认密码 */}
                <Text style={styles.label}>确认密码</Text>
                <TextInput
                    style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
                    value={form.confirmPassword}
                    onChangeText={(text) => handleChange('confirmPassword', text)}
                    placeholder="请再次输入密码"
                    secureTextEntry
                />
                {errors.confirmPassword ? (
                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                ) : null}

                {/* 同意条款 */}
                <View style={styles.switchRow}>
                    <Switch
                        value={form.agreeToTerms}
                        onValueChange={(value) => handleChange('agreeToTerms', value)}
                    />
                    <Text style={styles.switchLabel}>我同意使用条款和隐私政策</Text>
                </View>
                {errors.agreeToTerms ? (
                    <Text style={styles.errorText}>{errors.agreeToTerms}</Text>
                ) : null}

                {/* 提交按钮 */}
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitButtonText}>注册</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

// =============== 6. 自定义组件 ===============

// 自定义按钮组件
export const CustomButton = ({ title, onPress, disabled, color, textColor }) => {
    return (
        <TouchableOpacity
            style={[
                styles.customButton,
                { backgroundColor: color || '#2196F3' },
                disabled && styles.disabledButton,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[
                styles.customButtonText,
                { color: textColor || 'white' },
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

// 自定义卡片组件
export const Card = ({ title, content, image, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            disabled={!onPress}
        >
            {image && (
                <Image
                    source={image}
                    style={styles.cardImage}
                    resizeMode="cover"
                />
            )}
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardText}>{content}</Text>
            </View>
        </TouchableOpacity>
    );
};

// 自定义组件示例
export const CustomComponentsExample = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>自定义组件示例</Text>

            <Text style={styles.subtitle}>自定义按钮</Text>
            <View style={styles.customButtonRow}>
                <CustomButton
                    title="主要按钮"
                    onPress={() => Alert.alert('点击', '你点击了主要按钮')}
                    color="#2196F3"
                />

                <CustomButton
                    title="成功按钮"
                    onPress={() => Alert.alert('点击', '你点击了成功按钮')}
                    color="#4CAF50"
                />

                <CustomButton
                    title="危险按钮"
                    onPress={() => Alert.alert('点击', '你点击了危险按钮')}
                    color="#F44336"
                />

                <CustomButton
                    title="禁用按钮"
                    disabled={true}
                />
            </View>

            <Text style={styles.subtitle}>自定义卡片</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Card
                    title="卡片标题1"
                    content="这是卡片1的内容描述，可以包含一些简短的文本说明。"
                    image={{ uri: 'https://picsum.photos/200/100?random=1' }}
                    onPress={() => Alert.alert('卡片点击', '你点击了卡片1')}
                />

                <Card
                    title="卡片标题2"
                    content="这是卡片2的内容描述，可以包含一些简短的文本说明。"
                    image={{ uri: 'https://picsum.photos/200/100?random=2' }}
                    onPress={() => Alert.alert('卡片点击', '你点击了卡片2')}
                />

                <Card
                    title="卡片标题3"
                    content="这是卡片3的内容描述，可以包含一些简短的文本说明。"
                    image={{ uri: 'https://picsum.photos/200/100?random=3' }}
                    onPress={() => Alert.alert('卡片点击', '你点击了卡片3')}
                />
            </ScrollView>
        </View>
    );
};

// =============== 样式 ===============

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
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
    // 列表样式
    listItem: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
    },
    listItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    listItemDesc: {
        fontSize: 14,
        color: '#666',
    },
    separator: {
        height: 1,
        backgroundColor: '#EEE',
    },
    listHeader: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    listFooter: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
    },
    // 分组列表样式
    sectionHeader: {
        backgroundColor: '#EAEAEA',
        padding: 10,
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionItem: {
        padding: 10,
        backgroundColor: 'white',
    },
    sectionItemText: {
        fontSize: 14,
    },
    // 模态框样式
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 15,
    },
    modalText: {
        marginBottom: 15,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContent: {
        marginBottom: 15,
        textAlign: 'center',
    },
    // 按钮容器
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: 150,
    },
    // 动画样式
    animatedBox: {
        width: 150,
        height: 150,
        backgroundColor: '#4C9EFF',
        borderRadius: 10,
        marginVertical: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    complexAnimatedBox: {
        width: 100,
        height: 100,
        backgroundColor: '#FF5733',
        borderRadius: 50,
        marginVertical: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    animatedBoxText: {
        color: 'white',
        fontWeight: 'bold',
    },
    // 设备API区域
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    // 表单样式
    formContainer: {
        flex: 1,
        paddingBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
    },
    inputError: {
        borderColor: '#FF5555',
    },
    errorText: {
        color: '#FF5555',
        fontSize: 12,
        marginBottom: 10,
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    switchLabel: {
        marginLeft: 10,
        fontSize: 14,
    },
    submitButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    // 自定义按钮样式
    customButton: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    customButtonText: {
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#CCCCCC',
        opacity: 0.7,
    },
    customButtonRow: {
        marginBottom: 20,
    },
    // 卡片样式
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginRight: 15,
        width: 200,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardImage: {
        width: '100%',
        height: 100,
    },
    cardContent: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardText: {
        fontSize: 14,
        color: '#666',
    },
});

// =============== 主应用组件 ===============

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <ScrollView style={styles.container}>
                <Text style={[styles.title, { fontSize: 24, marginBottom: 30 }]}>
                    React Native常用组件与API
                </Text>

                {/* 取消注释下面的组件以查看不同的示例 */}
                <FlatListExample />
                {/* <SectionListExample /> */}
                {/* <ModalExample /> */}
                {/* <AlertExample /> */}
                {/* <BasicAnimationExample /> */}
                {/* <AdvancedAnimationExample /> */}
                {/* <DeviceAPIsExample /> */}
                {/* <FormInputExample /> */}
                {/* <CustomComponentsExample /> */}

                <Text style={{
                    fontSize: 14,
                    fontStyle: 'italic',
                    color: '#666',
                    marginTop: 20,
                    textAlign: 'center',
                }}>
                    注意: 请在文件中取消注释以查看其他示例组件
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

/**
 * 额外说明：
 * 
 * 1. 这个文件包含了React Native的进阶组件和API示例
 * 2. 默认只渲染了FlatListExample，可以在App组件中取消注释其他组件
 * 3. 在实际应用中，这些组件通常会分散在不同的文件中
 * 4. 为了完整测试所有功能，需要在真实设备或模拟器上运行
 * 5. 一些API（如分享、振动）需要真实设备才能正常工作
 */ 