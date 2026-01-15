/* =============================================
   BLOG.JS - Blog Page Functionality
   Search, Filter, Pagination
   ============================================= */

// Blog articles data
const blogArticles = [
    {
        id: 1,
        title: 'The Future of V12 Engines',
        category: 'Technology',
        excerpt: 'As the world moves to electric, we explore how Lamborghini and Ferrari are keeping the soul of the V12 alive.',
        image: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&q=80&w=600',
        author: 'Michael Sterling',
        authorImg: 'https://randomuser.me/api/portraits/men/32.jpg',
        date: 'Jan 10, 2026'
    },
    {
        id: 2,
        title: 'Caring for Classics',
        category: 'Maintenance',
        excerpt: 'A comprehensive guide on how to store and maintain your vintage collection during the winter months.',
        image: 'https://images.unsplash.com/photo-1495856458515-0637185db551?auto=format&fit=crop&q=80&w=600',
        author: 'James Harrison',
        authorImg: 'https://randomuser.me/api/portraits/men/85.jpg',
        date: 'Jan 8, 2026'
    },
    {
        id: 3,
        title: 'Porsche 911 GT3 RS: Track Day Ready',
        category: 'Reviews',
        excerpt: 'We take the new GT3 RS to the track to see if it lives up to the legendary 911 heritage.',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
        author: 'Sarah Connor',
        authorImg: 'https://randomuser.me/api/portraits/women/44.jpg',
        date: 'Jan 5, 2026'
    },
    {
        id: 4,
        title: 'The Art of Luxury Interiors',
        category: 'Lifestyle',
        excerpt: 'From hand-stitched leather to carbon fiber trim, exploring what makes a truly luxurious cabin.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600',
        author: 'Michael Sterling',
        authorImg: 'https://randomuser.me/api/portraits/men/32.jpg',
        date: 'Jan 2, 2026'
    },
    {
        id: 5,
        title: 'Classic Ferraris as Investment',
        category: 'Investment',
        excerpt: 'Which vintage Ferraris are appreciating the fastest and how to spot a good investment opportunity.',
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=600',
        author: 'Sarah Connor',
        authorImg: 'https://randomuser.me/api/portraits/women/44.jpg',
        date: 'Dec 28, 2025'
    },
    {
        id: 6,
        title: 'First Supercar Buying Guide',
        category: 'Buying Guide',
        excerpt: 'Everything you need to know before purchasing your first exotic car, from insurance to maintenance.',
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=600',
        author: 'James Harrison',
        authorImg: 'https://randomuser.me/api/portraits/men/85.jpg',
        date: 'Dec 25, 2025'
    },
    // Page 2 Articles
    {
        id: 7,
        title: 'McLaren vs Ferrari: The Ultimate Comparison',
        category: 'Reviews',
        excerpt: 'We put the McLaren 720S against the Ferrari F8 Tributo on track and road to determine the true champion.',
        image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=600',
        author: 'Michael Sterling',
        authorImg: 'https://randomuser.me/api/portraits/men/32.jpg',
        date: 'Dec 22, 2025'
    },
    {
        id: 8,
        title: 'The Rise of Electric Hypercars',
        category: 'Technology',
        excerpt: 'From Rimac Nevera to Pininfarina Battista, how electricity is redefining what hypercars can do.',
        image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=600',
        author: 'Sarah Connor',
        authorImg: 'https://randomuser.me/api/portraits/women/44.jpg',
        date: 'Dec 20, 2025'
    },
    {
        id: 9,
        title: 'Seasonal Tire Guide for Exotic Cars',
        category: 'Maintenance',
        excerpt: 'Understanding when to switch tires and the best brands for your high-performance vehicle.',
        image: 'https://images.unsplash.com/photo-1558618047-f4b511cdc9b0?auto=format&fit=crop&q=80&w=600',
        author: 'James Harrison',
        authorImg: 'https://randomuser.me/api/portraits/men/85.jpg',
        date: 'Dec 18, 2025'
    },
    {
        id: 10,
        title: 'Living with a Daily Driver Supercar',
        category: 'Lifestyle',
        excerpt: 'Can you really use a Lamborghini Huracan for everyday tasks? We spent a month finding out.',
        image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&q=80&w=600',
        author: 'Michael Sterling',
        authorImg: 'https://randomuser.me/api/portraits/men/32.jpg',
        date: 'Dec 15, 2025'
    },
    {
        id: 11,
        title: 'Rare Porsche Models Worth Collecting',
        category: 'Investment',
        excerpt: 'From 959 to Carrera GT, these Porsche models are becoming increasingly valuable investments.',
        image: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?auto=format&fit=crop&q=80&w=600',
        author: 'Sarah Connor',
        authorImg: 'https://randomuser.me/api/portraits/women/44.jpg',
        date: 'Dec 12, 2025'
    },
    {
        id: 12,
        title: 'How to Finance Your Dream Car',
        category: 'Buying Guide',
        excerpt: 'Expert tips on exotic car financing, leasing options, and getting the best rates for luxury vehicles.',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600',
        author: 'James Harrison',
        authorImg: 'https://randomuser.me/api/portraits/men/85.jpg',
        date: 'Dec 10, 2025'
    }
];

