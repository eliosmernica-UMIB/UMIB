/* =============================================
   RENT.JS - Car Rental Page JavaScript (Enhanced v3)
   Fetches data from /api/rent.json
   ============================================= */

// Store rental data
let rentalsData = [];
let rentalsDataStore = {};
let selectedCar = null;

// DOM Elements - will be set after DOM loads
let startDateInput, endDateInput, priceDisplay, totalDisplay, discountRow, discountDisplay, placeholderDiv, previewDiv;

// Initialize DOM references
function initDOMElements() {
    startDateInput = document.getElementById('em-start-date');
    endDateInput = document.getElementById('em-end-date');
    priceDisplay = document.getElementById('em-price-display');
    totalDisplay = document.getElementById('em-total-display');
    discountRow = document.getElementById('em-discount-row');
    discountDisplay = document.getElementById('em-discount-display');
    placeholderDiv = document.getElementById('car-placeholder');
    previewDiv = document.getElementById('car-preview');
}

// Set Min Date to Today
function initDateInputs() {
    const today = new Date().toISOString().split('T')[0];
    if (startDateInput) {
        startDateInput.setAttribute('min', today);
        startDateInput.value = today;
        startDateInput.addEventListener('change', function() {
            if (endDateInput) {
                endDateInput.setAttribute('min', this.value);
                if (endDateInput.value && new Date(endDateInput.value) <= new Date(this.value)) {
                    endDateInput.value = '';
                }
            }
            calculateTotal();
        });
    }
    if (endDateInput) {
        endDateInput.setAttribute('min', today);
        endDateInput.addEventListener('change', calculateTotal);
    }
}

