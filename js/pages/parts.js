/* =============================================
   PARTS.JS - Parts Page JavaScript (Enhanced v2)
   Car Parts Data embedded for file:// compatibility
   ============================================= */

// Store parts data
let partsData = [];
let partsDataStore = {};
let currentFilter = 'all';

// --- Car Parts Data (embedded) ---
const carPartsDataSource = [
    {
        id: 3001,
        name: "Brembo GT Big Brake Kit",
        fits: ["Ferrari 488", "Lamborghini Huracan", "Porsche 911"],
        price: 4500,
        supplier: "Brembo Performance",
        imageUrl: "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "6-piston front calipers with 380mm rotors for improved stopping power.",
        tags: ["Brakes", "Performance", "Track"]
    },
    {
        id: 3002,
        name: "Akrapovic Titanium Exhaust",
        fits: ["Porsche 911 GT3", "BMW M3", "Audi RS6"],
        price: 8900,
        supplier: "Akrapovic",
        imageUrl: "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Full titanium construction with carbon fiber tips.",
        tags: ["Exhaust", "Performance", "Titanium"]
    },
    {
        id: 3003,
        name: "Michelin Pilot Sport Cup 2",
        fits: ["Universal Performance", "Track Day", "Supercars"],
        price: 1800,
        supplier: "Michelin Motorsport",
        imageUrl: "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Set of 4 track-focused tires for maximum grip.",
        tags: ["Tires", "Performance", "Track"]
    },
    {
        id: 3004,
        name: "KW V3 Coilover Suspension",
        fits: ["BMW M4", "Mercedes-AMG C63", "Audi RS5"],
        price: 3200,
        supplier: "KW Suspensions",
        imageUrl: "https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Adjustable damping for track and street use.",
        tags: ["Suspension", "Performance", "Adjustable"]
    },
    {
        id: 3005,
        name: "HRE P101 Forged Wheels",
        fits: ["Ferrari", "Lamborghini", "McLaren", "Porsche"],
        price: 12000,
        supplier: "HRE Performance Wheels",
        imageUrl: "https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Set of 4 lightweight forged aluminum wheels.",
        tags: ["Wheels", "Forged", "Premium"]
    },
    {
        id: 3006,
        name: "AWE Tuning Intercooler",
        fits: ["Audi S4", "Audi S5", "Porsche Macan Turbo"],
        price: 2400,
        supplier: "AWE Tuning",
        imageUrl: "https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Bar and plate design for maximum cooling.",
        tags: ["Cooling", "Performance", "Turbo"]
    },
    {
        id: 3007,
        name: "Capristo Carbon Fiber Diffuser",
        fits: ["Ferrari 488", "Ferrari F8", "Ferrari Roma"],
        price: 6500,
        supplier: "Capristo",
        imageUrl: "https://images.pexels.com/photos/3807353/pexels-photo-3807353.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "OEM-quality carbon fiber construction.",
        tags: ["Aero", "Carbon Fiber", "Ferrari"]
    },
    {
        id: 3008,
        name: "Eventuri Carbon Intake System",
        fits: ["BMW M3", "BMW M4", "BMW M2"],
        price: 1800,
        supplier: "Eventuri",
        imageUrl: "https://images.pexels.com/photos/3807281/pexels-photo-3807281.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Carbon fiber cold air intake with heat shield.",
        tags: ["Intake", "Carbon Fiber", "BMW"]
    },
    {
        id: 3009,
        name: "Recaro Sportster GT Seats",
        fits: ["Universal", "All Sports Cars", "Track Cars"],
        price: 3800,
        supplier: "Recaro Automotive",
        imageUrl: "https://images.pexels.com/photos/3807375/pexels-photo-3807375.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Pair of FIA-approved bucket seats.",
        tags: ["Interior", "Seats", "Track"]
    },
    {
        id: 3010,
        name: "APR Performance Carbon Wing",
        fits: ["Porsche 911", "BMW M4", "Nissan GT-R"],
        price: 2200,
        supplier: "APR Performance",
        imageUrl: "https://images.pexels.com/photos/3807311/pexels-photo-3807311.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "GTC-300 adjustable carbon wing for downforce.",
        tags: ["Aero", "Carbon Fiber", "Track"]
    },
    {
        id: 3011,
        name: "Stoptech Slotted Rotors",
        fits: ["Chevrolet Corvette", "Ford Mustang GT", "Dodge Challenger"],
        price: 850,
        supplier: "StopTech",
        imageUrl: "https://images.pexels.com/photos/3807426/pexels-photo-3807426.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Front and rear slotted rotor set.",
        tags: ["Brakes", "Performance", "American"]
    },
    {
        id: 3012,
        name: "Bilstein B16 PSS10 Coilovers",
        fits: ["Audi RS3", "VW Golf R", "Seat Leon Cupra"],
        price: 2800,
        supplier: "Bilstein",
        imageUrl: "https://images.pexels.com/photos/3807392/pexels-photo-3807392.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "10-way adjustable damping with ride height adjustment.",
        tags: ["Suspension", "Coilovers", "German"]
    },
    {
        id: 3013,
        name: "Borla ATAK Cat-Back Exhaust",
        fits: ["Ford Mustang GT", "Chevrolet Camaro SS", "Dodge Charger"],
        price: 1600,
        supplier: "Borla Performance",
        imageUrl: "https://images.pexels.com/photos/3807445/pexels-photo-3807445.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Aggressive American muscle sound in T-304 stainless.",
        tags: ["Exhaust", "American", "Performance"]
    },
    {
        id: 3014,
        name: "Pagid RSL Racing Brake Pads",
        fits: ["Porsche GT3", "Ferrari 458", "Lamborghini Gallardo"],
        price: 1200,
        supplier: "Pagid Racing",
        imageUrl: "https://images.pexels.com/photos/3807462/pexels-photo-3807462.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Front and rear race compound pads.",
        tags: ["Brakes", "Racing", "Track"]
    },
    {
        id: 3015,
        name: "Novitec Power Module",
        fits: ["Ferrari F8 Tributo", "Ferrari 812", "Ferrari Roma"],
        price: 5500,
        supplier: "Novitec",
        imageUrl: "https://images.pexels.com/photos/3807478/pexels-photo-3807478.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "ECU tuning module with up to 100hp gains.",
        tags: ["Tuning", "ECU", "Ferrari"]
    },
    {
        id: 3016,
        name: "H&R Sport Springs",
        fits: ["Mercedes C-Class", "BMW 3 Series", "Audi A4"],
        price: 350,
        supplier: "H&R Special Springs",
        imageUrl: "https://images.pexels.com/photos/3807495/pexels-photo-3807495.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Progressive rate sport springs with 1 inch drop.",
        tags: ["Suspension", "Springs", "German"]
    },
    {
        id: 3017,
        name: "K&N High-Flow Air Filter",
        fits: ["Universal", "Most Makes and Models"],
        price: 89,
        supplier: "K&N Engineering",
        imageUrl: "https://images.pexels.com/photos/3807512/pexels-photo-3807512.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Washable and reusable performance filter.",
        tags: ["Intake", "Filter", "Universal"]
    },
    {
        id: 3018,
        name: "Sparco QRT-R Racing Harness",
        fits: ["Track Cars", "Race Cars", "Universal"],
        price: 450,
        supplier: "Sparco",
        imageUrl: "https://images.pexels.com/photos/3807528/pexels-photo-3807528.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "6-point FIA-approved racing harness.",
        tags: ["Safety", "Racing", "Interior"]
    },
    {
        id: 3019,
        name: "Fabspeed Performance X-Pipe",
        fits: ["Ferrari 458", "Ferrari California", "Ferrari FF"],
        price: 3200,
        supplier: "Fabspeed Motorsport",
        imageUrl: "https://images.pexels.com/photos/3807545/pexels-photo-3807545.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "T304 stainless X-pipe for enhanced exhaust flow.",
        tags: ["Exhaust", "Ferrari", "Performance"]
    },
    {
        id: 3020,
        name: "OMP Racing Steering Wheel",
        fits: ["Track Cars", "Race Cars", "Universal Hub"],
        price: 650,
        supplier: "OMP Racing",
        imageUrl: "https://images.pexels.com/photos/3807561/pexels-photo-3807561.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Suede-covered race wheel with flat bottom.",
        tags: ["Interior", "Racing", "Steering"]
    }
];

