import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Platform, KeyboardAvoidingView, ScrollView, Image, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, SHADOWS } from './theme';
import { validateEmail } from './utils';

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

        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
            alert(emailValidation.message);
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
                colors={GRADIENTS.primary}
                style={styles.backgroundGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                        <View style={styles.headerContainer}>
                            <View style={styles.logoContainer}>
                                <MaterialIcons name="school" size={80} color={COLORS.primary} />
                            </View>
                            <Text style={styles.title}>Welcome Back</Text>
                            <Text style={styles.subtitle}>Sign in to access your student portal</Text>
                        </View >

                        <View style={styles.formContainer}>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="email" size={20} color={COLORS.primary} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="University Email"
                                    placeholderTextColor={COLORS.textSecondary}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="lock" size={20} color={COLORS.primary} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor={COLORS.textSecondary}
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
                                    colors={GRADIENTS.gold}
                                    style={styles.gradientButton}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <Text style={styles.studentButtonText}>Login as Student</Text>
                                    <MaterialIcons name="arrow-forward" size={20} color={COLORS.primary} />
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
        backgroundColor: COLORS.background,
    },
    backgroundGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '50%', // Gradient only covers top half for a cool effect
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
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
        backgroundColor: COLORS.white,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        ...SHADOWS.large,
    },
    logo: {
        width: 140,
        height: 140,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.white, // White text against the gradient
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
        textAlign: 'center',
        maxWidth: '80%',
    },
    formContainer: {
        marginBottom: 24,
        backgroundColor: COLORS.white,
        borderRadius: 24,
        padding: 24,
        ...SHADOWS.medium,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.inputBackground,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 16,
        height: 56,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.textPrimary,
        height: '100%',
    },
    studentButton: {
        borderRadius: 16,
        marginBottom: 16,
        marginTop: 8,
        ...SHADOWS.small,
    },
    gradientButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
    },
    studentButtonText: {
        color: COLORS.primary, // Dark text on gold button
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
        color: COLORS.textSecondary,
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
        color: COLORS.textSecondary,
        fontSize: 15,
    },
    signupText: {
        color: COLORS.primary,
        fontSize: 15,
        fontWeight: '700',
    },
});
