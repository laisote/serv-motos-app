import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function ViewBikeScreen() {
    const [bikeInfo, setBikeInfo] = useState(null);
    const [isUpdatingKm, setIsUpdatingKm] = useState(false);
    const [newKm, setNewKm] = useState('');
    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            loadBikeInfo();
        }, [])
    );

    const loadBikeInfo = async () => {
        try {
            const savedBikeInfo = await AsyncStorage.getItem('bikeInfo');
            if (savedBikeInfo !== null) {
                setBikeInfo(JSON.parse(savedBikeInfo));
            }
        } catch (error) {
            console.error('Erro ao carregar informações da moto:', error);
            Alert.alert('Erro', 'Não foi possível carregar as informações da moto.');
        }
    };

    const handleUpdateKm = async () => {
        if (isUpdatingKm) {
            if (newKm && !isNaN(newKm)) {
                try {
                    const updatedBikeInfo = { ...bikeInfo, kmAtual: newKm };
                    await AsyncStorage.setItem('bikeInfo', JSON.stringify(updatedBikeInfo));
                    setBikeInfo(updatedBikeInfo);
                    setIsUpdatingKm(false);
                    setNewKm('');
                    Alert.alert('Sucesso', 'Quilometragem atualizada com sucesso!');
                } catch (error) {
                    console.error('Erro ao atualizar quilometragem:', error);
                    Alert.alert('Erro', 'Não foi possível atualizar a quilometragem.');
                }
            } else {
                Alert.alert('Erro', 'Por favor, insira uma quilometragem válida.');
            }
        } else {
            setIsUpdatingKm(true);
        }
    };

    const handleUpdateData = () => {
        navigation.navigate('Bike', { bikeInfo: bikeInfo });
    };

    if (!bikeInfo) {
        return (
            <View style={styles.container}>
                <Text>Carregando informações da moto...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.modelTitle}>{bikeInfo.marca}</Text>
                    <Text style={styles.modelSubtitle}>{bikeInfo.modelo}</Text>
                </View>
                <View style={styles.plateContainer}>
                    <Text style={styles.plateText}>{bikeInfo.placa}</Text>
                </View>
            </View>

            <View style={styles.kmContainer}>
                <View style={styles.kmInfo}>
                    <MaterialCommunityIcons name="speedometer" size={24} color="#B22222" />
                    {isUpdatingKm ? (
                        <TextInput
                            style={styles.kmInput}
                            value={newKm}
                            onChangeText={setNewKm}
                            keyboardType="numeric"
                            placeholder="Nova quilometragem"
                            autoFocus
                        />
                    ) : (
                        <Text style={styles.kmText}>{bikeInfo.kmAtual} km</Text>
                    )}
                </View>
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdateKm}>
                    <Text style={styles.updateButtonText}>
                        {isUpdatingKm ? 'Salvar' : 'Atualizar Km'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                    <MaterialCommunityIcons name="calendar" size={24} color="#B22222" />
                    <Text style={styles.actionButtonText}>Agendar{'\n'}Serviço</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <MaterialCommunityIcons name="image-plus" size={24} color="#B22222" />
                    <Text style={styles.actionButtonText}>Adicionar{'\n'}Imagem</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <MaterialCommunityIcons name="trash-can" size={24} color="#B22222" />
                    <Text style={styles.actionButtonText}>Excluir{'\n'}Moto</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.dataSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Dados da Moto</Text>
                    <MaterialCommunityIcons name="wrench" size={24} color="#666" />
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.dataLabel}>Marca</Text>
                    <Text style={styles.dataValue}>{bikeInfo.marca}</Text>
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.dataLabel}>Modelo</Text>
                    <Text style={styles.dataValue}>{bikeInfo.modelo}</Text>
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.dataLabel}>Cor</Text>
                    <Text style={styles.dataValue}>{bikeInfo.cor}</Text>
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.dataLabel}>Ano/Modelo</Text>
                    <Text style={styles.dataValue}>{bikeInfo.anoFabricacao} / {bikeInfo.anoModelo}</Text>
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.dataLabel}>Data 1ª Venda</Text>
                    <Text style={styles.dataValue}>{bikeInfo.dataPrimeiraCompra}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.updateDataButton} onPress={handleUpdateData}>
                <Text style={styles.updateDataButtonText}>Atualizar Dados</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
    },
    modelTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    modelSubtitle: {
        fontSize: 20,
        marginTop: 4,
    },
    plateContainer: {
        backgroundColor: 'red',
        alignSelf: 'flex-start',
        padding: 8,
        borderRadius: 5,
        marginTop: 10,
    },
    plateText: {
        color: 'white',
        fontWeight: 'bold',
    },
    kmContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    kmInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    kmText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    kmInput: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        paddingBottom: 5,
        minWidth: 100,
    },
    updateButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    updateButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 10,
    },
    actionButton: {
        alignItems: 'center',
        flex: 1,
    },
    actionButtonText: {
        textAlign: 'center',
        marginTop: 5,
        color: '#666',
    },
    dataSection: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    dataLabel: {
        color: '#666',
    },
    dataValue: {
        color: '#B22222',
        fontWeight: '500',
    },
    updateDataButton: {
        backgroundColor: 'red',
        padding: 15,
        margin: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    updateDataButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

