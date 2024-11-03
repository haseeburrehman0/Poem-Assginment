import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import {
    uploadBytes,
    getDownloadURL,
    ref,
    getStorage
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";

import { auth, db } from "../config.js"; // Ensure this is correct

let storage = getStorage();
let user = null;

// HTML element references
let Login_btn = document.querySelectorAll('#nav-button-one');
let registor_btn = document.querySelectorAll('#nav-button-two');
let form = document.querySelector('#form');
let userName = document.querySelector('#userName');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let myfile = document.querySelector('#myfile');

// Register user
form.addEventListener('submit', async event => {
    event.preventDefault();

    // Create account with email and password
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            user = userCredential.user.uid;
            console.log(user);
            Swal.fire({
                title: 'Success!',
                text: 'Registered Successfully',
                icon: 'success',
                confirmButtonText: 'Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    // window.location = './login.html'
                }
            });
        })
        .catch((error) => {
            const errorMessage = error.message;
            Swal.fire({
                title: 'Error!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Again'
            });
            console.log(errorMessage);
            window.location = './login.html'
        });

    // Upload image to storage and get URL
    let file = myfile.files[0];
    let url = await uploadFile(file, `${email.value}_${Date.now()}`);

    // Save data to Firestore
    try {
        const docRef = await addDoc(collection(db, "users"), {
            userName: userName.value,
            email: email.value,
            userImage: url,
            uid: user
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

// Login button event
Login_btn.forEach((btn) => {
    btn.addEventListener('click', () => {
        console.log('login');
        window.location = './login.html';
    });
});

// Register button event
registor_btn.forEach((btn) => {
    btn.addEventListener('click', () => {
        console.log('register');
        window.location = './register.html';
    });
});

// Upload file to Firebase Storage
async function uploadFile(file, userEmail) {
    const storageRef = ref(storage, userEmail);
    try {
        const uploadImg = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(uploadImg.ref);
        return url;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
