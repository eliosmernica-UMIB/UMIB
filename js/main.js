/*
    STUDENT INITIALS: EM
    FILE: js/main.js
    DESCRIPTION: Handles Shopping Cart, Rental Calculation, Checkout, and UI Enhancements
    VERSION: 1.0.0
*/

// --- 1. SHOPPING CART LOGIC ---

// Get cart from LocalStorage or create empty array
let emCart = JSON.parse(localStorage.getItem('emCart')) || [];

// Function to update the badge number in Navbar
function emUpdateBadge() {
    // Reload cart from localStorage to get latest data
    emCart = JSON.parse(localStorage.getItem('emCart')) || [];
    const badge = document.getElementById('em-cart-count');
    if (badge) {
        const count = emCart.reduce((total, item) => total + item.quantity, 0);
        badge.innerText = count;
        
        // Add animation when count changes
        badge.classList.add('em-badge-pulse');
        setTimeout(() => badge.classList.remove('em-badge-pulse'), 300);
    }
}

// Function to Add Item to Cart with improved UX
function emAddToCart(id, name, price, image, type) {
    // Check if item exists
    let existingItem = emCart.find(item => item.id === id && item.type === type);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        emCart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            type: type,
            quantity: 1,
            rentDays: 0
        });
    }

    // Save to LocalStorage
    localStorage.setItem('emCart', JSON.stringify(emCart));
    
    // Update UI
    emUpdateBadge();
    
    // Show toast notification instead of alert
    emShowToast('success', `${name} added to your cart!`);
}

