
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

// ================= GRID / LIST VIEW FIXED =================
const grid3 = document.getElementById("grid3");
const grid2 = document.getElementById("grid2");
const listView = document.getElementById("listView");
const container = document.getElementById("productContainer");

function changeLayout(desktopClass, isList = false) {
    const products = document.querySelectorAll("#productContainer .product-item");
    
    // Toggle List View class on parent
    if (isList) {
        container.classList.add("list-view");
    } else {
        container.classList.remove("list-view");
    }

    products.forEach(product => {
        // Reset classes but ALWAYS keep col-6 for mobile 2x2
        // If it's list view, we use col-12. Otherwise, col-6 + desktop choice.
        if (isList) {
            product.className = "col-12 product-item";
        } else {
            product.className = `col-6 ${desktopClass} product-item`;
        }
    });
}

grid3?.addEventListener("click", () => {
    removeActive();
    grid3.classList.add("active");
    changeLayout("col-lg-4 col-md-6"); 
});

grid2?.addEventListener("click", () => {
    removeActive();
    grid2.classList.add("active");
    changeLayout("col-lg-6 col-md-6");
});

listView?.addEventListener("click", () => {
    removeActive();
    listView.classList.add("active");
    changeLayout("", true);
});

function removeActive() {
    [grid3, grid2, listView].forEach(el => el?.classList.remove("active"));
}
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
// menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("menuOverlay");

menuBtn.onclick = () => {
  mobileMenu.classList.add("active");
  overlay.classList.add("active");
}

overlay.onclick = () => {
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
}