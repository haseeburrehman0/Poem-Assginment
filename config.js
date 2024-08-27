// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";



const firebaseConfig = {
    apiKey: "AIzaSyA4HGoeHNnIqlQHQS9g5zrHpYQ5ZZmE5B0",
    authDomain: "priceoye-clone-js.firebaseapp.com",
    projectId: "priceoye-clone-js",
    storageBucket: "priceoye-clone-js.appspot.com",
    messagingSenderId: "772547222677",
    appId: "1:772547222677:web:488db67fe6b2d377b48f9c",
    measurementId: "G-KKQRMR16VT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);