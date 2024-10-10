import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
const logoImage = require("../assets/brand-v2.png");

export default function WelcomeScreen() {
    return (
        <View style={styles.container}>
            <Image source={logoImage} style={styles.logo} />

            <View style={styles.grayContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>
                        Bem-vindo, motociclista!
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.cadastroButton]}
                        onPress={() => alert("Navegar para a tela de cadsatro")}
                    >
                        <Text style={[styles.buttonText, styles.cadastroButtonText]}>Cadastro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.loginButton]}
                        onPress={() => alert("Navegar para a tela de login")}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "flex-start",
        paddingTop: 100,
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 20,
        alignSelf: "center",
    },
    grayContainer: {
        backgroundColor: "#f0f0f0",
        borderRadius: 25,
        padding: 20,
        width: "100%",
        position: "absolute",
        bottom: 0,
        height: "55%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 0,
    },
    textContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 85,
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
    },
    buttonContainer: {
        width: "80%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignSelf: "center",
        flex: 1,
    },
    button: {
        width: "100%",
        padding: 15,
        borderRadius: 25,
        alignItems: "center",
        marginBottom: 50,
    },
    cadastroButton: {
        backgroundColor: "white",
        borderColor: "red",
        borderWidth: 2,
    },
    cadastroButtonText: {
        color: "red",
    },
    loginButton: {
        backgroundColor: "red",
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
});