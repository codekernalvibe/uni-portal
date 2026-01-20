import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const SCHEDULE_DATA = {
    'Mon': [
        { id: '1', time: '09:00 AM', subject: 'Computer Science 101', room: 'Room 301' },
        { id: '2', time: '11:00 AM', subject: 'Calculus II', room: 'Hall B' },
    ],
    'Tue': [
        { id: '3', time: '10:00 AM', subject: 'Physics', room: 'Lab 2' },
    ],
    'Wed': [
        { id: '4', time: '09:00 AM', subject: 'English', room: 'Room 105' },
        { id: '5', time: '01:00 PM', subject: 'Programming Lab', room: 'Comp Lab 1' },
    ],
    'Thu': [],
    'Fri': [
        { id: '6', time: '10:00 AM', subject: 'History', room: 'Room 202' },
    ],
};

export default function TimetableScreen({ navigation }) {
    const [selectedDay, setSelectedDay] = useState('Mon');

    const renderClassItem = ({ item }) => {
        // Mock logic for "current class" - assume 9:00 AM classes on Monday are "current" for demo
        const isCurrent = selectedDay === 'Mon' && item.time === '09:00 AM';

        return (
            <View style={[styles.classCard, isCurrent && styles.currentClassCard]}>
                <View style={styles.timeContainer}>
                    <Text style={[styles.timeText, isCurrent && styles.currentTimeText]}>{item.time}</Text>
                </View>
                <View style={styles.classInfo}>
                    <Text style={[styles.subjectText, isCurrent && styles.currentSubjectText]}>{item.subject}</Text>
                    <Text style={[styles.roomText, isCurrent && styles.currentRoomText]}>{item.room}</Text>
                </View>
                {isCurrent && (
                    <View style={styles.liveIndicator}>
                        <Text style={styles.liveText}>NOW</Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Timetable</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.tabsContainer}>
                {DAYS.map((day) => (
                    <TouchableOpacity
                        key={day}
                        style={[styles.tab, selectedDay === day && styles.activeTab]}
                        onPress={() => setSelectedDay(day)}
                    >
                        <Text style={[styles.tabText, selectedDay === day && styles.activeTabText]}>{day}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={SCHEDULE_DATA[selectedDay]}
                renderItem={renderClassItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No classes scheduled for {selectedDay}</Text>
                    </View>
                }
            />
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
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: '#EFF6FF',
    },
    tabText: {
        color: '#6B7280',
        fontWeight: '600',
    },
    activeTabText: {
        color: '#2563EB',
    },
    listContent: {
        padding: 20,
    },
    classCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    currentClassCard: {
        backgroundColor: '#DCFCE7', // Light green
        borderColor: '#22C55E',
        borderWidth: 1,
    },
    timeContainer: {
        width: 80,
    },
    timeText: {
        fontWeight: 'bold',
        color: '#374151',
    },
    currentTimeText: {
        color: '#15803D',
    },
    classInfo: {
        flex: 1,
    },
    subjectText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
    currentSubjectText: {
        color: '#14532D',
    },
    roomText: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    currentRoomText: {
        color: '#15803D',
    },
    liveIndicator: {
        backgroundColor: '#22C55E',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    liveText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
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