// --- Rental Cars Data (embedded for file:// compatibility) ---
const rentalCarsData = [
    {
        id: 2001,
        make: "Lamborghini Huracan EVO",
        year: 2023,
        price_per_day: 1499,
        location: "Miami, FL",
        imageUrl: "https://images.pexels.com/photos/3156482/pexels-photo-3156482.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Experience the thrill of a naturally aspirated V10 with 631 hp.",
        tags: ["Exotic", "V10", "Convertible"]
    },
    {
        id: 2002,
        make: "Ferrari 488 Spider",
        year: 2022,
        price_per_day: 1699,
        location: "Los Angeles, CA",
        imageUrl: "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Twin-turbo V8 convertible supercar with the top down.",
        tags: ["Exotic", "Convertible", "V8"]
    },
    {
        id: 2003,
        make: "Porsche 911 Turbo S",
        year: 2023,
        price_per_day: 999,
        location: "San Francisco, CA",
        imageUrl: "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Iconic German sports car with 640 hp AWD.",
        tags: ["Sports", "AWD", "Performance"]
    },
    {
        id: 2004,
        make: "McLaren 570S",
        year: 2021,
        price_per_day: 1299,
        location: "Las Vegas, NV",
        imageUrl: "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "British supercar engineering with twin-turbo V8.",
        tags: ["Exotic", "Supercar", "V8"]
    },
    {
        id: 2005,
        make: "Rolls-Royce Dawn",
        year: 2022,
        price_per_day: 1899,
        location: "Beverly Hills, CA",
        imageUrl: "https://images.pexels.com/photos/3764386/pexels-photo-3764386.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Ultimate luxury convertible experience with V12 power.",
        tags: ["Luxury", "Convertible", "V12"]
    },
    {
        id: 2006,
        make: "Bentley Continental GTC",
        year: 2023,
        price_per_day: 1399,
        location: "New York, NY",
        imageUrl: "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Grand touring convertible with W12 power.",
        tags: ["Luxury", "Convertible", "W12"]
    },
    {
        id: 2007,
        make: "Aston Martin DB11 Volante",
        year: 2022,
        price_per_day: 1199,
        location: "Chicago, IL",
        imageUrl: "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "James Bond worthy British convertible with V8.",
        tags: ["Luxury", "Convertible", "V8"]
    },
    {
        id: 2008,
        make: "Mercedes-AMG GT Roadster",
        year: 2023,
        price_per_day: 899,
        location: "Austin, TX",
        imageUrl: "https://images.pexels.com/photos/3593922/pexels-photo-3593922.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "German engineering meets open-air thrills.",
        tags: ["Sports", "Convertible", "V8"]
    },
    {
        id: 2009,
        make: "BMW M850i Convertible",
        year: 2022,
        price_per_day: 699,
        location: "Seattle, WA",
        imageUrl: "https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Bavarian luxury meets V8 power.",
        tags: ["Luxury", "Convertible", "V8"]
    },
    {
        id: 2010,
        make: "Audi R8 Spyder",
        year: 2023,
        price_per_day: 1099,
        location: "Denver, CO",
        imageUrl: "https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Mid-engine V10 supercar with open-top excitement.",
        tags: ["Exotic", "Convertible", "V10"]
    },
    {
        id: 2011,
        make: "Chevrolet Corvette Stingray",
        year: 2023,
        price_per_day: 499,
        location: "Atlanta, GA",
        imageUrl: "https://images.pexels.com/photos/4062477/pexels-photo-4062477.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Americas mid-engine supercar with V8 soundtrack.",
        tags: ["Sports", "Performance", "V8"]
    },
    {
        id: 2012,
        make: "Ford Mustang GT Premium",
        year: 2023,
        price_per_day: 299,
        location: "Detroit, MI",
        imageUrl: "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Classic American muscle with modern tech.",
        tags: ["Muscle", "Convertible", "V8"]
    },
    {
        id: 2013,
        make: "Nissan GT-R Premium",
        year: 2022,
        price_per_day: 599,
        location: "Phoenix, AZ",
        imageUrl: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Legendary Godzilla with twin-turbo V6 and AWD.",
        tags: ["Performance", "JDM", "AWD"]
    },
    {
        id: 2014,
        make: "Maserati GranTurismo",
        year: 2023,
        price_per_day: 799,
        location: "Orlando, FL",
        imageUrl: "https://images.pexels.com/photos/3954431/pexels-photo-3954431.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Italian grand touring with Ferrari-derived V6.",
        tags: ["Luxury", "Grand Tourer", "Italian"]
    },
    {
        id: 2015,
        make: "Jaguar F-Type R",
        year: 2022,
        price_per_day: 549,
        location: "San Diego, CA",
        imageUrl: "https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "British sports car with supercharged V8.",
        tags: ["Sports", "Convertible", "V8"]
    },
    {
        id: 2016,
        make: "Porsche 718 Boxster GTS",
        year: 2023,
        price_per_day: 449,
        location: "Portland, OR",
        imageUrl: "https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Pure driving joy with mid-engine turbo.",
        tags: ["Sports", "Convertible", "Turbo"]
    },
    {
        id: 2017,
        make: "Mercedes-Maybach S680",
        year: 2023,
        price_per_day: 1599,
        location: "Dallas, TX",
        imageUrl: "https://images.pexels.com/photos/3608542/pexels-photo-3608542.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Pinnacle of automotive luxury with V12 power.",
        tags: ["Luxury", "Premium", "V12"]
    },
    {
        id: 2018,
        make: "Tesla Model S Plaid",
        year: 2023,
        price_per_day: 399,
        location: "San Jose, CA",
        imageUrl: "https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Fastest accelerating production sedan with 1020 hp.",
        tags: ["Electric", "Performance", "Sedan"]
    },
    {
        id: 2019,
        make: "Range Rover SVAutobiography",
        year: 2023,
        price_per_day: 899,
        location: "Aspen, CO",
        imageUrl: "https://images.pexels.com/photos/3874338/pexels-photo-3874338.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Ultimate luxury SUV with V8 supercharged power.",
        tags: ["Luxury", "SUV", "V8"]
    },
    {
        id: 2020,
        make: "Lamborghini Urus",
        year: 2023,
        price_per_day: 1199,
        location: "Scottsdale, AZ",
        imageUrl: "https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Super SUV with twin-turbo V8 producing 641 hp.",
        tags: ["Exotic", "SUV", "V8"]
    }
];

