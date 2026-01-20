import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Platform, KeyboardAvoidingView, ScrollView, Image, Dimensions } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation, route }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { registeredName, registeredEmail } = route.params || {};

    React.useEffect(() => {
        if (registeredEmail) {
            setEmail(registeredEmail);
        }
    }, [registeredEmail]);

    const handleLogin = (role) => {
        if (!email.trim() || !password) {
            alert("Please enter both email and password");
            return;
        }

        if (!email.toLowerCase().endsWith('@mnsuam.edu.pk')) {
            alert("Please use your official university email contain (@mnsuam.edu.pk)");
            return;
        }

        console.log(`Logging in as ${role} with:`, email);

        if (role === 'student') {
            const dashboardName = (email === registeredEmail && registeredName) ? registeredName : "Student";
            navigation.navigate('StudentDashboard', { userName: dashboardName });
        } else {
            // Navigate to Teacher Dashboard
            navigation.navigate('TeacherDashboard');
        }
    };

    return (
        <View style={styles.mainContainer}>
            <LinearGradient
                colors={['#EEF2FF', '#FFFFFF']}
                style={styles.backgroundGradient}
            />

            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                        <View style={styles.headerContainer}>
                            <View style={styles.logoContainer}>
                                <Image source={require('./assets/logo.png')} style={styles.logo} />
                            </View>
                            <Text style={styles.title}>Welcome Back</Text>
                            <Text style={styles.subtitle}>Sign in to access your student portal</Text>
                        </View >

                        <View style={styles.formContainer}>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="email" size={20} color="#6B7280" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="University Email"
                                    placeholderTextColor="#9CA3AF"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="lock" size={20} color="#6B7280" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor="#9CA3AF"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
                            </View>

                            <TouchableOpacity
                                style={styles.studentButton}
                                onPress={() => handleLogin('student')}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#2563EB', '#1D4ED8']}
                                    style={styles.gradientButton}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <Text style={styles.studentButtonText}>Login as Student</Text>
                                    <MaterialIcons name="arrow-forward" size={20} color="white" />
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.teacherButton} onPress={() => handleLogin('teacher')}>
                                <Text style={styles.teacherButtonText}>Login as Teacher</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>New to UniPortal? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                <Text style={styles.signupText}>Create Account</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView >
                </KeyboardAvoidingView >
            </SafeAreaView >
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoContainer: {
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    logo: {
        width: 140,
        height: 140,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        maxWidth: '80%',
    },
    formContainer: {
        marginBottom: 24,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 16,
        height: 56,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1F2937',
        height: '100%',
    },
    studentButton: {
        borderRadius: 16,
        marginBottom: 16,
        marginTop: 8,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    gradientButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
    },
    studentButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        marginRight: 8,
    },
    teacherButton: {
        backgroundColor: 'transparent',
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 8,
    },
    teacherButtonText: {
        color: '#6B7280',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    footerText: {
        color: '#6B7280',
        fontSize: 15,
    },
    signupText: {
        color: '#2563EB',
        fontSize: 15,
        fontWeight: '700',
    },
});
