import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Switch, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const DUMMY_STUDENTS = [
    { id: '1', name: 'Ali Khan', rollNo: 'SP23-BSE-001', present: true },
    { id: '2', name: 'Sara Ahmed', rollNo: 'SP23-BSE-005', present: true },
    { id: '3', name: 'Bilal Hassan', rollNo: 'SP23-BSE-012', present: true },
    { id: '4', name: 'Zainab Bibi', rollNo: 'SP23-BSE-018', present: true },
    { id: '5', name: 'Usman Ali', rollNo: 'SP23-BSE-022', present: true },
    { id: '6', name: 'Ayesha Khan', rollNo: 'SP23-BSE-025', present: true },
    { id: '7', name: 'Hamza Raza', rollNo: 'SP23-BSE-030', present: true },
];

export default function MarkAttendanceScreen({ navigation }) {
    const [students, setStudents] = useState(DUMMY_STUDENTS);
    const [selectedClass, setSelectedClass] = useState('CS-302');

    const toggleAttendance = (id) => {
        setStudents(currentStudents =>
            currentStudents.map(student =>
                student.id === id ? { ...student, present: !student.present } : student
            )
        );
    };

    const markAllPresent = () => {
        setStudents(currentStudents =>
            currentStudents.map(student => ({ ...student, present: true }))
        );
    };

    const submitAttendance = () => {
        const presentCount = students.filter(s => s.present).length;
        const total = students.length;
        Alert.alert(
            "Attendance Saved",
            `Successfully marked attendance for ${selectedClass}.\nPresent: ${presentCount}/${total}`,
            [{ text: "OK", onPress: () => navigation.goBack() }]
        );
    };

    const renderStudentItem = ({ item }) => (
        <View style={styles.studentCard}>
            <View style={styles.studentInfo}>
                <View style={[styles.avatarPlaceholder, { backgroundColor: item.present ? '#D1FAE5' : '#FEE2E2' }]}>
                    <Text style={[styles.avatarText, { color: item.present ? '#059669' : '#EF4444' }]}>
                        {item.name.charAt(0)}
                    </Text>
                </View>
                <View>
                    <Text style={styles.studentName}>{item.name}</Text>
                    <Text style={styles.rollNo}>{item.rollNo}</Text>
                </View>
            </View>
            <View style={styles.attendanceAction}>
                <Text style={[styles.statusText, { color: item.present ? '#059669' : '#EF4444' }]}>
                    {item.present ? 'Present' : 'Absent'}
                </Text>
                <Switch
                    trackColor={{ false: "#EF4444", true: "#10B981" }}
                    thumbColor={"#fff"}
                    ios_backgroundColor="#EF4444"
                    onValueChange={() => toggleAttendance(item.id)}
                    value={item.present}
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>Mark Attendance</Text>
                    <Text style={styles.headerSubtitle}>{selectedClass} • {new Date().toLocaleDateString()}</Text>
                </View>
                <TouchableOpacity onPress={markAllPresent}>
                    <Text style={styles.markAllText}>Mark All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={students}
                renderItem={renderStudentItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
            />

            <View style={styles.footer}>
                <TouchableOpacity style={styles.submitButton} onPress={submitAttendance}>
                    <LinearGradient
                        colors={['#2563EB', '#1D4ED8']}
                        style={styles.gradientButton}
                    >
                        <Text style={styles.submitButtonText}>Submit Attendance</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    markAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2563EB',
    },
    listContent: {
        padding: 20,
        paddingBottom: 100,
    },
    studentCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    studentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    studentName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    rollNo: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    attendanceAction: {
        alignItems: 'flex-end',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 4,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    submitButton: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    gradientButton: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
