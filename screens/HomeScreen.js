import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const bikeImage = require("../assets/yamaha-fazer-250-abs.webp");
const plateImage = require("../assets/placa_modelo_moto.png");

export default function HomeScreen() {
    const navigation = useNavigation();

    const handleMyBikePress = async () => {
        try {
            const bikeInfo = await AsyncStorage.getItem('bikeInfo');
            if (bikeInfo !== null) {
                navigation.navigate('ViewBike');
            } else {
                navigation.navigate('Bike');
            }
        } catch (error) {
            console.error('Erro ao verificar informações da moto:', error);
            navigation.navigate('Bike');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>Serv.motos</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.cardContainer}>
                    <View style={styles.bikeSection}>
                        <Image
                            source={bikeImage}
                            style={styles.bikeImage}
                            resizeMode="contain"
                        />
                        <View style={styles.bikeInfo}>
                            <Text style={styles.bikeModel}>FAZER 250 ABS</Text>
                            <Image
                                source={plateImage}
                                style={styles.plateImage}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>

                <Text style={styles.greeting}>
                    Olá, André! Tudo certo para mais um rolê?
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleMyBikePress}
                    >
                        <Text style={styles.buttonText}>Minha moto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Maintenance')}
                    >
                        <Text style={styles.buttonText}>Manutenção</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Documentation')}
                    >
                        <Text style={styles.buttonText}>Documentação</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>S.O.S. (resgate)</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#FF0000',
        paddingTop: StatusBar.currentHeight || 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    logo: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        marginTop: 35,
    },
    bikeSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bikeImage: {
        width: 190,
        height: 140,
    },
    bikeInfo: {
        alignItems: 'center',
    },
    bikeModel: {
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    plateImage: {
        width: 190,
        height: 90,
    },
    greeting: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 35,
        textAlign: 'left',
    },
    buttonContainer: {
        gap: 25,
    },
    button: {
        backgroundColor: '#000',
        padding: 12,
        borderRadius: 22,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginHorizontal: 3,
        marginBottom: 45,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

