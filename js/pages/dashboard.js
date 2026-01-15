/* =========================================
   EM Luxury Cars - Dashboard JavaScript
   Uses real data from localStorage
   ========================================= */

// LocalStorage Keys
const STORAGE_KEYS = {
    user: 'emUser',
    cart: 'emCart',
    orders: 'emOrders',
    rentals: 'emRentals',
    wishlist: 'emWishlist',
    cards: 'emCards',
    addresses: 'emAddresses',
    notifications: 'emNotifications',
    preferences: 'emPreferences'
};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadUserData();
    initSidebar();
    initNavigation();
    loadDashboardData();
    initEventListeners();
});

// Check Authentication
function checkAuth() {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.user));
    if (!user) {
        window.location.href = 'signin.html';
        return false;
    }
    return true;
}

// Load User Data
function loadUserData() {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.user));
    if (!user) return;

    const name = user.name || user.firstName || 'User';
    const avatar = user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ffd700&color=000&size=100`;

    // Update all user elements
    const elements = {
        'sidebarAvatar': avatar,
        'sidebarUserName': name,
        'topbarAvatar': avatar,
        'topbarUserName': name.split(' ')[0],
        'welcomeName': name.split(' ')[0],
        'settingsAvatar': avatar,
        'settingsName': user.name || '',
        'settingsEmail': user.email || '',
        'settingsPhone': user.phone || '',
        'settingsDob': user.dob || ''
    };

    for (const [id, value] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) {
            if (el.tagName === 'IMG') {
                el.src = value;
            } else if (el.tagName === 'INPUT') {
                el.value = value;
            } else {
                el.textContent = value;
            }
        }
    }
}

// Initialize Sidebar Toggle
function initSidebar() {
    const sidebar = document.getElementById('emSidebar');
    const menuToggle = document.getElementById('menuToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'em-sidebar-overlay';
    overlay.id = 'sidebarOverlay';
    document.body.appendChild(overlay);

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('show');
            overlay.classList.add('show');
        });
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }

    overlay.addEventListener('click', closeSidebar);

    function closeSidebar() {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
    }
}

// Initialize Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('[data-section]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            showSection(section);
            
            // Update sidebar active state
            document.querySelectorAll('.em-sidebar-nav .nav-link').forEach(l => {
                l.classList.remove('active');
            });
            const sidebarLink = document.querySelector(`.em-sidebar-nav .nav-link[data-section="${section}"]`);
            if (sidebarLink) {
                sidebarLink.classList.add('active');
            }
            
            // Close mobile sidebar
            document.getElementById('emSidebar')?.classList.remove('show');
            document.getElementById('sidebarOverlay')?.classList.remove('show');
        });
    });
}

function showSection(sectionId) {
    document.querySelectorAll('.em-dashboard-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Load Dashboard Data
function loadDashboardData() {
    loadStats();
    loadOrders();
    loadRentals();
    loadWishlist();
    loadPaymentMethods();
    loadNotifications();
    loadCartBadge();
}

// Load Stats
function loadStats() {
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.orders)) || [];
    const rentals = JSON.parse(localStorage.getItem(STORAGE_KEYS.rentals)) || [];
    const wishlist = JSON.parse(localStorage.getItem(STORAGE_KEYS.wishlist)) || [];
    
    const activeRentals = rentals.filter(r => r.status === 'active').length;
    const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('activeRentals').textContent = activeRentals;
    document.getElementById('wishlistCount').textContent = wishlist.length;
    document.getElementById('totalSpent').textContent = totalSpent.toLocaleString();
    
    // Update badges
    const ordersBadge = document.getElementById('ordersBadge');
    const wishlistBadge = document.getElementById('wishlistBadge');
    if (ordersBadge) ordersBadge.textContent = orders.length;
    if (wishlistBadge) wishlistBadge.textContent = wishlist.length;
}

// Load Orders
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.orders)) || [];
    
    const recentPanel = document.getElementById('recentOrdersPanel');
    const allPanel = document.getElementById('allOrdersPanel');
    
    if (orders.length === 0) {
        const emptyHTML = `
            <div class="em-empty-state">
                <i class="bi bi-bag-x"></i>
                <p>No orders yet</p>
                <a href="inventory.html" class="btn em-btn-sm">Start Shopping</a>
            </div>
        `;
        if (recentPanel) recentPanel.innerHTML = emptyHTML;
        if (allPanel) allPanel.innerHTML = emptyHTML;
        return;
    }
    
    const recentOrders = orders.slice(-3).reverse();
    if (recentPanel) {
        recentPanel.innerHTML = recentOrders.map(order => createOrderHTML(order)).join('');
    }
    
    if (allPanel) {
        allPanel.innerHTML = orders.slice().reverse().map(order => createOrderHTML(order)).join('');
    }
}

function createOrderHTML(order) {
    const fallbackImg = 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg';
    return `
        <div class="em-order-item">
            <img src="${order.image || fallbackImg}" alt="${order.name}" onerror="this.src='${fallbackImg}'">
            <div class="em-order-info">
                <h4>${order.name}</h4>
                <p>Order #${order.id} • ${formatDate(order.date)}</p>
            </div>
            <span class="em-order-status ${order.status || 'pending'}">${capitalizeFirst(order.status || 'pending')}</span>
            <span class="em-order-price">$${(order.total || order.price || 0).toLocaleString()}</span>
        </div>
    `;
}

// Load Rentals
function loadRentals() {
    const rentals = JSON.parse(localStorage.getItem(STORAGE_KEYS.rentals)) || [];
    
    const activePanel = document.getElementById('activeRentalsPanel');
    const currentPanel = document.getElementById('currentRentalsPanel');
    const historyPanel = document.getElementById('rentalHistoryPanel');
    
    const activeRentals = rentals.filter(r => r.status === 'active');
    const pastRentals = rentals.filter(r => r.status !== 'active');
    
    if (activeRentals.length === 0) {
        const emptyHTML = `
            <div class="em-empty-state">
                <i class="bi bi-car-front"></i>
                <p>No active rentals</p>
                <a href="rent.html" class="btn em-btn-sm">Rent a Car</a>
            </div>
        `;
        if (activePanel) activePanel.innerHTML = emptyHTML;
        if (currentPanel) currentPanel.innerHTML = emptyHTML;
    } else {
        const rentalsHTML = activeRentals.map(rental => createRentalHTML(rental)).join('');
        if (activePanel) activePanel.innerHTML = rentalsHTML;
        if (currentPanel) currentPanel.innerHTML = rentalsHTML;
    }
    
    if (historyPanel) {
        if (pastRentals.length === 0) {
            historyPanel.innerHTML = `
                <div class="em-empty-state">
                    <i class="bi bi-clock-history"></i>
                    <p>No rental history</p>
                </div>
            `;
        } else {
            historyPanel.innerHTML = pastRentals.map(rental => createRentalHTML(rental)).join('');
        }
    }
}

function createRentalHTML(rental) {
    const daysLeft = calculateDaysLeft(rental.endDate);
    const fallbackImg = 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg';
    return `
        <div class="em-rental-item">
            <img src="${rental.image || fallbackImg}" alt="${rental.car}" onerror="this.src='${fallbackImg}'">
            <div class="em-rental-info">
                <h4>${rental.car}</h4>
                <div class="em-rental-dates">
                    <span><i class="bi bi-calendar-check"></i> ${formatDate(rental.startDate)}</span>
                    <span><i class="bi bi-calendar-x"></i> ${formatDate(rental.endDate)}</span>
                </div>
            </div>
            ${rental.status === 'active' ? `
                <div style="text-align:right">
                    <span style="color:var(--em-gold);font-weight:600">${daysLeft} days left</span><br>
                    <button class="btn em-btn-outline-sm mt-2">Extend Rental</button>
                </div>
            ` : `<span class="em-order-status completed">Completed</span>`}
        </div>
    `;
}

// Load Wishlist
function loadWishlist() {
    const wishlist = JSON.parse(localStorage.getItem(STORAGE_KEYS.wishlist)) || [];
    const container = document.getElementById('wishlistGrid');
    
    if (!container) return;
    
    // Update wishlist badge
    const wishlistBadge = document.getElementById('wishlistBadge');
    if (wishlistBadge) wishlistBadge.textContent = wishlist.length;
    
    if (wishlist.length === 0) {
        container.className = '';
        container.innerHTML = `
            <div class="em-empty-state-full">
                <i class="bi bi-heart"></i>
                <h3>Your wishlist is empty</h3>
                <p>Save items you love by clicking the heart icon on any car, part, or rental</p>
                <a href="inventory.html" class="btn em-btn-primary">Browse Cars</a>
            </div>
        `;
        return;
    }
    
    // Default fallback image
    const fallbackImg = 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg';
    
    // Apply grid class to container
    container.className = 'em-wishlist-grid';
    
    container.innerHTML = wishlist.map(item => {
        const itemImage = item.image || fallbackImg;
        const itemType = item.type || 'car';
        const typeLabel = itemType.charAt(0).toUpperCase() + itemType.slice(1);
        
        return `
            <div class="em-wishlist-card">
                <img src="${itemImage}" alt="${item.name}" onerror="this.src='${fallbackImg}'">
                <div class="em-wishlist-card-body">
                    <span class="badge bg-dark mb-2">${typeLabel}</span>
                    <h4>${item.name}</h4>
                    <p class="price">$${(item.price || 0).toLocaleString()}${itemType === 'rental' ? '/day' : ''}</p>
                    <div class="em-wishlist-card-actions">
                        <button class="btn em-btn-sm" onclick="addToCartFromWishlist('${item.id}', '${itemType}')">
                            <i class="bi bi-cart-plus"></i> Add to Cart
                        </button>
                        <button class="btn em-btn-outline-sm" onclick="removeFromWishlist('${item.id}', '${itemType}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Load Payment Methods
