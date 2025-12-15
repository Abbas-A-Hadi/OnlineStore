let heroProductId;
const products = [
    {
        id: 1,
        name: "Redragon K512 Neon Gaming Keyboard",
        price: 300000,
        currency: "IQD",
        stockStatus: "In stock",
        reviews: 124,
        shortDescription: "Full-size RGB gaming keyboard with neon backlight and programmable keys.",
        longDescription: "The Redragon K512 Neon Gaming Keyboard delivers a full-size layout with vibrant RGB lighting, anti-ghosting keys and a durable metal top plate. Designed for gamers who love a neon cyber look, it features multiple lighting presets, on-the-fly controls and soft-touch keycaps for comfortable long sessions.",
        features: [
            "Full-size layout with dedicated media keys",
            "Dynamic RGB neon backlighting with multiple presets",
            "Anti-ghosting and N-key rollover",
            "Detachable wrist rest for extra comfort",
            "Durable switches rated for millions of presses"
        ],
        imagesPaths: [
            "../homePage/img/redragon-k512.jpeg",
            "../homePage/img/download7.jpeg",
            "../homePage/img/download17.jpeg"
        ]
    },
    {
        id: 2,
        name: "MagicWand Compact RGB Keyboard",
        price: 240000,
        currency: "IQD",
        stockStatus: "Only a few left",
        reviews: 67,
        shortDescription: "Compact 68-key layout with per-key RGB and hot-swappable switches.",
        longDescription: "The MagicWand Compact RGB Keyboard brings premium features to a small footprint. With hot-swappable switches, per-key lighting and a rock-solid metal frame, it is perfect for minimalist neon setups and tight desk spaces.",
        features: [
            "Compact 68-key neon design",
            "Per-key RGB lighting with custom profiles",
            "Hot-swappable mechanical switches",
            "USB-C detachable braided cable",
            "Side glow diffuser strip for extra neon effect"
        ],
        imagesPaths: [
            "../homePage/img/magicwand.jpeg",
            "../homePage/img/images17.jpeg",
            "../homePage/img/download7.jpeg"
        ]
    },
    {
        id: 3,
        name: "Venom-2 Cyberpunk Keyboard",
        price: 350000,
        currency: "IQD",
        stockStatus: "In stock",
        reviews: 89,
        shortDescription: "Aggressive cyberpunk frame with multi-layer RGB lighting and macro row.",
        longDescription: "The Venom-2 Cyberpunk Keyboard features a bold open-frame design, elevated switch mounts and layered RGB strips that glow through the chassis. Dedicated macro keys let you trigger combos instantly while the metal frame keeps everything solid.",
        features: [
            "Layered neon RGB with side strips",
            "Dedicated macro column with on-board memory",
            "Aluminum top plate with cyber cutouts",
            "Detachable USB-C cable",
            "Tuned stabilizers for smooth large keys"
        ],
        imagesPaths: [
            "../homePage/img/venom-2.jpeg",
            "../homePage/img/lol-logtec.jpeg",
            "../homePage/img/download17.jpeg"
        ]
    }
];
document.addEventListener("DOMContentLoaded", OnDocumentContentLoaded);
function OnDocumentContentLoaded() {
    loadProductFromUrl();
    renderRelated();
    document.addEventListener("DOMContentLoaded", OnDocumentContentLoaded);
}
function loadProductFromUrl() {
    var _a;
    const params = new URLSearchParams(window.location.search);
    const requestedId = Number(params.get("id")) || 0;
    console.log("requestedId:", requestedId);
    const product = (_a = products.find(p => p.id === requestedId)) !== null && _a !== void 0 ? _a : products[0];
    console.log("product:", product);
    heroProductId = product.id;
    renderProduct(product);
}
function renderProduct(product) {
    var _a;
    const mainImg = document.getElementById("product-image");
    const nameEl = document.getElementById("product-name");
    const priceEl = document.getElementById("product-price");
    const shortEl = document.getElementById("product-short");
    const longEl = document.getElementById("product-long");
    const featEl = document.getElementById("product-features");
    const buyPriceEl = document.getElementById("buy-price");
    const stockEl = document.getElementById("product-stock");
    const reviewsEl = document.getElementById("product-reviews");
    const thumbsEl = document.getElementById("thumbs");
    nameEl === null || nameEl === void 0 ? void 0 : nameEl.innerText.concat(product.name);
    priceEl === null || priceEl === void 0 ? void 0 : priceEl.innerText.concat(product.price.toString());
    buyPriceEl === null || buyPriceEl === void 0 ? void 0 : buyPriceEl.innerText.concat(product.price.toString());
    stockEl === null || stockEl === void 0 ? void 0 : stockEl.innerText.concat(product.stockStatus);
    shortEl === null || shortEl === void 0 ? void 0 : shortEl.innerText.concat(product.shortDescription);
    longEl === null || longEl === void 0 ? void 0 : longEl.innerText.concat(product.longDescription);
    reviewsEl === null || reviewsEl === void 0 ? void 0 : reviewsEl.innerText.concat(product.reviews.toString());
    featEl.innerHTML = "";
    let newListItemElm;
    product.features.forEach((feature) => {
        newListItemElm = document.createElement("li");
        newListItemElm.innerText = feature;
        featEl.appendChild(newListItemElm);
    });
    thumbsEl.innerHTML = "";
    let newDivElm;
    let newImageElm;
    product.imagesPaths.forEach((src, idx) => {
        newDivElm = document.createElement("div");
        newDivElm.className = "thumb-item" + (idx === 0 ? " active" : "");
        newImageElm = document.createElement("img");
        newImageElm.src = src;
        newImageElm.alt = product.name + " image " + (idx + 1);
        newDivElm.appendChild(newImageElm);
        newDivElm.addEventListener("click", () => {
            document
                .querySelectorAll(".thumb-item")
                .forEach(el => el.classList.remove("active"));
            newDivElm.classList.add("active");
            mainImg.src = src;
        });
        thumbsEl.appendChild(newDivElm);
    });
    mainImg.src = (_a = product.imagesPaths[0]) !== null && _a !== void 0 ? _a : "";
    mainImg.alt = product.name;
}
function renderRelated() {
    const container = document.getElementById("related-list");
    container.innerHTML = "";
    products.forEach(product => {
        var _a;
        if (product.id === heroProductId)
            return;
        const card = document.createElement("a");
        card.className = "related-card";
        card.href = `../../../.././Front-End/WebSite-Root/documents/product-page.html?id=${encodeURIComponent(product.id)}`;
        const img = document.createElement("img");
        img.src = (_a = product.imagesPaths[0]) !== null && _a !== void 0 ? _a : "";
        img.alt = product.name;
        const name = document.createElement("div");
        name.className = "related-name";
        name.textContent = product.name;
        const price = document.createElement("div");
        price.className = "related-price";
        price.textContent = product.price.toLocaleString();
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        container.appendChild(card);
    });
}
export {};
//# sourceMappingURL=product-page.js.map