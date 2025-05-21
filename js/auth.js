// Handle login/register tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update forms
            forms.forEach(form => {
                if (form.id === `${target}-form` || form.id === `${target}-form-page`) {
                    form.classList.add('active');
                } else {
                    form.classList.remove('active');
                }
            });
        });
    });
    
    // Handle login form submission
    const loginForm = document.querySelector('#login-form form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a notification
            showNotification(`Connexion réussie pour ${email}`);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
    
    // Handle register form submission
    const registerForm = document.querySelector('#register-form-page form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm').value;
            
            if (password !== confirmPassword) {
                showNotification('Les mots de passe ne correspondent pas');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a notification
            showNotification(`Compte créé pour ${name} (${email})`);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
});

// Show notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(function() {
        notification.classList.add('hide');
        setTimeout(function() {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}