// Load parts data
function loadParts() {
    const partsGrid = document.getElementById('partsGrid');
    if (!partsGrid) return;
    
    partsData = carPartsDataSource;
    renderParts(partsData);
    updatePartsCount(partsData.length);
}

// Render parts cards
function renderParts(parts) {
    const partsGrid = document.getElementById('partsGrid');
    if (!partsGrid) return;
    
    if (!parts.length) {
        partsGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-box-seam" style="font-size: 3rem; color: #ccc;"></i>
                <h4 class="mt-3">No parts found</h4>
                <p class="text-muted">Try adjusting your filters</p>
            </div>
        `;
        return;
    }
    
    partsGrid.innerHTML = '';
    
    parts.forEach((part, index) => {
        // Get category from tags (first tag or 'Parts')
        const category = part.tags && part.tags.length > 0 ? part.tags[0] : 'Parts';
        const fitsText = part.fits ? part.fits.join(', ') : 'Universal';
        const mainImage = part.imageUrl || 'https://images.pexels.com/photos/97079/pexels-photo-97079.jpeg';
        // All parts are in stock since there's no inStock field
        const stockStatus = '<span class="part-stock in-stock">In Stock</span>';
        
        // Store part data for modal
        partsDataStore[part.id] = part;
        
        // Check if in wishlist
        const isWishlisted = typeof emIsInWishlist === 'function' && emIsInWishlist(part.id, 'part');
        const heartIcon = isWishlisted ? 'bi-heart-fill' : 'bi-heart';
        const wishlistClass = isWishlisted ? 'em-wishlisted' : '';
        
        const cardHTML = `
            <div class="col-lg-3 col-md-6 part-item" data-category="${category.toLowerCase()}" data-name="${part.name}" data-fits="${fitsText}">
                <div class="part-card position-relative">
                    <button class="em-wishlist-btn ${wishlistClass}" 
                            data-wishlist-id="${part.id}" 
                            data-wishlist-type="part"
                            onclick="emToggleWishlist(${part.id}, '${part.name.replace(/'/g, "\\'")}', ${part.price}, '${mainImage}', 'part')">
                        <i class="bi ${heartIcon}"></i>
                    </button>
                    <div class="part-img-container">
                        <img src="${mainImage}" class="part-img" alt="${part.name}" onerror="this.src='https://images.pexels.com/photos/97079/pexels-photo-97079.jpeg'">
                    </div>
                    <div class="part-card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="part-category">${category}</span>
                            ${stockStatus}
                        </div>
                        <h5>${part.name}</h5>
                        <p class="fits">Fits: ${fitsText}</p>
                        <p class="text-muted small mb-2">${part.supplier || ''}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="part-price">$${part.price.toLocaleString()}</span>
                            <div class="btn-group btn-group-sm">
                                <button class="btn btn-outline-dark" onclick="openPartModal(${part.id})">
                                    <i class="bi bi-eye"></i>
                                </button>
                                <button class="btn em-btn-primary" 
                                    onclick="addPartToCart('p${part.id}', '${part.name.replace(/'/g, "\\'")}', ${part.price}, '${mainImage}', '${category}')">
                                    <i class="bi bi-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        partsGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Update parts count display
