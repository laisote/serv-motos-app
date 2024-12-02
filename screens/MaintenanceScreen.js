import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MaintenanceScreen = () => {
    const [services, setServices] = useState([]);
    const [partnerShops, setPartnerShops] = useState([]);

    useEffect(() => {
        loadServices();
        loadPartnerShops();
    }, []);

    const loadServices = async () => {
        try {
            const savedServices = await AsyncStorage.getItem('maintenanceServices');
            if (savedServices) {
                setServices(JSON.parse(savedServices));
            } else {
                // Dados iniciais se não houver serviços salvos
                const initialServices = [
                    { id: 1, title: 'Troca de óleo', frequency: 'A cada 3.000 km', status: 'pendente', nextDate: '15/06/2023' },
                    { id: 2, title: 'Troca de Pneus', frequency: 'A cada 20.000 km', status: 'pendente', nextDate: '30/09/2023' },
                    { id: 3, title: 'Revisão Geral', frequency: 'A cada 10.000 km', status: 'concluído', nextDate: '01/08/2023' },
                    { id: 4, title: 'Alinhamento', frequency: 'A cada 30 dias', status: 'em andamento', nextDate: '20/06/2023' },
                    { id: 5, title: 'Higienização', frequency: 'A cada 15 dias', status: 'pendente', nextDate: '10/06/2023' },
                ];
                await AsyncStorage.setItem('maintenanceServices', JSON.stringify(initialServices));
                setServices(initialServices);
            }
        } catch (error) {
            console.error('Erro ao carregar serviços:', error);
        }
    };

    const loadPartnerShops = async () => {
        try {
            const savedShops = await AsyncStorage.getItem('partnerShops');
            if (savedShops) {
                setPartnerShops(JSON.parse(savedShops));
            } else {
                const initialShops = [
                    { id: 1, name: 'Moto líder', location: 'São Paulo - SP' },
                    { id: 2, name: 'Rota 66', location: 'São Paulo - SP' },
                    { id: 3, name: 'Street motos', location: 'São Paulo - SP' },
                ];
                await AsyncStorage.setItem('partnerShops', JSON.stringify(initialShops));
                setPartnerShops(initialShops);
            }
        } catch (error) {
            console.error('Erro ao carregar oficinas parceiras:', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pendente':
                return '#FFA500';
            case 'em andamento':
                return '#4169E1';
            case 'concluído':
                return '#32CD32';
            default:
                return '#000';
        }
    };

    const renderServiceCard = (service) => (
        <View key={service.id} style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{service.title}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(service.status) }]}>
                    <Text style={styles.statusText}>{service.status}</Text>
                </View>
            </View>
            <Text style={styles.cardFrequency}>{service.frequency}</Text>
            <Text style={styles.cardDate}>Próxima data: {service.nextDate}</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>Serviços de Manutenção</Text>
            {services.map(renderServiceCard)}

            <Text style={styles.sectionTitle}>Oficinas Parceiras</Text>
            {partnerShops.map((shop) => (
                <View key={shop.id} style={styles.shopCard}>
                    <MaterialCommunityIcons name="store" size={24} color="red" />
                    <View style={styles.shopInfo}>
                        <Text style={styles.shopName}>{shop.name}</Text>
                        <Text style={styles.shopLocation}>{shop.location}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    cardFrequency: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    cardDate: {
        fontSize: 14,
        color: '#666',
    },
    shopCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    shopInfo: {
        marginLeft: 12,
    },
    shopName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    shopLocation: {
        fontSize: 14,
        color: '#666',
    },
});

export default MaintenanceScreen;

