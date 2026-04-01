// const openBtn = document.getElementById("openSearch");
// const overlay = document.getElementById("searchOverlay");

// openBtn.onclick = (e) => {
//   e.preventDefault();
//   overlay.classList.add("active");
// }

// overlay.onclick = (e) => {
//   if (e.target === overlay) {
//     overlay.classList.remove("active");
//   }
// }

// document.addEventListener("keydown", (e) => {
//   if (e.key === "Escape") {
//     overlay.classList.remove("active");
//   }
// })

// product page image gallery

// product section images card
document.addEventListener("DOMContentLoaded", () => {

  const track = document.querySelector(".product-track");
  const cards = document.querySelectorAll(".product-card");
  const prev = document.querySelector(".prev-btn");
  const next = document.querySelector(".next-btn");

  let index = 0;
  const visibleCards = 4;

  function slide() {
    const cardWidth = cards[0].offsetWidth + 20;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  next.addEventListener("click", () => {
    if (index < cards.length - visibleCards) {
      index++;
    }
    slide();
  });

  prev.addEventListener("click", () => {
    if (index > 0) {
      index--;
    }
    slide();
  });

  window.addEventListener("resize", slide);

});

// deal section images card
const endDate = new Date();
endDate.setHours(endDate.getHours() + 13);

function timer() {
  const now = new Date().getTime();
  const diff = endDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerText = String(days).padStart(2,'0');
  document.getElementById("hours").innerText = String(hours).padStart(2,'0');
  document.getElementById("minutes").innerText = String(minutes).padStart(2,'0');
  document.getElementById("seconds").innerText = String(seconds).padStart(2,'0');
}

setInterval(timer,1000);
timer();

// New Arrivals section images card
const products = {
  mouse: [
    {name:"Eclipse RGB Mouse", price:"$164", img:"images/mouse1.png"},
    {name:"Nebula Quantum", price:"$222", img:"images/mouse2.png"},
    {name:"Phantom Elite", price:"$192", img:"images/mouse3.png"},
    {name:"Zephyr Wireless", price:"$215", img:"images/mouse4.png"},
  ],

  keyboard: [
    {name:"Nova RGB Keyboard", price:"$189", img:"images/key1.png"},
    {name:"Phantom Mech", price:"$210", img:"images/key2.png"},
    {name:"Cyber Strike", price:"$175", img:"images/key3.png"},
    {name:"Hyper RGB", price:"$199", img:"images/key4.png"},
  ],

  controller: [
    {name:"Cosmic Controller", price:"$149", img:"images/gc1.png"},
    {name:"Nebula Pad", price:"$165", img:"images/gc2.png"},
    {name:"Strike Elite", price:"$172", img:"images/gc3.png"},
    {name:"Fusion X", price:"$189", img:"images/gc4.png"},
  ],

  headphone: [
    {name:"Aurora Headset", price:"$192", img:"images/head1.png"},
    {name:"Vortex Audio", price:"$215", img:"images/head2.png"},
    {name:"Quantum Pro", price:"$205", img:"images/head3.png"},
    {name:"Nova Sound", price:"$198", img:"images/head1.png"},
  ]
}

const grid = document.getElementById("productGrid");
const tabs = document.querySelectorAll(".tab");

function loadProducts(type){
  grid.innerHTML = "";
  products[type].forEach(p=>{
    grid.innerHTML += `
      <div class="col-lg-3 col-md-6 mb-4">
        <div class="product-card">
          <div class="product-img-box">
            <img src="${p.img}">
            <div class="product-actions">
              <button class="action-btn"><i class="far fa-star"></i></button>
              <button class="action-btn"><i class="far fa-eye"></i></button>
              <button class="action-btn"><i class="fas fa-sync-alt"></i></button>
            </div>
          </div>
          <h5 class="product-name">${p.name}</h5>
          <div class="rating">
            <i class="fas fa-star"></i><i class="fas fa-star"></i>
            <i class="fas fa-star"></i><i class="fas fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <div class="product-price">${p.price}</div>
        </div>
      </div>
    `;
  });
}

tabs.forEach(tab=>{
  tab.addEventListener("click",()=>{
    tabs.forEach(t=>t.classList.remove("active"));
    tab.classList.add("active");
    loadProducts(tab.dataset.type);
  });
});

loadProducts("mouse");

// customer review page section 
const cards = document.querySelectorAll(".review-card");
const popup = document.getElementById("reviewPopup");
const popupImg = document.getElementById("popupImg");
const popupName = document.getElementById("popupName");
const popupText = document.getElementById("popupText");
const closePopup = document.getElementById("closePopup");

cards.forEach(card => {
  card.addEventListener("click", () => {
    popupImg.src = card.dataset.img;
    popupName.innerText = card.dataset.name;
    popupText.innerText = card.dataset.text;
    popup.classList.add("active");
  });
});

closePopup.addEventListener("click", () => {
  popup.classList.remove("active");
});

popup.addEventListener("click", (e) => {
  if(e.target === popup){
    popup.classList.remove("active");
  }
});

// 
