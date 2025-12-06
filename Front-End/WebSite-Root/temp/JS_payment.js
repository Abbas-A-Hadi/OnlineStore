const CART_KEY = "alpha_sote_cart";

function getCartItems() {
    try {
        const data = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        if (Array.isArray(data)) return data;
    } catch (e) {}
    return [];
}

let orderItems = getCartItems();

let shippingCost = 0;
let couponDiscount = 0;

function goHome() {
    window.location.href = "../homePage/homePageHtml.html";
}

function formatPrice(value) {
    return "$" + value.toFixed(2);
}

function renderOrderItems() {
    const container = document.getElementById("order-items");
    container.innerHTML = "";

    let subtotal = 0;

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
        const empty = document.createElement("div");
        empty.className = "order-empty";
        empty.textContent = "Your cart is empty.";
        container.appendChild(empty);
        updateTotals(0);
        return;
    }

    orderItems.forEach((item) => {
        const price = typeof item.price === "number" ? item.price : 0;
        subtotal += price;

        const row = document.createElement("div");
        row.className = "order-item-row";
        row.innerHTML = `
      <div class="order-thumb">🛒</div>
      <div class="order-main">
        <div class="order-title">${item.title || ""}</div>
        <div class="order-meta">
          ${formatPrice(price)}
        </div>
      </div>
      <div class="order-price">${formatPrice(price)}</div>
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
    if (total < 0) total = 0;

    totalEl.textContent = formatPrice(total);
}

function handleShippingChange() {
    const selected = document.querySelector('input[name="shipping"]:checked');
    if (!selected) return;

    if (selected.value === "standard") {
        shippingCost = 0;
    } else if (selected.value === "express") {
        shippingCost = 7.99;
    } else {
        shippingCost = 0;
    }

    const subtotal = Array.isArray(orderItems)
        ? orderItems.reduce((sum, item) => {
            const price = typeof item.price === "number" ? item.price : 0;
            return sum + price;
        }, 0)
        : 0;

    updateTotals(subtotal);
}

function handlePaymentChange() {
    const selected = document.querySelector('input[name="payment"]:checked');
    const cardDetails = document.getElementById("card-details");
    if (!cardDetails) return;

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

function showToast(message) {
    const toast = document.getElementById("toast");
    const msg = document.getElementById("toast-message");
    if (!toast || !msg) return;

    msg.textContent = message;
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 2800);
}

function handleApplyCoupon() {
    const input = document.getElementById("coupon-input");
    if (!input) return;

    const code = input.value.trim().toUpperCase();
    if (!code) {
        showToast("Enter a coupon code first.");
        return;
    }

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

    const subtotal = Array.isArray(orderItems)
        ? orderItems.reduce((sum, item) => {
            const price = typeof item.price === "number" ? item.price : 0;
            return sum + price;
        }, 0)
        : 0;

    updateTotals(subtotal);
}

function validateForm() {
    const requiredIds = [
        "email",
        "phone",
        "first-name",
        "last-name",
        "address",
        "city"
    ];

    for (const id of requiredIds) {
        const el = document.getElementById(id);
        if (!el || !el.value.trim()) {
            showToast("Please fill all required fields.");
            if (el) el.focus();
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
            const el = document.getElementById(id);
            if (!el || !el.value.trim()) {
                showToast("Please fill your card details.");
                if (el) el.focus();
                return false;
            }
        }
    }

    return true;
}

function handlePayClick(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const paymentSelected = document.querySelector('input[name="payment"]:checked');
    const method = paymentSelected ? paymentSelected.value : "unknown";

    if (method === "cod") {
        showToast("Order placed! Pay cash on delivery. 🦊");
    } else {
        showToast("Payment simulated successfully. Thank you! 💳");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderOrderItems();

    document.querySelectorAll('input[name="shipping"]').forEach((input) => {
        input.addEventListener("change", handleShippingChange);
    });

    document.querySelectorAll('input[name="payment"]').forEach((input) => {
        input.addEventListener("change", handlePaymentChange);
    });
    handlePaymentChange();

    const couponBtn = document.getElementById("apply-coupon-btn");
    if (couponBtn) {
        couponBtn.addEventListener("click", (e) => {
            e.preventDefault();
            handleApplyCoupon();
        });
    }

    const payBtn = document.getElementById("pay-btn");
    if (payBtn) {
        payBtn.addEventListener("click", handlePayClick);
    }
});
