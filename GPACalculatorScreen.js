import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert, Modal, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, SHADOWS } from './theme';
import { calculateGPA, generateId, GRADES } from './utils';

export default function GPACalculatorScreen({ navigation }) {
    const [courses, setCourses] = useState([
        { id: '1', name: '', grade: 'A', credits: '' },
    ]);
    const [gpa, setGpa] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentCourseId, setCurrentCourseId] = useState(null);

    const addCourse = () => {
        const newId = generateId();
        setCourses([...courses, { id: newId, name: '', grade: 'A', credits: '' }]);
    };

    const removeCourse = (id) => {
        setCourses(courses.filter(course => course.id !== id));
    };

    const clearAll = () => {
        setCourses([{ id: generateId(), name: '', grade: 'A', credits: '' }]);
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

    const handleCalculateGPA = () => {
        const result = calculateGPA(courses);

        if (result.error) {
            Alert.alert("Calculation Error", result.error);
            return;
        }

        setGpa(result.gpa);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>GPA Calculator</Text>
                <View style={{ width: 40 }} />
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
                                placeholderTextColor={COLORS.textSecondary}
                                value={course.name}
                                onChangeText={(text) => updateCourse(course.id, 'name', text)}
                            />

                            <TouchableOpacity
                                style={[styles.input, styles.gradeInput]}
                                onPress={() => openGradeModal(course.id)}
                            >
                                <Text style={styles.gradeText}>{course.grade}</Text>
                                <MaterialIcons name="keyboard-arrow-down" size={20} color={COLORS.textSecondary} />
                            </TouchableOpacity>

                            <TextInput
                                style={[styles.input, { flex: 2 }]}
                                placeholder="Eg. 3"
                                placeholderTextColor={COLORS.textSecondary}
                                keyboardType="numeric"
                                value={course.credits}
                                onChangeText={(text) => updateCourse(course.id, 'credits', text)}
                            />

                            <TouchableOpacity onPress={() => removeCourse(course.id)} style={styles.removeButton}>
                                <MaterialIcons name="close" size={20} color={COLORS.error} />
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
                <TouchableOpacity onPress={handleCalculateGPA} activeOpacity={0.8} style={{ width: '100%', alignItems: 'center' }}>
                     <LinearGradient
                        colors={GRADIENTS.primary}
                        style={styles.calculateButton}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.calculateButtonText}>Calculate GPA</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
                    </LinearGradient>
                </TouchableOpacity>

                {gpa && (
                    <LinearGradient
                        colors={GRADIENTS.gold}
                        style={styles.resultContainer}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.resultLabel}>Your GPA</Text>
                        <Text style={styles.resultValue}>{gpa}</Text>
                        <MaterialIcons name="star" size={32} color={COLORS.white} style={{ marginTop: 8 }} />
                    </LinearGradient>
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
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: COLORS.cardBackground,
        ...SHADOWS.small,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    content: {
        padding: 20,
        alignItems: 'center',
    },
    card: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: 24,
        padding: 24,
        width: '100%',
        marginBottom: 24,
        ...SHADOWS.medium,
    },
    semesterTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    headerText: {
        color: COLORS.primaryLight,
        fontWeight: '700',
        fontSize: 14,
    },
    courseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    input: {
        backgroundColor: COLORS.inputBackground,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginRight: 10,
        fontSize: 14,
        color: COLORS.textPrimary,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    gradeInput: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    gradeText: {
        color: COLORS.textPrimary,
        fontWeight: '600',
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
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        ...SHADOWS.small,
    },
    addButton: {
        backgroundColor: COLORS.primary,
    },
    clearButton: {
        backgroundColor: COLORS.error,
    },
    actionButtonText: {
        color: COLORS.white,
        fontWeight: '600',
        fontSize: 14,
    },
    calculateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 16,
        width: '100%',
        maxWidth: 240,
        ...SHADOWS.medium,
    },
    calculateButtonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    },
    resultContainer: {
        marginTop: 24,
        alignItems: 'center',
        padding: 24,
        borderRadius: 24,
        width: '100%',
        ...SHADOWS.large,
    },
    resultLabel: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 4,
        fontWeight: '600',
    },
    resultValue: {
        fontSize: 48,
        fontWeight: '800',
        color: COLORS.white,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: 16,
        padding: 10,
        width: 200,
        maxHeight: 300,
        ...SHADOWS.large,
    },
    modalItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.inputBackground,
    },
    modalItemText: {
        fontSize: 16,
        color: COLORS.textPrimary,
        textAlign: 'center',
    },
});
