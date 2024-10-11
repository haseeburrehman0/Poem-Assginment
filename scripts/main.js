import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { auth, db } from "../config.js";

// airpods object list
const airPodsList = [
    {
        title: "Apple AirPods Pro (2nd Generation)",
        price: 249.99,
        discountPrice: 199.99, // 20% off from original price
        discountPercentage: "20%",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/image-to-url-converter-9483c.appspot.com/o/haseeburrehmanjs%40gmail.com%20%2B%201724738541057?alt=media&token=a3e76655-74a8-4e0c-8f1f-5fc523e5f24b"
    },
    {
        title: "Apple AirPods Pro (1st Generation)",
        price: 219.99,
        discountPrice: 175.99, // 20% off from original price
        discountPercentage: "20%",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/image-to-url-converter-9483c.appspot.com/o/haseeburrehmanjs%40gmail.com%20%2B%201724738604044?alt=media&token=0088153c-f5f5-4e29-8af7-72e4716f7e54"
    },
    {
        title: "Apple AirPods (3rd Generation)",
        price: 179.99,
        discountPrice: 143.99, // 20% off from original price
        discountPercentage: "20%",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/image-to-url-converter-9483c.appspot.com/o/haseeburrehmanjs%40gmail.com%20%2B%201724738632823?alt=media&token=3e58d6ee-5bb9-495f-8eb9-a8e6cd83ef7d"
    },
    {
        title: "Apple AirPods (2nd Generation)",
        price: 129.99,
        discountPrice: 103.99, // 20% off from original price
        discountPercentage: "20%",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/image-to-url-converter-9483c.appspot.com/o/haseeburrehmanjs%40gmail.com%20%2B%201724738688446?alt=media&token=59265de5-9dfa-498a-84fc-ddf9aaee34ed"
    },
    {
        title: "Apple AirPods Max",
        price: 549.99,
        discountPrice: 439.99, // 20% off from original price
        discountPercentage: "20%",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/image-to-url-converter-9483c.appspot.com/o/haseeburrehmanjs%40gmail.com%20%2B%201724738709415?alt=media&token=07979957-12f0-46a4-8421-4f91167093f5"
    },
    {
        title: "Apple AirPods with Wireless Charging Case",
        price: 199.99,
        discountPrice: 159.99, // 20% off from original price
        discountPercentage: "20%",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/image-to-url-converter-9483c.appspot.com/o/haseeburrehmanjs%40gmail.com%20%2B%201724738725882?alt=media&token=cc63c657-9275-42b8-9bd0-91e755e70986"
    },
    {
        title: "Apple AirPods with Charging Case",
        price: 159.99,
        discountPrice: 127.99, // 20% off from original price
        discountPercentage: "20%",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/image-to-url-converter-9483c.appspot.com/o/haseeburrehmanjs%40gmail.com%20%2B%201724738783347?alt=media&token=89fb566b-09b3-4754-8377-dc3b00d56236"
    },
    {
        title: "Apple AirPods Max (Sky Blue)",
        price: 549.99,
        discountPrice: 439.99, // 20% off from original price
        discountPercentage: "20%",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/image-to-url-converter-9483c.appspot.com/o/haseeburrehmanjs%40gmail.com%20%2B%201724738805064?alt=media&token=1e2e1836-3ae2-411d-a89b-f0f6e8e33c88"
    }
];

// html element use in javscript!
let section_box_contant = document.querySelector('.section-box-contant')
let watchlist_box = document.querySelector('#watchlist')
let login_button_section = document.querySelector('#login_button_section')
let user_img = document.querySelector('#user_img')
let logout_btn = document.querySelector('.logout_btn')


// user is login or not
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            user_img.src = data.userImage;
        });
        console.log('user login ha');
    } else {
        console.log('user login nahi ha');
        login_button_section.innerHTML = `<div>
        <div class="nav-button d-flex gap-2 mt-3">
        <button class="rounded" id="nav-button-one">Log in</button>
        <button class="rounded" id="nav-button-two">Register</button></div> 
        </div>`

        let Login_btn = document.querySelector('#nav-button-one')
        let registor_btn = document.querySelector('#nav-button-two')

        // login button
        Login_btn.addEventListener('click', () => {
            console.log('login');
            window.location = './login.html'
        })

        // registon button
        registor_btn.addEventListener('click', () => {
            console.log('registor');
            window.location = './registor.html'
        })

    }
});

