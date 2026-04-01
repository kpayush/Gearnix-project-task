// ================= FLASH DEAL COUNTDOWN TIMER =================

const endDate = new Date();
endDate.setHours(endDate.getHours() + 15);

function updateTimer() {

  const now = new Date().getTime();
  const distance = endDate - now;

  if (distance <= 0) {
    document.getElementById("days").innerHTML = "00<br><small>Days</small>";
    document.getElementById("hours").innerHTML = "00<br><small>Hours</small>";
    document.getElementById("minutes").innerHTML = "00<br><small>Mins</small>";
    document.getElementById("seconds").innerHTML = "00<br><small>Secs</small>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").innerHTML = days + "<br><small>Days</small>";
  document.getElementById("hours").innerHTML = hours + "<br><small>Hours</small>";
  document.getElementById("minutes").innerHTML = minutes + "<br><small>Mins</small>";
  document.getElementById("seconds").innerHTML = seconds + "<br><small>Secs</small>";
}

updateTimer();
setInterval(updateTimer, 1000);


// ================= SEE MORE / LESS =================

const toggleBtn = document.getElementById("toggleBtn");
const moreText = document.getElementById("moreText");

if (toggleBtn && moreText) {

  toggleBtn.addEventListener("click", () => {

    moreText.classList.toggle("show");

    toggleBtn.innerText =
      moreText.classList.contains("show")
        ? "SEE LESS -"
        : "SEE MORE +";

  });

}


// ================= GRID / LIST VIEW =================

const grid1 = document.getElementById("grid1");
const grid2 = document.getElementById("grid2");
const grid3 = document.getElementById("grid3");

const container = document.getElementById("productContainer");

function removeActive() {

  grid1?.classList.remove("active");
  grid2?.classList.remove("active");
  grid3?.classList.remove("active");

}

function changeLayout(className, listMode = false) {

  const products = document.querySelectorAll("#productContainer > div");

  removeActive();

  if (listMode) {
    container.classList.add("list-view");
  } else {
    container.classList.remove("list-view");
  }

  products.forEach(product => {

    product.classList.remove(
      "col-lg-3", "col-md-4",
      "col-lg-4", "col-md-6",
      "col-lg-6"
    );

    product.classList.add(...className.split(" "));

  });

}

grid1?.addEventListener("click", () => {

  grid1.classList.add("active");
  changeLayout("col-lg-3 col-md-4");

});

grid2?.addEventListener("click", () => {

  grid2.classList.add("active");
  changeLayout("col-lg-6 col-md-6");

});

grid3?.addEventListener("click", () => {

  grid3.classList.add("active");
  changeLayout("col-lg-4 col-md-6");

});


// ================= WISHLIST SYSTEM =================

const wishlistButtons = document.querySelectorAll(".wishlist-btn");

wishlistButtons.forEach(btn => {

  btn.addEventListener("click", function () {

    const card = this.closest(".product-card");

    const product = {

      name: card.querySelector("h6").innerText,
      price: card.querySelector("h5").innerText,
      image: card.querySelector("img").src

    };

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.some(item => item.name === product.name);

    if (!exists) {

      wishlist.push(product);

      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      const icon = this.querySelector("i");

      icon.classList.replace("bi-star", "bi-star-fill");
      icon.style.color = "gold";

      this.style.pointerEvents = "none";

      updateWishlistCount();

    } else {

      alert("Already in wishlist");

    }

  });

});

function updateWishlistCount() {

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const desktopWishlist = document.getElementById("cart-Count");
  const mobileWishlist = document.getElementById("mobileWishlistCount");

  if (desktopWishlist) desktopWishlist.innerText = wishlist.length;
  if (mobileWishlist) mobileWishlist.innerText = wishlist.length;

}

updateWishlistCount();


// ================= MOBILE MENU TOGGLE =================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("menuOverlay");

if (menuBtn && mobileMenu && overlay) {

  menuBtn.onclick = () => {

    mobileMenu.classList.add("active");
    overlay.classList.add("active");

  };

  overlay.onclick = () => {

    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");

  };

}