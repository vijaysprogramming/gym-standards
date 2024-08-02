// checkout.js
document.addEventListener('DOMContentLoaded', () => {
    const checkoutItems = document.getElementById('checkout-items');
    const totalAmountElement = document.getElementById('total-amount');
    const totalAmountButton = document.getElementById('total-amount-button');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCheckout() {
        checkoutItems.innerHTML = '';
        let totalAmount = 0;

        cart.forEach(product => {
            totalAmount += product.price;

            const checkoutItem = document.createElement('li');
            checkoutItem.className = 'list-group-item';
            checkoutItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-item-img">
                ${product.name} - $${product.price.toFixed(2)}
                <button class="btn btn-danger btn-sm float-right remove-from-cart-btn" data-id="${product.id}">Remove</button>
            `;
            checkoutItems.appendChild(checkoutItem);
        });

        totalAmountElement.textContent = totalAmount.toFixed(2);
        totalAmountButton.textContent = totalAmount.toFixed(2);
    }

    checkoutItems.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart-btn')) {
            const productId = event.target.getAttribute('data-id');
            cart = cart.filter(item => item.id != productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCheckout();
        }
    });

    document.getElementById('complete-order-btn').addEventListener('click', () => {
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        alert(`Order completed using ${paymentMethod}. Total Amount: $${totalAmountElement.textContent}`);
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });

    updateCheckout();
});
