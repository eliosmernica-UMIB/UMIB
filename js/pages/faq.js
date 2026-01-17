/* =============================================
   FAQ.JS - FAQ Page JavaScript (Enhanced)
   Handles: Search, filtering, accordion animations
   ============================================= */

// Debounce function for search
function debounce(func, wait) {
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

// Search FAQ - Enhanced with highlighting
function searchFAQ() {
    const searchTerm = document.getElementById('faqSearch').value.toLowerCase().trim();
    const faqItems = document.querySelectorAll('.faq-item');
    const noResults = document.getElementById('noResults');
    let hasResults = false;
    let resultCount = 0;

    faqItems.forEach(item => {
        const question = item.querySelector('.accordion-button').textContent.toLowerCase();
        const answer = item.querySelector('.accordion-body').textContent.toLowerCase();
        const keywords = item.getAttribute('data-keywords') || '';
        
        if (searchTerm === '' || question.includes(searchTerm) || answer.includes(searchTerm) || keywords.includes(searchTerm)) {
            item.style.display = 'block';
            item.style.animation = 'em-fade-up 0.4s ease forwards';
            item.style.animationDelay = `${resultCount * 0.05}s`;
            hasResults = true;
            resultCount++;
            
            // Highlight matching text
            if (searchTerm) {
                highlightText(item, searchTerm);
            } else {
                removeHighlight(item);
            }
        } else {
            item.style.animation = 'em-fade-out 0.2s ease forwards';
            setTimeout(() => {
                item.style.display = 'none';
            }, 200);
        }
    });

    // Show/hide category headers based on visible items
    document.querySelectorAll('.faq-category').forEach(category => {
        const hasVisibleItems = Array.from(category.querySelectorAll('.faq-item')).some(item => 
            item.style.display !== 'none'
        );
        category.style.display = hasVisibleItems ? 'block' : 'none';
    });

    // Update no results display
    noResults.style.display = hasResults || searchTerm === '' ? 'none' : 'block';
    
    // Show result count
    if (typeof emShowToast === 'function' && searchTerm) {
        if (resultCount > 0) {
            // Don't spam toasts, only show on significant searches
        } else {
            emShowToast(`No results found for "${searchTerm}"`, 'info');
        }
    }
}

// Highlight matching text
function highlightText(item, term) {
    const button = item.querySelector('.accordion-button');
    const body = item.querySelector('.accordion-body');
    
    // Store original text if not already stored
    if (!button.dataset.originalText) {
        button.dataset.originalText = button.textContent;
    }
    if (!body.dataset.originalHtml) {
        body.dataset.originalHtml = body.innerHTML;
    }
    
    // Highlight in button (question)
    const questionText = button.dataset.originalText;
    const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
    button.innerHTML = questionText.replace(regex, '<mark class="em-highlight">$1</mark>');
}

// Remove highlight
function removeHighlight(item) {
    const button = item.querySelector('.accordion-button');
    const body = item.querySelector('.accordion-body');
    
    if (button.dataset.originalText) {
        button.textContent = button.dataset.originalText;
    }
    if (body.dataset.originalHtml) {
        body.innerHTML = body.dataset.originalHtml;
    }
}

// Escape regex special characters
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Filter by Category - Enhanced
function filterCategory(category) {
    const tabs = document.querySelectorAll('.category-tab');
    const categories = document.querySelectorAll('.faq-category');
    
    // Update active tab
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // Clear search
    document.getElementById('faqSearch').value = '';
    document.getElementById('noResults').style.display = 'none';
    
    // Remove all highlights
    document.querySelectorAll('.faq-item').forEach(item => {
        removeHighlight(item);
    });
    
    // Show/hide categories with animation
    if (category === 'all') {
        categories.forEach((cat, index) => {
            cat.style.display = 'block';
            cat.style.animation = 'em-fade-up 0.4s ease forwards';
            cat.style.animationDelay = `${index * 0.1}s`;
            cat.querySelectorAll('.faq-item').forEach((item, i) => {
                item.style.display = 'block';
                item.style.animation = 'em-fade-up 0.4s ease forwards';
                item.style.animationDelay = `${i * 0.05}s`;
            });
        });
        
        if (typeof emShowToast === 'function') {
            emShowToast('Showing all FAQs', 'info');
        }
    } else {
        categories.forEach(cat => {
            if (cat.getAttribute('data-category') === category) {
                cat.style.display = 'block';
                cat.style.animation = 'em-fade-up 0.4s ease forwards';
                cat.querySelectorAll('.faq-item').forEach((item, index) => {
                    item.style.display = 'block';
                    item.style.animation = 'em-fade-up 0.4s ease forwards';
                    item.style.animationDelay = `${index * 0.05}s`;
                });
            } else {
                cat.style.display = 'none';
            }
        });
        
        if (typeof emShowToast === 'function') {
            emShowToast(`Showing: ${category}`, 'info');
        }
    }
}

// Track most viewed FAQs
function trackFAQView(faqId) {
    let views = JSON.parse(localStorage.getItem('emFAQViews')) || {};
    views[faqId] = (views[faqId] || 0) + 1;
    localStorage.setItem('emFAQViews', JSON.stringify(views));
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Cart badge
    const cart = JSON.parse(localStorage.getItem('emCart')) || [];
    const badge = document.getElementById('em-cart-count');
    if (badge) {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        badge.innerText = count;
    }
    updateUserNavigation();
    
    // Add debounced search
    const searchInput = document.getElementById('faqSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(searchFAQ, 300));
        
        // Search on Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchFAQ();
            }
        });
    }
    
    // Track FAQ views when accordion is opened
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            if (faqItem && faqItem.id) {
                trackFAQView(faqItem.id);
            }
        });
    });
    
    // Animate FAQ items on scroll
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('em-visible');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.faq-item').forEach(item => {
            observer.observe(item);
        });
    }
});