function loadPaymentMethods() {
    const cards = JSON.parse(localStorage.getItem(STORAGE_KEYS.cards)) || [];
    const addresses = JSON.parse(localStorage.getItem(STORAGE_KEYS.addresses)) || [];
    
    const cardsPanel = document.getElementById('savedCardsPanel');
    const addressesPanel = document.getElementById('addressesPanel');
    
    if (cardsPanel) {
        if (cards.length === 0) {
            cardsPanel.innerHTML = `
                <div class="em-empty-state">
                    <i class="bi bi-credit-card"></i>
                    <p>No saved payment methods</p>
                </div>
            `;
        } else {
            cardsPanel.innerHTML = cards.map(card => `
                <div class="em-payment-card-item">
                    <span class="em-card-brand">${getCardIcon(card.brand)}</span>
                    <div class="em-card-details">
                        <h4>•••• •••• •••• ${card.last4}</h4>
                        <p>Expires ${card.expiry} • ${card.name}</p>
                    </div>
                    ${card.isDefault ? '<span class="em-default-badge">Default</span>' : ''}
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteCard(${card.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }
    
    if (addressesPanel) {
        if (addresses.length === 0) {
            addressesPanel.innerHTML = `
                <div class="em-empty-state">
                    <i class="bi bi-geo-alt"></i>
                    <p>No saved addresses</p>
                </div>
            `;
        } else {
            addressesPanel.innerHTML = addresses.map(addr => `
                <div class="em-payment-card-item" style="background: var(--em-dark)">
                    <div class="em-card-details">
                        <h4 style="letter-spacing:normal">${addr.label} ${addr.isDefault ? '<span class="em-default-badge">Default</span>' : ''}</h4>
                        <p>${addr.street}, ${addr.city}, ${addr.state} ${addr.zip}</p>
                    </div>
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteAddress(${addr.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }
}

// Load Notifications
function loadNotifications() {
    const notifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.notifications)) || [];
    const panel = document.getElementById('notificationsPanel');
    
    const unreadCount = notifications.filter(n => !n.read).length;
    const notifBadge = document.getElementById('notifBadge');
    const topNotifBadge = document.getElementById('topNotifBadge');
    
    if (notifBadge) {
        notifBadge.textContent = unreadCount;
        notifBadge.style.display = unreadCount > 0 ? 'inline' : 'none';
    }
    if (topNotifBadge) {
        topNotifBadge.textContent = unreadCount;
        topNotifBadge.style.display = unreadCount > 0 ? 'inline' : 'none';
    }
    
    if (!panel) return;
    
    if (notifications.length === 0) {
        panel.innerHTML = `
            <div class="em-empty-state">
                <i class="bi bi-bell-slash"></i>
                <p>No notifications</p>
            </div>
        `;
        return;
    }
    
    panel.innerHTML = notifications.map(notif => `
        <div class="em-notification-item ${notif.read ? '' : 'unread'}">
            <div class="em-notif-icon ${notif.type || 'system'}">
                <i class="bi bi-${getNotifIcon(notif.type)}"></i>
            </div>
            <div class="em-notif-content">
                <h4>${notif.title}</h4>
                <p>${notif.message}</p>
                <span class="em-notif-time">${notif.time || 'Just now'}</span>
            </div>
        </div>
    `).join('');
}

// Load Cart Badge
function loadCartBadge() {
    const cart = JSON.parse(localStorage.getItem(STORAGE_KEYS.cart)) || [];
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = cart.length;
    }
}

// Event Listeners
function initEventListeners() {
    // Profile Form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveProfile();
        });
    }
    
    // Avatar Upload
    const avatarInput = document.getElementById('avatarInput');
    if (avatarInput) {
        avatarInput.addEventListener('change', handleAvatarUpload);
    }
    
    // Add Card
    const saveCardBtn = document.getElementById('saveCardBtn');
    if (saveCardBtn) {
        saveCardBtn.addEventListener('click', addCard);
    }
    
    // Add Address
    const saveAddressBtn = document.getElementById('saveAddressBtn');
    if (saveAddressBtn) {
        saveAddressBtn.addEventListener('click', addAddress);
    }
    
    // Change Password
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', changePassword);
    }
    
    // Mark All Read
    const markAllReadBtn = document.getElementById('markAllRead');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', markAllNotificationsRead);
    }
    
    // Order Filter
    const orderFilter = document.getElementById('orderFilter');
    if (orderFilter) {
        orderFilter.addEventListener('change', filterOrders);
    }
    
    // Delete Account Confirmation
    const deleteConfirm = document.getElementById('deleteConfirm');
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteConfirm && deleteAccountBtn) {
        deleteConfirm.addEventListener('input', () => {
            deleteAccountBtn.disabled = deleteConfirm.value !== 'DELETE';
        });
        deleteAccountBtn.addEventListener('click', deleteAccount);
    }
    
    // Card formatting
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');
    if (cardNumber) cardNumber.addEventListener('input', formatCardNumber);
    if (cardExpiry) cardExpiry.addEventListener('input', formatCardExpiry);
    
    // Dashboard Search
    const dashboardSearch = document.getElementById('dashboardSearch');
    if (dashboardSearch) {
        dashboardSearch.addEventListener('input', handleDashboardSearch);
    }
}

