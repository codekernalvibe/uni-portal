import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ChatScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Discussion</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.content}>
                <Image
                    source={{ uri: 'https://img.freepik.com/free-vector/group-chat-concept-illustration_114360-1635.jpg' }}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Class Discussion Board</Text>
                <Text style={styles.subtitle}>Chat feature is coming soon! Stay tuned to connect with your classmates and teachers.</Text>
            </View>
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
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
    },
});