// Load rentals data
function loadRentals() {
    const fleetGrid = document.getElementById('fleetGrid');
    if (!fleetGrid) return;
    
    rentalsData = rentalCarsData;
    renderRentals(rentalsData);
}

// Render rental cards
function renderRentals(rentals) {
    const fleetGrid = document.getElementById('fleetGrid');
    if (!fleetGrid || !rentals.length) return;
    
    fleetGrid.innerHTML = '';
    
    rentals.forEach((car, index) => {
        // Store car data for modal
        rentalsDataStore[car.id] = car;
        
        // Use tags for features display
        const tagsHTML = car.tags ? car.tags.map(t => `<small>${t}</small>`).join(' • ') : '';
        // All cars are available since there's no availability field
        const isAvailable = true;
        
        // Check if in wishlist
        const isWishlisted = typeof emIsInWishlist === 'function' && emIsInWishlist(car.id, 'rental');
        const heartIcon = isWishlisted ? 'bi-heart-fill' : 'bi-heart';
        const wishlistClass = isWishlisted ? 'em-wishlisted' : '';
        
        const cardHTML = `
            <div class="col-lg-4 col-md-6">
                <div class="fleet-card position-relative">
                    <button class="em-wishlist-btn ${wishlistClass}" 
                            data-wishlist-id="${car.id}" 
                            data-wishlist-type="rental"
                            onclick="emToggleWishlist(${car.id}, '${car.make.replace(/'/g, "\\'")}', ${car.price_per_day}, '${car.imageUrl}', 'rental')"
                            style="top: 50px;">
                        <i class="bi ${heartIcon}"></i>
                    </button>
                    <span class="status-badge bg-available">Available</span>
                    <img src="${car.imageUrl}" alt="${car.make}" onerror="this.src='https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg'">
                    <div class="fleet-card-body">
                        <span class="car-category">${car.year} Model</span>
                        <h5>${car.make}</h5>
                        <div class="car-specs">
                            <div class="spec-item">
                                <span>📍</span>
                                <small>${car.location}</small>
                            </div>
                        </div>
                        <div class="car-features text-muted small mb-2">
                            ${tagsHTML}
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="daily-rate">$${car.price_per_day.toLocaleString()} <span>/ day</span></div>
                            <div class="btn-group btn-group-sm">
                                <button class="btn btn-outline-dark" onclick="openRentalModal(${car.id})">
                                    <i class="bi bi-eye"></i> Details
                                </button>
                                <button class="btn em-btn-primary" 
                                    onclick="selectCar('${car.make.replace(/'/g, "\\'")}', ${car.price_per_day}, '${car.imageUrl}', ${isAvailable}, this)">
                                    Select
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        fleetGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// 1. Function to handle selecting a car - Enhanced
function selectCar(name, rate, image, isAvailable, btnElement) {
    // Check Availability First
    if (!isAvailable) {
        document.getElementById('unavailable-car-name').innerText = name;
        const modal = new bootstrap.Modal(document.getElementById('unavailableModal'));
        modal.show();
        return;
    }

    selectedCar = { name, rate, image };
    
    // Switch UI with animation
    if (placeholderDiv) {
        placeholderDiv.style.display = 'none';
    }
    if (previewDiv) {
        previewDiv.style.display = 'flex';
        previewDiv.style.animation = 'em-fade-up 0.4s ease forwards';
    }
    
    // Update Preview - Image with better URL
    const previewImg = document.getElementById('preview-img');
    const previewName = document.getElementById('preview-name');
    const previewRate = document.getElementById('preview-rate');
    
    if (previewImg) {
        // Use larger image for the preview
        const largeImage = image.replace('w=200', 'w=800').replace('w=600', 'w=800');
        previewImg.src = largeImage;
    }
    if (previewName) previewName.innerText = name;
    if (previewRate) previewRate.innerText = `$${rate.toLocaleString()}`;
    
    // Highlight selected card - remove from all first
    document.querySelectorAll('.fleet-card').forEach(card => {
        card.classList.remove('em-selected');
    });
    
    // Add selected class to clicked card
    if (btnElement) {
        const card = btnElement.closest('.fleet-card');
        if (card) card.classList.add('em-selected');
    }
    
    // Recalculate
    calculateTotal();
    
    // Show success toast
    if (typeof emShowToast === 'function') {
        emShowToast(`${name} selected!`, 'success');
    }
    
    // Scroll to booking form
    setTimeout(() => {
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
}

// 2. Remove Car - Enhanced
function removeCar() {
    selectedCar = null;
    
    if (previewDiv) {
        previewDiv.style.animation = 'em-fade-out 0.3s ease forwards';
        setTimeout(() => {
            previewDiv.style.display = 'none';
            if (placeholderDiv) {
                placeholderDiv.style.display = 'flex';
                placeholderDiv.style.animation = 'em-fade-up 0.3s ease forwards';
            }
        }, 300);
    }
    
    if (priceDisplay) priceDisplay.innerHTML = 'Select a car and dates to see pricing';
    if (totalDisplay) totalDisplay.innerHTML = '$0';
    if (discountRow) discountRow.style.display = 'none';
    
    // Remove selected state from cards
    document.querySelectorAll('.fleet-card').forEach(card => {
        card.classList.remove('em-selected');
    });
    
    if (typeof emShowToast === 'function') {
        emShowToast('Car removed', 'info');
    }
}

// Open Rental Car Details Modal
function openRentalModal(id) {
    const car = rentalsDataStore[id];
    if (!car) return;
    
    // Update modal content
    document.getElementById('rentalModalImg').src = car.imageUrl;
    document.getElementById('rentalModalTitle').textContent = car.make;
    document.getElementById('rentalModalPrice').textContent = `$${car.price_per_day.toLocaleString()}`;
    document.getElementById('rentalModalDesc').textContent = car.description || 'Premium rental vehicle with exceptional performance.';
    document.getElementById('rentalModalYear').textContent = car.year;
    document.getElementById('rentalModalLocation').textContent = car.location;
    document.getElementById('rentalModalTags').textContent = car.tags ? car.tags.join(', ') : 'Luxury';
    
    // Setup select button
    const selectBtn = document.getElementById('rentalModalSelect');
    selectBtn.onclick = function() {
        bootstrap.Modal.getInstance(document.getElementById('rentalDetailModal')).hide();
        selectCar(car.make, car.price_per_day, car.imageUrl, true, null);
    };
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('rentalDetailModal'));
    modal.show();
}

// 3. Calculator - Enhanced with more details
function calculateTotal() {
    const startDate = startDateInput?.value;
    const endDate = endDateInput?.value;
    
    if (selectedCar && startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        if (end > start) {
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            const subtotal = diffDays * selectedCar.rate;
            
            // Calculate discount for longer rentals
            let discount = 0;
            let discountPercent = 0;
            if (diffDays >= 7) {
                discountPercent = 15;
                discount = subtotal * 0.15;
            } else if (diffDays >= 3) {
                discountPercent = 5;
                discount = subtotal * 0.05;
            }
            
            const total = subtotal - discount;
            
            // Update price display
            if (priceDisplay) {
                priceDisplay.innerHTML = `
                    <span class="d-block">${selectedCar.name}</span>
                    <span class="text-muted" style="font-size: 0.85rem;">
                        $${selectedCar.rate.toLocaleString()}/day × ${diffDays} days
                    </span>
                `;
            }
            
            // Show discount if applicable
            if (discountRow && discountDisplay) {
                if (discount > 0) {
                    discountRow.style.display = 'flex';
                    discountDisplay.innerHTML = `-$${discount.toLocaleString()} (${discountPercent}% off)`;
                } else {
                    discountRow.style.display = 'none';
                }
            }
            
            // Update total with animation
            if (totalDisplay) {
                totalDisplay.innerHTML = `$${total.toLocaleString()}`;
                totalDisplay.style.animation = 'em-pulse 0.3s ease';
            }
            
        } else {
            if (priceDisplay) {
                priceDisplay.innerHTML = '<span class="text-danger"><i class="bi bi-exclamation-triangle me-2"></i>Return date must be after pick-up date</span>';
            }
            if (totalDisplay) totalDisplay.innerHTML = '$0';
            if (discountRow) discountRow.style.display = 'none';
        }
    } else if (!selectedCar) {
        if (priceDisplay) priceDisplay.innerHTML = '<i class="bi bi-car-front me-2"></i>Please select a car first';
        if (totalDisplay) totalDisplay.innerHTML = '$0';
        if (discountRow) discountRow.style.display = 'none';
    } else {
        if (priceDisplay) priceDisplay.innerHTML = '<i class="bi bi-calendar3 me-2"></i>Select dates to see total';
        if (totalDisplay) totalDisplay.innerHTML = '$0';
        if (discountRow) discountRow.style.display = 'none';
    }
}

// 4. Booking Submission - Enhanced
function handleBooking() {
    if (!selectedCar) {
        if (typeof emShowToast === 'function') {
            emShowToast('Please select a car first', 'warning');
        } else {
            alert('Please select a car first');
        }
        return;
    }

    const startDate = startDateInput?.value;
    const endDate = endDateInput?.value;
    
    if (!startDate || !endDate) {
        if (typeof emShowToast === 'function') {
            emShowToast('Please select pickup and return dates', 'warning');
        }
        return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
        if (typeof emShowToast === 'function') {
            emShowToast('Return date must be after pickup date', 'error');
        }
        return;
    }

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    // Calculate with discount
    let subtotal = diffDays * selectedCar.rate;
    let discount = 0;
    if (diffDays >= 7) {
        discount = subtotal * 0.15;
    } else if (diffDays >= 3) {
        discount = subtotal * 0.05;
    }
    const totalCost = subtotal - discount;

    // Add to cart
    const rentalId = 'rent-' + Date.now();
    let cart = JSON.parse(localStorage.getItem('emCart')) || [];
    cart.push({
        id: rentalId,
        name: `${selectedCar.name} (${diffDays} Days Rental)`,
        price: totalCost,
        image: selectedCar.image.replace('w=200', 'w=400'),
        type: 'Rental',
        quantity: 1,
        details: {
            startDate: startDate,
            endDate: endDate,
            dailyRate: selectedCar.rate,
            days: diffDays
        }
    });
    localStorage.setItem('emCart', JSON.stringify(cart));
    
    // Update cart count in navbar
    const badge = document.getElementById('em-cart-count');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.innerText = totalItems;
        badge.classList.add('em-pulse-badge');
        setTimeout(() => badge.classList.remove('em-pulse-badge'), 300);
    }

    // Show success modal
    const modalEl = document.getElementById('bookingModal');
    if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        const modalDate = document.getElementById('modal-date');
        if (modalDate) modalDate.innerText = new Date().toLocaleDateString();
        modal.show();
    }
}

// Initialize user navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM element references
    initDOMElements();
    initDateInputs();
    
    if (typeof updateUserNavigation === 'function') {
        updateUserNavigation();
    }
    
    // Update cart badge
    const cart = JSON.parse(localStorage.getItem('emCart')) || [];
    const badge = document.getElementById('em-cart-count');
    if (badge) {
        badge.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    // Load rentals from JSON
    loadRentals();
});
