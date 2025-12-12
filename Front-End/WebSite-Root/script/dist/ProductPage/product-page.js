import { Product } from "../DataTypes/Products/Product.js";
let heroProductId;
const products = [
    new Product("keyboard1", "Redragon K512 Neon Gaming Keyboard", "RD-K512", 300000, "IQD", "In stock", 124, "Full-size RGB gaming keyboard with neon backlight and programmable keys.", "The Redragon K512 Neon Gaming Keyboard delivers a full-size layout with vibrant RGB lighting, anti-ghosting keys and a durable metal top plate. Designed for gamers who love a neon cyber look, it features multiple lighting presets, on-the-fly controls and soft-touch keycaps for comfortable long sessions.", [
        "Full-size layout with dedicated media keys",
        "Dynamic RGB neon backlighting with multiple presets",
        "Anti-ghosting and N-key rollover",
        "Detachable wrist rest for extra comfort",
        "Durable switches rated for millions of presses"
    ], [
        "../homePage/img/redragon-k512.jpeg",
        "../homePage/img/download7.jpeg",
        "../homePage/img/download17.jpeg"
    ]),
    new Product("keyboard2", "MagicWand Compact RGB Keyboard", "MW-68", 240000, "IQD", "Only a few left", 67, "Compact 68-key layout with per-key RGB and hot-swappable switches.", "The MagicWand Compact RGB Keyboard brings premium features to a small footprint. With hot-swappable switches, per-key lighting and a rock-solid metal frame, it is perfect for minimalist neon setups and tight desk spaces.", [
        "Compact 68-key neon design",
        "Per-key RGB lighting with custom profiles",
        "Hot-swappable mechanical switches",
        "USB-C detachable braided cable",
        "Side glow diffuser strip for extra neon effect"
    ], [
        "../homePage/img/magicwand.jpeg",
        "../homePage/img/images17.jpeg",
        "../homePage/img/download7.jpeg"
    ]),
    new Product("keyboard3", "Venom-2 Cyberpunk Keyboard", "VNM-2", 350000, "IQD", "In stock", 89, "Aggressive cyberpunk frame with multi-layer RGB lighting and macro row.", "The Venom-2 Cyberpunk Keyboard features a bold open-frame design, elevated switch mounts and layered RGB strips that glow through the chassis. Dedicated macro keys let you trigger combos instantly while the metal frame keeps everything solid.", [
        "Layered neon RGB with side strips",
        "Dedicated macro column with on-board memory",
        "Aluminum top plate with cyber cutouts",
        "Detachable USB-C cable",
        "Tuned stabilizers for smooth large keys"
    ], [
        "../homePage/img/venom-2.jpeg",
        "../homePage/img/lol-logtec.jpeg",
        "../homePage/img/download17.jpeg"
    ])
];
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
    var _a;
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
    nameEl === null || nameEl === void 0 ? void 0 : nameEl.innerText.concat(product.name);
    skuEl === null || skuEl === void 0 ? void 0 : skuEl.innerText.concat("Model: " + product.sku);
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
        card.href = `ProtectPage.html?id=${encodeURIComponent(product.id)}`;
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
function addToCartFromDetails() {
    const product = products[heroProductId] || products["keyboard1"];
    alert("Added to cart: " + product.name + " (" + product.priceText + ")");
}
function buyNow() {
    const product = products[heroProductId] || products["keyboard1"];
    alert("Proceed to checkout for: " + product.name);
}
//# sourceMappingURL=product-page.js.map