import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const COURSES = ["Computer Science 101", "Calculus II", "Physics", "English", "Web Engineering"];

const MATERIALS = {
    "Computer Science 101": [
        { id: '1', title: 'Lecture 1: Introduction', type: 'pdf', size: '2.4 MB' },
        { id: '2', title: 'Lecture 2: Algorithms', type: 'pdf', size: '3.1 MB' },
        { id: '3', title: 'Assignment 1', type: 'doc', size: '0.5 MB' },
    ],
    "Calculus II": [
        { id: '4', title: 'Derivatives Guidelines', type: 'pdf', size: '1.2 MB' },
    ],
    "Physics": [
        { id: '5', title: 'Lab Manual', type: 'pdf', size: '5.0 MB' },
    ],
    "English": [],
    "Web Engineering": [
        { id: '6', title: 'React Basics', type: 'ppt', size: '4.2 MB' },
    ]
};

export default function CourseMaterialsScreen({ navigation }) {
    const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleDownload = (fileName) => {
        Alert.alert("Downloading...", `Starting download for ${fileName}`);
    };

    const renderMaterialItem = ({ item }) => {
        let iconName = 'description';
        let iconColor = '#6B7280';

        if (item.type === 'pdf') { iconName = 'picture-as-pdf'; iconColor = '#EF4444'; }
        else if (item.type === 'doc') { iconName = 'article'; iconColor = '#2563EB'; }
        else if (item.type === 'ppt') { iconName = 'slideshow'; iconColor = '#EA580C'; }

        return (
            <TouchableOpacity style={styles.fileCard} onPress={() => handleDownload(item.title)}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name={iconName} size={28} color={iconColor} />
                </View>
                <View style={styles.fileInfo}>
                    <Text style={styles.fileName}>{item.title}</Text>
                    <Text style={styles.fileSize}>{item.size} • {item.type.toUpperCase()}</Text>
                </View>
                <MaterialIcons name="file-download" size={24} color="#9CA3AF" />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Course Materials</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.content}>
                <Text style={styles.label}>Select Course</Text>
                <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                >
                    <Text style={styles.dropdownText}>{selectedCourse}</Text>
                    <MaterialIcons name={dropdownVisible ? "expand-less" : "expand-more"} size={24} color="#4B5563" />
                </TouchableOpacity>

                {dropdownVisible && (
                    <View style={styles.dropdownList}>
                        {COURSES.map((course) => (
                            <TouchableOpacity
                                key={course}
                                style={styles.dropdownItem}
                                onPress={() => {
                                    setSelectedCourse(course);
                                    setDropdownVisible(false);
                                }}
                            >
                                <Text style={[styles.dropdownItemText, selectedCourse === course && styles.selectedItemText]}>
                                    {course}
                                </Text>
                                {selectedCourse === course && <MaterialIcons name="check" size={20} color="#2563EB" />}
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <FlatList
                    data={MATERIALS[selectedCourse]}
                    renderItem={renderMaterialItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No materials found for this course.</Text>
                        </View>
                    }
                />
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
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: 8,
    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 16,
    },
    dropdownText: {
        fontSize: 16,
        color: '#111827',
    },
    dropdownList: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        position: 'absolute',
        top: 90,
        left: 20,
        right: 20,
        zIndex: 20,
    },
    dropdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    dropdownItemText: {
        fontSize: 15,
        color: '#374151',
    },
    selectedItemText: {
        color: '#2563EB',
        fontWeight: '600',
    },
    listContainer: {
        paddingBottom: 20,
        paddingTop: 8,
    },
    fileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    fileInfo: {
        flex: 1,
    },
    fileName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    fileSize: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    emptyText: {
        color: '#9CA3AF',
        fontSize: 16,
    },
});
