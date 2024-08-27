import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth } from "../config.js";

// html element use in javascript
let Login_btn = document.querySelectorAll('#nav-button-one')
let registor_btn = document.querySelectorAll('#nav-button-two')
let form = document.querySelector('#form')
let userName = document.querySelector('#userName')
let email = document.querySelector('#email')
let password = document.querySelector('#password')
let myfile = document.querySelector('#myfile')

// registor user
form.addEventListener('submit', event => {
    event.preventDefault()

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
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