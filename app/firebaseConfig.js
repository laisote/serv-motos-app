// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDmmxQ7MuowACqnt8UVPaKLbLpbF5BJmvo",
    authDomain: "serv-motos.firebaseapp.com",
    projectId: "serv-motos",
    storageBucket: "serv-motos.appspot.com",
    messagingSenderId: "738141563393",
    appId: "1:738141563393:web:c69884059853c4aa9f2e00",
    measurementId: "G-M529KCV81L"
};

// Initialize Firebase

let app;
let auth;

if (getApps().length === 0) {
    // Inicializa o Firebase apenas se ainda não houver um app inicializado
    app = initializeApp(firebaseConfig);
    // Configura o Firebase auth com persistência de estado usando AsyncStorage
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });
} else {
    // Se p firebase já foi inicializado, recupera a instânica existente
    app = getApps();
    auth = getAuth(app);
}

export { auth };