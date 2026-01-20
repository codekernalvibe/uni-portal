import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Modal, Image, Alert, TextInput, Dimensions } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function ProfileScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const [studentInfo, setStudentInfo] = useState({
        name: "Muhammad Saad",
        dept: "Software Engineering",
        email: "Msaad@mnsuam.edu.pk",
    });

    const [editName, setEditName] = useState(studentInfo.name);
    const [editDept, setEditDept] = useState(studentInfo.dept);
    const [editEmail, setEditEmail] = useState(studentInfo.email);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleEditProfile = () => {
        setEditName(studentInfo.name);
        setEditDept(studentInfo.dept);
        setEditEmail(studentInfo.email);
        setEditModalVisible(true);
    };

    const saveProfile = () => {
        setStudentInfo({
            ...studentInfo,
            name: editName,
            dept: editDept,
            email: editEmail
        });
        setEditModalVisible(false);
    };

    return (
        <View style={styles.mainContainer}>
            {/* Decorative Background Header */}
            <LinearGradient
                colors={['#2563EB', '#1D4ED8']}
                style={styles.headerBackground}
            />

            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <MaterialIcons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Profile</Text>
                    <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
                        <MaterialIcons name="edit" size={20} color="#2563EB" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                    {/* Profile Card */}
                    <View style={styles.profileCard}>
                        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
                            {profileImage ? (
                                <Image source={{ uri: profileImage }} style={styles.avatarImage} />
                            ) : (
                                <MaterialIcons name="person" size={60} color="#9CA3AF" />
                            )}
                            <View style={styles.cameraBadge}>
                                <MaterialIcons name="camera-alt" size={14} color="white" />
                            </View>
                        </TouchableOpacity>

                        <Text style={styles.name}>{studentInfo.name}</Text>
                        <Text style={styles.dept}>{studentInfo.dept}</Text>

                        <View style={styles.divider} />

                        <InfoRow label="Email Address" value={studentInfo.email} icon="email" />
                    </View>

                    {/* Digital ID Button */}
                    <TouchableOpacity
                        style={styles.idButtonContainer}
                        onPress={() => setModalVisible(true)}
                        activeOpacity={0.9}
                    >
                        <LinearGradient
                            colors={['#1F2937', '#111827']}
                            style={styles.idButton}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <View style={styles.idButtonContent}>
                                <View style={styles.qrIconContainer}>
                                    <MaterialIcons name="qr-code" size={24} color="#fff" />
                                </View>
                                <View>
                                    <Text style={styles.idButtonTitle}>Digital ID Card</Text>
                                    <Text style={styles.idButtonSubtitle}>Tap to show QR code</Text>
                                </View>
                            </View>
                            <MaterialIcons name="chevron-right" size={24} color="#6B7280" />
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>

                {/* Edit Profile Modal */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={editModalVisible}
                    onRequestClose={() => setEditModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.editModalContent}>
                            <Text style={styles.modalTitle}>Update Profile</Text>

                            <Text style={styles.inputLabel}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                value={editName}
                                onChangeText={setEditName}
                            />

                            <Text style={styles.inputLabel}>Department</Text>
                            <TextInput
                                style={styles.input}
                                value={editDept}
                                onChangeText={setEditDept}
                            />

                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={editEmail}
                                onChangeText={setEditEmail}
                                keyboardType="email-address"
                            />

                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setEditModalVisible(false)}>
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
                                    <Text style={styles.saveButtonText}>Save Changes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Digital ID Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.idModalContent}>
                            <LinearGradient
                                colors={['#2563EB', '#1D4ED8']}
                                style={styles.idHeaderBand}
                            />

                            <View style={styles.idCardHeader}>
                                <Text style={styles.uniName}>MNS UAM</Text>
                                <Text style={styles.cardLabel}>Student Identity</Text>
                            </View>

                            <View style={styles.qrPlaceholder}>
                                <Ionicons name="qr-code-outline" size={250} color="#1F2937" />
                            </View>

                            <Text style={styles.modalName}>{studentInfo.name}</Text>
                            <Text style={styles.modalId}>{studentInfo.dept}</Text>

                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>Close ID</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </View>
    );
}

const InfoRow = ({ label, value, icon }) => (
    <View style={styles.infoRow}>
        <View style={styles.iconBox}>
            <MaterialIcons name={icon} size={20} color="#2563EB" />
        </View>
        <View style={{ flex: 1 }}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 180,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 20,
    },
    backButton: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    editButton: {
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 8,
    },
    content: {
        paddingHorizontal: 24,
        paddingTop: 10,
    },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
        elevation: 6,
        marginBottom: 24,
    },
    avatarContainer: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 4,
        borderColor: '#fff',
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 4,
        marginTop: -60, // Pull up to overlap header
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 55,
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#2563EB',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E293B',
        textAlign: 'center',
    },
    dept: {
        fontSize: 16,
        color: '#64748B',
        marginTop: 4,
        fontWeight: '500',
        marginBottom: 20,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#E2E8F0',
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoLabel: {
        fontSize: 12,
        color: '#64748B',
        marginBottom: 2,
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 16,
        color: '#1E293B',
        fontWeight: '600',
    },
    idButtonContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 40,
        shadowColor: '#111827',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 4,
    },
    idButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    idButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qrIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    idButtonTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    idButtonSubtitle: {
        color: '#9CA3AF',
        fontSize: 13,
        marginTop: 2,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    editModalContent: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        width: '100%',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 24,
        textAlign: 'center',
    },
    inputLabel: {
        fontSize: 14,
        color: '#334155',
        marginBottom: 8,
        fontWeight: '600',
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 14,
        marginBottom: 16,
        fontSize: 16,
        color: '#1E293B',
    },
    modalButtons: {
        flexDirection: 'row',
        marginTop: 16,
    },
    cancelButton: {
        flex: 1,
        padding: 16,
        marginRight: 8,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
        alignItems: 'center',
    },
    saveButton: {
        flex: 1,
        padding: 16,
        marginLeft: 8,
        borderRadius: 12,
        backgroundColor: '#2563EB',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#475569',
        fontWeight: '600',
        fontSize: 16,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    idModalContent: {
        backgroundColor: '#fff',
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        overflow: 'hidden',
        paddingBottom: 24,
    },
    idHeaderBand: {
        height: 60,
        width: '100%',
        position: 'absolute',
        top: 0,
    },
    idCardHeader: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 30,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    uniName: {
        fontSize: 20,
        fontWeight: '800',
        color: '#2563EB',
        marginBottom: 4,
    },
    cardLabel: {
        fontSize: 12,
        color: '#64748B',
        textTransform: 'uppercase',
        letterSpacing: 2,
        fontWeight: '600',
    },
    qrPlaceholder: {
        marginVertical: 24,
    },
    modalName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1E293B',
        textAlign: 'center',
    },
    modalId: {
        fontSize: 16,
        color: '#64748B',
        marginBottom: 32,
        marginTop: 4,
        fontWeight: '500',
    },
    closeButton: {
        paddingVertical: 14,
        width: '60%',
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#475569',
        fontWeight: '700',
        fontSize: 16,
    },
});
