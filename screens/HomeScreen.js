import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'react-native';


const bikeImage = require("../assets/yamaha-fazer-250-abs.webp");
const plateImage = require("../assets/placa_modelo_moto.png");

export default function HomeScreen() {
    return (
        <ScrollView style={styles.container}>

            {/* Cabeçalho */}
            <View style={styles.header}>
                <FontAwesome name="bars" size={28} color="black" />
                <Text style={styles.logo}>Serv.Motos</Text>
                <FontAwesome name="user-circle" size={28} color="black" />
            </View>

            {/* Seção da Moto */}
            <View style={styles.bikeInfo}>
                <Image
                    source={bikeImage}
                    style={styles.bikeImage}
                />
                <View style={styles.bikeDetails}>
                    <Text style={styles.bikeModel}>FAZER 250 ABS</Text>
                    <Image
                        source={plateImage}
                        style={styles.plateImage}
                    />
                </View>
            </View>

            {/* Saudação */}
            <Text style={styles.greeting}>Olá, André! Tudo certo para mais um rolê?</Text>

            {/* Botões de navegação */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Minha moto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Manutenção</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Documentação</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>S.O.S</Text>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 50,
        paddingTop: StatusBar.currentHeight || 38,
    },
    logo: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    bikeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    bikeImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    bikeDetails: {
        marginLeft: 20,
        alignItems: 'center',
    },
    bikeModel: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    plateImage: {
        width: 110,
        height: 90,
        marginTop: 10,
    },
    greeting: {
        fontSize: 27,
        fontWeight: 'bold',
        marginBottom: 25,
        marginTop: 18,
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    },
});