// Dashboard Search Handler
function handleDashboardSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
        // Reset to current section
        loadDashboardData();
        return;
    }
    
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.orders)) || [];
    const rentals = JSON.parse(localStorage.getItem(STORAGE_KEYS.rentals)) || [];
    
    // Search orders
    const matchingOrders = orders.filter(o => 
        (o.name && o.name.toLowerCase().includes(query)) ||
        (o.id && o.id.toString().includes(query))
    );
    
    // Search rentals
    const matchingRentals = rentals.filter(r => 
        (r.car && r.car.toLowerCase().includes(query))
    );
    
    // Update panels with search results
    if (matchingOrders.length > 0 || matchingRentals.length > 0) {
        showSection('overview');
        
        const recentPanel = document.getElementById('recentOrdersPanel');
        const activePanel = document.getElementById('activeRentalsPanel');
        
        if (recentPanel && matchingOrders.length > 0) {
            recentPanel.innerHTML = matchingOrders.map(order => createOrderHTML(order)).join('');
        } else if (recentPanel) {
            recentPanel.innerHTML = '<div class="em-empty-state"><i class="bi bi-search"></i><p>No orders match your search</p></div>';
        }
        
        if (activePanel && matchingRentals.length > 0) {
            activePanel.innerHTML = matchingRentals.map(rental => createRentalHTML(rental)).join('');
        } else if (activePanel) {
            activePanel.innerHTML = '<div class="em-empty-state"><i class="bi bi-search"></i><p>No rentals match your search</p></div>';
        }
        
        showToast(`Found ${matchingOrders.length + matchingRentals.length} results`, 'success');
    } else {
        showToast('No results found', 'error');
    }
}

