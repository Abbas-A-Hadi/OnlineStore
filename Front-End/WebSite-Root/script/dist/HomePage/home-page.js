const HERO_AUTOPLAY_MS = 4000;
let heroIndex = 0;
let heroTimer = null;
let cart = [];
document.addEventListener("DOMContentLoaded", OnDocumentContentLoaded);
function OnDocumentContentLoaded() {
    var _a;
    document.querySelectorAll(".add-product-btn")
        .forEach(b => b.addEventListener("click", addProductToCart));
    document.querySelectorAll(".show-product-btn")
        .forEach(b => b.addEventListener("click", showProduct));
    (_a = document.getElementById("search-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        let searchInputElement = document.getElementById("search-input");
        const query = searchInputElement.value.toLowerCase();
        if (query)
            alert("Search: " + query);
    });
    const indexOfHeaderActionsDivElement = 0;
    let headerActionsDivElement = document.getElementsByClassName("header-actions").item(indexOfHeaderActionsDivElement);
    if (headerActionsDivElement !== null) {
        const indexOfOpenAccountButtonElement = 0;
        let openAccountBtn = headerActionsDivElement.children.item(indexOfOpenAccountButtonElement);
        openAccountBtn.addEventListener("click", openAccount);
        const indexOfToggleCartButtonElement = 1;
        let toggleCartBtn = headerActionsDivElement.children.item(indexOfToggleCartButtonElement);
        toggleCartBtn.addEventListener("click", toggleCart);
    }
    let hero_ctaDivElement = document.getElementsByClassName("hero-cta").item(0);
    if (hero_ctaDivElement !== null) {
        let indexOfCat_ActionDivElement = 2;
        let cta_actionsDivElement = hero_ctaDivElement.children.item(indexOfCat_ActionDivElement);
        if (cta_actionsDivElement !== null) {
            let indexOfShopNowButtenElement = 0;
            let shopNowBtn = cta_actionsDivElement.children.item(indexOfShopNowButtenElement);
            shopNowBtn.addEventListener("click", shopNow);
            let indexOfDealsButtenElement = 1;
            let dealsBtn = cta_actionsDivElement.children.item(indexOfDealsButtenElement);
            dealsBtn.addEventListener("click", exploreDeals);
        }
    }
    let featuredContainerSectionElement = document.getElementsByClassName("featured container").item(0);
    if (featuredContainerSectionElement !== null) {
        const indexOfFeature_CardDivElement = 0;
        let feature_cardDivElement = featuredContainerSectionElement.children.item(indexOfFeature_CardDivElement);
        if (feature_cardDivElement !== null) {
            let feature_textDivElm = feature_cardDivElement.querySelector("div");
            let customizeBtn = feature_textDivElm === null || feature_textDivElm === void 0 ? void 0 : feature_textDivElm.querySelector("button");
            customizeBtn === null || customizeBtn === void 0 ? void 0 : customizeBtn.addEventListener("click", shopNow);
        }
    }
    let cart_panelDivElement = document.getElementById("cart-panel");
    if (cart_panelDivElement !== null) {
        const indexOfCartHeadDivElement = 0;
        let cartHeadDivElement = cart_panelDivElement.children.item(indexOfCartHeadDivElement);
        if (cartHeadDivElement !== null) {
            let closeCartPanelBtn = cartHeadDivElement === null || cartHeadDivElement === void 0 ? void 0 : cartHeadDivElement.querySelector("button");
            closeCartPanelBtn === null || closeCartPanelBtn === void 0 ? void 0 : closeCartPanelBtn.addEventListener("click", toggleCart);
        }
        const indexOfCartFootDivElement = 2;
        let cart_footDivElement = cart_panelDivElement.children.item(indexOfCartFootDivElement);
        if (cart_footDivElement !== null) {
            let checkOutButton = cart_footDivElement.querySelector("button");
            checkOutButton === null || checkOutButton === void 0 ? void 0 : checkOutButton.addEventListener("click", checkout);
        }
    }
    startHeroAutoplay();
}
function startHeroAutoplay() {
    stopHeroAutoplay();
    heroTimer = setInterval(() => slide(1), HERO_AUTOPLAY_MS);
}
function stopHeroAutoplay() {
    if (heroTimer)
        clearInterval(heroTimer);
    heroTimer = null;
}
function slide(dir) {
    const slider = document.getElementById("hero-slider-div");
    const total = slider.children.length;
    heroIndex = (heroIndex + dir + total) % total;
    slider.style.transform = `translateX(${-heroIndex * 100}%)`;
    stopHeroAutoplay();
    setTimeout(startHeroAutoplay, HERO_AUTOPLAY_MS);
}
function shopNow() {
    var _a;
    (_a = document.getElementById("products")) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
}
function exploreDeals() {
    var _a;
    (_a = document.querySelector(".deals .deal-card")) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
}
function openAccount() {
    window.location.href = "../.././WebSite-Root/documents/account.html";
}
function showProduct() {
    window.location.href = "../.././WebSite-Root/documents/product-page.html";
}
function addProductToCart(e) {
    var _a;
    const eventTarget = e.target;
    if (eventTarget === null)
        return;
    const card = eventTarget.closest(".product-card, .deal-card");
    if (card === null)
        return;
    const titleHeadingElement = card.querySelector("h3, h4");
    let title = (_a = titleHeadingElement.textContent) !== null && _a !== void 0 ? _a : "";
    const priceDivElement = card.querySelector(".price");
    const priceAsText = priceDivElement.innerText || "0";
    const price = parseFloat(priceAsText.replace(/[^\d.]/g, "")) || 0;
    cart.push({ title, price });
    updateCart();
}
function updateCart() {
    const items = document.getElementById("cart-items-ul");
    items.innerHTML = "";
    let total = 0;
    let titleDiv;
    let containerPriceDiv;
    let priceDiv;
    let removeItemBtn;
    cart.forEach((item, i) => {
        total += item.price;
        let new_ListItem = document.createElement("li");
        titleDiv = document.createElement("div");
        titleDiv.innerHTML = item.title;
        containerPriceDiv = document.createElement("div");
        containerPriceDiv.style.display = "flex";
        containerPriceDiv.style.gap = "8px";
        containerPriceDiv.style.alignItems = "center";
        priceDiv = document.createElement("div");
        priceDiv.innerText = item.price.toString();
        removeItemBtn = document.createElement("button");
        removeItemBtn.innerHTML = "x";
        removeItemBtn.onclick = () => { removeItemFromCart(i); };
        removeItemBtn.style.background = "transparent";
        removeItemBtn.style.border = "none";
        removeItemBtn.style.color = "var(--neon)";
        removeItemBtn.style.cursor = "pointer";
        containerPriceDiv.appendChild(priceDiv);
        containerPriceDiv.appendChild(removeItemBtn);
        new_ListItem.appendChild(titleDiv);
        new_ListItem.appendChild(containerPriceDiv);
        items.appendChild(new_ListItem);
    });
    document.getElementById("cart-count-span")
        .innerHTML = cart.length.toString();
    document.getElementById("cart-total-span")
        .innerText = total.toLocaleString();
}
function removeItemFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
function toggleCart() {
    document.getElementById("cart-panel")
        .classList.toggle("open");
}
function checkout() {
    if (cart.length === 0)
        alert("Cart is empty");
    else
        alert("Proceed to checkout (demo)");
}
export {};
//# sourceMappingURL=home-page.js.map