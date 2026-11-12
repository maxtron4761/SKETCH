const order = JSON.parse(localStorage.getItem("lastOrder"));

if (!order) {
    document.querySelector(".confirmed__lead").textContent =
        "No recent order details found. Please place an order first.";
} else {

    document.getElementById("guestName").textContent = order.name;
    document.getElementById("guestEmail").textContent = order.email;

    document.getElementById("pickupTime").textContent =
        order.pickupTime;

    const itemsList = document.getElementById("confirmedItems");

    order.items.forEach(item => {
        const li = document.createElement("li");

        const quantity = document.createElement("span");
        quantity.className = "qtybox";
        quantity.textContent = item.quantity;

        const details = document.createElement("div");

        const name = document.createElement("strong");
        name.textContent = item.name;

        details.appendChild(name);

        const amount = document.createElement("b");
        amount.textContent =
            `₹${(item.price * item.quantity).toFixed(2)}`;

        li.append(quantity, details, amount);

        itemsList.appendChild(li);
    });

    document.getElementById("confirmedSubtotal").textContent =
        `₹${order.subtotal.toFixed(2)}`;

    document.getElementById("confirmedGST").textContent =
        `₹${order.gst.toFixed(2)}`;

    document.getElementById("confirmedTotal").textContent =
        `₹${order.total.toFixed(2)}`;
}
