// Vitality.AI - Main JavaScript (English Only)

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initFormValidation();
  initDropdowns();
  initScrollTop();
  initDirectionToggle();
  initVideoModal();
});

// Toggle Dropdown Menu
function toggleDropdown(button) {
  const dropdown = button.parentElement;
  dropdown.classList.toggle('active');
  
  // Close other dropdowns
  document.querySelectorAll('.nav-dropdown').forEach(item => {
    if (item !== dropdown && item.classList.contains('active')) {
      item.classList.remove('active');
    }
  });
}

// Initialize Dropdowns
function initDropdowns() {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
}

// Direction Toggle (RTL/LTR)
function initDirectionToggle() {
  const savedDir = localStorage.getItem('vitality-direction') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);
  updateDirToggleUI(savedDir);
}

function toggleDirection() {
  const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
  const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
  
  document.documentElement.setAttribute('dir', newDir);
  localStorage.setItem('vitality-direction', newDir);
  updateDirToggleUI(newDir);
}

function updateDirToggleUI(dir) {
  // Update toggle button appearance based on direction
  const toggles = document.querySelectorAll('.dir-toggle');
  toggles.forEach(toggle => {
    // Add visual indicator for current direction
    toggle.title = `Toggle Text Direction (Current: ${dir.toUpperCase()})`;
    if (dir === 'rtl') {
      toggle.classList.add('rtl-active');
    } else {
      toggle.classList.remove('rtl-active');
    }
  });
}

// Dashboard Sidebar Toggle (for mobile)
function toggleDashboardSidebar() {
  const sidebar = document.querySelector('.dashboard-sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  
  if (sidebar) {
    sidebar.classList.toggle('active');
  }
  if (overlay) {
    overlay.classList.toggle('active');
  }
  
  // Prevent body scroll when sidebar is open
  if (sidebar && sidebar.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Close sidebar when clicking a link (mobile)
document.addEventListener('DOMContentLoaded', () => {
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      const sidebar = document.querySelector('.dashboard-sidebar');
      const overlay = document.querySelector('.sidebar-overlay');
      if (window.innerWidth <= 1024) {
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
});

// Video Modal
function initVideoModal() {
  // Create modal if it doesn't exist
  if (!document.querySelector('.video-modal')) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
      <div class="video-modal-content">
        <button class="video-modal-close" onclick="closeVideoModal()">
          <i class="ph ph-x"></i>
        </button>
        <video id="heroVideo" controls poster="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=700&fit=crop">
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Close modal on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeVideoModal();
      }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeVideoModal();
      }
    });
  }
}

function openVideoModal() {
  const modal = document.querySelector('.video-modal');
  const video = document.getElementById('heroVideo');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (video) {
      video.play();
    }
  }
}

function closeVideoModal() {
  const modal = document.querySelector('.video-modal');
  const video = document.getElementById('heroVideo');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }
}

// Initialize Navbar Scroll Effect
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Initialize Mobile Menu
function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!mobileToggle || !navMenu) return;
  
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// Initialize Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));
}

// Form Validation
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
          showError(input, 'This field is required');
        } else {
          input.classList.remove('error');
          removeError(input);
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            isValid = false;
            input.classList.add('error');
            showError(input, 'Please enter a valid email');
          }
        }
        
        // Phone validation
        if (input.type === 'tel' && input.value) {
          const phoneRegex = /^[\d\s\-\+\(\)]+$/;
          if (!phoneRegex.test(input.value)) {
            isValid = false;
            input.classList.add('error');
            showError(input, 'Please enter a valid phone number');
          }
        }
      });
      
      if (isValid) {
        handleFormSubmit(form);
      }
    });
    
    // Remove error on input
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        removeError(input);
      });
    });
  });
}

function showError(input, message) {
  removeError(input);
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.color = 'var(--color-accent)';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '0.25rem';
  errorDiv.textContent = message;
  input.parentElement.appendChild(errorDiv);
}

function removeError(input) {
  const errorDiv = input.parentElement.querySelector('.error-message');
  if (errorDiv) {
    errorDiv.remove();
  }
}

function handleFormSubmit(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="loader"></span>';
  
  // Simulate API call
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    showNotification('Success! Your form has been submitted.', 'success');
    form.reset();
  }, 2000);
}

// Initialize Scroll to Top Button
function initScrollTop() {
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (!scrollTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Notification System
function showNotification(message, type = 'success') {
  const existing = document.querySelector('.notification-toast');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = `notification-toast ${type}`;
  notification.style.position = 'fixed';
  notification.style.top = '100px';
  notification.style.right = '20px';
  notification.style.zIndex = '10000';
  notification.style.padding = '1rem 1.5rem';
  notification.style.minWidth = '300px';
  notification.style.background = 'white';
  notification.style.borderRadius = '12px';
  notification.style.boxShadow = '0 10px 40px rgba(0,0,0,0.15)';
  notification.style.display = 'flex';
  notification.style.alignItems = 'center';
  notification.style.gap = '12px';
  notification.style.animation = 'fadeInUp 0.3s ease';
  
  const colors = {
    success: 'var(--color-success)',
    error: 'var(--color-accent)',
    info: 'var(--color-primary)'
  };
  
  notification.style.borderLeft = `4px solid ${colors[type] || colors.info}`;
  notification.innerHTML = `
    <i class="ph ${type === 'success' ? 'ph-check-circle' : 'ph-warning-circle'}" style="font-size: 1.5rem; color: ${colors[type]}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Export for use in other modules
window.VitalityAI = {
  showNotification,
  toggleDropdown: toggleDropdown,
  debounce,
  throttle
};

// FAQ Accordion Toggle
document.addEventListener('DOMContentLoaded', () => {
  // Initialize FAQ accordions
  const faqCards = document.querySelectorAll('.premium-card[onclick*="expanded"]');
  faqCards.forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('expanded');
    });
  });
});

// Staggered Animation on Scroll
function initStaggerAnimations() {
  const staggerContainers = document.querySelectorAll('.stagger-container');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach((child, index) => {
          child.style.animationDelay = `${index * 0.1}s`;
          child.classList.add('animate-fade-up');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  staggerContainers.forEach(container => observer.observe(container));
}

// Initialize staggered animations
document.addEventListener('DOMContentLoaded', initStaggerAnimations);

// Parallax effect for floating particles
document.addEventListener('mousemove', (e) => {
  const particles = document.querySelectorAll('.particle');
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  particles.forEach((particle, index) => {
    const speed = (index % 3 + 1) * 10;
    const x = (mouseX - 0.5) * speed;
    const y = (mouseY - 0.5) * speed;
    particle.style.transform = `translate(${x}px, ${y}px)`;
  });
});