// State
let currentPage = 1;
let currentCategory = 'all';
let searchQuery = '';
const articlesPerPage = 6;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initCategoryFilters();
    initPagination();
    initNewsletter();
    updateUserNavigation();
    
    // Render initial articles
    filterAndDisplayArticles();
});

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('blogSearchInput');
    const searchBtn = document.getElementById('blogSearchBtn');
    
    if (searchInput && searchBtn) {
        // Search on button click
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Live search (debounced)
        let debounceTimer;
        searchInput.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(performSearch, 300);
        });
    }
}

function performSearch() {
    const searchInput = document.getElementById('blogSearchInput');
    searchQuery = searchInput.value.toLowerCase().trim();
    currentPage = 1;
    filterAndDisplayArticles();
}

// Category filter functionality
function initCategoryFilters() {
    const categoryLinks = document.querySelectorAll('.category-filter');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            categoryLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
            
            // Set category
            currentCategory = this.dataset.category.toLowerCase();
            currentPage = 1;
            filterAndDisplayArticles();
        });
    });
}

// Filter and display articles
function filterAndDisplayArticles() {
    let filtered = [...blogArticles];
    
    // Filter by category
    if (currentCategory !== 'all') {
        filtered = filtered.filter(article => 
            article.category.toLowerCase() === currentCategory
        );
    }
    
    // Filter by search query
    if (searchQuery) {
        filtered = filtered.filter(article => 
            article.title.toLowerCase().includes(searchQuery) ||
            article.excerpt.toLowerCase().includes(searchQuery) ||
            article.category.toLowerCase().includes(searchQuery) ||
            article.author.toLowerCase().includes(searchQuery)
        );
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(filtered.length / articlesPerPage);
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToShow = filtered.slice(startIndex, endIndex);
    
    // Render articles
    renderArticles(articlesToShow);
    
    // Update pagination
    updatePagination(totalPages);
}

// Render articles
function renderArticles(articles) {
    const container = document.querySelector('.col-lg-8 .row');
    if (!container) return;
    
    if (articles.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="em-no-results">
                    <i class="bi bi-search"></i>
                    <h4>No articles found</h4>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = articles.map(article => `
        <div class="col-md-6">
            <article class="em-blog-card">
                <img src="${article.image}" class="em-blog-img" alt="${article.title}">
                <div class="em-blog-body">
                    <span class="em-blog-category">${article.category}</span>
                    <h3 class="em-blog-title">${article.title}</h3>
                    <p class="em-blog-excerpt">${article.excerpt}</p>
                    <a href="#" class="em-read-more">Read More →</a>
                    <div class="em-blog-meta">
                        <img src="${article.authorImg}" class="em-blog-author-img" alt="${article.author}">
                        <div>
                            <div class="em-blog-author-name">${article.author}</div>
                            <div class="em-blog-date">${article.date}</div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    `).join('');
}

// Pagination
function initPagination() {
    const pagination = document.getElementById('blogPagination');
    if (!pagination) return;
    
    pagination.addEventListener('click', function(e) {
        e.preventDefault();
        const target = e.target.closest('.em-page-link');
        if (!target || target.classList.contains('disabled')) return;
        
        const page = target.dataset.page;
        
        if (page === 'prev') {
            if (currentPage > 1) currentPage--;
        } else if (page === 'next') {
            currentPage++;
        } else {
            currentPage = parseInt(page);
        }
        
        filterAndDisplayArticles();
        
        // Scroll to top of articles
        document.querySelector('.col-lg-8').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

function updatePagination(totalPages) {
    const pagination = document.getElementById('blogPagination');
    if (!pagination) return;
    
    let html = '';
    
    // Previous button
    html += `<a href="#" class="em-page-link ${currentPage === 1 ? 'disabled' : ''}" data-page="prev">
        <i class="bi bi-chevron-left"></i> Prev
    </a>`;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (totalPages > 5) {
            // Show first, last, current and neighbors
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                html += `<a href="#" class="em-page-link ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                html += `<span class="em-page-link disabled">...</span>`;
            }
        } else {
            html += `<a href="#" class="em-page-link ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
        }
    }
    
    // Next button
    html += `<a href="#" class="em-page-link ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}" data-page="next">
        Next <i class="bi bi-chevron-right"></i>
    </a>`;
    
    pagination.innerHTML = html;
}

// Newsletter
function initNewsletter() {
    const btn = document.getElementById('newsletterBtn');
    const emailInput = document.getElementById('newsletterEmail');
    
    if (btn && emailInput) {
        btn.addEventListener('click', function() {
            const email = emailInput.value.trim();
            
            if (!email) {
                showToast('Please enter your email address', 'warning');
                return;
            }
            
            if (!isValidEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            // Save to localStorage
            const subscribers = JSON.parse(localStorage.getItem('emNewsletterSubscribers') || '[]');
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('emNewsletterSubscribers', JSON.stringify(subscribers));
            }
            
            emailInput.value = '';
            showToast('Successfully subscribed to newsletter!', 'success');
        });
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast(message, type = 'info') {
    // Use existing toast function from main.js if available
    if (typeof emShowToast === 'function') {
        emShowToast(message, type);
        return;
    }
    
    // Fallback toast
    const toast = document.createElement('div');
    toast.className = `em-toast em-toast-${type}`;
    toast.innerHTML = `
        <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#ffd700'};
        color: ${type === 'success' || type === 'error' ? '#fff' : '#000'};
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
