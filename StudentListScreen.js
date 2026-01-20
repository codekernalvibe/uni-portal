import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, TextInput, Alert, Image } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const STUDENTS = [
    { id: '1', name: 'Ali Khan', rollNo: 'SP23-BSE-001', department: 'Software Engineering', email: 'ali.khan@uni.edu', cgpa: '3.5' },
    { id: '2', name: 'Sara Ahmed', rollNo: 'SP23-BSE-005', department: 'Software Engineering', email: 'sara.ahmed@uni.edu', cgpa: '3.8' },
    { id: '3', name: 'Bilal Hassan', rollNo: 'SP23-BSE-012', department: 'Software Engineering', email: 'bilal.hassan@uni.edu', cgpa: '2.9' },
    { id: '4', name: 'Zainab Bibi', rollNo: 'SP23-BSE-018', department: 'Software Engineering', email: 'zainab.bibi@uni.edu', cgpa: '3.6' },
    { id: '5', name: 'Usman Ali', rollNo: 'SP23-BSE-022', department: 'Software Engineering', email: 'usman.ali@uni.edu', cgpa: '3.1' },
    { id: '6', name: 'Ayesha Khan', rollNo: 'SP23-BSE-025', department: 'Software Engineering', email: 'ayesha.khan@uni.edu', cgpa: '3.9' },
    { id: '7', name: 'Hamza Raza', rollNo: 'SP23-BSE-030', department: 'Software Engineering', email: 'hamza.raza@uni.edu', cgpa: '3.2' },
];

export default function StudentListScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(STUDENTS);

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text) {
            const newData = STUDENTS.filter(item => {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1 || item.rollNo.indexOf(text.toUpperCase()) > -1;
            });
            setFilteredStudents(newData);
        } else {
            setFilteredStudents(STUDENTS);
        }
    };

    const showStudentDetails = (student) => {
        Alert.alert(
            student.name,
            `Roll No: ${student.rollNo}\nDepartment: ${student.department}\nEmail: ${student.email}\nCGPA: ${student.cgpa}`,
            [
                { text: "Message Student", onPress: () => console.log('Message sent') },
                { text: "Close", style: "cancel" }
            ]
        );
    };

    const renderStudentItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => showStudentDetails(item)}>
            <LinearGradient
                colors={['#F9FAFB', '#F3F4F6']}
                style={styles.cardGradient}
            >
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.rollNo}>{item.rollNo}</Text>
                    <Text style={styles.dept}>{item.department}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Student Directory</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <MaterialIcons name="search" size={24} color="#9CA3AF" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by Name or Roll No"
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                </View>
            </View>

            <FlatList
                data={filteredStudents}
                renderItem={renderStudentItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1F2937',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    card: {
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardGradient: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#2563EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    avatarText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    rollNo: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 2,
    },
    dept: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 2,
    },
});
