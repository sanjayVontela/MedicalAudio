// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "API-KEY",
  authDomain: "medical-audio-9c000.firebaseapp.com",
  projectId: "medical-audio-9c000",
  storageBucket: "medical-audio-9c000.appspot.com",
  messagingSenderId: "659617200130",
  appId: "1:659617200130:web:d82fb99a2355194f1d0f1b",
  measurementId: "G-XVBJW8X2JY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

export {functions};