// ===============================
// 1. LOAD EXTERNAL FILES (Header/Footer)
// ===============================
function loadFile(id, file, callback) {
  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error("File not found: " + file);
      return res.text();
    })
    .then(data => {
      const container = document.getElementById(id);
      if (container) {
        container.innerHTML = data;
        if (callback) callback();
      }
    })
    .catch(err => console.error("Load error:", err));
}

// Load Header
loadFile("header", "header.html", () => {
  console.log("Header loaded successfully");
  initMenu();
  // Cart UI update check
  if (typeof updateCartUI === "function") {
    updateCartUI();
  }
});

// Load Footer
loadFile("footer", "footer.html");


// ===============================
// 2. MENU + SUBMENU LOGIC (Refined)
// ===============================
function initMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");

  const mainMobileHeader = document.querySelector(".mobile-header");

  if (!mobileMenu || !overlay) {
    console.warn("Mobile elements not found in header.html");
    return;
  }

  // --- OPEN MENU ---
  // Event delegation use kar rahe hain taaki agar icon baad mein load ho toh bhi chale
  document.querySelector(".menuBtn").addEventListener("click", () => {
    document.getElementById("mobileMenu").classList.add("active");
    document.getElementById("menuOverlay").classList.add("active");

    // Background scroll lock karein
    document.body.style.overflow = "hidden";
  });

  // --- CLOSE MENU ---
  function closeMenu() {
    document.getElementById("mobileMenu").classList.remove("active");
    document.getElementById("menuOverlay").classList.remove("active");
    
    // Scroll wapas enable karein
    document.body.style.overflow = "auto";
}

  overlay.addEventListener("click", closeMenu);

  // --- SUBMENU & BACK NAVIGATION ---
  mobileMenu.addEventListener("click", (e) => {
    // 1. Handle Submenu Open
    const hasSub = e.target.closest(".has-sub");
    if (hasSub) {
      const targetId = hasSub.getAttribute("data-target");
      const submenu = document.getElementById(targetId);
      if (submenu) submenu.classList.add("active");
    }

    // 2. Handle Back Button
    const backBtn = e.target.closest(".back-btn");
    if (backBtn) {
      const currentSub = backBtn.closest(".submenu");
      if (currentSub) currentSub.classList.remove("active");
    }

    // 3. Handle Link Click (Close menu)
    if (e.target.tagName === 'A' && !e.target.closest(".has-sub")) {
      closeMenu();
    }
  });
}