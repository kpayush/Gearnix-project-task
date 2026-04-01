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
    spaceBetween: 20,
    loop: true,
    observer: true,         
    observeParents: true,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    breakpoints: {
        320: {
            slidesPerView: 1
        },
        576: {
            slidesPerView: 2
        },
        768: {
            slidesPerView: 3
        },
        992: {
            slidesPerView: 4
        }
    }
});

