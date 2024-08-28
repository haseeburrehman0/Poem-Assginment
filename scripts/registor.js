import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import {
    uploadBytes,
    getDownloadURL,
    ref,
    getStorage
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

import { auth, db } from "../config.js";

// html element use in javascript
let Login_btn = document.querySelectorAll('#nav-button-one')
let registor_btn = document.querySelectorAll('#nav-button-two')
let form = document.querySelector('#form')
let userName = document.querySelector('#userName')
let email = document.querySelector('#email')
let password = document.querySelector('#password')
let myfile = document.querySelector('#myfile')
let storage = getStorage()
let user = null

// registor user
form.addEventListener('submit', async event => {
    event.preventDefault()
    // account create with email and password
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            user = userCredential.user.uid;
            console.log(user);
            Swal.fire({
                title: 'Success!',
                text: 'Registor Successfully',
                icon: 'success',
                confirmButtonText: 'Login'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location = './login.html'
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
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        // window.location = './login.html'
                    }
                });
            console.log(errorMessage);
        });

    // image to url converter
    let file = myfile.files[0]
    let url = await uploadFile(file, `${email.value} + ${Date.now()}`)

    // data save from firebase data store
    try {
        const docRef = await addDoc(collection(db, "users"), {
            userName: userName.value,
            email: email.value,
            userImage: url,
            uid : user
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
})

// login button
Login_btn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        console.log('login');
        window.location = './login.html'
    })
})

// registon button
registor_btn.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('registor');
        window.location = './registor.html'
    })
})


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