function updatePartsCount(count) {
    const countEl = document.getElementById('parts-count');
    if (countEl) {
        countEl.textContent = count === 1 ? '1 Part Found' : `${count} Parts Found`;
    }
}

// Filter parts by category
function filterParts(category) {
    currentFilter = category.toLowerCase();
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    buttons.forEach(btn => {
        btn.classList.remove('active');
        const btnText = btn.textContent.toLowerCase();
        if ((category === 'all' && btnText === 'all parts') || btnText.includes(category.toLowerCase())) {
            btn.classList.add('active');
        }
    });
    
    // Filter from original data using tags
    let filteredParts;
    if (category === 'all') {
        filteredParts = partsData;
    } else {
        filteredParts = partsData.filter(part => {
            if (!part.tags) return false;
            return part.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()));
        });
    }
    
    renderParts(filteredParts);
    updatePartsCount(filteredParts.length);
    
    if (typeof emShowToast === 'function') {
        const filterName = category === 'all' ? 'All Parts' : category.charAt(0).toUpperCase() + category.slice(1);
        emShowToast(`Showing: ${filterName}`, 'info');
    }
}

// Search parts
function searchParts() {
    const searchInput = document.getElementById('parts-search');
    const searchTerm = searchInput?.value.toLowerCase().trim() || '';
    
    let filteredParts = partsData;
    
    // Apply category filter using tags
    if (currentFilter !== 'all') {
        filteredParts = filteredParts.filter(part => {
            if (!part.tags) return false;
            return part.tags.some(tag => tag.toLowerCase().includes(currentFilter));
        });
    }
    
    // Apply search filter
    if (searchTerm) {
        filteredParts = filteredParts.filter(part => 
            part.name.toLowerCase().includes(searchTerm) ||
            (part.tags && part.tags.some(t => t.toLowerCase().includes(searchTerm))) ||
            (part.fits && part.fits.some(f => f.toLowerCase().includes(searchTerm))) ||
            (part.supplier && part.supplier.toLowerCase().includes(searchTerm))
        );
    }
    
    renderParts(filteredParts);
    updatePartsCount(filteredParts.length);
}

