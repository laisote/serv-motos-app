// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);