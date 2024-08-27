import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// html element use in javascript
let Login_btn = document.querySelectorAll('#nav-button-one')
let registor_btn = document.querySelectorAll('#nav-button-two')
let form = document.querySelector('#form')
let userName = document.querySelector('#userName')
let email = document.querySelector('#email')
let password = document.querySelector('#password')
let myfile = document.querySelector('#myfile')

form.addEventListener('submit', event => {
    event.preventDefault()
    console.log(userName.value);
    console.log(email.value);
    console.log(password.value);
    console.log(myfile.files[0]);
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