/* =============================================
   CHECKOUT.JS - Checkout Page JavaScript
   ============================================= */

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderCartPage();
});

// Render cart items
function renderCartPage() {
    const cart = JSON.parse(localStorage.getItem('emCart')) || [];
    const tbody = document.getElementById('em-checkout-body');
    const emptyMsg = document.getElementById('empty-cart-msg');
    const subtotalEl = document.getElementById('em-subtotal');
    const taxEl = document.getElementById('em-tax');
    const totalEl = document.getElementById('em-final-total');
    const badge = document.getElementById('em-cart-count');
    const checkoutBtn = document.getElementById('em-checkout-btn');

    // Update cart badge
    if (badge) {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.innerText = count;
    }

    // Clear table
    if (tbody) tbody.innerHTML = '';

    if (cart.length === 0) {
        // Show empty message
        if (emptyMsg) emptyMsg.classList.remove('d-none');
        if (checkoutBtn) checkoutBtn.disabled = true;
        if (subtotalEl) subtotalEl.innerText = '$0';
        if (taxEl) taxEl.innerText = '$0';
        if (totalEl) totalEl.innerText = '$0';
        return;
    }

    // Hide empty message
    if (emptyMsg) emptyMsg.classList.add('d-none');
    if (checkoutBtn) checkoutBtn.disabled = false;

    let subtotal = 0;

    // Render each item
    cart.forEach((item, index) => {
        const lineTotal = item.price * item.quantity;
        subtotal += lineTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="d-flex align-items-center gap-3">
                    <img src="${item.image}" alt="${item.name}" 
                        style="width: 80px; height: 60px; object-fit: cover; border-radius: 10px;"
                        onerror="this.src='https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg'">
                    <div>
                        <strong>${item.name}</strong>
                        <br><small class="text-muted">${item.type || 'Item'}</small>
                    </div>
                </div>
            </td>
            <td>$${item.price.toLocaleString()}</td>
            <td>
                <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQty(${index}, -1)">−</button>
                    <span class="fw-bold">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQty(${index}, 1)">+</button>
                </div>
            </td>
            <td class="fw-bold">$${lineTotal.toLocaleString()}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Calculate totals
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    if (subtotalEl) subtotalEl.innerText = '$' + subtotal.toLocaleString();
    if (taxEl) taxEl.innerText = '$' + tax.toFixed(2);
    if (totalEl) totalEl.innerText = '$' + total.toLocaleString(undefined, {minimumFractionDigits: 2});
}

// Update quantity
function updateQty(index, change) {
    let cart = JSON.parse(localStorage.getItem('emCart')) || [];
    
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('emCart', JSON.stringify(cart));
        renderCartPage();
        showToast('Cart updated!', 'success');
    }
}

// Remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('emCart')) || [];
    const removed = cart[index];
    cart.splice(index, 1);
    localStorage.setItem('emCart', JSON.stringify(cart));
    renderCartPage();
    showToast(removed ? removed.name + ' removed' : 'Item removed', 'info');
}

// Check and process purchase
function checkAndPurchase() {
    const cart = JSON.parse(localStorage.getItem('emCart')) || [];
    
    // Check if cart is empty
    if (cart.length === 0) {
        const emptyModal = new bootstrap.Modal(document.getElementById('emptyCartModal'));
        emptyModal.show();
        return;
    }
    
    // Show processing state
    const btn = document.getElementById('em-checkout-btn');
    if (btn) {
        btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Processing...';
        btn.disabled = true;
    }
    
    // Simulate payment processing
    setTimeout(function() {
        // Create order
        const orderId = 'ORD-' + Date.now();
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Save order to history
        const orders = JSON.parse(localStorage.getItem('emOrders')) || [];
        orders.push({
            id: orderId,
            items: cart,
            total: total,
            date: new Date().toISOString(),
            status: 'Confirmed'
        });
        localStorage.setItem('emOrders', JSON.stringify(orders));
        
        // Update modal with order info
        document.getElementById('em-order-id').innerText = orderId;
        document.getElementById('em-success-date').innerText = new Date().toLocaleDateString();
        
        // Show success modal
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
        
        // Clear cart
        localStorage.setItem('emCart', JSON.stringify([]));
        
        // Reset button
        if (btn) {
            btn.innerHTML = '<i class="bi bi-bag-check me-2"></i>Confirm Purchase';
            btn.disabled = false;
        }
        
        // Re-render page
        renderCartPage();
        
    }, 1500);
}

// Toast notification
function showToast(message, type) {
    // Remove existing toast
    const existing = document.querySelector('.checkout-toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'checkout-toast';
    
    const bgColor = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8';
    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info-circle';
    
    toast.innerHTML = `<i class="bi bi-${icon} me-2"></i>${message}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
