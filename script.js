// Cozy Loop Studio LLC - JavaScript

// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartUI();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showToast('Product added to cart!', 'success');
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.showToast('Product removed from cart', 'success');
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.updateCartUI();
        }
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.getTotalItems();
        }

        // Update cart page if on cart page
        this.updateCartPage();
    }

    updateCartPage() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartSummary = document.querySelector('.cart-summary');
        
        if (!cartItemsContainer || !cartSummary) return;

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartSummary.innerHTML = '';
            return;
        }

        // Render cart items
        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-btn" onclick="cart.removeItem('${item.id}')">Remove</button>
            </div>
        `).join('');

        // Render cart summary
        const subtotal = this.getTotalPrice();
        const shipping = subtotal > 0 ? 5.99 : 0;
        const total = subtotal + shipping;

        cartSummary.innerHTML = `
            <h3>Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping:</span>
                <span>$${shipping.toFixed(2)}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button class="btn btn-secondary" style="width: 100%; margin-top: 1rem;" onclick="checkout()">
                Proceed to Checkout
            </button>
        `;
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Product data based on folder structure
const products = [
    {
        id: 'product1',
        name: 'Classic Wool Scarf',
        price: 29.99,
        description: 'Soft and warm classic wool scarf perfect for winter',
        image: 'Sản phẩm 1/main_images/main-image-1.jpeg',
        folder: 'Sản phẩm 1',
        imageCount: 11,
        variants: [
            { id: 'classic-red', name: 'Classic Red', price: 29.99, image: 'main-image-1.jpeg', color: '#DC143C' },
            { id: 'classic-navy', name: 'Navy Blue', price: 29.99, image: 'main-image-2.jpeg', color: '#000080' },
            { id: 'classic-gray', name: 'Charcoal Gray', price: 29.99, image: 'main-image-3.jpeg', color: '#36454F' },
            { id: 'classic-cream', name: 'Warm Cream', price: 29.99, image: 'main-image-4.jpeg', color: '#F5DEB3' }
        ]
    },
    {
        id: 'product2',
        name: 'Elegant Knitted Scarf',
        price: 34.99,
        description: 'Beautifully knitted scarf with elegant patterns',
        image: 'Sản phẩm 2/main_images/main-image-1.jpeg',
        folder: 'Sản phẩm 2',
        imageCount: 15,
        variants: [
            { id: 'knitted-burgundy', name: 'Burgundy', price: 34.99, image: 'main-image-1.jpeg', color: '#800020' },
            { id: 'knitted-forest', name: 'Forest Green', price: 34.99, image: 'main-image-2.jpeg', color: '#228B22' },
            { id: 'knitted-plum', name: 'Plum Purple', price: 34.99, image: 'main-image-3.jpeg', color: '#8B4789' }
        ]
    },
    {
        id: 'product3',
        name: 'Cozy Winter Scarf',
        price: 39.99,
        description: 'Extra warm and cozy scarf for cold winter days',
        image: 'Sản phẩm 3/main_images/main-image-1.jpeg',
        folder: 'Sản phẩm 3',
        imageCount: 17,
        variants: [
            { id: 'winter-thick', name: 'Thick Knit', price: 39.99, image: 'main-image-1.jpeg', color: '#8B4513' },
            { id: 'winter-cable', name: 'Cable Knit', price: 44.99, image: 'main-image-2.jpeg', color: '#A0522D' },
            { id: 'winter-fair', name: 'Fair Isle', price: 49.99, image: 'main-image-3.jpeg', color: '#CD853F' }
        ]
    },
    {
        id: 'product4',
        name: 'Fashion Infinity Scarf',
        price: 24.99,
        description: 'Modern infinity scarf with stylish design',
        image: 'Sản phẩm 4/variant_images/variant-image-1.jpeg',
        folder: 'Sản phẩm 4',
        imageCount: 5,
        imagePrefix: 'variant-image',
        variants: [
            { id: 'infinity-black', name: 'Classic Black', price: 24.99, image: 'variant-image-1.jpeg', color: '#000000' },
            { id: 'infinity-white', name: 'Pure White', price: 24.99, image: 'variant-image-2.jpeg', color: '#FFFFFF' },
            { id: 'infinity-pink', name: 'Soft Pink', price: 24.99, image: 'variant-image-3.jpeg', color: '#FFB6C1' },
            { id: 'infinity-blue', name: 'Sky Blue', price: 24.99, image: 'variant-image-4.jpeg', color: '#87CEEB' }
        ]
    },
    {
        id: 'product5',
        name: 'Luxury Cashmere Scarf',
        price: 59.99,
        description: 'Premium cashmere scarf for ultimate luxury',
        image: 'Sản phẩm 5/main_images/main-image-1.jpeg',
        folder: 'Sản phẩm 5',
        imageCount: 6,
        variants: [
            { id: 'cashmere-beige', name: 'Natural Beige', price: 59.99, image: 'main-image-1.jpeg', color: '#F5F5DC' },
            { id: 'cashmere-charcoal', name: 'Premium Charcoal', price: 59.99, image: 'main-image-2.jpeg', color: '#36454F' },
            { id: 'cashmere-camel', name: 'Camel', price: 69.99, image: 'main-image-3.jpeg', color: '#C19A6B' }
        ]
    },
    {
        id: 'product6',
        name: 'Striped Wool Scarf',
        price: 27.99,
        description: 'Classic striped design wool scarf',
        image: 'Sản phẩm 6/variant_images/variant-image-1.jpeg',
        folder: 'Sản phẩm 6',
        imageCount: 4,
        imagePrefix: 'variant-image',
        variants: [
            { id: 'striped-navy-red', name: 'Navy & Red', price: 27.99, image: 'variant-image-1.jpeg', color: '#000080' },
            { id: 'striped-black-white', name: 'Black & White', price: 27.99, image: 'variant-image-2.jpeg', color: '#000000' },
            { id: 'striped-green-gold', name: 'Green & Gold', price: 27.99, image: 'variant-image-3.jpeg', color: '#228B22' }
        ]
    },
    {
        id: 'product7',
        name: 'Handmade Artisan Scarf',
        price: 44.99,
        description: 'Unique handmade scarf with artisan craftsmanship',
        image: 'Sản phẩm 7/main_images/main-image-1.jpeg',
        folder: 'Sản phẩm 7',
        imageCount: 15,
        variants: [
            { id: 'artisan-rustic', name: 'Rustic Brown', price: 44.99, image: 'main-image-1.jpeg', color: '#8B4513' },
            { id: 'artisan-earthy', name: 'Earth Tones', price: 44.99, image: 'main-image-2.jpeg', color: '#A0522D' },
            { id: 'artisan-sunset', name: 'Sunset Orange', price: 44.99, image: 'main-image-3.jpeg', color: '#FF6347' }
        ]
    },
    {
        id: 'product8',
        name: 'Plaid Winter Scarf',
        price: 32.99,
        description: 'Traditional plaid pattern winter scarf',
        image: 'Sản phẩm 8/main_images/main-image-1.jpeg',
        folder: 'Sản phẩm 8',
        imageCount: 12,
        variants: [
            { id: 'plaid-red-black', name: 'Red & Black', price: 32.99, image: 'main-image-1.jpeg', color: '#DC143C' },
            { id: 'plaid-blue-green', name: 'Blue & Green', price: 32.99, image: 'main-image-2.jpeg', color: '#000080' },
            { id: 'plaid-brown-tan', name: 'Brown & Tan', price: 32.99, image: 'main-image-3.jpeg', color: '#8B4513' }
        ]
    },
    {
        id: 'product9',
        name: 'Lightweight Spring Scarf',
        price: 22.99,
        description: 'Light and breathable scarf for spring weather',
        image: 'Sản phẩm 9/main_images/main-image-1.jpeg',
        folder: 'Sản phẩm 9',
        imageCount: 18,
        variants: [
            { id: 'spring-lavender', name: 'Soft Lavender', price: 22.99, image: 'main-image-1.jpeg', color: '#E6E6FA' },
            { id: 'spring-mint', name: 'Fresh Mint', price: 22.99, image: 'main-image-2.jpeg', color: '#98FF98' },
            { id: 'spring-peach', name: 'Warm Peach', price: 22.99, image: 'main-image-3.jpeg', color: '#FFDAB9' },
            { id: 'spring-baby-blue', name: 'Baby Blue', price: 22.99, image: 'main-image-4.jpeg', color: '#89CFF0' }
        ]
    }
];

// Initialize cart
const cart = new ShoppingCart();

// Search functionality
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    renderProducts(filteredProducts);
}

// Render products on page
function renderProducts(productsToRender = products) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p class="no-products">No products found</p>';
        return;
    }

    productGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card fade-in" onclick="viewProduct('${product.id}')">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="btn" onclick="event.stopPropagation(); addToCart('${product.id}')">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// View product details
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Store product in sessionStorage for detail page
        sessionStorage.setItem('selectedProduct', JSON.stringify(product));
        // Redirect to product detail page
        window.location.href = `product-detail.html?id=${productId}`;
    }
}

// Checkout function
function checkout() {
    if (cart.items.length === 0) {
        cart.showToast('Your cart is empty', 'error');
        return;
    }
    
    cart.showToast('Proceeding to checkout...', 'success');
    // In a real application, this would redirect to a checkout page
    setTimeout(() => {
        alert('Checkout functionality would be implemented here. This is a demo website.');
    }, 1000);
}

// Contact form submission
function submitContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    cart.showToast('Thank you for your message! We will contact you soon.', 'success');
    event.target.reset();
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count on all pages
    cart.updateCartUI();
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchProducts(e.target.value);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProducts(e.target.value);
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchProducts(searchInput.value);
        });
    }
    
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', submitContactForm);
    }
    
    // Render products on products page
    if (document.querySelector('.product-grid')) {
        renderProducts();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll animations
    initScrollAnimations();
    
    // Add header scroll effect
    initHeaderScroll();
    
    // Add parallax effect to hero section
    initParallax();
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Add staggered animation for product cards
                if (entry.target.classList.contains('product-card')) {
                    const cards = document.querySelectorAll('.product-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animationDelay = `${index * 0.1}s`;
                            card.classList.add('fade-in');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .section-title, .feature-item, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Parallax Effect
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = hero.style.backgroundPosition;
        const speed = 0.5;
        
        hero.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Enhanced product rendering with animations
function renderProductsWithAnimation(productsToRender = products) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p class="no-products">No products found</p>';
        return;
    }

    // Clear existing products
    productGrid.innerHTML = '';
    
    // Add products with staggered animation
    productsToRender.forEach((product, index) => {
        setTimeout(() => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card fade-in';
            productCard.style.animationDelay = `${index * 0.1}s`;
            productCard.onclick = () => viewProduct(product.id);
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="btn" onclick="event.stopPropagation(); addToCart('${product.id}')">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            `;
            
            productGrid.appendChild(productCard);
        }, index * 100);
    });
}

// Newsletter subscription function
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // In a real application, this would send the email to a newsletter service
    // For demo purposes, we'll just show a success message
    cart.showToast(`Thank you for subscribing with ${email}!`, 'success');
    
    // Clear the form
    event.target.reset();
    
    // Store in localStorage for demo purposes
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    }
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    if (nav) {
        nav.classList.toggle('mobile-active');
    }
}

// Export for use in other scripts
window.cart = cart;
window.addToCart = addToCart;
window.viewProduct = viewProduct;
window.checkout = checkout;
window.searchProducts = searchProducts;
