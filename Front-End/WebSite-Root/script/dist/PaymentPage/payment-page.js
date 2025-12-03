import { OrderItem } from "../DataTypes/OrderItem";
const orderItems = [
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
let shippingCost = 0;
let couponDiscount = 0;
document.addEventListener("DOMContentLoaded", OnDocumentContentLoaded);
function OnDocumentContentLoaded() {
    var _a, _b, _c, _d, _e;
    renderOrderItems();
    const indexOfHeader_LeftDivElm = 0, indexOfLogoDivElm = 0;
    (_e = (_d = (_c = (_b = (_a = document.querySelector("header")) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b.item(indexOfHeader_LeftDivElm)) === null || _c === void 0 ? void 0 : _c.children) === null || _d === void 0 ? void 0 : _d.item(indexOfLogoDivElm)) === null || _e === void 0 ? void 0 : _e.addEventListener("click", goHome);
    document.querySelectorAll('input[name="shipping"]').forEach((input) => {
        input.addEventListener("change", handleShippingChange);
    });
    document.querySelectorAll('input[name="payment"]').forEach((input) => {
        input.addEventListener("change", handlePaymentChange);
    });
    handlePaymentChange();
    const couponBtn = document.getElementById("apply-coupon-btn");
    couponBtn.addEventListener("click", (e) => {
        e.preventDefault();
        handleApplyCoupon();
    });
    const payBtn = document.getElementById("pay-btn");
    payBtn.addEventListener("click", handlePayClick);
}
function goHome() {
    window.location.href = "../.././WebSite-Root/documents/home-page.html";
}
function formatPrice(value) {
    return "$" + value.toFixed(2);
}
function renderOrderItems() {
    const container = document.getElementById("order-items");
    container.innerHTML = "";
    let subtotal = 0;
    orderItems.forEach((item) => {
        const lineTotal = item.price * item.qty;
        subtotal += lineTotal;
        const row = document.createElement("div");
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
function updateTotals(subtotal) {
    const subtotalEl = document.getElementById("subtotal-amount");
    const shippingEl = document.getElementById("shipping-amount");
    const totalEl = document.getElementById("total-amount");
    subtotalEl.textContent = formatPrice(subtotal);
    shippingEl.textContent = shippingCost > 0 ? formatPrice(shippingCost) : "FREE";
    let total = subtotal + shippingCost - couponDiscount;
    if (total < 0)
        total = 0;
    totalEl.textContent = formatPrice(total);
}
function handleShippingChange() {
    const selected = document.querySelector('input[name="shipping"]:checked');
    if (!selected)
        return;
    shippingCost = selected.value === "express" ? 7.99 : 0;
    let subtotal = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    updateTotals(subtotal);
}
function handlePaymentChange() {
    const selected = document.querySelector('input[name="payment"]:checked');
    const cardDetails = document.getElementById("card-details");
    if (!selected)
        return;
    if (selected.value === "card") {
        cardDetails.style.display = "block";
    }
    else {
        cardDetails.style.display = "none";
    }
}
function showToast(message) {
    const toast = document.getElementById("toast");
    const msg = document.getElementById("toast-message");
    msg.textContent = message;
    toast.classList.remove("hidden");
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 2800);
}
function handleApplyCoupon() {
    const input = document.getElementById("coupon-input");
    const code = input.value.trim().toUpperCase();
    if (!code) {
        showToast("Enter a coupon code first.");
        return;
    }
    if (code === "FOX10") {
        couponDiscount = 10;
        showToast("Coupon applied: -$10.00");
    }
    else if (code === "NEON5") {
        couponDiscount = 5;
        showToast("Coupon applied: -$5.00");
    }
    else {
        couponDiscount = 0;
        showToast("Invalid coupon code.");
    }
    let subtotal = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    updateTotals(subtotal);
}
function validateForm() {
    const requiredIds = [
        "email",
        "phone",
        "first-name",
        "last-name",
        "address",
        "city",
    ];
    let inputElm;
    for (const id of requiredIds) {
        inputElm = document.getElementById(id);
        if (!inputElm || !inputElm.value.trim()) {
            showToast("Please fill all required fields.");
            inputElm && inputElm.focus();
            return false;
        }
    }
    const paymentSelected = document.querySelector('input[name="payment"]:checked');
    if (!paymentSelected) {
        showToast("Please select a payment method.");
        return false;
    }
    if (paymentSelected.value === "card") {
        const cardFields = ["card-number", "card-exp", "card-cvv", "card-name"];
        for (const id of cardFields) {
            inputElm = document.getElementById(id);
            if (!inputElm || !inputElm.value.trim()) {
                showToast("Please fill your card details.");
                inputElm && inputElm.focus();
                return false;
            }
        }
    }
    return true;
}
function handlePayClick(e) {
    e.preventDefault();
    if (!validateForm())
        return;
    const paymentSelected = document.querySelector('input[name="payment"]:checked');
    const method = paymentSelected ? paymentSelected.value : "unknown";
    if (method === "cod") {
        showToast("Order placed! Pay cash on delivery. 🦊");
    }
    else {
        showToast("Payment simulated successfully. Thank you! 💳");
    }
}
//# sourceMappingURL=payment-page.js.map