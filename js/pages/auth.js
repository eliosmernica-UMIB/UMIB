/* =============================================
   AUTH.JS - Google Authentication
   Client ID: 440225629177-qfjrmbivvp0a7rgra0n0f82s10coaup0.apps.googleusercontent.com
   ============================================= */

// ============================================
// CONFIGURATION
// ============================================
const AUTH_CONFIG = {
    clientId: '440225629177-qfjrmbivvp0a7rgra0n0f82s10coaup0.apps.googleusercontent.com',
    redirectUrl: 'dashboard.html',
    userKey: 'emUser'
};

// ============================================
// GOOGLE SIGN-IN CALLBACK
// ============================================
function handleGoogleSignIn(response) {
    try {
        const token = response.credential;
        const payload = decodeJwtPayload(token);
        
        if (payload) {
            const user = {
                id: payload.sub,
                email: payload.email,
                name: payload.name,
                firstName: payload.given_name || payload.name?.split(' ')[0] || '',
                lastName: payload.family_name || '',
                picture: payload.picture,
                emailVerified: payload.email_verified,
                provider: 'google',
                createdAt: new Date().toISOString()
            };
            
            localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(user));
            
            showSuccess(`Welcome, ${user.firstName || user.name}! Redirecting...`);
            
            setTimeout(() => {
                window.location.href = AUTH_CONFIG.redirectUrl;
            }, 1500);
        } else {
            showError('Failed to process sign-in. Please try again.');
        }
    } catch (e) {
        console.error('Google sign-in error:', e);
        showError('An error occurred. Please try again.');
    }
}

// Decode JWT payload from Google
function decodeJwtPayload(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error('Error decoding JWT:', e);
        return null;
    }
}

// ============================================
// INITIALIZE GOOGLE SIGN-IN
// ============================================
function initializeGoogleSignIn() {
    const container = document.getElementById('googleButtonContainer');
    if (!container) return;
    
    // Wait for Google API to load
    if (typeof google === 'undefined' || !google.accounts) {
        setTimeout(initializeGoogleSignIn, 100);
        return;
    }
    
    // Initialize
    google.accounts.id.initialize({
        client_id: AUTH_CONFIG.clientId,
        callback: handleGoogleSignIn,
        auto_select: false,
        cancel_on_tap_outside: true
    });
    
    // Render the button
    google.accounts.id.renderButton(container, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        logo_alignment: 'center',
        width: 350
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function showError(message) {
    const alertEl = document.getElementById('alertMessage');
    const textEl = document.getElementById('alertText');
    const successEl = document.getElementById('successMessage');
    
    if (successEl) successEl.style.display = 'none';
    if (alertEl && textEl) {
        textEl.textContent = message;
        alertEl.style.display = 'flex';
        setTimeout(() => alertEl.style.display = 'none', 5000);
    }
}

function showSuccess(message) {
    const successEl = document.getElementById('successMessage');
    const textEl = document.getElementById('successText');
    const alertEl = document.getElementById('alertMessage');
    
    if (alertEl) alertEl.style.display = 'none';
    if (successEl && textEl) {
        textEl.textContent = message;
        successEl.style.display = 'flex';
    }
}

// ============================================
// LOGOUT
// ============================================
function logout() {
    const user = JSON.parse(localStorage.getItem(AUTH_CONFIG.userKey) || '{}');
    
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id && user.email) {
        google.accounts.id.revoke(user.email, () => {
            console.log('Google token revoked');
        });
    }
    
    localStorage.removeItem(AUTH_CONFIG.userKey);
    window.location.href = 'signin.html';
}

// ============================================
// AUTH HELPERS
// ============================================
function isLoggedIn() {
    return localStorage.getItem(AUTH_CONFIG.userKey) !== null;
}

function getCurrentUser() {
    const userStr = localStorage.getItem(AUTH_CONFIG.userKey);
    return userStr ? JSON.parse(userStr) : null;
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', initializeGoogleSignIn);

// Also try to initialize when Google API loads
window.onload = function() {
    setTimeout(initializeGoogleSignIn, 500);
};

// Export for global use
window.handleGoogleSignIn = handleGoogleSignIn;
window.logout = logout;
window.isLoggedIn = isLoggedIn;
window.getCurrentUser = getCurrentUser;