// Profile Functions
function saveProfile() {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.user)) || {};
    user.name = document.getElementById('settingsName').value;
    user.phone = document.getElementById('settingsPhone').value;
    user.dob = document.getElementById('settingsDob').value;
    
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    loadUserData();
    showToast('Profile updated successfully!', 'success');
}

function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.user)) || {};
            user.picture = imageData;
            localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
            loadUserData();
            showToast('Profile photo updated!', 'success');
        };
        reader.readAsDataURL(file);
    }
}

// Remove profile image
function removeProfileImage() {
    const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.user)) || {};
    
    if (!user.picture || user.picture === 'https://via.placeholder.com/100') {
        showToast('No profile image to remove', 'error');
        return;
    }
    
    // Remove the picture from user data
    delete user.picture;
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    
    // Update all avatar elements to default
    const defaultAvatar = 'https://via.placeholder.com/100';
    const sidebarAvatar = document.getElementById('sidebarAvatar');
    const settingsAvatar = document.getElementById('settingsAvatar');
    
    if (sidebarAvatar) sidebarAvatar.src = defaultAvatar;
    if (settingsAvatar) settingsAvatar.src = defaultAvatar;
    
    showToast('Profile image removed successfully!', 'success');
}

// Card Functions
function addCard() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiry = document.getElementById('cardExpiry').value;
    const name = document.getElementById('cardName').value;
    const isDefault = document.getElementById('setDefault').checked;
    
    if (cardNumber.length < 16 || !expiry || !name) {
        showToast('Please fill in all card details', 'error');
        return;
    }
    
    const cards = JSON.parse(localStorage.getItem(STORAGE_KEYS.cards)) || [];
    
    if (isDefault) {
        cards.forEach(c => c.isDefault = false);
    }
    
    cards.push({
        id: Date.now(),
        brand: detectCardBrand(cardNumber),
        last4: cardNumber.slice(-4),
        expiry: expiry,
        name: name,
        isDefault: isDefault || cards.length === 0
    });
    
    localStorage.setItem(STORAGE_KEYS.cards, JSON.stringify(cards));
    loadPaymentMethods();
    
    bootstrap.Modal.getInstance(document.getElementById('addCardModal')).hide();
    document.getElementById('addCardForm').reset();
    showToast('Card added successfully!', 'success');
}

