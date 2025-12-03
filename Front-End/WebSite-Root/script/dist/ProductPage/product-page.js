let heroProductId = null;
const products = {
    keyboard1: {
        id: "keyboard1",
        name: "Redragon K512 Neon Gaming Keyboard",
        sku: "RD-K512",
        priceText: "300,000 IQD",
        priceNumber: 300000,
        stock: "In stock",
        reviewsText: "124 ratings",
        short: "Full-size RGB gaming keyboard with neon backlight and programmable keys.",
        long: "The Redragon K512 Neon Gaming Keyboard delivers a full-size layout with vibrant RGB lighting, anti-ghosting keys and a durable metal top plate. Designed for gamers who love a neon cyber look, it features multiple lighting presets, on-the-fly controls and soft-touch keycaps for comfortable long sessions.",
        features: [
            "Full-size layout with dedicated media keys",
            "Dynamic RGB neon backlighting with multiple presets",
            "Anti-ghosting and N-key rollover",
            "Detachable wrist rest for extra comfort",
            "Durable switches rated for millions of presses"
        ],
        images: [
            "../homePage/img/redragon-k512.jpeg",
            "../homePage/img/download7.jpeg",
            "../homePage/img/download17.jpeg"
        ]
    },
    keyboard2: {
        id: "keyboard2",
        name: "MagicWand Compact RGB Keyboard",
        sku: "MW-68",
        priceText: "240,000 IQD",
        priceNumber: 240000,
        stock: "Only a few left",
        reviewsText: "67 ratings",
        short: "Compact 68-key layout with per-key RGB and hot-swappable switches.",
        long: "The MagicWand Compact RGB Keyboard brings premium features to a small footprint. With hot-swappable switches, per-key lighting and a rock-solid metal frame, it is perfect for minimalist neon setups and tight desk spaces.",
        features: [
            "Compact 68-key neon design",
            "Per-key RGB lighting with custom profiles",
            "Hot-swappable mechanical switches",
            "USB-C detachable braided cable",
            "Side glow diffuser strip for extra neon effect"
        ],
        images: [
            "../homePage/img/magicwand.jpeg",
            "../homePage/img/images17.jpeg",
            "../homePage/img/download7.jpeg"
        ]
    },
    keyboard3: {
        id: "keyboard3",
        name: "Venom-2 Cyberpunk Keyboard",
        sku: "VNM-2",
        priceText: "350,000 IQD",
        priceNumber: 350000,
        stock: "In stock",
        reviewsText: "89 ratings",
        short: "Aggressive cyberpunk frame with multi-layer RGB lighting and macro row.",
        long: "The Venom-2 Cyberpunk Keyboard features a bold open-frame design, elevated switch mounts and layered RGB strips that glow through the chassis. Dedicated macro keys let you trigger combos instantly while the metal frame keeps everything solid.",
        features: [
            "Layered neon RGB with side strips",
            "Dedicated macro column with on-board memory",
            "Aluminum top plate with cyber cutouts",
            "Detachable USB-C cable",
            "Tuned stabilizers for smooth large keys"
        ],
        images: [
            "../homePage/img/venom-2.jpeg",
            "../homePage/img/lol-logtec.jpeg",
            "../homePage/img/download17.jpeg"
        ]
    }
};
document.addEventListener("DOMContentLoaded", () => {
    loadProductFromUrl();
    renderRelated();
});
function loadProductFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("id") || "keyboard1";
    const product = products[requestedId] || products["keyboard1"];
    heroProductId = product.id;
    renderProduct(product);
}
function renderProduct(product) {
    const mainImg = document.getElementById("product-image");
    const nameEl = document.getElementById("product-name");
    const skuEl = document.getElementById("product-sku");
    const priceEl = document.getElementById("product-price");
    const shortEl = document.getElementById("product-short");
    const longEl = document.getElementById("product-long");
    const featEl = document.getElementById("product-features");
    const buyPriceEl = document.getElementById("buy-price");
    const stockEl = document.getElementById("product-stock");
    const reviewsEl = document.getElementById("product-reviews");
    const thumbsEl = document.getElementById("thumbs");
    nameEl.textContent = product.name;
    skuEl.textContent = "Model: " + product.sku;
    priceEl.textContent = product.priceText;
    buyPriceEl.textContent = product.priceText;
    stockEl.textContent = product.stock;
    shortEl.textContent = product.short;
    longEl.textContent = product.long;
    reviewsEl.textContent = product.reviewsText;
    featEl.innerHTML = "";
    product.features.forEach(f => {
        const li = document.createElement("li");
        li.textContent = f;
        featEl.appendChild(li);
    });
    thumbsEl.innerHTML = "";
    product.images.forEach((src, idx) => {
        const t = document.createElement("div");
        t.className = "thumb-item" + (idx === 0 ? " active" : "");
        const img = document.createElement("img");
        img.src = src;
        img.alt = product.name + " image " + (idx + 1);
        t.appendChild(img);
        t.addEventListener("click", () => {
            document
                .querySelectorAll(".thumb-item")
                .forEach(el => el.classList.remove("active"));
            t.classList.add("active");
            mainImg.src = src;
        });
        thumbsEl.appendChild(t);
    });
    mainImg.src = product.images[0];
    mainImg.alt = product.name;
}
function renderRelated() {
    const container = document.getElementById("related-list");
    container.innerHTML = "";
    Object.values(products).forEach(p => {
        if (p.id === heroProductId)
            return;
        const card = document.createElement("a");
        card.className = "related-card";
        card.href = `ProtectPage.html?id=${encodeURIComponent(p.id)}`;
        const img = document.createElement("img");
        img.src = p.images[0];
        img.alt = p.name;
        const name = document.createElement("div");
        name.className = "related-name";
        name.textContent = p.name;
        const price = document.createElement("div");
        price.className = "related-price";
        price.textContent = p.priceText;
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        container.appendChild(card);
    });
}
function addToCartFromDetails() {
    const product = products[heroProductId] || products["keyboard1"];
    alert("Added to cart: " + product.name + " (" + product.priceText + ")");
}
function buyNow() {
    const product = products[heroProductId] || products["keyboard1"];
    alert("Proceed to checkout for: " + product.name);
}
export {};
//# sourceMappingURL=product-page.js.map