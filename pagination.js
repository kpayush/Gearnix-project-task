// ================= TAG ACTIVE SYSTEM =================
const tagBtns = document.querySelectorAll('.tag-btn');

tagBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tagBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});


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

document.querySelectorAll(".has-sub").forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

const subLinks = document.querySelectorAll(".has-sub");

subLinks.forEach(link=>{
link.addEventListener("click",function(){

const target = this.getAttribute("data-target");
document.getElementById(target).classList.add("active");

});
});

const backBtns = document.querySelectorAll(".back-btn");

backBtns.forEach(btn=>{
btn.addEventListener("click",function(){

this.closest(".submenu").classList.remove("active");

});
});

let currentPage = 1;
const itemsPerPage = 6;
// Get fresh list of products
const allProducts = document.querySelectorAll(".product-item");

function showPage(page) {
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    
    // Boundary check
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    
    currentPage = page;

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    allProducts.forEach((item, index) => {
        if (index >= start && index < end) {
            item.classList.remove("d-none"); // Use Bootstrap class for reliability
            item.style.display = "block"; 
        } else {
            item.classList.add("d-none");
            item.style.display = "none";
        }
    });

    // Optional: Update active state on pagination buttons
    updatePaginationUI();
}

// Helper to make pagination buttons look active
function updatePaginationUI() {
    const buttons = document.querySelectorAll(".blog-pagination button");
    buttons.forEach(btn => {
        btn.classList.remove("active-page"); // Add this CSS class if you want
        if (btn.innerText == currentPage) {
            btn.style.backgroundColor = "#ff4bd8";
            btn.style.color = "white";
        } else {
            btn.style.backgroundColor = "";
            btn.style.color = "";
        }
    });
}
function changeLayout(className, listMode = false) {
    removeActive();

    if (listMode) {
        container.classList.add("list-view");
    } else {
        container.classList.remove("list-view");
    }

    allProducts.forEach(product => {
        // We change the classes but NOT the display property here
        // The display is managed by showPage()
        product.className = `product-item ${className}`;
    });

    // CRITICAL: Re-apply pagination visibility after changing classes
    showPage(currentPage);
}