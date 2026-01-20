import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SignupScreen({ navigation }) {
    const [role, setRole] = useState('student'); // 'student' or 'teacher'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        if (!email.trim() || !password || !name) {
            alert("Please fill in all fields");
            return;
        }

        if (!email.toLowerCase().endsWith('@mnsuam.edu.pk')) {
            alert("Please use your official university email (@mnsuam.edu.pk)");
            return;
        }

        // Proceed with signup logic here (e.g., API call)
        console.log("Signup successful for:", email);
        alert("Account created successfully! Please login.");
        navigation.navigate('Login', { registeredName: name, registeredEmail: email });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join the UniPortal today.</Text>

                    {/* Segmented Control */}
                    <View style={styles.segmentedControl}>
                        <TouchableOpacity
                            style={[styles.segment, role === 'student' && styles.activeSegment]}
                            onPress={() => setRole('student')}
                        >
                            <Text style={[styles.segmentText, role === 'student' && styles.activeSegmentText]}>Student</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.segment, role === 'teacher' && styles.activeSegment]}
                            onPress={() => setRole('teacher')}
                        >
                            <Text style={[styles.segmentText, role === 'teacher' && styles.activeSegmentText]}>Teacher</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Full Name"
                                placeholderTextColor="#9CA3AF"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email Address"
                                placeholderTextColor="#9CA3AF"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#9CA3AF"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity style={styles.createButton} onPress={handleSignup}>
                            <Text style={styles.createButtonText}>Create Account</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.termsText}>
                        By clicking "Create Account", you agree to our Terms of Service and Privacy Policy.
                    </Text>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 10,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
        marginTop: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 32,
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        padding: 4,
        marginBottom: 32,
        height: 50,
    },
    segment: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    activeSegment: {
        backgroundColor: '#2563EB',
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    segmentText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
    },
    activeSegmentText: {
        color: '#fff',
    },
    formContainer: {
        marginBottom: 24,
    },
    inputWrapper: {
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: '#1F2937',
    },
    createButton: {
        backgroundColor: '#2563EB',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 16,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    termsText: {
        fontSize: 13,
        color: '#9CA3AF',
        textAlign: 'center',
        lineHeight: 20,
        marginTop: 'auto',
    },
});
