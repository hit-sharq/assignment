// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Form validation and submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  // Basic validation
  if (!name || !email || !message) {
    showAlert('Please fill in all fields', 'error');
    return;
  }
  
  if (!validateEmail(email)) {
    showAlert('Please enter a valid email address', 'error');
    return;
  }
  
  // Store in localStorage
  const contactData = { name, email, message };
  localStorage.setItem('contactMessage', JSON.stringify(contactData));
  
  // Show success message
  showAlert('Your message has been sent successfully!', 'success');
  
  // Reset form
  this.reset();
});

// Email validation helper
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Alert notification
function showAlert(message, type) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert ${type}`;
  alertDiv.appendChild(document.createTextNode(message));
  
  const contactSection = document.getElementById('contact');
  contactSection.insertBefore(alertDiv, contactSection.firstChild);
  
  // Remove alert after 3 seconds
  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}

// Animate elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.skill-card, .project-card');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Set initial state for animation
document.querySelectorAll('.skill-card, .project-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Trigger animation on page load
window.addEventListener('load', animateOnScroll);
  