let heroIndex = 0;
const HERO_AUTOPLAY_MS = 4000;
let heroTimer = null;

// ===== ON LOAD =====
document.addEventListener("DOMContentLoaded", () => {
    // Add to cart buttons
    document.querySelectorAll(".add-btn").forEach(btn => {
        btn.addEventListener("click", productAdd);
    });

    // Show product buttons
    document.querySelectorAll(".show-btn").forEach(btn => {
        btn.addEventListener("click", showProduct);
    });

    // Search button (optional)
    const searchBtn = document.getElementById("searchBtn");
    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            const q = document.getElementById("search")?.value.trim();
            if (q) alert("Search: " + q);
        });
    }

    loadCart();
    startHeroAutoplay();

    const cartPanel = document.getElementById("cart-panel");
    if (cartPanel) {
        cartPanel.addEventListener("click", (e) => {
            if (e.target === cartPanel) {
                cartPanel.classList.remove("open");
            }
        });
    }

});

// ===== HERO SLIDER =====
function startHeroAutoplay() {
    stopHeroAutoplay();
    heroTimer = setInterval(() => {
        const slider = document.getElementById("heroSlider");
        if (!slider) return;
        const total = slider.children.length;
        if (!total) return;

        heroIndex = (heroIndex + 1) % total;
        slider.style.transform = `translateX(${-heroIndex * 100}%)`;
    }, HERO_AUTOPLAY_MS);
}

function stopHeroAutoplay() {
    if (heroTimer) {
        clearInterval(heroTimer);
        heroTimer = null;
    }
}

function slide(dir) {
    const slider = document.getElementById("heroSlider");
    if (!slider) return;
    const total = slider.children.length;
    if (!total) return;

    heroIndex = (heroIndex + dir + total) % total;
    slider.style.transform = `translateX(${-heroIndex * 100}%)`;

    // restart autoplay after manual click
    startHeroAutoplay();
}

// ===== CTA HELPERS =====
function shopNow() {
    const section = document.getElementById("products");
    if (section) section.scrollIntoView({ behavior: "smooth" });
}

function exploreDeals() {
    const firstDeal = document.querySelector(".deals .deal-card");
    if (firstDeal) firstDeal.scrollIntoView({ behavior: "smooth" });
}

function openAccount() {
    // change to your real account page if needed
    window.location.href = "../Web.html";
}

function showProduct() {
    // change path if your product page is somewhere else
    window.location.href = "../ProtectShowPage/ProtectPage.html";
}

// ===== CART LOGIC =====
// ===== CART STATE =====
let cart = [];
const CART_KEY = "alpha_sote_cart";

function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        if (Array.isArray(saved)) cart = saved;
    } catch (e) {
        cart = [];
    }
    updateCart();
}

// load cart when page starts
loadCart();

// Add to cart
function productAdd(e) {
    const btn = e.currentTarget || e.target;

    // click animation from your CSS (optional)
    btn.classList?.remove("added");
    void btn.offsetWidth;
    btn.classList?.add("added");

    const card = btn.closest(".product-card, .deal-card");
    if (!card) return;

    const titleEl = card.querySelector("h3, h4");
    const priceEl = card.querySelector(".price");
    const imgEl   = card.querySelector("img");

    const title = titleEl ? titleEl.innerText.trim() : "";
    const priceText = priceEl ? priceEl.innerText : "0";
    const price = parseFloat(priceText.replace(/[^\d.]/g, "")) || 0;
    const image = imgEl ? imgEl.getAttribute("src") : "";

    // if the same product exists, just increase qty
    const existing = cart.find(item => item.title === title && item.price === price);
    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        cart.push({ title, price, image, qty: 1 });
    }

    updateCart();
}

function updateCart() {
    const itemsEl = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    const countEl = document.getElementById("cart-count");
    const badgeEl = document.getElementById("cart-count-badge");

    if (!itemsEl || !totalEl || !countEl) return;

    itemsEl.innerHTML = "";
    let total = 0;
    let totalQty = 0;

    cart.forEach((item, index) => {
        const qty = item.qty || 1;
        const priceEach = typeof item.price === "number" ? item.price : 0;
        const lineTotal = priceEach * qty;

        total += lineTotal;
        totalQty += qty;

        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
          <div class="cart-item-left">
            <div class="cart-thumb">
              ${item.image ? `<img src="${item.image}" alt="${item.title}">` : ""}
            </div>
            <div>
              <div class="cart-item-title">${item.title || ""}</div>
              <div class="cart-item-price">${priceEach.toLocaleString()} IQD</div>
            </div>
          </div>
          <div class="cart-item-right">
            <div class="cart-qty">${qty}</div>
            <button class="cart-remove" onclick="removeItem(${index})">Remove</button>
          </div>
        `;
        itemsEl.appendChild(li);
    });

    totalEl.textContent = total.toLocaleString();

    // badge + top icon count show total quantity
    countEl.textContent = String(totalQty);
    if (badgeEl) badgeEl.textContent = String(totalQty || 0);

    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {}
}

function removeItem(index) {
    if (index < 0 || index >= cart.length) return;
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    const panel = document.getElementById("cart-panel");
    if (panel) panel.classList.toggle("open");
}

function checkout() {
    if (!cart.length) {
        alert("Cart is empty");
        return;
    }
    updateCart();
    window.location.href = "../PaymentPage/paymentHtml.html";
}