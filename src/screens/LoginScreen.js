import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ImageBackground,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import backgroundImage from "../../assets/images/background.png"; // Make sure this path is correct

const LoginScreen = ({ navigation }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const idLower = id.toLowerCase();
        if (idLower === 'pjw' && password === '1') {
            // Login Success - PJW
            navigation.replace('Home', { userId: 'pjw_explorer' });
        } else if (idLower === 'jjh' && password === '1') {
            // Login Success - JJH
            navigation.replace('Home', { userId: 'jjh_explorer' });
        } else {
            Alert.alert('오류', '아이디 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <View style={styles.mainContainer}>
            <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImage}
                resizeMode="cover"
                imageStyle={{ opacity: 0.5 }}
            >
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.innerContainer}
                    >
                        <View style={styles.card}>
                            <Text style={styles.title}>퀴즈 탐험대 🚀</Text>
                            <Text style={styles.subtitle}>로그인하고 모험을 떠나요!</Text>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>아이디</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="아이디를 입력하세요"
                                    value={id}
                                    onChangeText={setId}
                                    autoCapitalize="none"
                                    onSubmitEditing={handleLogin} // Enable Enter key
                                    returnKeyType="done"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>비밀번호</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="비밀번호를 입력하세요"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    onSubmitEditing={handleLogin}
                                    returnKeyType="go"
                                />
                            </View>

                            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                                <Text style={styles.buttonText}>로그인</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#E8F4D9',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: '100%',
        maxWidth: 400, // Limit width for larger screens
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FF6347', // Tomato color
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        width: '100%',
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#EEE',
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
    },
    button: {
        width: '100%',
        backgroundColor: '#FFD700', // Gold
        paddingVertical: 16,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
        borderBottomWidth: 4,
        borderBottomColor: '#DAA520', // GoldenRod (shadow effect)
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default LoginScreen;
