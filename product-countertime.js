// Image Gallery Switcher
function changeImage(element) {
    document.getElementById('mainImg').src = element.src;

    // Active class update
    let thumbnails = document.querySelectorAll('.img-thumbnail');
    thumbnails.forEach(img => img.classList.remove('active'));
    element.classList.add('active');
}

// Quantity Selector
function updateQty(val) {
    let qtyInput = document.getElementById('qty');
    let currentQty = parseInt(qtyInput.value);
    if (currentQty + val >= 1) {
        qtyInput.value = currentQty + val;
    }
}


// ================= CART SYSTEM =================
let cartCountValue = 0;

const desktopCart = document.getElementById("cartCount");
const mobileCart = document.getElementById("mobileCartCount");

function updateCart() {
    if (desktopCart) desktopCart.textContent = cartCountValue;
    if (mobileCart) mobileCart.textContent = cartCountValue;
}

document.querySelectorAll(".bi-cart, .add-to-cart-btn")
    .forEach(btn => {
        btn.addEventListener("click", () => {
            cartCountValue++;
            updateCart();
        });
    });


// ================= WISHLIST SYSTEM =================
document.querySelectorAll(".wishlist-btn").forEach(btn => {

    btn.addEventListener("click", function () {

        let card = this.closest(".product-card");

        let product = {
            name: card.querySelector("h6").innerText,
            price: card.querySelector("h5").innerText,
            image: card.querySelector("img").getAttribute("src")
        };

        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        if (!wishlist.some(item => item.name === product.name)) {

            wishlist.push(product);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));

            this.querySelector("i").classList.replace("bi-star", "bi-star-fill");
            this.querySelector("i").style.color = "gold";

            updateWishlistCount();

        } else {
            alert("Already in wishlist");
        }

    });

});

function updateWishlistCount() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const desktopWishlist = document.getElementById("cart-Count");
    const mobileWishlist = document.getElementById("mobileWishlistCount");

    if (desktopWishlist) desktopWishlist.innerText = wishlist.length;
    if (mobileWishlist) mobileWishlist.innerText = wishlist.length;
}

updateWishlistCount();

var swiper = new Swiper(".productSlider", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1200: { slidesPerView: 4 }
    }
});

const carousel = document.querySelector('#productCarousel');
const thumbs = document.querySelectorAll('.thumb');

carousel.addEventListener('slid.bs.carousel', function (e) {

    thumbs.forEach(t => t.classList.remove('active'));
    thumbs[e.to].classList.add('active');

});

function startFlashTimer(duration) {

    let timer = duration;

    setInterval(function () {

        let hours = Math.floor(timer / 3600);
        let minutes = Math.floor((timer % 3600) / 60);
        let seconds = timer % 60;

        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

        if (timer > 0) {
            timer--;
        }

    }, 1000);

}

startFlashTimer(4800);