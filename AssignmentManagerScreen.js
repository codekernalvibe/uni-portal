import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput, FlatList, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SUBMISSIONS = [
    { id: '1', name: 'Ali Khan', type: 'PDF', date: '12 Jan 2026', grade: '' },
    { id: '2', name: 'Sara Ahmed', type: 'DOCX', date: '11 Jan 2026', grade: 'A' },
    { id: '3', name: 'Bilal Hassan', type: 'PDF', date: '12 Jan 2026', grade: '' },
];

export default function AssignmentManagerScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('create'); // 'create' or 'submissions'
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = () => {
        if (!title || !dueDate) {
            Alert.alert("Missing Info", "Please enter title and due date.");
            return;
        }
        Alert.alert("Success", "Assignment Created Successfully!");
        setTitle('');
        setDueDate('');
        setDescription('');
    };

    const renderSubmissionItem = ({ item }) => (
        <View style={styles.submissionCard}>
            <View style={styles.submissionInfo}>
                <View style={styles.fileIcon}>
                    <MaterialIcons name="description" size={24} color="#4B5563" />
                </View>
                <View>
                    <Text style={styles.studentName}>{item.name}</Text>
                    <Text style={styles.submissionDate}>Submitted: {item.date}</Text>
                </View>
            </View>
            <View style={styles.gradeAction}>
                {item.grade ? (
                    <View style={styles.gradedBadge}>
                        <Text style={styles.gradeText}>Grade: {item.grade}</Text>
                    </View>
                ) : (
                    <TouchableOpacity style={styles.gradeButton} onPress={() => Alert.alert("Grade", `Enter marks for ${item.name}`)}>
                        <Text style={styles.gradeButtonText}>Grade</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Assignments</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'create' && styles.activeTab]}
                    onPress={() => setActiveTab('create')}
                >
                    <Text style={[styles.tabText, activeTab === 'create' && styles.activeTabText]}>Create New</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'submissions' && styles.activeTab]}
                    onPress={() => setActiveTab('submissions')}
                >
                    <Text style={[styles.tabText, activeTab === 'submissions' && styles.activeTabText]}>Check Submissions</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'create' ? (
                <ScrollView contentContainerStyle={styles.formContent}>
                    <Text style={styles.label}>Assignment Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Lab Report 3"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.label}>Due Date</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 20th Jan 2026"
                        value={dueDate}
                        onChangeText={setDueDate}
                    />

                    <Text style={styles.label}>Description & Instructions</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Enter details..."
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        value={description}
                        onChangeText={setDescription}
                    />

                    <TouchableOpacity style={styles.uploadBox}>
                        <MaterialIcons name="cloud-upload" size={32} color="#9CA3AF" />
                        <Text style={styles.uploadText}>Tap to upload related files</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                        <LinearGradient
                            colors={['#7C3AED', '#6D28D9']}
                            style={styles.gradientButton}
                        >
                            <Text style={styles.createButtonText}>Publish Assignment</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            ) : (
                <FlatList
                    data={SUBMISSIONS}
                    renderItem={renderSubmissionItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    ListHeaderComponent={<Text style={styles.listHeader}>Pending Grades ({SUBMISSIONS.filter(s => !s.grade).length})</Text>}
                />
            )}
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
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#7C3AED',
    },
    tabText: {
        fontSize: 16,
        color: '#6B7280',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#7C3AED',
        fontWeight: '700',
    },
    formContent: {
        padding: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 14,
        marginBottom: 20,
        fontSize: 16,
    },
    textArea: {
        height: 120,
    },
    uploadBox: {
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
        borderRadius: 16,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        backgroundColor: '#F9FAFB',
    },
    uploadText: {
        fontSize: 14,
        color: '#9CA3AF',
        marginTop: 8,
    },
    createButton: {
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    gradientButton: {
        padding: 16,
        alignItems: 'center',
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    listContent: {
        padding: 20,
    },
    listHeader: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: 16,
    },
    submissionCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    submissionInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fileIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    studentName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
    },
    submissionDate: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    gradeButton: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    gradeButtonText: {
        color: '#374151',
        fontSize: 12,
        fontWeight: '600',
    },
    gradedBadge: {
        backgroundColor: '#D1FAE5',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    gradeText: {
        color: '#059669',
        fontSize: 12,
        fontWeight: '700',
    },
});
