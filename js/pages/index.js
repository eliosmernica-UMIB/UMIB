/* =============================================
   INDEX.JS - Homepage JavaScript
   ============================================= */

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    updateUserNavigation();
});

// Cart Badge Update
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('emCart')) || [];
    const badge = document.getElementById('em-cart-count');
    if (badge) {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        badge.innerText = count;
    }
}

// Update Navigation based on user login status
function updateUserNavigation() {
    const user = JSON.parse(localStorage.getItem('emUser'));
    const navSignIn = document.getElementById('navSignIn');
    const navSignUp = document.getElementById('navSignUp');
    const navDashboardItem = document.getElementById('navDashboardItem');
    const navLogoutItem = document.getElementById('navLogoutItem');
    const userNavLink = document.getElementById('userNavLink');
    
    if (user) {
        // User is logged in
        if (navSignIn) navSignIn.parentElement.classList.add('d-none');
        if (navSignUp) navSignUp.parentElement.classList.add('d-none');
        if (navDashboardItem) navDashboardItem.classList.remove('d-none');
        if (navLogoutItem) navLogoutItem.classList.remove('d-none');
        if (userNavLink) {
            userNavLink.innerHTML = `<img src="${user.picture || 'https://via.placeholder.com/24'}" 
                alt="User" style="width:24px;height:24px;border-radius:50%;margin-right:5px;"> 
                ${user.name ? user.name.split(' ')[0] : 'Account'}`;
        }
    } else {
        // User is not logged in
        if (navSignIn) navSignIn.parentElement.classList.remove('d-none');
        if (navSignUp) navSignUp.parentElement.classList.remove('d-none');
        if (navDashboardItem) navDashboardItem.classList.add('d-none');
        if (navLogoutItem) navLogoutItem.classList.add('d-none');
    }
}

// Logout function
function logout() {
    localStorage.removeItem('emUser');
    localStorage.removeItem('emToken');
    window.location.href = 'signin.html';
}
