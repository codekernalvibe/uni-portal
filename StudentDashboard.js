import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Platform, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, SHADOWS } from './theme';

const { width } = Dimensions.get('window');

const DASHBOARD_ITEMS = [
    { id: '1', title: 'GPA Tracker', icon: 'assessment', library: 'MaterialIcons', color: GRADIENTS.primary, screen: 'GPACalculator' },
    { id: '2', title: 'Timetable', icon: 'calendar-today', library: 'MaterialIcons', color: GRADIENTS.success, screen: 'Timetable' },
    { id: '3', title: 'Profile', icon: 'person', library: 'MaterialIcons', color: GRADIENTS.gold, screen: 'Profile' },
    { id: '4', title: 'Materials', icon: 'book', library: 'MaterialIcons', color: ['#7C3AED', '#A78BFA'], screen: 'CourseMaterials' },
    { id: '5', title: 'Discussion', icon: 'chat', library: 'MaterialIcons', color: ['#DB2777', '#F472B6'], screen: 'Chat' },
    { id: '6', title: 'Notifications', icon: 'notifications', library: 'MaterialIcons', color: ['#2563EB', '#60A5FA'], screen: 'Notifications' },
];

export default function StudentDashboard({ navigation, route }) {
    const { userName } = route.params || {};

    const handleNavigation = (screenName) => {
        navigation.navigate(screenName);
    };

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Header Section */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greetingTitle}>Welcome back,</Text>
                        <Text style={styles.greetingName}>{userName || 'Saad'}</Text>
                        <Text style={styles.subGreeting}>Student • Software Engineering</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                            <MaterialIcons name="logout" size={24} color={COLORS.error} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Dashboard Grid */}
                <View style={styles.gridContainer}>
                    {DASHBOARD_ITEMS.map((item) => (
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
                                {item.library === 'MaterialIcons' ? (
                                    <MaterialIcons name={item.icon} size={32} color={COLORS.white} />
                                ) : (
                                    <FontAwesome5 name={item.icon} size={24} color={COLORS.white} />
                                )}
                            </LinearGradient>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        padding: 24,
        paddingTop: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 32,
        marginTop: 20,
    },
    greetingTitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    greetingName: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.primary,
        marginTop: 4,
    },
    subGreeting: {
        fontSize: 14,
        color: COLORS.textSecondary,
        fontWeight: '500',
        marginTop: 8,
    },
    headerRight: {
        paddingTop: 8,
    },
    logoutButton: {
        padding: 10,
        backgroundColor: '#FEF2F2',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: (width - 64) / 2,
        backgroundColor: COLORS.cardBackground,
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        ...SHADOWS.medium,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        ...SHADOWS.small,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.textPrimary,
        textAlign: 'center',
    },
});
