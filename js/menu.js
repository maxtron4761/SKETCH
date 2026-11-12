// Get cart data from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in the header
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.querySelectorAll(".cart-pill__count").forEach(count => {
        count.textContent = totalItems;
    });
}

// Add buttons to all menu items
document.querySelectorAll(".menu-item").forEach(item => {
    const name = item.querySelector(".menu-item__name").textContent.trim();

    const priceText = item.querySelector(".menu-item__price").textContent;
    const price = parseFloat(priceText.replace(/[^\d.]/g, ""));

    const button = document.createElement("button");

    button.textContent = "Add to Cart";
    button.className = "add-cart-btn";
    button.type = "button";

    item.appendChild(button);

    button.addEventListener("click", function() {
        const existingItem = cart.find(product => product.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        button.textContent = "Added!";
        
        setTimeout(() => {
            button.textContent = "Add to Cart";
        }, 1000);
    });
});

// Show correct cart count when page loads
updateCartCount();