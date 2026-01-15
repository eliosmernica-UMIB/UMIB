/* =============================================
   INVENTORY.JS - Car Inventory Page
   ============================================= */

// Inventory Data - 20 Luxury Cars
const inventoryData = [
    {
        id: 1001,
        make: "Ferrari 488 GTB",
        year: 2019,
        price: 275000,
        mileage: 8500,
        location: "Miami, FL",
        imageUrl: "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Stunning Ferrari 488 GTB with twin-turbo V8 engine producing 661 horsepower.",
        tags: ["Exotic", "Supercar", "V8"]
    },
    {
        id: 1002,
        make: "Lamborghini Aventador SVJ",
        year: 2020,
        price: 485000,
        mileage: 3200,
        location: "Los Angeles, CA",
        imageUrl: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Aggressive Aventador SVJ with naturally aspirated V12 engine.",
        tags: ["Exotic", "Supercar", "V12"]
    },
    {
        id: 1003,
        make: "Porsche 911 GT3 RS",
        year: 2023,
        price: 245000,
        mileage: 1800,
        location: "San Francisco, CA",
        imageUrl: "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Track-ready 911 GT3 RS with 4.0L flat-six producing 518 hp.",
        tags: ["Sports", "Performance", "Track"]
    },
    {
        id: 1004,
        make: "McLaren 720S Spider",
        year: 2021,
        price: 315000,
        mileage: 4500,
        location: "Las Vegas, NV",
        imageUrl: "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Breathtaking McLaren 720S Spider convertible with 710 hp.",
        tags: ["Exotic", "Convertible", "Supercar"]
    },
    {
        id: 1005,
        make: "Rolls-Royce Phantom VIII",
        year: 2022,
        price: 465000,
        mileage: 6200,
        location: "Beverly Hills, CA",
        imageUrl: "https://images.pexels.com/photos/3764386/pexels-photo-3764386.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Ultimate luxury sedan with starlight headliner and V12.",
        tags: ["Luxury", "Premium", "V12"]
    },
    {
        id: 1006,
        make: "Bentley Continental GT",
        year: 2021,
        price: 225000,
        mileage: 9800,
        location: "New York, NY",
        imageUrl: "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Elegant British grand tourer with W12 engine.",
        tags: ["Luxury", "Grand Tourer", "W12"]
    },
    {
        id: 1007,
        make: "Aston Martin DBS Superleggera",
        year: 2022,
        price: 335000,
        mileage: 5100,
        location: "Chicago, IL",
        imageUrl: "https://images.pexels.com/photos/3156482/pexels-photo-3156482.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "British GT with twin-turbo V12 producing 715 hp.",
        tags: ["Exotic", "Grand Tourer", "V12"]
    },
    {
        id: 1008,
        make: "Mercedes-AMG GT Black Series",
        year: 2021,
        price: 395000,
        mileage: 2800,
        location: "Miami, FL",
        imageUrl: "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Most powerful AMG V8 ever with 720 hp.",
        tags: ["Exotic", "Performance", "Track"]
    },
    {
        id: 1009,
        make: "BMW M8 Competition",
        year: 2023,
        price: 145000,
        mileage: 3500,
        location: "Dallas, TX",
        imageUrl: "https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "High-performance luxury coupe with 617 hp twin-turbo V8.",
        tags: ["Sports", "Luxury", "Performance"]
    },
    {
        id: 1010,
        make: "Audi R8 V10 Performance",
        year: 2022,
        price: 195000,
        mileage: 4200,
        location: "Seattle, WA",
        imageUrl: "https://images.pexels.com/photos/1231643/pexels-photo-1231643.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Mid-engine supercar with naturally aspirated V10.",
        tags: ["Exotic", "Supercar", "V10"]
    },
    {
        id: 1011,
        make: "Maserati MC20",
        year: 2023,
        price: 225000,
        mileage: 1500,
        location: "Phoenix, AZ",
        imageUrl: "https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Italian supercar with Nettuno twin-turbo V6 engine.",
        tags: ["Exotic", "Supercar", "V6"]
    },
    {
        id: 1012,
        make: "Nissan GT-R Nismo",
        year: 2021,
        price: 215000,
        mileage: 6800,
        location: "Denver, CO",
        imageUrl: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Japanese supercar with hand-built twin-turbo V6.",
        tags: ["Sports", "Performance", "JDM"]
    },
    {
        id: 1013,
        make: "Chevrolet Corvette Z06",
        year: 2023,
        price: 125000,
        mileage: 2100,
        location: "Houston, TX",
        imageUrl: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "American supercar with flat-plane crank V8.",
        tags: ["Sports", "American", "V8"]
    },
    {
        id: 1014,
        make: "Jaguar F-Type R",
        year: 2022,
        price: 115000,
        mileage: 7200,
        location: "Atlanta, GA",
        imageUrl: "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "British sports car with supercharged V8.",
        tags: ["Sports", "British", "V8"]
    },
    {
        id: 1015,
        make: "Lexus LC 500",
        year: 2023,
        price: 98000,
        mileage: 4800,
        location: "San Diego, CA",
        imageUrl: "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Luxury GT with naturally aspirated 5.0L V8.",
        tags: ["Luxury", "Grand Tourer", "V8"]
    },
    {
        id: 1016,
        make: "Porsche Taycan Turbo S",
        year: 2023,
        price: 185000,
        mileage: 3200,
        location: "Portland, OR",
        imageUrl: "https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Electric performance sedan with 750 hp.",
        tags: ["Electric", "Performance", "Luxury"]
    },
    {
        id: 1017,
        make: "Tesla Model S Plaid",
        year: 2023,
        price: 108000,
        mileage: 5500,
        location: "Austin, TX",
        imageUrl: "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Fastest accelerating production car with 1,020 hp.",
        tags: ["Electric", "Performance", "Tech"]
    },
    {
        id: 1018,
        make: "Ford GT",
        year: 2020,
        price: 750000,
        mileage: 1200,
        location: "Detroit, MI",
        imageUrl: "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Le Mans winning heritage with EcoBoost V6.",
        tags: ["Exotic", "Supercar", "Racing"]
    },
    {
        id: 1019,
        make: "Bugatti Chiron",
        year: 2019,
        price: 2950000,
        mileage: 800,
        location: "Beverly Hills, CA",
        imageUrl: "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Hypercar with quad-turbo W16 producing 1,500 hp.",
        tags: ["Hypercar", "Exotic", "W16"]
    },
    {
        id: 1020,
        make: "Pagani Huayra",
        year: 2018,
        price: 2400000,
        mileage: 1500,
        location: "Miami, FL",
        imageUrl: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Italian hypercar masterpiece with AMG V12.",
        tags: ["Hypercar", "Exotic", "V12"]
    }
];

