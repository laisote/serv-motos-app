import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DocumentationScreen = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = async () => {
        try {
            const savedDocuments = await AsyncStorage.getItem('bikeDocuments');
            if (savedDocuments) {
                setDocuments(JSON.parse(savedDocuments));
            } else {
                // Dados iniciais se não houver documentos salvos
                const initialDocuments = [
                    { id: 1, title: 'Licenciamento anual', dueDate: '30/06/2023', status: 'pendente' },
                    { id: 2, title: 'DPVAT', dueDate: '31/07/2023', status: 'em andamento' },
                    { id: 3, title: 'IPVA', dueDate: '15/05/2023', status: 'concluído' },
                    { id: 4, title: 'CNH', dueDate: '10/12/2023', status: 'pendente' },
                ];
                await AsyncStorage.setItem('bikeDocuments', JSON.stringify(initialDocuments));
                setDocuments(initialDocuments);
            }
        } catch (error) {
            console.error('Erro ao carregar documentos:', error);
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

    const renderDocumentCard = (document) => (
        <View key={document.id} style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{document.title}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(document.status) }]}>
                    <Text style={styles.statusText}>{document.status}</Text>
                </View>
            </View>
            <Text style={styles.cardDate}>Vencimento: {document.dueDate}</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>Documentação da Moto</Text>
            {documents.map(renderDocumentCard)}
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
    cardDate: {
        fontSize: 14,
        color: '#666',
    },
});

export default DocumentationScreen;

