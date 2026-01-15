/* =============================================
   GALLERY.JS - Gallery Page JavaScript (Enhanced)
   ============================================= */

// Gallery Data
const galleryData = [
    { img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1600', title: 'Bugatti Chiron Super Sport', category: 'Supercar' },
    { img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1600', title: 'Ferrari 250 GTO', category: 'Classic' },
    { img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1600', title: 'Ford Mustang GT500', category: 'American Muscle' },
    { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1600', title: 'Luxury Cabin', category: 'Interior' },
    { img: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&q=80&w=1600', title: 'Bugatti Chiron', category: 'Detail' },
    { img: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1600', title: 'Ferrari 488 Pista', category: 'Supercar' },
    { img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1600', title: 'Corvette C8 Z06', category: 'Supercar' },
    { img: 'https://images.unsplash.com/photo-1566024164372-0281f1133aa6?auto=format&fit=crop&q=80&w=1600', title: 'Mercedes 300SL Gullwing', category: 'Classic' },
    { img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1600', title: 'Audi R8 V10', category: 'Supercar' }
];

let currentIndex = 0;
let isTransitioning = false;

// Lightbox Functions - Enhanced with animations
function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Preload adjacent images for smoother navigation
    preloadAdjacentImages();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('closing');
    
    setTimeout(() => {
        lightbox.classList.remove('active', 'closing');
        document.body.style.overflow = '';
    }, 300);
}

function updateLightbox() {
    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const category = document.getElementById('lightbox-category');
    
    // Add fade effect
    img.style.opacity = '0';
    img.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        img.src = galleryData[currentIndex].img;
        title.textContent = galleryData[currentIndex].title;
        category.textContent = galleryData[currentIndex].category;
        
        // Fade in
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 150);
    
    // Update counter
    updateCounter();
}

function updateCounter() {
    const counter = document.getElementById('lightbox-counter');
    if (counter) {
        counter.textContent = `${currentIndex + 1} / ${galleryData.length}`;
    }
}

function preloadAdjacentImages() {
    const prevIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    const nextIndex = (currentIndex + 1) % galleryData.length;
    
    [prevIndex, nextIndex].forEach(idx => {
        const img = new Image();
        img.src = galleryData[idx].img;
    });
}

function prevImage() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateLightbox();
    
    setTimeout(() => {
        isTransitioning = false;
    }, 300);
}

function nextImage() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateLightbox();
    
    setTimeout(() => {
        isTransitioning = false;
    }, 300);
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (document.getElementById('lightbox').classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('lightbox')?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.getElementById('lightbox')?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextImage(); // Swipe left = next
        } else {
            prevImage(); // Swipe right = prev
        }
    }
}

// Filter Buttons - Enhanced with animation
document.querySelectorAll('.em-filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Update active state
        document.querySelectorAll('.em-filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        const items = document.querySelectorAll('.gallery-item');
        let visibleCount = 0;
        
        items.forEach((item, index) => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = '';
                item.style.animation = 'em-fade-up 0.4s ease forwards';
                item.style.animationDelay = `${visibleCount * 0.05}s`;
                visibleCount++;
            } else {
                item.style.animation = 'em-fade-out 0.3s ease forwards';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Show filter notification
        if (typeof emShowToast === 'function') {
            const filterName = filter === 'all' ? 'All Photos' : filter;
            emShowToast(`Showing: ${filterName}`, 'info');
        }
    });
});

// Cart Badge and Initialize
document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('emCart')) || [];
    const badge = document.getElementById('em-cart-count');
    if (badge) {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        badge.innerText = count;
    }
    updateUserNavigation();
    
    // Add entrance animations to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.08}s`;
    });
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('.gallery-item img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});
