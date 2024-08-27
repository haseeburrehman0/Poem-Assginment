let Login_btn = document.querySelectorAll('#nav-button-one')
let registor_btn = document.querySelectorAll('#nav-button-two')

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