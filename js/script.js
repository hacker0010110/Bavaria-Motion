// DOM 
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const registerBtn = document.getElementById('register-btn');
const registerModal = document.getElementById('register-modal');
const closeButtons = document.querySelectorAll('.close');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const registerForm = document.getElementById('register-form');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Shopping cart data
let cart = [];

// Load cart from localStorage if available
window.addEventListener('DOMContentLoaded', function () {
    const savedCart = localStorage.getItem('bmwCart');
    if (savedCart) {
        try {
            const parsed = JSON.parse(savedCart);
            if (Array.isArray(parsed)) {
                cart = parsed.filter(item => item && item.price != null && item.quantity != null);
            }
        } catch (e) {
            console.error("Cart corrompu, reset...", e);
            localStorage.removeItem('bmwCart');
        }
        updateCart();
    }

    // Set minimum date for date inputs to today
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => input.min = today);
});

// Open cart modal
if (cartIcon) {
    cartIcon.addEventListener('click', function (e) {
        e.preventDefault();
        cartModal.style.display = 'block';
    });
}

// Open register modal
if (registerBtn) {
    registerBtn.addEventListener('click', function (e) {
        e.preventDefault();
        registerModal.style.display = 'block';
    });
}

// Close modals
closeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
    });
});
window.addEventListener('click', function (e) {
    document.querySelectorAll('.modal').forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Add to cart
addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);

        if (!id || !name || isNaN(price)) {
            console.warn("Élément invalide : ", { id, name, price });
            return;
        }

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        localStorage.setItem('bmwCart', JSON.stringify(cart));
        updateCart();
        showNotification(`${name} ajouté au panier`);
    });
});

// Update cart display
function updateCart() {
    if (!cartItems) return;

    cartItems.innerHTML = '';

    const cleanCart = cart.filter(item => item && item.price != null && item.quantity != null);
    if (cleanCart.length === 0) {
        cartItems.innerHTML = '<p>Votre panier est vide</p>';
    } else {
        cleanCart.forEach(function (item) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString()} € x ${item.quantity}</div>
                </div>
                <div class="cart-item-total">${(item.price * item.quantity).toLocaleString()} €</div>
                <div class="remove-item" data-id="${item.id}">×</div>
            `;

            cartItems.appendChild(cartItem);
        });

        document.querySelectorAll('.remove-item').forEach(function (button) {
            button.addEventListener('click', function () {
                removeFromCart(button.dataset.id);
            });
        });
    }

    const total = cleanCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (cartTotal) cartTotal.textContent = total.toLocaleString();

    const count = cleanCart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = count;
}

// Remove item from cart
function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        const item = cart[index];
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        localStorage.setItem('bmwCart', JSON.stringify(cart));
        updateCart();
    }
}

// Notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(function () {
        notification.classList.add('hide');
        setTimeout(() => document.body.removeChild(notification), 500);
    }, 3000);
}

// Register form validation
if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        if (password !== confirmPassword) {
            showNotification('Les mots de passe ne correspondent pas');
            return;
        }
        showNotification('Inscription réussie !');
        registerModal.style.display = 'none';
        registerForm.reset();
    });
}

// Search
if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') performSearch();
    });
}

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (!searchTerm) {
        showNotification('Veuillez entrer un terme de recherche');
        return;
    }

    const carCards = document.querySelectorAll('.car-card');
    let found = false;

    carCards.forEach(card => {
        const cardTitle = card.querySelector('h3').textContent.toLowerCase();
        if (cardTitle.includes(searchTerm)) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 0 20px rgba(0, 102, 177, 0.5)';
            found = true;

            setTimeout(() => {
                card.style.transform = '';
                card.style.boxShadow = '';
            }, 3000);
        }
    });

    if (!found) {
        showNotification(`Aucun résultat pour "${searchTerm}"`);
    }
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#' && document.querySelector(targetId)) {
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        }
    });
});
