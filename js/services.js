document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date to today
    const dateInput = document.getElementById('service-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
    
    // Handle form submission
    const serviceForm = document.getElementById('service-form');
    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const serviceType = document.getElementById('service-type').value;
            const serviceName = document.getElementById('service-type').options[document.getElementById('service-type').selectedIndex].text;
            const model = document.getElementById('service-model').value;
            const date = document.getElementById('service-date').value;
            const time = document.getElementById('service-time').value;
            const name = document.getElementById('service-name').value;
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a notification
            
            const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            
            const message = `Rendez-vous confirmé pour ${serviceName} sur ${model} le ${formattedDate} à ${time}.`;
            
            showNotification(message);
            
            // Reset form after successful submission
            serviceForm.reset();
        });
    }
    
    // Add event listeners to service buttons
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get service type from parent element
            const serviceCard = this.closest('.service-card');
            const serviceTitle = serviceCard.querySelector('h3').textContent;
            
            // Scroll to the appointment form
            const appointmentSection = document.querySelector('.service-appointment');
            if (appointmentSection) {
                appointmentSection.scrollIntoView({behavior: 'smooth'});
                
                // Pre-select the service in the dropdown
                const serviceTypeSelect = document.getElementById('service-type');
                if (serviceTypeSelect) {
                    Array.from(serviceTypeSelect.options).forEach(option => {
                        if (option.text === serviceTitle) {
                            serviceTypeSelect.value = option.value;
                        }
                    });
                }
            }
        });
    });
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
