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

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!isLoggedIn) {
                alert('Please login to add items to cart');
                return;
            }
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            // In a real app, this would add to cart in localStorage or send to server
            alert(`Added ${productName} (${productPrice}) to cart`);
            
            // Animation feedback
            this.textContent = 'Added!';
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = '#96d81c';
            }, 2000);
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


});