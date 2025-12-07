import {OrderItem} from "../DataTypes/OrderItem";

// Simple demo data for order items.
// Later you can replace this with real cart data from your main site.
const orderItems: OrderItem[] = [
    {
        name: "Fox Plush Toy",
        qty: 1,
        price: 19.99,
        emoji: "🦊",
        variant: "Orange / Medium",
    },
    {
        name: "Neon Fox Pillow",
        qty: 2,
        price: 14.5,
        emoji: "✨",
        variant: "Glow Edition",
    },
];

let shippingCost: number = 0;
let couponDiscount: number = 0;

document.addEventListener("DOMContentLoaded", OnDocumentContentLoaded);

function OnDocumentContentLoaded() {
    // Render order items
    renderOrderItems();

    const indexOfHeader_LeftDivElm = 0, indexOfLogoDivElm = 0;
    document.querySelector("header")
        ?.children?.item(indexOfHeader_LeftDivElm)
        ?.children?.item(indexOfLogoDivElm)
        ?.addEventListener("click", goHome);

    // Shipping change
    document.querySelectorAll('input[name="shipping"]').forEach((input) => {
        input.addEventListener("change", handleShippingChange);
    });

    // Payment change
    document.querySelectorAll('input[name="payment"]').forEach((input) => {
        input.addEventListener("change", handlePaymentChange);
    });
    handlePaymentChange(); // set initial state

    // Coupon
    (<HTMLButtonElement> document.getElementById("apply-coupon-btn"))
        ?.addEventListener("click", (e) => {
            e.preventDefault();
            handleApplyCoupon();
        });

    // Pay button
    (<HTMLButtonElement> document.getElementById("pay-btn"))
        ?.addEventListener("click", handlePayClick);
    
    // Remove this method after done it work to clean some memory space and plus speed up.
    document.removeEventListener("DOMContentLoaded", OnDocumentContentLoaded);
}

function goHome(): void {
    // Go back to your main homepage
    window.location.href = "../.././WebSite-Root/documents/home-page.html";
}

function formatPrice(value: number): string {
    return "$" + value.toFixed(2);
}

function renderOrderItems() {
    const container = <HTMLDivElement> document.getElementById("order-items");
    container.innerHTML = "";

    let subtotal: number = 0;

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
        const empty: HTMLDivElement = document.createElement("div");
        empty.className = "order-empty";
        empty.textContent = "Your cart is empty.";
        container.appendChild(empty);
        updateTotals(0);
        return;
    }

    orderItems.forEach((item: OrderItem) => {
        const lineTotal: number = item.price * item.qty;
        subtotal += lineTotal;

        const row: HTMLDivElement = document.createElement("div");
        row.className = "order-item-row";
        row.innerHTML = `
      <div class="order-thumb">${item.emoji}</div>
      <div class="order-main">
        <div class="order-title">${item.name}</div>
        <div class="order-meta">
          Qty: ${item.qty} • ${item.variant || ""}
        </div>
      </div>
      <div class="order-price">${formatPrice(lineTotal)}</div>
    `;

        container.appendChild(row);
    });

    updateTotals(subtotal);
}

function updateTotals(subtotal: number): void {
    const subtotalEl = <HTMLElement> document.getElementById("subtotal-amount");
    const shippingEl = <HTMLElement> document.getElementById("shipping-amount");
    const totalEl = <HTMLElement> document.getElementById("total-amount");

    subtotalEl.textContent = formatPrice(subtotal);
    shippingEl.textContent = shippingCost > 0 ? formatPrice(shippingCost) : "FREE";

    let total: number = subtotal + shippingCost - couponDiscount;
    if (total < 0) total = 0;

    totalEl.textContent = formatPrice(total);
}

function handleShippingChange(): void {
    const selected = <HTMLInputElement> document.querySelector('input[name="shipping"]:checked');
    if (!selected) return;

    // if (selected.value === "standard") {
    //     shippingCost = 0;
    // } else if (selected.value === "express") {
    //     shippingCost = 7.99;
    // } else {
    //     shippingCost = 0;
    // }
    
    shippingCost = selected.value === "express" ? 7.99 : 0;

    // Recompute totals
    let subtotal = orderItems.reduce((sum: number, item: OrderItem) => sum + item.price * item.qty, 0);
    
    updateTotals(subtotal);
}

function handlePaymentChange(): void {
    const selected = <HTMLInputElement> document.querySelector('input[name="payment"]:checked');
    const cardDetails = <HTMLDivElement> document.getElementById("card-details");

    if (!selected) {
        cardDetails.style.display = "none";
        return;
    }

    if (selected.value === "card") {
        cardDetails.style.display = "block";
    } else {
        cardDetails.style.display = "none";
    }
}

function showToast(message: string): void {
    const toast = <HTMLDivElement> document.getElementById("toast");
    const msg = <HTMLSpanElement> document.getElementById("toast-message");

    msg.textContent = message;
    toast.classList.remove("hidden");

    setTimeout(function addHiddenToClassOf_toast_DivElm() {
        toast.classList.add("hidden");
    }, 2800);
}

function handleApplyCoupon(): void {
    const input = <HTMLInputElement> document.getElementById("coupon-input");
    const code: string = input.value.trim().toUpperCase();

    if (!code) {
        showToast("Enter a coupon code first.");
        return;
    }

    // Example coupons – you can change these
    if (code === "FOX10") {
        couponDiscount = 10;
        showToast("Coupon applied: -$10.00");
    } else if (code === "NEON5") {
        couponDiscount = 5;
        showToast("Coupon applied: -$5.00");
    } else {
        couponDiscount = 0;
        showToast("Invalid coupon code.");
    }

    let subtotal: number = Array.isArray(orderItems) 
        ? orderItems.reduce((sum, item) => sum + item.price * item.qty, 0)
        : 0;
    
    updateTotals(subtotal);
}

function validateForm(): boolean {
    // Very simple front-end validation
    const requiredIds = [
        "email",
        "phone",
        "first-name",
        "last-name",
        "address",
        "city",
    ];

    let inputElm: HTMLInputElement;
    
    for (const id of requiredIds) {
        inputElm = <HTMLInputElement> document.getElementById(id);
        
        if (!inputElm || !inputElm.value.trim()) {
            showToast("Please fill all required fields.");
            inputElm && inputElm.focus();
            return false;
        }
    }

    const paymentSelected = <HTMLInputElement> document.querySelector('input[name="payment"]:checked');
    if (!paymentSelected) {
        showToast("Please select a payment method.");
        return false;
    }

    if (paymentSelected.value === "card") {
        const cardFields = ["card-number", "card-exp", "card-cvv", "card-name"];
        
        for (const id of cardFields) {
            inputElm = <HTMLInputElement> document.getElementById(id);
            
            if (!inputElm || !inputElm.value.trim()) {
                showToast("Please fill your card details.");
                inputElm && inputElm.focus();
                return false;
            }
        }
    }

    return true;
}

function handlePayClick(e: Event) {
    e.preventDefault();
    if (!validateForm()) return;

    const paymentSelected = <HTMLInputElement> document.querySelector('input[name="payment"]:checked');
    const method = paymentSelected ? paymentSelected.value : "unknown";

    // Here you would normally send data to your backend.
    // For now we just show a success message.
    if (method === "cod") {
        showToast("Order placed! Pay cash on delivery. 🦊");
    } else {
        showToast("Payment simulated successfully. Thank you! 💳");
    }
}
