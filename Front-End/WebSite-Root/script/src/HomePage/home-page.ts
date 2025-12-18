import type {CartProduct} from "../DataTypes/CartProduct.js";
import type {Product} from "../../dist/DataTypes/Products/Product.js";
import {Api} from "../../dist/Global.js";

const HERO_AUTOPLAY_MS: number = 4000;
let heroIndex : number = 0;
let heroTimer : number | null = null;

const cart: CartProduct[] = new Array<CartProduct>();

document.addEventListener("DOMContentLoaded", OnDocumentContentLoaded);

function OnDocumentContentLoaded(): void {
    // Add event listener on click event to addProduct buttons.
    document.querySelectorAll(".add-product-btn")
        .forEach(b => (<HTMLButtonElement> b).addEventListener("click", addProductToCart));

    // Add event listener on click event to showProduct buttons.
    document.querySelectorAll(".show-product-btn")
        .forEach(b => (<HTMLButtonElement> b).addEventListener("click", showProduct));

    // Add event listener on click event to search button. (optional)
    document.getElementById("search-btn")?.addEventListener("click", () => {
        let searchInputElement = <HTMLInputElement> document.getElementById("search-input");

        const query: string = searchInputElement.value.toLowerCase();

        if (query) alert("Search: " + query);
    });


    const indexOfButtenSliderToNext = 0, sliderToNextAsValue = 1;
    const slideToNextHandler = function slideByOneToNext() { slide(sliderToNextAsValue) };
    
    (<HTMLButtonElement> document.getElementsByName("slideToNext")[indexOfButtenSliderToNext])
        ?.addEventListener("click", slideToNextHandler);
    
    const indexOfButtenSliderToPrevious = 0, sliderToPreviousAsValue = -1;
    const slideToPreviousHandler = function slideByOneToPrevious() { slide(sliderToPreviousAsValue) };
    
    (<HTMLButtonElement> document.getElementsByName("slideToPrevious")[indexOfButtenSliderToPrevious])
        ?.addEventListener("click", slideToPreviousHandler);
    
    
    /* Add event listeners on click to children of header div. */  
    const indexOfHeaderActionsDivElement: number = 0;
    let headerActionsDivElement = <HTMLDivElement>
        document.getElementsByClassName("header-actions").item(indexOfHeaderActionsDivElement);

    if (headerActionsDivElement !== null) {
        const indexOfOpenAccountButtonElement: number = 0;
        let openAccountBtn = <HTMLButtonElement>
            headerActionsDivElement.children.item(indexOfOpenAccountButtonElement);

        openAccountBtn.addEventListener("click", openAccount);

        const indexOfToggleCartButtonElement: number = 1;
        let toggleCartBtn = <HTMLButtonElement> headerActionsDivElement.children.item(indexOfToggleCartButtonElement);
        
        toggleCartBtn.addEventListener("click", toggleCart);
    }
    
    
    /* Add event listeners on click to children of hero_cta div. */
    const indexOfHero_CtaDivElm: number = 0;
    let hero_ctaDivElm = <HTMLDivElement> document.getElementsByClassName("hero-cta")
        .item(indexOfHero_CtaDivElm);

    if (hero_ctaDivElm !== null) {
        let indexOfCat_ActionDivElement: number = 2;
        let cta_actionsDivElm = <HTMLDivElement> hero_ctaDivElm.children.item(indexOfCat_ActionDivElement);

        if (cta_actionsDivElm !== null) {
            let indexOfShopNowButtenElm: number = 0;
            let shopNowBtn = <HTMLButtonElement> cta_actionsDivElm.children.item(indexOfShopNowButtenElm);
            shopNowBtn.addEventListener("click", shopNow);

            let indexOfDealsButtenElm: number = 1;
            let dealsBtn = <HTMLButtonElement> cta_actionsDivElm.children.item(indexOfDealsButtenElm);
            dealsBtn.addEventListener("click", exploreDeals);
        }
    }

    
    // section class="featured container"
    let featuredContainerSectionElement = <HTMLTableSectionElement>
        document.getElementsByClassName("featured container").item(0);

    if (featuredContainerSectionElement !== null) {
        const indexOfFeature_CardDivElement: number = 0;
        let feature_cardDivElement = <HTMLDivElement>featuredContainerSectionElement.children.item(indexOfFeature_CardDivElement);

        if (feature_cardDivElement !== null) {
            let feature_textDivElm = <HTMLDivElement> feature_cardDivElement.querySelector("div");

            let customizeBtn = <HTMLButtonElement> feature_textDivElm?.querySelector("button");
            customizeBtn?.addEventListener("click", shopNow)
        }
    }

    
    let cartPanelDivElm = <HTMLDivElement> document.getElementById("cart-panel");
    if (cartPanelDivElm !== null) {
        /* Get Model Cart div element. */        
        const indexOfCartModelDivElm: number = 0; // <div class="cart-modal">
        const cartModelDivElm = <HTMLDivElement> cartPanelDivElm.children.item(indexOfCartModelDivElm);


        /* Get Header Cart div element. */
        const indexOfCartHeadDivElm: number = 0; // <div class="cart-header">
        const indexOfCloseCartPanelBtn: number = 1; // <button class="cart-close">✕</button>
        
        let cartHeaderDivElm = <HTMLDivElement> cartModelDivElm.children.item(indexOfCartHeadDivElm);

        (<HTMLButtonElement> cartHeaderDivElm.children.item(indexOfCloseCartPanelBtn))
            // Will return close cart button.
            ?.addEventListener("click", toggleCart);


        /* Get Action Bar of Cart div element. */
        const indexOfCartActionBarDivElm: number = 3; // <div class="cart-actions-bar">
        const indexOfCheckoutBtn: number = 1; // <button class="cart-primary">Checkout</button>
        
        const cartActionBarDivElm = <HTMLDivElement> cartModelDivElm.children.item(indexOfCartActionBarDivElm);

        (<HTMLButtonElement> cartActionBarDivElm?.children.item(indexOfCheckoutBtn))
        // will return checkout button.
            ?.addEventListener("click", checkout);
    }

    startHeroAutoplay();
    
    document.removeEventListener("DOMContentLoaded", OnDocumentContentLoaded);
}

