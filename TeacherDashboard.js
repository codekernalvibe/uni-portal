import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Modal, TextInput, Alert } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';


const { width } = Dimensions.get('window');

const FEATURE_ITEMS = [
    { id: '1', title: 'Attendance', icon: 'how-to-reg', library: 'MaterialIcons', color: ['#059669', '#34D399'], screen: 'MarkAttendance' },
    { id: '2', title: 'Assignments', icon: 'assignment', library: 'MaterialIcons', color: ['#7C3AED', '#A78BFA'], screen: 'AssignmentManager' },
    { id: '3', title: 'Students', icon: 'people', library: 'MaterialIcons', color: ['#2563EB', '#60A5FA'], screen: 'StudentList' },
    { id: '4', title: 'Analytics', icon: 'analytics', library: 'MaterialIcons', color: ['#DB2777', '#F472B6'], screen: 'ClassAnalytics' },
];

export default function TeacherDashboard({ navigation }) {
    const [progress, setProgress] = useState(0.65); // 65% default
    const [modalVisible, setModalVisible] = useState(false);
    const [lectureInput, setLectureInput] = useState('25');
    const [totalLectures, setTotalLectures] = useState('40');

    const handleNavigation = (screenName) => {
        navigation.navigate(screenName);
    };

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    const updateProgress = () => {
        const completed = parseInt(lectureInput);
        const total = parseInt(totalLectures);

        if (isNaN(completed) || isNaN(total) || total === 0) {
            Alert.alert("Invalid Input", "Please enter valid numbers.");
            return;
        }

        const newProgress = completed / total;
        if (newProgress > 1) {
            Alert.alert("Error", "Completed lectures cannot exceed total.");
            return;
        }

        setProgress(newProgress);
        setModalVisible(false);
    };

    return (
        <View style={styles.mainContainer}>
            <LinearGradient
                colors={['#111827', '#1F2937']}
                style={styles.headerBackground}
            />

            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greetingTitle}>Welcome Back,</Text>
                        <Text style={styles.greetingName}>Prof. Ahmed</Text>
                        <Text style={styles.subGreeting}>Department of Computer Science</Text>
                    </View>
                    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                        <MaterialIcons name="logout" size={24} color="#EF4444" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                    {/* Class Progress Widget */}
                    <TouchableOpacity
                        style={styles.progressCard}
                        onPress={() => setModalVisible(true)}
                        activeOpacity={0.9}
                    >
                        <LinearGradient
                            colors={['#2563EB', '#1D4ED8']}
                            style={styles.progressGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <View style={styles.progressHeader}>
                                <Text style={styles.classTitle}>Software Engineering (CS-302)</Text>
                                <View style={styles.editBadge}>
                                    <MaterialIcons name="edit" size={14} color="#2563EB" />
                                </View>
                            </View>

                            <Text style={styles.progressLabel}>Syllabus Completion</Text>

                            <View style={styles.progressBarContainer}>
                                <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                            </View>

                            <View style={styles.statsRow}>
                                <Text style={styles.statsText}>{(progress * 100).toFixed(0)}% Covered</Text>
                                <Text style={styles.statsText}>{lectureInput}/{totalLectures} Lectures</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Features Grid */}
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.gridContainer}>
                        {FEATURE_ITEMS.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.card}
                                onPress={() => handleNavigation(item.screen)}
                                activeOpacity={0.9}
                            >
                                <LinearGradient
                                    colors={item.color}
                                    style={styles.iconContainer}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <MaterialIcons name={item.icon} size={32} color="#fff" />
                                </LinearGradient>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                </ScrollView>

                {/* Update Progress Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Update Syllabus Progress</Text>
                            <Text style={styles.modalSubtitle}>CS-302 Software Engineering</Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Lectures Completed</Text>
                                <TextInput
                                    style={styles.input}
                                    value={lectureInput}
                                    onChangeText={setLectureInput}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Total Lectures</Text>
                                <TextInput
                                    style={styles.input}
                                    value={totalLectures}
                                    onChangeText={setTotalLectures}
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.saveButton} onPress={updateProgress}>
                                    <Text style={styles.saveButtonText}>Update</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 150,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 20,
    },
    greetingTitle: {
        fontSize: 16,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    greetingName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 4,
    },
    subGreeting: {
        fontSize: 14,
        color: '#D1D5DB',
        marginTop: 4,
        fontWeight: '500',
    },
    logoutButton: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
    },
    content: {
        paddingHorizontal: 24,
        paddingTop: 10,
    },
    progressCard: {
        marginBottom: 30,
        borderRadius: 24,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
    },
    progressGradient: {
        borderRadius: 24,
        padding: 24,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    classTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    editBadge: {
        backgroundColor: '#fff',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressLabel: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 16,
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 4,
        marginBottom: 12,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statsText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 16,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: (width - 56) / 2,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
        textAlign: 'center',
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        marginTop: 8,
    },
    cancelButton: {
        flex: 1,
        padding: 14,
        marginRight: 8,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
    },
    saveButton: {
        flex: 1,
        padding: 14,
        marginLeft: 8,
        borderRadius: 12,
        backgroundColor: '#2563EB',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#374151',
        fontWeight: '600',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
});
