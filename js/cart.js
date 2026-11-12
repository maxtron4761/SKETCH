let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const subtotalElement = document.getElementById("cartSubtotal");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    document.querySelectorAll(".cart-pill__count").forEach(element => {
        element.textContent = totalItems;
    });
}

function displayCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        emptyCart.style.display = "block";
    } else {
        emptyCart.style.display = "none";
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const article = document.createElement("article");
        article.className = "cart-item";

        const info = document.createElement("div");
        info.className = "cart-item__info";

        const name = document.createElement("h2");
        name.textContent = item.name;

        info.appendChild(name);

        const controls = document.createElement("div");
        controls.className = "cart-item__controls";

        const quantity = document.createElement("div");
        quantity.className = "qty";

        const decrease = document.createElement("button");
        decrease.className = "qty__btn";
        decrease.textContent = "−";
        decrease.type = "button";
        decrease.setAttribute("aria-label", "Decrease quantity");

        const quantityValue = document.createElement("span");
        quantityValue.className = "qty__value";
        quantityValue.textContent = item.quantity;

        const increase = document.createElement("button");
        increase.className = "qty__btn";
        increase.textContent = "+";
        increase.type = "button";
        increase.setAttribute("aria-label", "Increase quantity");

        decrease.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart.splice(index, 1);
            }

            saveCart();
            displayCart();
        });

        increase.addEventListener("click", () => {
            item.quantity++;
            saveCart();
            displayCart();
        });

        quantity.append(decrease, quantityValue, increase);

        const total = document.createElement("span");
        total.className = "cart-item__total";
        total.textContent = `₹${itemTotal.toFixed(2)}`;

        const remove = document.createElement("button");
        remove.className = "cart-item__remove";
        remove.textContent = "×";
        remove.type = "button";
        remove.setAttribute("aria-label", "Remove item");

        remove.addEventListener("click", () => {
            cart.splice(index, 1);
            saveCart();
            displayCart();
        });

        controls.append(quantity, total, remove);
        article.append(info, controls);

        cartItems.appendChild(article);
    });

    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;

    updateCartCount();
}

displayCart();