// ================= SEE MORE / LESS =================
const toggleBtn = document.getElementById("toggleBtn");
const moreText = document.getElementById("moreText");

if (toggleBtn) {
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
const grid3 = document.getElementById("grid3");
const grid2 = document.getElementById("grid2");
const listView = document.getElementById("listView");
const container = document.getElementById("productContainer");

function removeActive() {
  grid3?.classList.remove("active");
  grid2?.classList.remove("active");
  listView?.classList.remove("active");
  grid1?.classList.remove("active");
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
    product.className = className + " product-item";
  });

  updateProducts(); // important for load more
}

grid1?.addEventListener("click", () => {
  grid1.classList.add("active");
  changeLayout("col-lg-3 col-md-4");
});

grid3?.addEventListener("click", () => {
  grid3.classList.add("active");
  changeLayout("col-lg-4 col-md-6");
});

grid2?.addEventListener("click", () => {
  grid2.classList.add("active");
  changeLayout("col-lg-6 col-md-6");
});

listView?.addEventListener("click", () => {
  listView.classList.add("active");
  changeLayout("col-12", true);
});

function changeLayout(className, listMode = false) {
    const products = document.querySelectorAll("#productContainer > div");
    removeActive();

    if (listMode) {
        container.classList.add("list-view");
    } else {
        container.classList.remove("list-view");
    }

    products.forEach(product => {
        // Yahan 'product-item' ko hamesha barkarar rakhein
        product.className = className + " product-item";
    });

    updateProducts(); 
}

// GRID 2 (Mobile par 2 items side-by-side, Laptop par 2 items)
grid2?.addEventListener("click", () => {
    grid2.classList.add("active");
    // col-6 mobile ke liye, col-lg-6 laptop ke liye
    changeLayout("col-6 col-lg-6 col-md-6");
});

// LIST VIEW
listView?.addEventListener("click", () => {
    listView.classList.add("active");
    changeLayout("col-12", true);
});

// Grid 1 aur 3 (Inhe touch karne ki zaroorat nahi kyunki CSS inhe hide kar degi)
grid1?.addEventListener("click", () => {
    grid1.classList.add("active");
    changeLayout("col-lg-3 col-md-4");
});

grid3?.addEventListener("click", () => {
    grid3.classList.add("active");
    changeLayout("col-lg-4 col-md-6");
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


// ================= MOBILE MENU =================
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("menuOverlay");

menuBtn?.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  overlay.classList.add("active");
});

overlay?.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
});


// ================= LOAD MORE =================
const loadMoreBtn = document.getElementById("loadMoreBtn");

let currentItems = 6;

function updateProducts() {

  const products = document.querySelectorAll(".product-item");

  products.forEach((item, index) => {

    if (index < currentItems) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }

  });

  if (currentItems >= products.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "inline-block";
  }

}

// initial load
updateProducts();

loadMoreBtn?.addEventListener("click", () => {

  currentItems += 3;

  updateProducts();

});

