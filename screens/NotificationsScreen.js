import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NotificationsScreen = () => {
    const [pendingItems, setPendingItems] = useState([]);

    useEffect(() => {
        loadPendingItems();
    }, []);

    const loadPendingItems = async () => {
        try {
            const savedServices = await AsyncStorage.getItem('maintenanceServices');
            const savedDocuments = await AsyncStorage.getItem('bikeDocuments');

            let pendingServices = [];
            let pendingDocuments = [];

            if (savedServices) {
                const allServices = JSON.parse(savedServices);
                pendingServices = allServices.filter(service => service.status === 'pendente')
                    .map(service => ({ ...service, type: 'service' }));
            }

            if (savedDocuments) {
                const allDocuments = JSON.parse(savedDocuments);
                pendingDocuments = allDocuments.filter(doc => doc.status === 'pendente')
                    .map(doc => ({ ...doc, type: 'document' }));
            }

            setPendingItems([...pendingServices, ...pendingDocuments]);
        } catch (error) {
            console.error('Erro ao carregar itens pendentes:', error);
        }
    };

    const renderNotificationItem = ({ item }) => (
        <View style={styles.notificationItem}>
            <MaterialCommunityIcons
                name={item.type === 'service' ? 'wrench' : 'file-document'}
                size={24}
                color="#FFA500"
            />
            <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationDate}>
                    {item.type === 'service' ? `Data prevista: ${item.nextDate}` : `Vencimento: ${item.dueDate}`}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notificações</Text>
            {pendingItems.length > 0 ? (
                <FlatList
                    data={pendingItems}
                    renderItem={renderNotificationItem}
                    keyExtractor={item => `${item.type}-${item.id}`}
                />
            ) : (
                <Text style={styles.emptyMessage}>Não há itens pendentes no momento.</Text>
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

