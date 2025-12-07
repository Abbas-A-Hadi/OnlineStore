import { CartProduct } from "../DataTypes/CartProduct";
const HERO_AUTOPLAY_MS = 4000;
let heroIndex = 0;
let heroTimer = null;
let cart = [];
document.addEventListener("DOMContentLoaded", OnDocumentContentLoaded);
function OnDocumentContentLoaded() {
    var _a, _b, _c, _d, _e;
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
    const indexOfButtenSliderToNext = 0, sliderToNextAsValue = 1;
    const slideToNextHandler = function slideByOneToNext() { slide(sliderToNextAsValue); };
    (_b = document.getElementsByName("slideToNext")[indexOfButtenSliderToNext]) === null || _b === void 0 ? void 0 : _b.addEventListener("click", slideToNextHandler);
    const indexOfButtenSliderToPrevious = 0, sliderToPreviousAsValue = -1;
    const slideToPreviousHandler = function slideByOneToPrevious() { slide(sliderToPreviousAsValue); };
    (_c = document.getElementsByName("slideToPrevious")[indexOfButtenSliderToPrevious]) === null || _c === void 0 ? void 0 : _c.addEventListener("click", slideToPreviousHandler);
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
    const indexOfHero_CtaDivElm = 0;
    let hero_ctaDivElm = document.getElementsByClassName("hero-cta")
        .item(indexOfHero_CtaDivElm);
    if (hero_ctaDivElm !== null) {
        let indexOfCat_ActionDivElement = 2;
        let cta_actionsDivElm = hero_ctaDivElm.children.item(indexOfCat_ActionDivElement);
        if (cta_actionsDivElm !== null) {
            let indexOfShopNowButtenElm = 0;
            let shopNowBtn = cta_actionsDivElm.children.item(indexOfShopNowButtenElm);
            shopNowBtn.addEventListener("click", shopNow);
            let indexOfDealsButtenElm = 1;
            let dealsBtn = cta_actionsDivElm.children.item(indexOfDealsButtenElm);
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
    let cartPanelDivElm = document.getElementById("cart-panel");
    if (cartPanelDivElm !== null) {
        const indexOfCartModelDivElm = 0;
        const cartModelDivElm = cartPanelDivElm.children.item(indexOfCartModelDivElm);
        const indexOfCartHeadDivElm = 0;
        const indexOfCloseCartPanelBtn = 1;
        let cartHeaderDivElm = cartModelDivElm.children.item(indexOfCartHeadDivElm);
        (_d = cartHeaderDivElm.children.item(indexOfCloseCartPanelBtn)) === null || _d === void 0 ? void 0 : _d.addEventListener("click", toggleCart);
        const indexOfCartActionBarDivElm = 3;
        const indexOfCheckoutBtn = 1;
        const cartActionBarDivElm = cartModelDivElm.children.item(indexOfCartActionBarDivElm);
        (_e = cartActionBarDivElm === null || cartActionBarDivElm === void 0 ? void 0 : cartActionBarDivElm.children.item(indexOfCheckoutBtn)) === null || _e === void 0 ? void 0 : _e.addEventListener("click", checkout);
    }
    startHeroAutoplay();
    document.removeEventListener("DOMContentLoaded", OnDocumentContentLoaded);
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
    var _a, _b;
    if (e.target === null)
        return;
    const eventTargetAsButtenElm = e.target;
    const card = eventTargetAsButtenElm.closest(".product-card, .deal-card");
    if (card === null)
        return;
    const titleHeadingElm = card.querySelector("h3, h4");
    const priceDivElm = card.querySelector(".price");
    const productImage_ImageElm = card.querySelector("img");
    let title = (_a = titleHeadingElm.textContent) !== null && _a !== void 0 ? _a : "";
    const priceAsText = (_b = priceDivElm === null || priceDivElm === void 0 ? void 0 : priceDivElm.innerText) !== null && _b !== void 0 ? _b : "0";
    const price = parseFloat(priceAsText.replace(/[^\d.]/g, "")) || 0;
    const productImagePath = productImage_ImageElm
        ? productImage_ImageElm.getAttribute("src") : "";
    const existingProduct = cart.find(p => p.name === title && p.imagePath === productImagePath);
    if (existingProduct) {
        existingProduct.quantity += (existingProduct.quantity || 1) + 1;
    }
    else {
        cart.push(new CartProduct(title, price, 1, productImagePath));
    }
    updateCart();
}
function updateCart() {
    const items = document.getElementById("cart-items");
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
        titleDiv.innerHTML = item.name;
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
    document.getElementById("cart-total")
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
//# sourceMappingURL=home-page.js.map