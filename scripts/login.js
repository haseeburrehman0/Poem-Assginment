import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider   } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth, provider } from "../config.js";

// html element use in javscript
let Login_btn = document.querySelectorAll('#nav-button-one')
let registor_btn = document.querySelectorAll('#nav-button-two')
let form = document.querySelector('#form')
let email = document.querySelector('#email')
let password = document.querySelector('#password')
let google_login = document.querySelector('.google_login')
let fb_login = document.querySelector('.fb_login')

// fb login is not completed
fb_login.addEventListener('click', ()=> {
    Swal.fire({
        title: 'FaceBook!',
        text: 'Facebook login is comming soon!',
        confirmButtonText: 'OK'
    })
        .then((result) => {
            if (result.isConfirmed) {
                // window.location = './index.html'
            }
        });
})

// google login
google_login.addEventListener('click', ()=> {
    signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    console.log(user);
    Swal.fire({
        title: 'Success!',
        text: 'Your are Login Successfully',
        icon: 'success',
        confirmButtonText: 'Login'
    })
        .then((result) => {
            if (result.isConfirmed) {
                window.location = './index.html'
            }
        });
  }).catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'Error',
        confirmButtonText: 'Again'
    })
        .then((result) => {
            if (result.isConfirmed) {
                // window.location = './index.html'
            }
        });
  });
})

// user login 
form.addEventListener('submit', event => {
    event.preventDefault()
    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    Swal.fire({
        title: 'Success!',
        text: 'Your are Login Successfully',
        icon: 'success',
        confirmButtonText: 'Login'
    })
        .then((result) => {
            if (result.isConfirmed) {
                window.location = './index.html'
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
    btn.addEventListener('click', ()=> {
        console.log('login');
        window.location = './login.html'
    })
})

// registon button
registor_btn.forEach(btn => {
    btn.addEventListener('click', ()=> {
        console.log('registor'); 
        window.location = './registor.html'
    })
})