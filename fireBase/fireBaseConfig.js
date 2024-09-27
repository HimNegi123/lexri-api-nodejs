// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
require("dotenv").config(); 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.FIRE_KEY,
  authDomain: "demotesting-7a8b8.firebaseapp.com",
  projectId: "demotesting-7a8b8",
  storageBucket: "demotesting-7a8b8.appspot.com",
  messagingSenderId: "643015054196",
  appId: "1:643015054196:web:0b23f712e36cc869fb1221",
  measurementId: "G-HH3HSEWE1D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export the Firestore instance
export default db;
