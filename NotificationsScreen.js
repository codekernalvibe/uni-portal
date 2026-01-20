import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NOTIFICATIONS = [
    { id: '1', title: 'Midterm Exam Schedule Announced', message: 'Check your timetable for the updated schedule.', type: 'EXAM', date: '2 hours ago' },
    { id: '2', title: 'Fee Submission Deadline Extended', message: 'The last date to submit fee is now Friday.', type: 'URGENT', date: 'Yesterday' },
    { id: '3', title: 'Sports Week Registration', message: 'Register for cricket and football trials.', type: 'EVENT', date: '2 days ago' },
    { id: '4', title: 'Library Hours Changed', message: 'Library will remain open till 8 PM.', type: 'INFO', date: '3 days ago' },
];

export default function NotificationsScreen({ navigation }) {
    const renderNotification = ({ item }) => {
        let tagColor = '#6B7280';
        let iconName = 'notifications';

        if (item.type === 'URGENT') { tagColor = '#EF4444'; iconName = 'error'; }
        else if (item.type === 'EXAM') { tagColor = '#2563EB'; iconName = 'assignment'; }
        else if (item.type === 'EVENT') { tagColor = '#10B981'; iconName = 'event'; }
        else if (item.type === 'INFO') { tagColor = '#F59E0B'; iconName = 'info'; }

        return (
            <View style={styles.card}>
                <View style={styles.headerRow}>
                    <View style={[styles.tag, { backgroundColor: tagColor + '20' }]}>
                        <Text style={[styles.tagText, { color: tagColor }]}>{item.type}</Text>
                    </View>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
                <View style={styles.contentRow}>
                    <View style={[styles.iconBox, { backgroundColor: tagColor + '10' }]}>
                        <MaterialIcons name={iconName} size={24} color={tagColor} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.message}>{item.message}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={NOTIFICATIONS}
                renderItem={renderNotification}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
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
    listContent: {
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    tagText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    message: {
        fontSize: 13,
        color: '#6B7280',
        lineHeight: 18,
    },
});
