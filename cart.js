
// 1. Global Cart Array
let globalCart = [];

// 2. Add to Cart Function
function addToCart(id, name, price, img) {
    // Price cleaning (Extra symbols hatane ke liye)
    let numericPrice = 0;
    if (typeof price === 'string') {
        numericPrice = parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
    } else {
        numericPrice = price;
    }
    
    const existingProduct = globalCart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.qty += 1;
    } else {
        globalCart.push({ id, name, price: numericPrice, img, qty: 1 });
    }
    
    renderCartUI();
    
    // Side drawer open logic
    const cartEl = document.getElementById('cartDrawer');
    if (cartEl) {
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(cartEl);
        bsOffcanvas.show();
    }
}

// 3. UI Update Function
function renderCartUI() {
    const list = document.getElementById('cartItemsList');
    const footer = document.getElementById('cartFooter');
    const badge = document.getElementById('cartBadgeCount');
    const navCount = document.getElementById('cartCount');

    if (!list) return;

    if (globalCart.length === 0) {
        list.innerHTML = '<div class="text-center py-5 text-muted">Your cart is empty.</div>';
        if (footer) footer.style.display = 'none';
        if (navCount) navCount.innerText = "0";
        if (badge) badge.innerText = "0 ITEMS";
        return;
    }

    if (footer) footer.style.display = 'block';
    let total = 0;
    let totalQty = 0;

    list.innerHTML = globalCart.map((item, index) => {
        total += item.price * item.qty;
        totalQty += item.qty;
        return `
            <div class="d-flex align-items-center mb-4 pb-3 border-bottom">
                <img src="${item.img}" width="65" height="65" style="object-fit: cover;" class="rounded me-3">
                <div class="flex-grow-1">
                    <h6 class="mb-0 fw-bold" style="font-size: 14px;">${item.name}</h6>
                    <div class="d-flex align-items-center justify-content-between mt-2">
                        <div class="d-flex align-items-center border rounded bg-light">
                            <button class="btn btn-sm py-0 px-2 fw-bold" onclick="updateQty(${index}, -1)">-</button>
                            <span class="px-2 small fw-bold">${item.qty}</span>
                            <button class="btn btn-sm py-0 px-2 fw-bold" onclick="updateQty(${index}, 1)">+</button>
                        </div>
                        <span class="fw-bold small" style="color: #ff4bd8;">$${(item.price * item.qty).toFixed(2)}</span>
                        <button class="btn btn-sm text-danger p-0" onclick="deleteItem(${index})">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            </div>`;
    }).join('');

    if (document.getElementById('cartTotalPrice')) {
        document.getElementById('cartTotalPrice').innerText = `$${total.toFixed(2)}`;
    }
    if (badge) badge.innerText = `${totalQty} ITEMS`;
    if (navCount) navCount.innerText = totalQty;
}

// 4. Quantity & Delete (Global Scope)
window.updateQty = (index, change) => {
    globalCart[index].qty += change;
    if (globalCart[index].qty < 1) globalCart.splice(index, 1);
    renderCartUI();
};

window.deleteItem = (index) => {
    globalCart.splice(index, 1);
    renderCartUI();
};

// 5. Smart Click Listener (No More InnerText Errors)
// 5. Smart Click Listener (Data Attributes se Accurate Data Lift Karein)
document.addEventListener('click', (e) => {
    // 1. Check karein ke click 'Add to Cart' button par ya uske andar ke icon par hua hai
    const btn = e.target.closest('.add-to-cart-btn');
    
    // 2. Agar icon (bi-cart) par click hua hai jo button ke bahar hai, usko bhi handle karein
    const iconBtn = e.target.closest('.bi-cart');

    if (btn) {
        e.preventDefault();
        
        // Button ke data attributes se direct values uthayein
        const id = btn.getAttribute('data-id');
        const name = btn.getAttribute('data-name');
        const price = btn.getAttribute('data-price');
        const img = btn.getAttribute('data-img');

        if (id && name && price) {
            addToCart(id, name, price, img);
        }
    } 
    else if (iconBtn) {
        // Agar hover-icon wale cart par click ho, toh uske parent card se info nikaalein
        e.preventDefault();
        const card = iconBtn.closest('.product-card');
        if (card) {
            const mainBtn = card.querySelector('.add-to-cart-btn');
            if (mainBtn) {
                const id = mainBtn.getAttribute('data-id');
                const name = mainBtn.getAttribute('data-name');
                const price = mainBtn.getAttribute('data-price');
                const img = mainBtn.getAttribute('data-img');
                addToCart(id, name, price, img);
            }
        }
    }
});