function startHeroAutoplay() : void {
    stopHeroAutoplay();
    heroTimer = setInterval(() => slide(1), HERO_AUTOPLAY_MS);
}

function stopHeroAutoplay() : void {
    if (heroTimer) clearInterval(heroTimer);
    heroTimer = null;
}

function slide(dir: number) : void {
    const slider = <HTMLDivElement> document.getElementById("hero-slider-div");
    const total: number = slider.children.length;
    heroIndex = (heroIndex + dir + total) % total;
    slider.style.transform = `translateX(${-heroIndex * 100}%)`;

    // restart autoplay after manual click
    stopHeroAutoplay();
    setTimeout(startHeroAutoplay, HERO_AUTOPLAY_MS);
}

function loadAndPresentProducts() : void {
    const productsSectionElement = <HTMLTableSectionElement>document.getElementById("products");
    
    const productsGrid = <HTMLDivElement> productsSectionElement
        .children.item(1);
    
    let newProductContainerDivElm: HTMLDivElement;
    
    for (const product of products) 
    {
        newProductContainerDivElm = document.createElement("div");
        
        
        productsGrid.appendChild();
    }
    
    /*
    <div class="product-card">
        <div class="img-wrap"><img src="img/images17.jpeg"></div>
        <h3>Redragon SHIVA</h3>
        <div class="price">IQD 30,000</div>
        <div class="card-actions">
            <button class="add-product-btn">Add to Cart</button>
            <button name="1" class="show-product-btn">Show Product</button>
        </div>
    </div>
    */
    
    const products = loadProductsByCategoryType(1);
}

async function loadProductsByCategoryType(categoryType: number, page: number = 0, size: number = 20): Product[]
{
    try {
        const results = await Api.Get<Product[]>(`products/${categoryType}?page=${page}&size=${size}`);
        
        return results;
    }
    catch (e) {
        console.error(e);
        alert(e);
    }
    
    return new Array<Product>();
}

/* 
    *=* The Event Listeners Delegates *=* 
*/

function shopNow() : void {
    (<HTMLTableSectionElement> document.getElementById("products"))
        ?.scrollIntoView({ behavior: "smooth" });
}

function exploreDeals() : void {
    (<HTMLDivElement> document.querySelector(".deals .deal-card"))
        ?.scrollIntoView({ behavior: "smooth" });
}

function openAccount() : void {
    window.location.href = "../.././WebSite-Root/documents/account.html";
}

