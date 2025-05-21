
// DOM elements
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

// Shopping cart data
let cart = [];

// Open cart modal when clicking on the cart icon
cartIcon.addEventListener('click', function(e) {
    e.preventDefault();
    cartModal.style.display = 'block';
});

// Open registration modal when clicking on register button
registerBtn.addEventListener('click', function(e) {
    e.preventDefault();
    registerModal.style.display = 'block';
});

// Close modals when clicking on X button
closeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        cartModal.style.display = 'none';
        registerModal.style.display = 'none';
    });
});

// Close modals when clicking outside of them
window.addEventListener('click', function(e) {
    if (e.target === cartModal || e.target === registerModal) {
        cartModal.style.display = 'none';
        registerModal.style.display = 'none';
    }
});

// Add to cart functionality
addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        
        // Check if item is already in cart
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: id,
                name: name,
                price: price,
                quantity: 1
            });
        }
        
        // Update cart UI
        updateCart();
        
        // Show confirmation
        showNotification(`${name} ajouté au panier`);
    });
});

// Update cart UI
function updateCart() {
    // Update cart items display
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Votre panier est vide</p>';
    } else {
        cart.forEach(function(item) {
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
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(function(button) {
            button.addEventListener('click', function() {
                removeFromCart(button.dataset.id);
            });
        });
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toLocaleString();
    
    // Update cart count
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
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
        
        updateCart();
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Add styles to the notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#0066B1';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1000';
    notification.style.transition = 'opacity 0.5s';
    
    // Remove notification after 3 seconds
    setTimeout(function() {
        notification.style.opacity = '0';
        setTimeout(function() {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Form validation
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (password !== confirmPassword) {
        showNotification('Les mots de passe ne correspondent pas');
        return;
    }
    
    // Simulate form submission
    showNotification('Inscription réussie !');
    registerModal.style.display = 'none';
    registerForm.reset();
});

// Initialize cart
updateCart();

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
