import type {Product} from "../DataTypes/Products/Product.js";

let heroProductId: number;

const products: Product[] = [
    {
        id: 1,
        name: "Redragon K512 Neon Gaming Keyboard",
        price: 300_000,
        currency: "IQD",
        brand: "",
        category: "",
        shortDescription: "Full-size RGB gaming keyboard with neon backlight and programmable keys.",
        longDescription: "The Redragon K512 Neon Gaming Keyboard delivers a full-size layout with vibrant RGB lighting, anti-ghosting keys and a durable metal top plate. Designed for gamers who love a neon cyber look, it features multiple lighting presets, on-the-fly controls and soft-touch keycaps for comfortable long sessions.",
        reviews: 124,
        stockStatus: "In stock",
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
        price: 240_000,
        currency: "IQD",
        brand: "",
        category: "",
        shortDescription: "Compact 68-key layout with per-key RGB and hot-swappable switches.",
        longDescription: "The MagicWand Compact RGB Keyboard brings premium features to a small footprint. With hot-swappable switches, per-key lighting and a rock-solid metal frame, it is perfect for minimalist neon setups and tight desk spaces.",
        reviews: 67,
        stockStatus: "Only a few left",
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
        price: 350_000,
        currency: "IQD",
        brand: "",
        category: "",
        shortDescription: "Aggressive cyberpunk frame with multi-layer RGB lighting and macro row.",
        longDescription: "The Venom-2 Cyberpunk Keyboard features a bold open-frame design, elevated switch mounts and layered RGB strips that glow through the chassis. Dedicated macro keys let you trigger combos instantly while the metal frame keeps everything solid.",
        reviews: 89,
        stockStatus: "In stock",
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

function OnDocumentContentLoaded(): void {
    loadProductFromUrl();
    renderRelated();
    
    document.addEventListener("DOMContentLoaded", OnDocumentContentLoaded);
}

function loadProductFromUrl(): void {
    const params = new URLSearchParams(window.location.search)
    const requestedId: number = Number(params.get("id")) || 0;
    console.log("requestedId:", requestedId);
    const product: Product = products.find(p => p.id === requestedId) ?? products[0]!;
    console.log("product:", product);
    heroProductId = product.id;
    renderProduct(product);
}

function renderProduct(product: Product): void {
    const mainImg = <HTMLImageElement> document.getElementById("product-image");
    const nameEl = <HTMLHeadingElement> document.getElementById("product-name");
    //const skuEl = <HTMLParagraphElement> document.getElementById("product-sku");
    const priceEl = <HTMLSpanElement> document.getElementById("product-price");
    const shortEl = <HTMLParagraphElement> document.getElementById("product-short");
    const longEl = <HTMLParagraphElement> document.getElementById("product-long");
    const featEl = <HTMLUListElement> document.getElementById("product-features");
    const buyPriceEl = <HTMLDivElement> document.getElementById("buy-price");
    const stockEl = <HTMLDivElement> document.getElementById("product-stock");
    const reviewsEl = <HTMLSpanElement> document.getElementById("product-reviews");
    const thumbsEl = <HTMLDivElement> document.getElementById("thumbs");

    nameEl?.innerText.concat(product.name);
    //skuEl?.innerText.concat("Model: " + product.sku);
    priceEl?.innerText.concat(product.price.toString());
    buyPriceEl?.innerText.concat(product.price.toString());
    stockEl?.innerText.concat(product.stockStatus);
    shortEl?.innerText.concat(product.shortDescription);
    longEl?.innerText.concat(product.longDescription);
    reviewsEl?.innerText.concat(product.reviews.toString());

    featEl.innerHTML = "";
    let newListItemElm: HTMLLIElement;
    
    (<string[]> product.features).forEach((feature: string) => {
        newListItemElm = document.createElement("li");
        newListItemElm.innerText = feature;
        featEl.appendChild(newListItemElm);
    })

    thumbsEl.innerHTML = "";
    
    let newDivElm: HTMLDivElement;
    let newImageElm: HTMLImageElement;
    
    product.imagesPaths.forEach((src: string, idx: number) => {
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
    })

    mainImg.src = product.imagesPaths[0] ?? "";
    mainImg.alt = product.name;
}

function renderRelated(): void {
    const container = <HTMLDivElement> document.getElementById("related-list")
    container.innerHTML = "";
    
    products.forEach(product => {
        if (product.id === heroProductId) return;
        
        const card: HTMLAnchorElement = document.createElement("a");
        card.className = "related-card";
        card.href = `../../../.././Front-End/WebSite-Root/documents/product-page.html?id=${encodeURIComponent(product.id)}`;
        
        const img: HTMLImageElement = document.createElement("img");
        img.src = product.imagesPaths[0] ?? "";
        img.alt = product.name;
        
        const name: HTMLDivElement = document.createElement("div");
        name.className = "related-name";
        name.textContent = product.name;
        
        const price: HTMLDivElement = document.createElement("div");
        price.className = "related-price"
        price.textContent = product.price.toLocaleString();
        
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        container.appendChild(card);
    })
}

// function addToCartFromDetails(): void {
//     const product = products[heroProductId] || products["keyboard1"]
//     alert("Added to cart: " + product.name + " (" + product.priceText + ")")
// }
//
// function buyNow(): void {
//     const product = products[heroProductId] || products["keyboard1"]
//     alert("Proceed to checkout for: " + product.name)
// }