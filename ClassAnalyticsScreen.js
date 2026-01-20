import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, SHADOWS } from './theme';

const { width } = Dimensions.get('window');

const AT_RISK_STUDENTS = [
    { id: '1', name: 'Zainab Bibi', attendance: '65%', risk: 'High' },
    { id: '2', name: 'Hamza Raza', attendance: '72%', risk: 'Medium' },
];

export default function ClassAnalyticsScreen({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Class Analytics</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                {/* Average Grade Card */}
                <LinearGradient
                    colors={GRADIENTS.primary}
                    style={styles.statsCard}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View style={styles.statsIcon}>
                        <MaterialIcons name="grade" size={24} color={COLORS.white} />
                    </View>
                    <View>
                        <Text style={styles.statsLabel}>Class Average Grade</Text>
                        <Text style={styles.statsValue}>B+ (3.4)</Text>
                    </View>
                    <View style={styles.trendBadge}>
                        <MaterialIcons name="trending-up" size={16} color={COLORS.success} />
                        <Text style={styles.trendText}>+0.2</Text>
                    </View>
                </LinearGradient>

                {/* Attendance Rate Card */}
                <LinearGradient
                    colors={GRADIENTS.success}
                    style={styles.statsCard}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View style={styles.statsIcon}>
                        <MaterialIcons name="event-available" size={24} color={COLORS.white} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.statsLabel}>Attendance Rate</Text>
                        <Text style={styles.statsValue}>85%</Text>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: '85%' }]} />
                        </View>
                    </View>
                </LinearGradient>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Attendance Graph</Text>
                    <Text style={styles.sectionSubtitle}>Avg. Absent per Day</Text>
                </View>

                {/* Dummy Bar Chart */}
                <View style={styles.chartContainer}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => {
                        const heights = [40, 60, 20, 90, 120]; // Dummy heights
                        const isHighest = day === 'Fri';
                        return (
                            <View key={day} style={styles.barContainer}>
                                <LinearGradient
                                    colors={isHighest ? GRADIENTS.danger : [COLORS.border, COLORS.border]}
                                    style={[styles.bar, { height: heights[index] }]}
                                />
                                <Text style={styles.dayLabel}>{day}</Text>
                            </View>
                        )
                    })}
                </View>
                <Text style={styles.chartNote}>Friday has the highest absence rate.</Text>


                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: COLORS.error }]}>At-Risk Students</Text>
                    <MaterialIcons name="warning" size={20} color={COLORS.error} />
                </View>

                {/* At Risk List */}
                {AT_RISK_STUDENTS.map((student) => (
                    <View key={student.id} style={styles.riskCard}>
                        <View>
                            <Text style={styles.studentName}>{student.name}</Text>
                            <Text style={styles.riskLabel}>Attendance: {student.attendance}</Text>
                        </View>
                        <View style={[styles.riskBadge, { backgroundColor: student.risk === 'High' ? '#FEE2E2' : '#FEF3C7' }]}>
                            <Text style={[styles.riskText, { color: student.risk === 'High' ? COLORS.error : COLORS.warning }]}>
                                {student.risk} Risk
                            </Text>
                        </View>
                    </View>
                ))}

            </ScrollView>
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
        padding: 24,
    },
    statsCard: {
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        ...SHADOWS.medium,
    },
    statsIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    statsLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        marginBottom: 4,
        fontWeight: '600',
    },
    statsValue: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: 'bold',
    },
    trendBadge: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    trendText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.success,
        marginLeft: 4,
    },
    progressBar: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 3,
        marginTop: 8,
        width: '100%',
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.white,
        borderRadius: 3,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginRight: 8,
    },
    sectionSubtitle: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginLeft: 'auto',
    },
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 150,
        backgroundColor: COLORS.cardBackground,
        borderRadius: 16,
        padding: 16,
        paddingBottom: 8,
        ...SHADOWS.small,
    },
    barContainer: {
        alignItems: 'center',
    },
    bar: {
        width: 12,
        borderRadius: 6,
        marginBottom: 8,
    },
    dayLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    chartNote: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 8,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    riskCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.cardBackground,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...SHADOWS.small,
    },
    studentName: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    riskLabel: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    riskBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    riskText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});
