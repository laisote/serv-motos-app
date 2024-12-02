import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NotificationsScreen = () => {
    const [pendingServices, setPendingServices] = useState([]);

    useEffect(() => {
        loadPendingServices();
    }, []);

    const loadPendingServices = async () => {
        try {
            const savedServices = await AsyncStorage.getItem('maintenanceServices');
            if (savedServices) {
                const allServices = JSON.parse(savedServices);
                const pending = allServices.filter(service => service.status === 'pendente');
                setPendingServices(pending);
            }
        } catch (error) {
            console.error('Erro ao carregar serviços pendentes:', error);
        }
    };

    const renderNotificationItem = ({ item }) => (
        <View style={styles.notificationItem}>
            <MaterialCommunityIcons name="alert-circle" size={24} color="#FFA500" />
            <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationDate}>Data prevista: {item.nextDate}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notificações</Text>
            {pendingServices.length > 0 ? (
                <FlatList
                    data={pendingServices}
                    renderItem={renderNotificationItem}
                    keyExtractor={item => item.id.toString()}
                />
            ) : (
                <Text style={styles.emptyMessage}>Não há serviços pendentes no momento.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    notificationContent: {
        marginLeft: 12,
        flex: 1,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    notificationDate: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    emptyMessage: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default NotificationsScreen;