// Store car data for modal
let carDataStore = {};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inventory page loaded, rendering', inventoryData.length, 'cars');
    renderInventory(inventoryData);
    updateResultCount(inventoryData.length);
    populateBrandFilter();
    updateCartBadge();
    
    // Set up event listeners for filters
    const searchInput = document.getElementById('searchInput');
    const brandFilter = document.getElementById('brandFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (searchInput) searchInput.addEventListener('input', filterCars);
    if (brandFilter) brandFilter.addEventListener('change', filterCars);
    if (priceFilter) priceFilter.addEventListener('change', filterCars);
    if (sortFilter) sortFilter.addEventListener('change', filterCars);
});

// Render car cards
function renderInventory(cars) {
    const grid = document.getElementById('carGrid');
    console.log('Rendering cars to grid:', grid);
    grid.innerHTML = '';
    
    if (cars.length === 0) {
        grid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-car-front" style="font-size: 4rem; color: #ccc;"></i>
                <h4 class="mt-3">No vehicles found</h4>
                <p class="text-muted">Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    cars.forEach((car, index) => {
        const brand = car.make.split(' ')[0].toLowerCase();
        const badge = getBadge(car.tags);
        
        // Store for modal
        carDataStore[car.id] = car;
        
        // Check if in wishlist
        const isWishlisted = typeof emIsInWishlist === 'function' && emIsInWishlist(car.id, 'car');
        const heartIcon = isWishlisted ? 'bi-heart-fill' : 'bi-heart';
        const wishlistClass = isWishlisted ? 'em-wishlisted' : '';
        
        const card = `
            <div class="col-lg-4 col-md-6">
                <div class="car-card position-relative">
                    <button class="em-wishlist-btn ${wishlistClass}" 
                            data-wishlist-id="${car.id}" 
                            data-wishlist-type="car"
                            onclick="emToggleWishlist(${car.id}, '${car.make.replace(/'/g, "\\'")}', ${car.price}, '${car.imageUrl}', 'car')">
                        <i class="bi ${heartIcon}"></i>
                    </button>
                    ${badge ? `<span class="car-badge ${badge.class}">${badge.text}</span>` : ''}
                    <div class="car-image">
                        <img src="${car.imageUrl}" alt="${car.make}" onerror="this.src='https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg'">
                    </div>
                    <div class="car-info">
                        <span class="car-year">${car.year}</span>
                        <h5 class="car-title">${car.make}</h5>
                        <p class="car-specs">${car.mileage.toLocaleString()} miles • ${car.location}</p>
                        <div class="car-tags">
                            ${car.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="car-price">$${car.price.toLocaleString()}</div>
                        <div class="car-actions">
                            <button class="btn em-btn-primary" onclick="addToCart(${car.id})">
                                <i class="bi bi-cart-plus me-1"></i> Add to Cart
                            </button>
                            <button class="btn btn-outline-dark" onclick="openModal(${car.id})">
                                <i class="bi bi-eye me-1"></i> Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', card);
    });
}

// Get badge based on tags
function getBadge(tags) {
    const tagStr = tags.join(' ').toLowerCase();
    if (tagStr.includes('hypercar')) return { text: 'Hypercar', class: 'badge-hot' };
    if (tagStr.includes('exotic')) return { text: 'Exotic', class: 'badge-exotic' };
    if (tagStr.includes('luxury')) return { text: 'Luxury', class: 'badge-luxury' };
    if (tagStr.includes('electric')) return { text: 'Electric', class: 'badge-electric' };
    return null;
}

// Update result count
function updateResultCount(count) {
    const resultEl = document.getElementById('resultCount');
    if (resultEl) {
        resultEl.textContent = count + (count === 1 ? ' Vehicle' : ' Vehicles');
    }
}

// Populate brand filter dynamically from data
function populateBrandFilter() {
    const select = document.getElementById('brandFilter');
    // Clear existing options except first
    select.innerHTML = '<option value="">All Brands</option>';
    
    const brands = [...new Set(inventoryData.map(car => car.make.split(' ')[0]))].sort();
    brands.forEach(brand => {
        select.innerHTML += `<option value="${brand.toLowerCase()}">${brand}</option>`;
    });
}

// Filter cars - FIXED
function filterCars() {
    const search = document.getElementById('searchInput').value.toLowerCase().trim();
    const brand = document.getElementById('brandFilter').value.toLowerCase();
    const price = document.getElementById('priceFilter').value;
    const sort = document.getElementById('sortFilter').value;
    
    let filtered = [...inventoryData];
    
    // Search filter
    if (search) {
        filtered = filtered.filter(car => 
            car.make.toLowerCase().includes(search) ||
            car.description.toLowerCase().includes(search) ||
            car.location.toLowerCase().includes(search) ||
            car.tags.some(t => t.toLowerCase().includes(search))
        );
    }
    
    // Brand filter
    if (brand && brand !== 'all') {
        filtered = filtered.filter(car => car.make.toLowerCase().startsWith(brand));
    }
    
    // Price filter
    if (price && price !== 'all') {
        const [min, max] = price.split('-').map(Number);
        filtered = filtered.filter(car => car.price >= min && car.price <= max);
    }
    
    // Sort
    if (sort) {
        switch(sort) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filtered.sort((a, b) => a.make.localeCompare(b.make));
                break;
            case 'year-new':
                filtered.sort((a, b) => b.year - a.year);
                break;
            case 'year-old':
                filtered.sort((a, b) => a.year - b.year);
                break;
            case 'mileage-low':
                filtered.sort((a, b) => a.mileage - b.mileage);
                break;
            case 'mileage-high':
                filtered.sort((a, b) => b.mileage - a.mileage);
                break;
        }
    }
    
    renderInventory(filtered);
    updateResultCount(filtered.length);
    
    // Show/hide no results message
    const noResults = document.getElementById('noResults');
    const carGrid = document.getElementById('carGrid');
    if (noResults) {
        if (filtered.length === 0) {
            noResults.classList.remove('d-none');
            carGrid.classList.add('d-none');
        } else {
            noResults.classList.add('d-none');
            carGrid.classList.remove('d-none');
        }
    }
}

// Reset filters - FIXED
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('brandFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('sortFilter').value = '';
    renderInventory(inventoryData);
    updateResultCount(inventoryData.length);
    
    const noResults = document.getElementById('noResults');
    const carGrid = document.getElementById('carGrid');
    if (noResults) {
        noResults.classList.add('d-none');
        carGrid.classList.remove('d-none');
    }
}

// Open modal
function openModal(id) {
    const car = carDataStore[id];
    if (!car) return;
    
    document.getElementById('modalTitle').textContent = car.make;
    document.getElementById('modalImg').src = car.imageUrl;
    document.getElementById('modalPrice').textContent = '$' + car.price.toLocaleString();
    document.getElementById('modalDesc').textContent = car.description;
    
    // Set specs
    const specSpeed = document.getElementById('specSpeed');
    const specAccel = document.getElementById('specAccel');
    const specEngine = document.getElementById('specEngine');
    if (specSpeed) specSpeed.textContent = '300+ km/h';
    if (specAccel) specAccel.textContent = '3.2s';
    if (specEngine) specEngine.textContent = car.tags.find(t => t.includes('V') || t.includes('W')) || 'High Performance';
    
    document.getElementById('modalAddToCart').onclick = () => {
        addToCart(id);
        bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
    };
    
    new bootstrap.Modal(document.getElementById('productModal')).show();
}

// Add to cart
function addToCart(id) {
    const car = carDataStore[id];
    if (!car) return;
    
    let cart = JSON.parse(localStorage.getItem('emCart')) || [];
    const existing = cart.find(item => item.id === 'car-' + id);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: 'car-' + id,
            name: car.make,
            price: car.price,
            image: car.imageUrl,
            type: 'Sale',
            quantity: 1
        });
    }
    
    localStorage.setItem('emCart', JSON.stringify(cart));
    updateCartBadge();
    
    // Show toast
    if (typeof emShowToast === 'function') {
        emShowToast('success', car.make + ' added to cart!');
    } else {
        showToast(car.make + ' added to cart!');
    }
}

// Update cart badge
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('emCart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('em-cart-count');
    if (badge) badge.textContent = count;
}

// Simple toast fallback
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<i class="bi bi-check-circle me-2"></i>${message}`;
    toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#28a745;color:white;padding:15px 25px;border-radius:10px;z-index:9999;animation:em-fade-up 0.3s ease;';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