// Toast notification function
function emShowToast(arg1, arg2) {
    // Handle both parameter orders: (type, message) and (message, type)
    let type, message;
    if (arg1 === 'success' || arg1 === 'error' || arg1 === 'info' || arg1 === 'warning') {
        type = arg1;
        message = arg2;
    } else {
        message = arg1;
        type = arg2 || 'info';
    }
    
    // Remove existing toast if any
    const existingToast = document.querySelector('.em-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `em-toast em-toast-${type}`;
    
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    
    toast.innerHTML = `
        <span class="em-toast-icon">${icon}</span>
        <span class="em-toast-message">${message}</span>
        <button class="em-toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('em-toast-show'), 10);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove('em-toast-show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// --- UTILITY FUNCTIONS ---

// Debounce function for performance optimization
function emDebounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function emThrottle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format currency with locale
function emFormatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// --- INPUT VALIDATION HELPERS ---

// Validate email format
function emValidateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone number (US format)
function emValidatePhone(phone) {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
}

// Sanitize input to prevent XSS
function emSanitizeInput(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Validate required field
function emValidateRequired(value) {
    return value !== null && value !== undefined && value.trim() !== '';
}

// Add toast styles dynamically
function emAddToastStyles() {
    if (document.getElementById('em-toast-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'em-toast-styles';
    style.textContent = `
        .em-toast {
            position: fixed;
            bottom: 30px;
            right: 30px;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 24px;
            background: #1a1a1a;
            color: #fff;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            max-width: 400px;
        }
        .em-toast-show {
            transform: translateX(0);
        }
        .em-toast-success {
            border-left: 4px solid #28a745;
        }
        .em-toast-error {
            border-left: 4px solid #dc3545;
        }
        .em-toast-info {
            border-left: 4px solid #ffd700;
        }
        .em-toast-icon {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
        }
        .em-toast-success .em-toast-icon {
            background: #28a745;
        }
        .em-toast-error .em-toast-icon {
            background: #dc3545;
        }
        .em-toast-info .em-toast-icon {
            background: #ffd700;
            color: #000;
        }
        .em-toast-message {
            flex: 1;
            font-size: 0.95rem;
        }
        .em-toast-close {
            background: none;
            border: none;
            color: #888;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        .em-toast-close:hover {
            color: #fff;
        }
        .em-badge-pulse {
            animation: badge-pulse 0.3s ease;
        }
        @keyframes badge-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }
        @media (max-width: 576px) {
            .em-toast {
                left: 15px;
                right: 15px;
                bottom: 15px;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// --- 2. RENTAL CALCULATOR (Real-time) ---
function emInitRentalCalc() {
    const startInput = document.getElementById('em-start-date');
    const endInput = document.getElementById('em-end-date');
    const display = document.getElementById('em-price-display');
    const dailyRate = 1200;

    if (startInput && endInput && display) {
        const calculate = () => {
            const start = new Date(startInput.value);
            const end = new Date(endInput.value);
            
            if (start && end && end > start) {
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                const total = diffDays * dailyRate;
                
                display.innerHTML = `
                    <div class="em-price-breakdown">
                        <span class="em-days-count">${diffDays} days</span>
                        <span class="em-total-price">$${total.toLocaleString()}</span>
                    </div>
                `;
                
                const rentBtn = document.getElementById('em-rent-btn');
                if (rentBtn) {
                    rentBtn.onclick = function() {
                        emAddToCart('r1', 'Rental Service', total, 'img/rent-car.jpg', 'Rental');
                    };
                }
            } else {
                display.innerHTML = '<span class="text-muted">Please select valid dates</span>';
            }
        };

        startInput.addEventListener('change', calculate);
        endInput.addEventListener('change', calculate);
    }
}

// --- 3. CHECKOUT PAGE LOGIC ---
function emRenderCheckout() {
    const tableBody = document.getElementById('em-checkout-body');
    const totalDisplay = document.getElementById('em-final-total');

    if (tableBody) {
        tableBody.innerHTML = '';
        let grandTotal = 0;

        if (emCart.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center py-5">
                        <div class="em-empty-cart">
                            <i class="bi bi-cart-x" style="font-size: 3rem; color: #ddd;"></i>
                            <h5 class="mt-3">Your cart is empty</h5>
                            <p class="text-muted">Start shopping to add items to your cart</p>
                            <a href="inventory.html" class="btn em-btn-primary mt-2">Browse Inventory</a>
                        </div>
                    </td>
                </tr>
            `;
        } else {
            emCart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                grandTotal += itemTotal;

                const row = `
                    <tr class="em-cart-item">
                        <td>
                            <img src="${item.image}" alt="${item.name}" 
                                 style="width: 70px; height: 70px; object-fit: cover; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        </td>
                        <td>
                            <strong style="font-size: 1.05rem;">${item.name}</strong><br>
                            <span class="badge bg-dark">${item.type}</span>
                        </td>
                        <td><strong>$${item.price.toLocaleString()}</strong></td>
                        <td>
                            <div class="em-quantity-control">
                                <button class="em-qty-btn" onclick="emUpdateQuantity(${index}, -1)">−</button>
                                <span class="em-qty-value">${item.quantity}</span>
                                <button class="em-qty-btn" onclick="emUpdateQuantity(${index}, 1)">+</button>
                            </div>
                        </td>
                        <td><strong class="text-success">$${itemTotal.toLocaleString()}</strong></td>
                        <td>
                            <button class="btn btn-sm btn-outline-danger rounded-circle" 
                                    onclick="emRemoveItem(${index})" title="Remove">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }

        if (totalDisplay) {
            totalDisplay.innerText = '$' + grandTotal.toLocaleString();
        }
    }
}

// Update quantity function
function emUpdateQuantity(index, change) {
    if (emCart[index]) {
        emCart[index].quantity += change;
        if (emCart[index].quantity <= 0) {
            emCart.splice(index, 1);
        }
        localStorage.setItem('emCart', JSON.stringify(emCart));
        emRenderCheckout();
        emUpdateBadge();
    }
}

function emRemoveItem(index) {
    const itemName = emCart[index]?.name || 'Item';
    emCart.splice(index, 1);
    localStorage.setItem('emCart', JSON.stringify(emCart));
    emRenderCheckout();
    emUpdateBadge();
    emShowToast('info', `${itemName} removed from cart`);
}

function emCheckoutSuccess() {
    if (emCart.length === 0) {
        emShowToast('error', 'Your cart is empty!');
        return;
    }
    
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    document.getElementById('em-success-date').innerText = new Date().toLocaleDateString();
    modal.show();
    
    emCart = [];
    localStorage.setItem('emCart', JSON.stringify(emCart));
    emRenderCheckout();
    emUpdateBadge();
}

// --- 4. USER AUTHENTICATION & NAVIGATION ---

function updateUserNavigation() {
    const user = JSON.parse(localStorage.getItem('emUser'));
    const navSignIn = document.getElementById('navSignIn');
    const navSignUp = document.getElementById('navSignUp');
    const navDashboardItem = document.getElementById('navDashboardItem');
    const navLogoutItem = document.getElementById('navLogoutItem');
    const userNavLink = document.getElementById('userNavLink');
    
    if (user) {
        if (navSignIn) navSignIn.parentElement.classList.add('d-none');
        if (navSignUp) navSignUp.parentElement.classList.add('d-none');
        if (navDashboardItem) navDashboardItem.classList.remove('d-none');
        if (navLogoutItem) navLogoutItem.classList.remove('d-none');
        
        if (userNavLink) {
            const name = user.name || user.firstName || 'Account';
            const avatar = user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ffd700&color=000&size=32`;
            userNavLink.innerHTML = `
                <img src="${avatar}" alt="User" 
                     style="width:26px;height:26px;border-radius:50%;margin-right:6px;border:2px solid #ffd700;"> 
                ${name.split(' ')[0]}
            `;
        }
    } else {
        if (navSignIn) navSignIn.parentElement.classList.remove('d-none');
        if (navSignUp) navSignUp.parentElement.classList.remove('d-none');
        if (navDashboardItem) navDashboardItem.classList.add('d-none');
        if (navLogoutItem) navLogoutItem.classList.add('d-none');
        
        if (userNavLink) {
            userNavLink.innerHTML = '<i class="bi bi-person-circle"></i> Account';
        }
    }
}

function logout() {
    localStorage.removeItem('emUser');
    localStorage.removeItem('emToken');
    updateUserNavigation();
    emShowToast('success', 'You have been logged out');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// --- 5. NAVBAR SCROLL EFFECT ---
function initNavbarScroll() {
    const navbar = document.querySelector('.em-navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// --- 6. SMOOTH SCROLL FOR ANCHOR LINKS ---
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// --- 7. ANIMATE ON SCROLL (Simple implementation) ---
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.em-animate-on-scroll');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('em-animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
}

// --- 8. WISHLIST FUNCTIONALITY ---
let emWishlist = JSON.parse(localStorage.getItem('emWishlist')) || [];

// Toggle item in wishlist
function emToggleWishlist(id, name, price, image, type) {
    const index = emWishlist.findIndex(item => item.id === id && item.type === type);
    
    if (index > -1) {
        // Remove from wishlist
        emWishlist.splice(index, 1);
        emShowToast('info', `${name} removed from wishlist`);
    } else {
        // Add to wishlist
        emWishlist.push({
            id: id,
            name: name,
            price: price,
            image: image,
            type: type,
            addedAt: new Date().toISOString()
        });
        emShowToast('success', `${name} added to wishlist!`);
    }
    
    // Save to localStorage
    localStorage.setItem('emWishlist', JSON.stringify(emWishlist));
    
    // Update heart icon
    emUpdateWishlistIcons();
}

// Check if item is in wishlist
function emIsInWishlist(id, type) {
    return emWishlist.some(item => item.id === id && item.type === type);
}

// Update all wishlist heart icons on the page
function emUpdateWishlistIcons() {
    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
        const id = parseInt(btn.dataset.wishlistId);
        const type = btn.dataset.wishlistType || 'car';
        const icon = btn.querySelector('i');
        
        if (emIsInWishlist(id, type)) {
            btn.classList.add('em-wishlisted');
            if (icon) {
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill');
            }
        } else {
            btn.classList.remove('em-wishlisted');
            if (icon) {
                icon.classList.remove('bi-heart-fill');
                icon.classList.add('bi-heart');
            }
        }
    });
}

// Add wishlist button styles
function emAddWishlistStyles() {
    if (document.getElementById('em-wishlist-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'em-wishlist-styles';
    style.textContent = `
        .em-wishlist-btn {
            position: absolute;
            top: 12px;
            right: 12px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.95);
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }
        .em-wishlist-btn i {
            font-size: 1.2rem;
            color: #666;
            transition: all 0.3s ease;
        }
        .em-wishlist-btn:hover {
            transform: scale(1.1);
            background: #fff;
        }
        .em-wishlist-btn:hover i {
            color: #ef4444;
        }
        .em-wishlist-btn.em-wishlisted i {
            color: #ef4444;
        }
        .em-wishlist-btn.em-wishlisted:hover {
            background: #fef2f2;
        }
        @keyframes heart-pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }
        .em-wishlist-btn.em-wishlisted i {
            animation: heart-pop 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// --- INITIALIZE ---
document.addEventListener('DOMContentLoaded', () => {
    emAddToastStyles();
    emAddWishlistStyles();
    emUpdateBadge();
    emInitRentalCalc();
    emRenderCheckout();
    updateUserNavigation();
    initNavbarScroll();
    initSmoothScroll();
    initScrollAnimations();
    emUpdateWishlistIcons();
});