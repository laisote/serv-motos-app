import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function BikeScreen({ navigation }) {
    const [bikeInfo, setBikeInfo] = useState({
        modelo: '',
        ano: '',
        placa: '',
        cor: '',
        proprietario: '',
        dataAquisicao: new Date(),
        dataUltimaRevisao: new Date(),
        dataUltimaTrocaOleo: new Date(),
    });

    const [showDatePicker, setShowDatePicker] = useState({
        aquisicao: false,
        revisao: false,
        trocaOleo: false,
    });

    useEffect(() => {
        loadBikeInfo();
    }, []);

    const loadBikeInfo = async () => {
        try {
            const savedBikeInfo = await AsyncStorage.getItem('bikeInfo');
            if (savedBikeInfo !== null) {
                const parsedInfo = JSON.parse(savedBikeInfo);
                // Convert date strings back to Date objects
                ['dataAquisicao', 'dataUltimaRevisao', 'dataUltimaTrocaOleo'].forEach(dateField => {
                    if (parsedInfo[dateField]) {
                        parsedInfo[dateField] = new Date(parsedInfo[dateField]);
                    }
                });
                setBikeInfo(parsedInfo);
            }
        } catch (error) {
            console.error('Erro ao carregar informações da moto:', error);
        }
    };

    const saveBikeInfo = async () => {
        try {
            await AsyncStorage.setItem('bikeInfo', JSON.stringify(bikeInfo));
            alert('Informações da moto salvas com sucesso!');
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao salvar informações da moto:', error);
            alert('Erro ao salvar informações. Tente novamente.');
        }
    };

    const handleDateChange = (event, selectedDate, field) => {
        setShowDatePicker({ ...showDatePicker, [field]: false });
        if (selectedDate) {
            setBikeInfo({ ...bikeInfo, [field]: selectedDate });
        }
    };

    const formatDate = (date) => {
        if (date instanceof Date) {
            return date.toLocaleDateString();
        }
        return 'Data não definida';
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Informações da Moto</Text>

            <TextInput
                style={styles.input}
                placeholder="Modelo"
                value={bikeInfo.modelo}
                onChangeText={(text) => setBikeInfo({ ...bikeInfo, modelo: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Ano"
                value={bikeInfo.ano}
                onChangeText={(text) => setBikeInfo({ ...bikeInfo, ano: text })}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Placa"
                value={bikeInfo.placa}
                onChangeText={(text) => setBikeInfo({ ...bikeInfo, placa: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Cor"
                value={bikeInfo.cor}
                onChangeText={(text) => setBikeInfo({ ...bikeInfo, cor: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Proprietário"
                value={bikeInfo.proprietario}
                onChangeText={(text) => setBikeInfo({ ...bikeInfo, proprietario: text })}
            />

            <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker({ ...showDatePicker, dataAquisicao: true })}
            >
                <Text style={styles.dateButtonText}>
                    Data de Aquisição: {formatDate(bikeInfo.dataAquisicao)}
                </Text>
            </TouchableOpacity>
            {showDatePicker.dataAquisicao && (
                <DateTimePicker
                    value={bikeInfo.dataAquisicao || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'dataAquisicao')}
                />
            )}

            <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker({ ...showDatePicker, dataUltimaRevisao: true })}
            >
                <Text style={styles.dateButtonText}>
                    Data da Última Revisão: {formatDate(bikeInfo.dataUltimaRevisao)}
                </Text>
            </TouchableOpacity>
            {showDatePicker.dataUltimaRevisao && (
                <DateTimePicker
                    value={bikeInfo.dataUltimaRevisao || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'dataUltimaRevisao')}
                />
            )}

            <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker({ ...showDatePicker, dataUltimaTrocaOleo: true })}
            >
                <Text style={styles.dateButtonText}>
                    Data da Última Troca de Óleo: {formatDate(bikeInfo.dataUltimaTrocaOleo)}
                </Text>
            </TouchableOpacity>
            {showDatePicker.dataUltimaTrocaOleo && (
                <DateTimePicker
                    value={bikeInfo.dataUltimaTrocaOleo || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'dataUltimaTrocaOleo')}
                />
            )}

            <TouchableOpacity style={styles.saveButton} onPress={saveBikeInfo}>
                <Text style={styles.saveButtonText}>Salvar Informações</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    dateButton: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    dateButtonText: {
        color: 'black',
    },
    saveButton: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

