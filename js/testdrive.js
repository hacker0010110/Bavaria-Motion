
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date to today
    const dateInput = document.getElementById('td-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
    
    // Pre-fill model if provided in URL
    const urlParams = new URLSearchParams(window.location.search);
    const modelParam = urlParams.get('model');
    if (modelParam) {
        const modelSelect = document.getElementById('td-model');
        if (modelSelect && modelSelect.querySelector(`option[value="${modelParam}"]`)) {
            modelSelect.value = modelParam;
        }
    }
    
    // Handle form submission
    const testDriveForm = document.getElementById('testdrive-reservation');
    if (testDriveForm) {
        testDriveForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const model = document.getElementById('td-model').value;
            const date = document.getElementById('td-date').value;
            const time = document.getElementById('td-time').value;
            const name = document.getElementById('td-name').value;
            const email = document.getElementById('td-email').value;
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a notification and redirect
            
            const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            
            const message = `Essai réservé pour ${name} : ${document.getElementById('td-model').options[document.getElementById('td-model').selectedIndex].text} le ${formattedDate} à ${time}.`;
            
            showNotification(message);
            
            // Simulate redirect after successful submission
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
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
