document.addEventListener('DOMContentLoaded', function() {
    // Authentication System
    const authButton = document.getElementById('authButton');
    const userProfile = document.getElementById('userProfile');
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    function updateAuthUI() {
        if (isLoggedIn) {
            authButton.style.display = 'none';
            userProfile.style.display = 'flex';
        } else {
            authButton.style.display = 'block';
            userProfile.style.display = 'none';
        }
    }

    authButton.addEventListener('click', function() {
        isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        updateAuthUI();
    });

    userProfile.addEventListener('click', function() {
        isLoggedIn = false;
        localStorage.setItem('isLoggedIn', 'false');
        updateAuthUI();
    });

    updateAuthUI();

    // Cart Functionality
    const cartItemsContainer = document.querySelector('.cart-items');
    const quantityElements = document.querySelectorAll('.quantity');
    const priceElements = document.querySelectorAll('.cart-item-price .price');
    const removeButtons = document.querySelectorAll('.remove-item');
    const subtotalElement = document.querySelector('.summary-row:nth-child(1) span:last-child');
    const itemCountElement = document.querySelector('.summary-row:nth-child(1) span:first-child');
    const totalElement = document.querySelector('.summary-row.total span:last-child');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // Update quantity
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.cart-item');
            const quantityElement = item.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            
            if (this.classList.contains('plus')) {
                quantity++;
            } else if (this.classList.contains('minus') && quantity > 1) {
                quantity--;
            }
            
            quantityElement.textContent = quantity;
            updateItemPrice(item);
            updateCartTotals();
        });
    });

    // Remove item
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.cart-item');
            item.classList.add('removing');
            
            setTimeout(() => {
                item.remove();
                updateCartTotals();
                checkEmptyCart();
            }, 300);
        });
    });

    // Calculate item price based on quantity and size
    function updateItemPrice(item) {
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        const basePrice = parseFloat(item.dataset.basePrice);
        const sizeText = item.querySelector('.item-size').textContent;
        const sizeSurcharge = parseInt(sizeText.match(/\+(\d+)/)[1]) || 0;
        const totalPrice = (basePrice + sizeSurcharge) * quantity;
        
        item.querySelector('.price').textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Update cart totals
    function updateCartTotals() {
        let subtotal = 0;
        let itemCount = 0;
        
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
            subtotal += price;
            itemCount += parseInt(item.querySelector('.quantity').textContent);
        });
        
        const shipping = 5.00;
        const taxRate = 0.08;
        const tax = subtotal * taxRate;
        const total = subtotal + shipping + tax;
        
        itemCountElement.textContent = `Subtotal (${itemCount} ${itemCount === 1 ? 'item' : 'items'})`;
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.summary-row:nth-child(2) span:last-child').textContent = `$${shipping.toFixed(2)}`;
        document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = `$${tax.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Check if cart is empty
    function checkEmptyCart() {
        const items = document.querySelectorAll('.cart-item');
        if (items.length === 0) {
            const emptyCartHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <p class="cart-empty-message">Your cart is empty</p>
                    <a href="products.html" class="button">Browse Products</a>
                </div>
            `;
            cartItemsContainer.innerHTML = emptyCartHTML;
            document.querySelector('.cart-summary').style.display = 'none';
        }
    }

    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (document.querySelectorAll('.cart-item').length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        if (!isLoggedIn) {
            alert('Please login to proceed to checkout');
            return;
        }
        
        // In a real app, this would redirect to checkout page
        alert('Proceeding to checkout...');
    });

    // Initialize
    document.querySelectorAll('.cart-item').forEach(item => updateItemPrice(item));
    updateCartTotals();
});