function showProduct(this: HTMLButtonElement, e: Event) : void {
    e.preventDefault();
    
    const productId: number = Number(this.name);
    
    window.location.href = `../../../../.././OnlineStore/Front-End/WebSite-Root/documents/product-page.html?id=${encodeURIComponent(productId)}`;
}

function addProductToCart(e: Event) : void {
    if (e.target === null) return;
    
    const eventTargetAsButtenElm = <HTMLButtonElement> e.target;
    
    const card = <HTMLButtonElement> eventTargetAsButtenElm.closest(".product-card, .deal-card");
    if (card === null) return;
    
    const titleHeadingElm: HTMLHeadingElement = <HTMLHeadingElement> card.querySelector("h3, h4");
    const priceDivElm = <HTMLDivElement> card.querySelector(".price");
    const productImage_ImageElm = <HTMLImageElement> card.querySelector("img");
    
    let title: string = titleHeadingElm.textContent ?? "";
    const priceAsText: string = priceDivElm?.innerText ?? "0";
    const price: number = parseFloat(priceAsText.replace(/[^\d.]/g, "")) || 0;
    
    const productImagePath: string = productImage_ImageElm 
        ? <string> productImage_ImageElm.getAttribute("src") : ""; 
    
    const existingProduct = cart.find(p => p.name === title && p.imagePath === productImagePath);
    if (existingProduct) {
        existingProduct.quantity += (existingProduct.quantity || 1)+ 1;
    }
    else {
        const newCartProduct: CartProduct = {
            name: title,
            price: price,
            quantity: 1,
            imagePath: productImagePath
        }
        cart.push(newCartProduct);
    }
    
    updateCart();
}

function updateCart() : void {
    const items = <HTMLUListElement> document.getElementById("cart-items");
    items.innerHTML = "";
    let total: number = 0;
    
    
    let titleDiv: HTMLDivElement;
    let containerPriceDiv: HTMLDivElement;
    let priceDiv: HTMLDivElement;
    let removeItemBtn: HTMLButtonElement;
    
    cart.forEach((item: CartProduct, i: number) => {
        total += item.price;
        let new_ListItem: HTMLLIElement = document.createElement("li");
        
        titleDiv = document.createElement("div");
        titleDiv.innerHTML = item.name;
        
        containerPriceDiv = document.createElement("div");
        // "display:flex;gap:8px;align-items:center"
        containerPriceDiv.style.display = "flex";
        containerPriceDiv.style.gap = "8px";
        containerPriceDiv.style.alignItems = "center";
        
        priceDiv = document.createElement("div");
        priceDiv.innerText = item.price.toString();
        
        removeItemBtn = document.createElement("button");
        removeItemBtn.innerHTML = "x";
        // removeItemBtn.addEventListener("click", () => removeItemFromCart.bind(i));
        removeItemBtn.onclick = () => {removeItemFromCart(i)};
        // background:transparent;border:none;color:var(--neon);cursor:pointer"
        removeItemBtn.style.background = "transparent";
        removeItemBtn.style.border = "none";
        removeItemBtn.style.color = "var(--neon)";
        removeItemBtn.style.cursor = "pointer";
        
        containerPriceDiv.appendChild(priceDiv);
        containerPriceDiv.appendChild(removeItemBtn);
        
        new_ListItem.appendChild(titleDiv);
        new_ListItem.appendChild(containerPriceDiv);
        
      //   new_ListItem.innerHTML = `
      // <div>${item.title}</div>
      // <div style="display:flex;gap:8px;align-items:center">
      //   <div>${item.price}</div>
      //   <button onclick="removeItemFromCart(${i})" style="background:transparent;border:none;color:var(--neon);cursor:pointer">✕</button>
      // </div>`;
        
        items.appendChild(new_ListItem);
    });

    (<HTMLSpanElement> document.getElementById("cart-count-span"))
        .innerHTML = cart.length.toString();

    (<HTMLSpanElement>document.getElementById("cart-total"))
        .innerText = total.toLocaleString();
}

function removeItemFromCart(index: number) : void {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() : void {
    (<HTMLElement>document.getElementById("cart-panel"))
        .classList.toggle("open");
}

function checkout() : void {
    if (cart.length === 0) alert("Cart is empty");
    else alert("Proceed to checkout (demo)");
}
