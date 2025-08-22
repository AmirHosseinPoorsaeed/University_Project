document.addEventListener('DOMContentLoaded', function() {
    // Authentication System
    const authButton = document.getElementById('authButton');
    const userProfile = document.getElementById('userProfile');
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Initialize auth state
    function updateAuthUI() {
        if (isLoggedIn) {
            authButton.style.display = 'none';
            userProfile.style.display = 'flex';
        } else {
            authButton.style.display = 'block';
            userProfile.style.display = 'none';
        }
    }

    // Toggle login state (for demo)
    authButton.addEventListener('click', function() {
        isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        updateAuthUI();
    });

    // Logout functionality
    userProfile.addEventListener('click', function() {
        isLoggedIn = false;
        localStorage.setItem('isLoggedIn', 'false');
        updateAuthUI();
    });

    // Initialize
    updateAuthUI();

    // Price System
    const priceElement = document.querySelector('.price');
    const sizeSurchargeElement = document.getElementById('sizeSurcharge');
    const prices = {
        1: 10, // Price for product 1
        2: 20, // Price for product 2
        3: 30, // Price for product 3
        4: 40  // Price for product 4
    };
    let currentProductId = 1;
    let selectedSize = null;

    function updatePrice() {
        const basePrice = prices[currentProductId];
        const surcharge = selectedSize ? parseInt(selectedSize.textContent) - 40 : 0;
        const totalPrice = basePrice + surcharge;
        
        priceElement.textContent = `$${totalPrice}`;
        sizeSurchargeElement.textContent = selectedSize ? `+$${surcharge}` : '+$0';
    }

    // Shoe Gallery Functionality
    const icons = document.querySelectorAll('.icon');
    const mainImage = document.querySelector('.shoe-image');
    const carouselImages = document.querySelectorAll('.carousel-image');
    const shoes = [
        { 
            id: 1, 
            mainImage: "1.png",
            gallery: ["1.1.png", "1.2.png", "1.3.png", "1.4.png"]
        },
        { 
            id: 2, 
            mainImage: "2.png",
            gallery: ["2.1.png", "2.2.png", "2.3.png", "2.4.png"]
        },
        { 
            id: 3, 
            mainImage: "3.png",
            gallery: ["3.1.png", "3.2.png", "3.3.png", "3.4.png"]
        },
        { 
            id: 4, 
            mainImage: "4.png",
            gallery: ["4.1.png", "4.2.png", "4.3.png", "4.4.png"]
        }
    ];

    function updateImage(shoeId) {
        currentProductId = shoeId;
        const selectedShoe = shoes.find(shoe => shoe.id == shoeId);
        if (selectedShoe) {
            mainImage.src = selectedShoe.mainImage;
            
            carouselImages.forEach((img, index) => {
                img.src = selectedShoe.gallery[index];
            });
            
            icons.forEach(icon => icon.classList.remove('active'));
            document.querySelector(`[data-shoe="${shoeId}"]`).classList.add('active');
            
            updateCarousel(0);
            updatePrice();
        }
    }

    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const shoeId = parseInt(icon.getAttribute('data-shoe'));
            updateImage(shoeId);
        });
    });

    // Carousel Functionality
    const cards = document.querySelectorAll('.card');
    const dots = document.querySelectorAll('.dot');
    const leftArrow = document.querySelector('.nav-arrow.left');
    const rightArrow = document.querySelector('.nav-arrow.right');
    let currentIndex = 0;
    let isAnimating = false;

    function updateCarousel(newIndex) {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex = (newIndex + cards.length) % cards.length;

        cards.forEach((card, i) => {
            const offset = (i - currentIndex + cards.length) % cards.length;

            card.classList.remove(
                'center',
                'left-1',
                'left-2',
                'right-1',
                'right-2',
                'hidden'
            );

            if (offset === 0) {
                card.classList.add('center');
            } else if (offset === 1) {
                card.classList.add('right-1');
            } else if (offset === 2) {
                card.classList.add('right-2');
            } else if (offset === cards.length - 1) {
                card.classList.add('left-1');
            } else if (offset === cards.length - 2) {
                card.classList.add('left-2');
            } else {
                card.classList.add('hidden');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    leftArrow.addEventListener('click', () => {
        updateCarousel(currentIndex - 1);
    });

    rightArrow.addEventListener('click', () => {
        updateCarousel(currentIndex + 1);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            updateCarousel(i);
        });
    });

    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            updateCarousel(i);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            updateCarousel(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            updateCarousel(currentIndex + 1);
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                updateCarousel(currentIndex + 1);
            } else {
                updateCarousel(currentIndex - 1);
            }
        }
    }

    // Size Selection Functionality
    const sizeOptions = document.querySelectorAll('.size-option');
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedSize = this;
            updatePrice();
        });
    });
    
    // Initialize
    updateImage(1);
    updatePrice();
});