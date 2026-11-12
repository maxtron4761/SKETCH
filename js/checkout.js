let cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkoutItems");
const checkoutCount = document.getElementById("checkoutCount");
const subtotalElement = document.getElementById("checkoutSubtotal");
const gstElement = document.getElementById("checkoutGST");
const totalElement = document.getElementById("checkoutTotal");
const placeOrderBtn = document.getElementById("placeOrderBtn");

function displayCheckout() {

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {
        alert("Your cart is empty! Please add items first.");
        window.location.href = "menu.html";
        return;
    }

    let subtotal = 0;
    let totalQuantity = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        subtotal += itemTotal;
        totalQuantity += item.quantity;

        const li = document.createElement("li");
        li.className = "order-item";

        const details = document.createElement("div");

        const row = document.createElement("div");
        row.className = "order-item__row";

        const name = document.createElement("span");
        name.textContent = item.name;

        const price = document.createElement("span");
        price.textContent = `₹${itemTotal.toFixed(2)}`;

        const description = document.createElement("p");
        description.textContent =
            `Qty: ${item.quantity} • ₹${item.price} each`;

        row.append(name, price);
        details.append(row, description);
        li.appendChild(details);

        checkoutItems.appendChild(li);
    });

    const gst = subtotal * 0.05;
    const total = subtotal + gst;

    checkoutCount.textContent = `${totalQuantity} Items`;
    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    gstElement.textContent = `₹${gst.toFixed(2)}`;
    totalElement.textContent = `₹${total.toFixed(2)}`;

    placeOrderBtn.textContent =
        `Place Order — ₹${total.toFixed(2)}`;

    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    document.querySelectorAll(".cart-pill__count").forEach(element => {
        element.textContent = count;
    });
}

// Handle checkout form submission

document.getElementById("checkoutForm").addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const firstName = document.getElementById("fn").value.trim();
        const lastName = document.getElementById("ln").value.trim();
        const email = document.getElementById("ce").value.trim();
        const phone = document.getElementById("ph").value.trim();

        const pickupTime = document.querySelector(
            'input[name="pickup"]:checked'
        ).value;

        const subtotal = cart.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );

        const gst = subtotal * 0.05;
        const total = subtotal + gst;

        const orderData = {
            name: `${firstName} ${lastName}`,
            email: email,
            phone: phone,
            address: "BML Munjal University",
            pickupTime: pickupTime,
            items: cart,
            subtotal: subtotal,
            gst: gst,
            total: total
        };

        placeOrderBtn.disabled = true;
        placeOrderBtn.textContent = "Placing Order...";

        try {

            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Order failed.");
            }

            localStorage.setItem("lastOrder", JSON.stringify(orderData));

localStorage.removeItem("cart");

window.location.href = "order-confirmed.html";

        } catch (error) {

            const message = document.getElementById("checkoutMessage");

            message.textContent = error.message;
            message.style.color = "red";

            placeOrderBtn.disabled = false;
            displayCheckout();

            console.error(error);
        }
    }
);
// Update selected pickup time styling
const pickupOptions = document.querySelectorAll(".pill");

pickupOptions.forEach(option => {
    option.addEventListener("change", function() {
        pickupOptions.forEach(pill => {
            pill.classList.remove("is-selected");
        });

        this.classList.add("is-selected");
    });
});
displayCheckout();