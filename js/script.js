// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('artistForm');
    const successMessage = document.getElementById('success-message');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div class="loading"></div> Submitting...';
            submitBtn.disabled = true;
            
            // Hide form and show success message after submission
            setTimeout(() => {
                form.style.display = 'none';
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth' });
            }, 2000);
        });
    }
    
    // Form validation enhancements
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        
        // Remove existing error styling
        field.classList.remove('error');
        
        // Basic validation
        if (field.hasAttribute('required') && !value) {
            field.classList.add('error');
            return false;
        }
            // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('error');
                return false;
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                field.classList.add('error');
                return false;
            }
        }
        
        return true;
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'linear-gradient(135deg, rgba(255, 107, 53, 0.95), rgba(247, 147, 30, 0.95))';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #ff6b35, #f7931e)';
        navbar.style.backdropFilter = 'none';
    }
});

// Animate cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const nav = document.querySelector('.navbar nav');
    nav.classList.toggle('mobile-active');
}

// Form field animations
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Consent checkbox animation
const consentCheckbox = document.getElementById('consent-checkbox');
if (consentCheckbox) {
    consentCheckbox.addEventListener('change', function() {
        const icon = document.querySelector('.consent-icon');
        if (this.checked) {
            icon.style.color = '#28a745';
            icon.classList.add('fa-check-circle');
            icon.classList.remove('fa-circle');
        } else {
            icon.style.color = '#6c757d';
            icon.classList.add('fa-circle');
            icon.classList.remove('fa-check-circle');
        }
    });
}

// Auto-resize textarea
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});

// Form progress indicator
function updateFormProgress() {
    const form = document.getElementById('artistForm');
    if (!form) return;
    
    const requiredFields = form.querySelectorAll('[required]');
    const filledFields = Array.from(requiredFields).filter(field => {
        if (field.type === 'checkbox') {
            return field.checked;
        }
        return field.value.trim() !== '';
    });
    
    const progress = (filledFields.length / requiredFields.length) * 100;
    
    // Update progress bar if exists
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}
// Prevent zoom on input focus (iOS)
document.addEventListener('touchstart', function() {}, true);

// Handle orientation change
window.addEventListener('orientationchange', function() {
  setTimeout(function() {
    window.scrollTo(0, 0);
  }, 500);
});

// Responsive font loading
if ('fonts' in document) {
  document.fonts.ready.then(function() {
    document.body.classList.add('fonts-loaded');
  });
}

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
  document.head.appendChild(script);
}

// Handle form submission on mobile
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('artistForm');
  if (form) {
    form.addEventListener('submit', function() {
      // Prevent double submission on slow networks
      const submitBtn = form.querySelector('.submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      }
    });
  }
});

// Add event listeners for form progress
document.querySelectorAll('#artistForm [required]').forEach(field => {
    field.addEventListener('input', updateFormProgress);
    field.addEventListener('change', updateFormProgress);
});

// Initialize form progress
updateFormProgress();

// Smooth form submission with better UX
function handleFormSubmission() {
    const form = document.getElementById('artistForm');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (form && submitBtn) {
        form.addEventListener('submit', function(e) {
            // Validate all fields before submission
            const isValid = validateAllFields();
            
            if (!isValid) {
                e.preventDefault();
                showNotification('कृपया सभी आवश्यक फ़ील्ड भरें | Please fill all required fields', 'error');
                return;
            }
            
            // Show loading state
            submitBtn.innerHTML = '<div class="loading"></div> पंजीकरण हो रहा है... | Registering...';
            submitBtn.disabled = true;
            
            // Show success message after delay
            setTimeout(() => {
                showSuccessMessage();
            }, 2000);
        });
    }
}

function validateAllFields() {
    const requiredFields = document.querySelectorAll('#artistForm [required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function showSuccessMessage() {
    const form = document.getElementById('artistForm');
    const successMessage = document.getElementById('success-message');
    
    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth' });
        
        // Add confetti effect
        createConfetti();
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Simple confetti effect
function createConfetti() {
    const colors = ['#ff6b35', '#f7931e', '#ffcc02', '#28a745', '#007bff'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}vw;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                z-index: 1000;
                pointer-events: none;
                animation: confetti-fall 3s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, i * 50);
    }
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', function() {
    handleFormSubmission();
});

// Add CSS for notifications and confetti
const additionalStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 1001;
        max-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.error {
        border-left: 4px solid #dc3545;
        color: #dc3545;
    }
    
    .notification.info {
        border-left: 4px solid #007bff;
        color: #007bff;
    }
    
    @keyframes confetti-fall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .form-group.focused label {
        color: #ff6b35;
        transform: scale(0.9);
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #dc3545;
        background-color: #fff5f5;
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