// renderScreen Function!
airPodsList.map((item, index) => {
    // html div in javscript
    section_box_contant.innerHTML += `
    <div id="${index}" class="card-desgin rounded mt-3 px-2">
                <img class="mt-4" src="${item.imageUrl}" alt="">
                <p class="mt-4">${item.title}(KT-01)</p>
                <h5 class="">$ <span><sub>${item.discountPrice}</sub></span></h5>
                <div class="div-box d-flex justify-content-between aligin-items-center">
                    <p class="change-text">$ <span><sub
                                class="fw-light change-text"><del>${item.price}</del></sub></span></p>
                    <button id="readMoreBtn" class="btn btn-dark">Read More</button>
                </div>
            </div>
    `
    // read more button element
    let readMoreBtn = document.querySelectorAll('#readMoreBtn')

    // read more button
    readMoreBtn.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // console.log(index);
            localStorage.setItem('airPods', JSON.stringify(airPodsList[index]))
        })
    })
})


const watchList = [
    {
        title: "Apple Watch Series 8 (GPS, 45mm)",
        price: 429.99,
        discountPrice: 343.99, // 20% off from original price
        discountPercentage: "20%",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/image-to-url-converter-9483c.appspot.com/o/haseeburrehmanjs%40gmail.com%20%2B%201724742612699?alt=media&token=1ca6bc78-54df-4778-a297-6530ef3a1e5d"
    },
    {
        title: "Apple Watch SE (2nd Generation, GPS, 44mm)",
        price: 279.99,
        discountPrice: 223.99, // 20% off from original price
        discountPercentage: "20%",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/image-to-url-converter-9483c.appspot.com/o/haseeburrehmanjs%40gmail.com%20%2B%201724742649828?alt=media&token=7c517f3a-40ac-4e4e-8566-47d831e846d6"
    },
    {
        title: "Samsung Galaxy Watch 5 (Bluetooth, 44mm)",
        price: 309.99,
        discountPrice: 247.99, // 20% off from original price
        discountPercentage: "20%",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/image-to-url-converter-9483c.appspot.com/o/haseeburrehmanjs%40gmail.com%20%2B%201724742673108?alt=media&token=623fc98c-14aa-4902-bc35-e45d0a442887"
    },
    {
        title: "Garmin Forerunner 245 Music",
        price: 349.99,
        discountPrice: 279.99, // 20% off from original price
        discountPercentage: "20%",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/image-to-url-converter-9483c.appspot.com/o/haseeburrehmanjs%40gmail.com%20%2B%201724742716121?alt=media&token=bcc04cde-a8ac-4a5d-888d-e30bdfe1f643"
    },
    {
        title: "Fitbit Versa 4",
        price: 229.99,
        discountPrice: 183.99, // 20% off from original price
        discountPercentage: "20%",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/image-to-url-converter-9483c.appspot.com/o/haseeburrehmanjs%40gmail.com%20%2B%201724742772074?alt=media&token=f5f9be6e-22fe-4db5-8ca7-fd25bd6639d9"
    },
    {
        title: "Huawei Watch GT 3 Pro",
        price: 369.99,
        discountPrice: 295.99, // 20% off from original price
        discountPercentage: "20%",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/image-to-url-converter-9483c.appspot.com/o/haseeburrehmanjs%40gmail.com%20%2B%201724742814839?alt=media&token=865987ea-77ea-4656-85ad-63acea2f8172"
    },
    {
        title: "Fossil Gen 6 Smartwatch",
        price: 299.99,
        discountPrice: 239.99, // 20% off from original price
        discountPercentage: "20%",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/image-to-url-converter-9483c.appspot.com/o/haseeburrehmanjs%40gmail.com%20%2B%201724742831660?alt=media&token=30146490-881d-4452-8348-bac25a4f5f1b"
    },
    {
        title: "TicWatch Pro 3 Ultra GPS",
        price: 299.99,
        discountPrice: 239.99, // 20% off from original price
        discountPercentage: "20%",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/image-to-url-converter-9483c.appspot.com/o/haseeburrehmanjs%40gmail.com%20%2B%201724742849745?alt=media&token=a4062dd9-c001-485a-933e-53827947b1ca"
    }
];

// watch cards render in screen
watchList.map((item, index) => {
    watchlist_box.innerHTML += `
    <div id="${index}" class="card-desgin rounded mt-3 px-2">
                <img class="mt-4" src="${item.imageUrl}" alt="">
                <p class="mt-4">${item.title}(KT-01)</p>
                <h5 class="">$ <span><sub>${item.discountPrice}</sub></span></h5>
                <div class="div-box d-flex justify-content-between aligin-items-center">
                    <p class="change-text">$ <span><sub
                                class="fw-light change-text"><del>${item.price}</del></sub></span></p>
                    <button id="readMoreBtn" class="btn btn-dark">Read More</button>
                </div>
            </div>
    `
})

logout_btn.addEventListener('click', event => {
    event.preventDefault()
    signOut(auth).then(() => {
        Swal.fire({
            title: 'Logout Your Self!',
            text: 'Do you want to Logout',
            icon: 'info',
            confirmButtonText: 'Logout'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location = './login.html'
                }
            });
    }).catch((error) => {
        console.log('nahi ho raha ha logout');

    });
    console.log('logout');
})