function deleteCard(cardId) {
    if (confirm('Delete this card?')) {
        let cards = JSON.parse(localStorage.getItem(STORAGE_KEYS.cards)) || [];
        cards = cards.filter(c => c.id !== cardId);
        localStorage.setItem(STORAGE_KEYS.cards, JSON.stringify(cards));
        loadPaymentMethods();
        showToast('Card deleted', 'success');
    }
}

function addAddress() {
    const label = document.getElementById('addressLabel').value;
    const street = document.getElementById('addressStreet').value;
    const city = document.getElementById('addressCity').value;
    const state = document.getElementById('addressState').value;
    const zip = document.getElementById('addressZip').value;
    const isDefault = document.getElementById('setDefaultAddress').checked;
    
    if (!label || !street || !city || !state || !zip) {
        showToast('Please fill in all address details', 'error');
        return;
    }
    
    const addresses = JSON.parse(localStorage.getItem(STORAGE_KEYS.addresses)) || [];
    
    if (isDefault) {
        addresses.forEach(a => a.isDefault = false);
    }
    
    addresses.push({
        id: Date.now(),
        label: label,
        street: street,
        city: city,
        state: state,
        zip: zip,
        isDefault: isDefault || addresses.length === 0
    });
    
    localStorage.setItem(STORAGE_KEYS.addresses, JSON.stringify(addresses));
    loadPaymentMethods();
    
    bootstrap.Modal.getInstance(document.getElementById('addAddressModal')).hide();
    document.getElementById('addAddressForm').reset();
    showToast('Address added successfully!', 'success');
}

function deleteAddress(addrId) {
    if (confirm('Delete this address?')) {
        let addresses = JSON.parse(localStorage.getItem(STORAGE_KEYS.addresses)) || [];
        addresses = addresses.filter(a => a.id !== addrId);
        localStorage.setItem(STORAGE_KEYS.addresses, JSON.stringify(addresses));
        loadPaymentMethods();
        showToast('Address deleted', 'success');
    }
}

