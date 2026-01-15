/* =============================================
   CONTACT.JS - Contact Page JavaScript (Enhanced)
   ============================================= */

// Form Validation with Formspree submission
(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        // Add focus animations to inputs
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('em-focused');
            });
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('em-focused');
            });
        });
        
        form.addEventListener('submit', async event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
                
                // Show error toast
                if (typeof emShowToast === 'function') {
                    emShowToast('Please fill in all required fields', 'error');
                }
            } else {
                event.preventDefault();
                
                // Show loading state on button
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
                submitBtn.disabled = true;
                
                // Submit to Formspree
                try {
                    const formData = new FormData(form);
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        // Show success toast
                        if (typeof emShowToast === 'function') {
                            emShowToast('Message sent successfully! We\'ll respond within 24 hours.', 'success');
                        } else {
                            alert('Message Sent Successfully! We will get back to you within 24 hours.');
                        }
                        
                        // Reset form and remove validation classes
                        form.reset();
                        form.classList.remove('was-validated');
                        
                        // Remove validation styling from all inputs
                        form.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
                            el.classList.remove('is-invalid', 'is-valid');
                        });
                    } else {
                        throw new Error('Form submission failed');
                    }
                } catch (error) {
                    // Show error toast
                    if (typeof emShowToast === 'function') {
                        emShowToast('Failed to send message. Please try again.', 'error');
                    } else {
                        alert('Failed to send message. Please try again.');
                    }
                }
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
            form.classList.add('was-validated')
        }, false)
    })
})()

// Live chat button animation
document.addEventListener('DOMContentLoaded', () => {
    updateUserNavigation();
    
    // Add animation to contact cards
    const contactCards = document.querySelectorAll('.em-contact-card');
    contactCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add character counter to message textarea
    const messageInput = document.getElementById('message');
    if (messageInput) {
        const maxLength = 1000;
        const counter = document.createElement('small');
        counter.className = 'text-muted float-end mt-1';
        counter.textContent = `0/${maxLength}`;
        messageInput.parentElement.appendChild(counter);
        
        messageInput.addEventListener('input', function() {
            counter.textContent = `${this.value.length}/${maxLength}`;
            if (this.value.length > maxLength * 0.9) {
                counter.classList.add('text-warning');
            } else {
                counter.classList.remove('text-warning');
            }
        });
    }
});
