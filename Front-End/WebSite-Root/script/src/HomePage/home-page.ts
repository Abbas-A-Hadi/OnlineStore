const HERO_AUTOPLAY_MS: number = 4000;
let heroIndex : number = 0;
let heroTimer : number | null = null;

let cart: { title: string; price: number; }[] = [];

document.addEventListener("DOMContentLoaded", () => {
    
    document.querySelectorAll(".add-product-btn")
        .forEach(b => (<HTMLButtonElement> b).addEventListener("click", addProductToCart));
    
    document.querySelectorAll(".show-product-btn")
        .forEach(b => (<HTMLButtonElement> b).addEventListener("click", showProduct));
    
    document.getElementById("search-btn")?.addEventListener("click", () => {
        let searchInputElement: HTMLInputElement = 
            <HTMLInputElement> document.getElementById("search-input");
        
        const query: string = searchInputElement.value.toLowerCase();
        
        if (query) alert("Search: " + query);
    });
    
    const indexOfHeaderActionsDivElement: number = 0;
    let headerActionsDivElement = <HTMLDivElement> 
        document.getElementsByClassName("header-actions").item(indexOfHeaderActionsDivElement);
    
    if (headerActionsDivElement !== null) {
        const indexOfOpenAccountButtonElement: number = 0;
        let openAccountBtn = <HTMLButtonElement> 
            headerActionsDivElement.children.item(indexOfOpenAccountButtonElement);
        
        openAccountBtn.addEventListener("click", openAccount);

        const indexOfToggleCartButtonElement: number = 1;
        let toggleCartBtn = <HTMLButtonElement>
            headerActionsDivElement.children.item(indexOfToggleCartButtonElement);
        
        toggleCartBtn.addEventListener("click", toggleCart);
    }
    
    let hero_ctaDivElement = <HTMLDivElement> document.getElementsByClassName("hero-cta").item(0);
    
    if (hero_ctaDivElement !== null) {
        let indexOfCat_ActionDivElement: number = 2;
        let cta_actionsDivElement = <HTMLDivElement> hero_ctaDivElement.children.item(indexOfCat_ActionDivElement);
        
        if (cta_actionsDivElement !== null) {
            let indexOfShopNowButtenElement: number = 0;
            let shopNowBtn = <HTMLButtonElement> cta_actionsDivElement.children.item(indexOfShopNowButtenElement);
            shopNowBtn.addEventListener("click", shopNow);
            
            let indexOfDealsButtenElement: number = 1;
            let dealsBtn = <HTMLButtonElement> cta_actionsDivElement.children.item(indexOfDealsButtenElement);
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
    
    let cart_panelDivElement = <HTMLDivElement> document.getElementById("cart-panel");
    if (cart_panelDivElement !== null) {
        const indexOfCartHeadDivElement: number = 0;
        let cartHeadDivElement = <HTMLDivElement> cart_panelDivElement.children.item(indexOfCartHeadDivElement);
        if (cartHeadDivElement !== null) {
            let closeCartPanelBtn = cartHeadDivElement?.querySelector("button");
            closeCartPanelBtn?.addEventListener("click", toggleCart);
        }
        
        const indexOfCartFootDivElement = 2;
        let cart_footDivElement = <HTMLDivElement> cart_panelDivElement.children.item(indexOfCartFootDivElement);
        
        if (cart_footDivElement !== null) {
            let checkOutButton = cart_footDivElement.querySelector("button");
            checkOutButton?.addEventListener("click", checkout);
        }
    }
    
    startHeroAutoplay();
});

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
    const total = slider.children.length;
    heroIndex = (heroIndex + dir + total) % total;
    slider.style.transform = `translateX(${-heroIndex * 100}%)`;
    stopHeroAutoplay();
    setTimeout(startHeroAutoplay, HERO_AUTOPLAY_MS);
}

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

function showProduct() : void {
    window.location.href = "../.././WebSite-Root/documents/product-page.html";
}

function addProductToCart(e: Event) : void {
    const eventTarget = e.target;
    if (eventTarget === null) return;
    
    const card = <HTMLButtonElement | null> (<HTMLElement> eventTarget).closest(".product-card, .deal-card");
    if (card === null) return;
    
    const titleHeadingElement: HTMLHeadingElement = <HTMLHeadingElement> card.querySelector("h3, h4");
    let title = titleHeadingElement.textContent ?? "";
    
    const priceDivElement = <HTMLDivElement> card.querySelector(".price");
    const priceAsText = priceDivElement.innerText || "0";
    const price = parseFloat(priceAsText.replace(/[^\d.]/g, "")) || 0;
    
    cart.push({ title, price });
    updateCart();
}

function updateCart() : void {
    const items = <HTMLUListElement> document.getElementById("cart-items-ul");
    items.innerHTML = "";
    let total: number = 0;
    
    
    let titleDiv: HTMLDivElement;
    let containerPriceDiv: HTMLDivElement;
    let priceDiv: HTMLDivElement;
    let removeItemBtn: HTMLButtonElement;
    
    cart.forEach((item, i: number) => {
        total += item.price;
        let new_ListItem: HTMLLIElement = document.createElement("li");
        
        titleDiv = document.createElement("div");
        titleDiv.innerHTML = item.title;
        
        containerPriceDiv = document.createElement("div");
        // "display:flex;gap:8px;align-items:center"
        containerPriceDiv.style.display = "flex";
        containerPriceDiv.style.gap = "8px";
        containerPriceDiv.style.alignItems = "center";
        
        priceDiv = document.createElement("div");
        priceDiv.innerText = item.price.toString();
        
        removeItemBtn = document.createElement("button");
        removeItemBtn.innerHTML = "x";
        removeItemBtn.addEventListener("click", () => removeItemFromCart);
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

    (<HTMLSpanElement>document.getElementById("cart-total-span"))
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
