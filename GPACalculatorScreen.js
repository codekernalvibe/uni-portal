import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert, Modal, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function GPACalculatorScreen({ navigation }) {
    const [courses, setCourses] = useState([
        { id: '1', name: '', grade: 'A', credits: '' },
    ]);
    const [gpa, setGpa] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentCourseId, setCurrentCourseId] = useState(null);

    const GRADES = {
        'A': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7,
        'D+': 1.3, 'D': 1.0, 'F': 0.0
    };

    const addCourse = () => {
        const newId = (courses.length + 1).toString() + Math.random().toString();
        setCourses([...courses, { id: newId, name: '', grade: 'A', credits: '' }]);
    };

    const removeCourse = (id) => {
        setCourses(courses.filter(course => course.id !== id));
    };

    const clearAll = () => {
        setCourses([{ id: '1', name: '', grade: 'A', credits: '' }]);
        setGpa(null);
    };

    const updateCourse = (id, field, value) => {
        const updatedCourses = courses.map(course => {
            if (course.id === id) {
                return { ...course, [field]: value };
            }
            return course;
        });
        setCourses(updatedCourses);
    };

    const openGradeModal = (id) => {
        setCurrentCourseId(id);
        setModalVisible(true);
    };

    const selectGrade = (grade) => {
        updateCourse(currentCourseId, 'grade', grade);
        setModalVisible(false);
    };

    const calculateGPA = () => {
        let totalPoints = 0;
        let totalCredits = 0;
        let hasError = false;

        courses.forEach(course => {
            if (course.credits) {
                const credit = parseFloat(course.credits);
                if (isNaN(credit)) {
                    hasError = true;
                } else {
                    totalPoints += GRADES[course.grade] * credit;
                    totalCredits += credit;
                }
            }
        });

        if (hasError) {
            Alert.alert("Invalid Input", "Please enter valid numeric credits.");
            return;
        }

        if (totalCredits === 0) {
            Alert.alert("Missing Input", "Please enter credits for at least one subject.");
            return;
        }

        setGpa((totalPoints / totalCredits).toFixed(2));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>GPA Calculator</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.semesterTitle}>Semester I</Text>

                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.headerText, { flex: 3 }]}>Course Name</Text>
                        <Text style={[styles.headerText, { flex: 2, textAlign: 'center' }]}>Grade</Text>
                        <Text style={[styles.headerText, { flex: 2 }]}>Credits</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    {/* Courses Rows */}
                    {courses.map((course) => (
                        <View key={course.id} style={styles.courseRow}>
                            <TextInput
                                style={[styles.input, { flex: 4 }]}
                                placeholder="Eg.Web"
                                value={course.name}
                                onChangeText={(text) => updateCourse(course.id, 'name', text)}
                            />

                            <TouchableOpacity
                                style={[styles.input, styles.gradeInput]}
                                onPress={() => openGradeModal(course.id)}
                            >
                                <Text style={styles.gradeText}>{course.grade}</Text>
                                <MaterialIcons name="keyboard-arrow-down" size={20} color="#9CA3AF" />
                            </TouchableOpacity>

                            <TextInput
                                style={[styles.input, { flex: 2 }]}
                                placeholder="Eg. 3"
                                keyboardType="numeric"
                                value={course.credits}
                                onChangeText={(text) => updateCourse(course.id, 'credits', text)}
                            />

                            <TouchableOpacity onPress={() => removeCourse(course.id)} style={styles.removeButton}>
                                <MaterialIcons name="close" size={20} color="#EF4444" />
                            </TouchableOpacity>
                        </View>
                    ))}

                    {/* Action Buttons */}
                    <View style={styles.actionRow}>
                        <TouchableOpacity style={[styles.actionButton, styles.addButton]} onPress={addCourse}>
                            <MaterialIcons name="add-circle-outline" size={20} color="white" style={{ marginRight: 8 }} />
                            <Text style={styles.actionButtonText}>Add Course</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.actionButton, styles.clearButton]} onPress={clearAll}>
                            <MaterialIcons name="highlight-remove" size={20} color="white" style={{ marginRight: 8 }} />
                            <Text style={styles.actionButtonText}>Clear All</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* Calculate Button */}
                <TouchableOpacity style={styles.calculateButton} onPress={calculateGPA}>
                    <Text style={styles.calculateButtonText}>Calculate</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
                </TouchableOpacity>

                {gpa && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultLabel}>Your GPA</Text>
                        <Text style={styles.resultValue}>{gpa}</Text>
                    </View>
                )}
            </ScrollView>

            {/* Grade Selection Modal */}
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                animationType="fade"
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <FlatList
                            data={Object.keys(GRADES)}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => selectGrade(item)}
                                >
                                    <Text style={styles.modalItemText}>{item} ({GRADES[item]})</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
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
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    content: {
        padding: 20,
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 24,
        width: '100%',
        marginBottom: 24,
    },
    semesterTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827', // Dark blueish text
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    headerText: {
        color: '#047857', // Teal color for headers like in image
        fontWeight: '700',
        fontSize: 14,
    },
    courseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    input: {
        backgroundColor: '#EFF6FF', // Light blue background
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        marginRight: 10,
        fontSize: 14,
        color: '#374151',
    },
    gradeInput: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    gradeText: {
        color: '#374151',
    },
    removeButton: {
        padding: 4,
    },
    actionRow: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        gap: 16,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
    },
    addButton: {
        backgroundColor: '#0056D2', // Blue as requested
    },
    clearButton: {
        backgroundColor: '#DC2626', // Red as requested
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    calculateButton: {
        backgroundColor: '#1E1B4B', // Dark blue like image footer
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 4,
        width: '100%',
        maxWidth: 200,
    },
    calculateButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    },
    resultContainer: {
        marginTop: 24,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        width: '100%',
    },
    resultLabel: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 4,
    },
    resultValue: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#2563EB',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        width: 200,
        maxHeight: 300,
    },
    modalItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    modalItemText: {
        fontSize: 16,
        color: '#374151',
        textAlign: 'center',
    },
});
