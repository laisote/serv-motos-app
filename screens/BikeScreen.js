import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function BikeScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const [bikeInfo, setBikeInfo] = useState({
        placa: '',
        marca: '',
        modelo: '',
        cor: '',
        anoFabricacao: '',
        anoModelo: '',
        dataPrimeiraCompra: '',
        kmAtual: '',
    });

    useEffect(() => {
        if (route.params?.bikeInfo) {
            setBikeInfo(route.params.bikeInfo);
        }
    }, [route.params?.bikeInfo]);

    const handleSave = async () => {
        try {
            await AsyncStorage.setItem('bikeInfo', JSON.stringify(bikeInfo));
            Alert.alert('Sucesso', 'Informações da moto atualizadas com sucesso!', [
                { text: 'OK', onPress: () => navigation.navigate('ViewBike') }
            ]);
        } catch (error) {
            console.error('Erro ao salvar informações da moto:', error);
            Alert.alert('Erro', 'Não foi possível salvar as informações da moto.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{route.params?.bikeInfo ? 'Atualizar Moto' : 'Inclusão de Moto'}</Text>

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="card-text-outline" size={24} color="black" />
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Placa</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ABC-1234"
                        value={bikeInfo.placa}
                        onChangeText={(text) => setBikeInfo({ ...bikeInfo, placa: text })}
                    />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="engine" size={24} color="black" />
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Marca</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Honda"
                        value={bikeInfo.marca}
                        onChangeText={(text) => setBikeInfo({ ...bikeInfo, marca: text })}
                    />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="motorbike" size={24} color="black" />
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Modelo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: CB 300"
                        value={bikeInfo.modelo}
                        onChangeText={(text) => setBikeInfo({ ...bikeInfo, modelo: text })}
                    />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="palette" size={24} color="black" />
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Cor</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Vermelho"
                        value={bikeInfo.cor}
                        onChangeText={(text) => setBikeInfo({ ...bikeInfo, cor: text })}
                    />
                </View>
            </View>

            <View style={styles.rowContainer}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                    <FontAwesome5 name="industry" size={24} color="black" />
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Ano Fab.</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="YYYY"
                            value={bikeInfo.anoFabricacao}
                            onChangeText={(text) => setBikeInfo({ ...bikeInfo, anoFabricacao: text })}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View style={[styles.inputContainer, styles.halfWidth]}>
                    <MaterialCommunityIcons name="calendar" size={24} color="black" />
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Ano Mod.</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="YYYY"
                            value={bikeInfo.anoModelo}
                            onChangeText={(text) => setBikeInfo({ ...bikeInfo, anoModelo: text })}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="calendar-check" size={24} color="black" />
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Data Primeira Compra</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="DD/MM/YYYY"
                        value={bikeInfo.dataPrimeiraCompra}
                        onChangeText={(text) => setBikeInfo({ ...bikeInfo, dataPrimeiraCompra: text })}
                    />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="speedometer" size={24} color="black" />
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Km Atual</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: 5000"
                        value={bikeInfo.kmAtual}
                        onChangeText={(text) => setBikeInfo({ ...bikeInfo, kmAtual: text })}
                        keyboardType="numeric"
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>{route.params?.bikeInfo ? 'Atualizar' : 'Cadastrar'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
    },
    inputWrapper: {
        flex: 1,
        marginLeft: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        fontSize: 16,
        color: '#666',
        paddingVertical: 4,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    halfWidth: {
        flex: 1,
    },
    button: {
        backgroundColor: '#B22222',
        borderRadius: 10,
        padding: 16,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