// Password Functions
function changePassword() {
    const newPass = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmNewPassword').value;
    
    if (newPass !== confirm) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (newPass.length < 8) {
        showToast('Password must be at least 8 characters', 'error');
        return;
    }
    
    bootstrap.Modal.getInstance(document.getElementById('changePasswordModal')).hide();
    document.getElementById('changePasswordForm').reset();
    showToast('Password changed successfully!', 'success');
}

// Notification Functions
function markAllNotificationsRead() {
    const notifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.notifications)) || [];
    notifications.forEach(n => n.read = true);
    localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(notifications));
    loadNotifications();
    showToast('All notifications marked as read', 'success');
}

// Order Filter
function filterOrders() {
    const filter = document.getElementById('orderFilter').value;
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.orders)) || [];
    const panel = document.getElementById('allOrdersPanel');
    
    if (!panel) return;
    
    let filteredOrders = orders;
    if (filter !== 'all') {
        filteredOrders = orders.filter(o => o.status === filter);
    }
    
    if (filteredOrders.length === 0) {
        panel.innerHTML = `
            <div class="em-empty-state">
                <i class="bi bi-bag-x"></i>
                <p>No ${filter !== 'all' ? filter : ''} orders found</p>
            </div>
        `;
        return;
    }
    
    panel.innerHTML = filteredOrders.slice().reverse().map(order => createOrderHTML(order)).join('');
}

// Wishlist Functions
function removeFromWishlist(itemId, itemType) {
    let wishlist = JSON.parse(localStorage.getItem(STORAGE_KEYS.wishlist)) || [];
    // Convert itemId to number if needed for comparison
    const numId = typeof itemId === 'string' ? parseInt(itemId) : itemId;
    wishlist = wishlist.filter(i => !(i.id === numId && i.type === itemType));
    localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist));
    loadWishlist();
    loadStats();
    showToast('Removed from wishlist', 'success');
}

function addToCartFromWishlist(itemId, itemType) {
    const wishlist = JSON.parse(localStorage.getItem(STORAGE_KEYS.wishlist)) || [];
    const numId = typeof itemId === 'string' ? parseInt(itemId) : itemId;
    const item = wishlist.find(i => i.id === numId && i.type === itemType);
    
    if (item) {
        const cart = JSON.parse(localStorage.getItem(STORAGE_KEYS.cart)) || [];
        
        // Check if already in cart
        const existingItem = cart.find(c => c.id === item.id && c.type === item.type);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                type: item.type.charAt(0).toUpperCase() + item.type.slice(1),
                quantity: 1
            });
        }
        
        localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
        loadCartBadge();
        showToast('Added to cart!', 'success');
    }
}

// Delete Account
function deleteAccount() {
    // Clear all user data
    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
    window.location.href = 'index.html';
}

// Utility Functions
function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function calculateDaysLeft(endDate) {
    if (!endDate) return 0;
    const end = new Date(endDate);
    const today = new Date();
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
}

function getCardIcon(brand) {
    const icons = { visa: '💳', mastercard: '💳', amex: '💳' };
    return icons[brand] || '💳';
}

function getNotifIcon(type) {
    const icons = { order: 'bag-check', rental: 'car-front', promo: 'tag', system: 'gear' };
    return icons[type] || 'bell';
}

function detectCardBrand(number) {
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    return 'visa';
}

function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
    value = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = value;
}

function formatCardExpiry(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
}

function showToast(message, type = 'success') {
    const existing = document.querySelector('.em-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = `em-toast em-toast-${type}`;
    toast.innerHTML = `
        <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .em-toast {
                position: fixed;
                bottom: 30px;
                right: 30px;
                padding: 15px 25px;
                background: #fff;
                color: #1f2937;
                border-radius: 12px;
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 9999;
                animation: toastIn 0.3s ease;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                border-left: 4px solid;
            }
            .em-toast-success { border-color: #22c55e; }
            .em-toast-success i { color: #22c55e; }
            .em-toast-error { border-color: #ef4444; }
            .em-toast-error i { color: #ef4444; }
            @keyframes toastIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Logout Function
function logout() {
    localStorage.removeItem(STORAGE_KEYS.user);
    localStorage.removeItem('emToken');
    window.location.href = 'signin.html';
}