// Add part to cart
function addPartToCart(id, name, price, image, category) {
    let cart = JSON.parse(localStorage.getItem('emCart')) || [];
    
    const existingItem = cart.find(item => item.id === id && item.type === 'Part');
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            type: 'Part',
            category: category,
            quantity: 1
        });
    }
    
    localStorage.setItem('emCart', JSON.stringify(cart));
    
    const badge = document.getElementById('em-cart-count');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.innerText = totalItems;
        badge.classList.add('em-pulse-badge');
        setTimeout(() => badge.classList.remove('em-pulse-badge'), 300);
    }
    
    if (typeof emShowToast === 'function') {
        emShowToast(`${name} added to cart!`, 'success');
    }
}

// Open part details modal
function openPartModal(id) {
    const part = partsDataStore[id];
    if (!part) return;
    
    const category = part.tags && part.tags.length > 0 ? part.tags[0] : 'Parts';
    const fitsText = part.fits ? part.fits.join(', ') : 'Universal';
    const mainImage = part.imageUrl || 'https://images.pexels.com/photos/97079/pexels-photo-97079.jpeg';
    
    document.getElementById('partModalImg').src = mainImage;
    document.getElementById('partModalTitle').textContent = part.name;
    document.getElementById('partModalPrice').textContent = '$' + part.price.toLocaleString();
    document.getElementById('partModalDesc').textContent = part.description || 'High-quality automotive part for performance and reliability.';
    document.getElementById('partModalCategory').textContent = category;
    document.getElementById('partModalFits').textContent = fitsText;
    document.getElementById('partModalSupplier').textContent = part.supplier || 'OEM Quality';
    
    document.getElementById('partModalAddToCart').onclick = () => {
        addPartToCart('p' + part.id, part.name, part.price, mainImage, category);
        bootstrap.Modal.getInstance(document.getElementById('partModal')).hide();
    };
    
    new bootstrap.Modal(document.getElementById('partModal')).show();
}

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

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    if (typeof updateUserNavigation === 'function') {
        updateUserNavigation();
    }
    
    // Update cart badge
    const cart = JSON.parse(localStorage.getItem('emCart')) || [];
    const badge = document.getElementById('em-cart-count');
    if (badge) {
        badge.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    // Load parts from JSON
    loadParts();
    
    // Add debounced search
    const searchInput = document.getElementById('parts-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(searchParts, 300));
    }
    
    // Category cards click handler
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryText = this.querySelector('h5')?.textContent;
            if (categoryText) {
                const category = categoryText.toLowerCase().split(' ')[0];
                filterParts(category);
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
