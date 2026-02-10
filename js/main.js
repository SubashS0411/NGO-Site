document.addEventListener('DOMContentLoaded', () => {
  console.log('HopeBridge Premium loaded');

  /* ===============================
     Premium Page Loader
     =============================== */
  // Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  const createPageLoader = () => {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
      <div class="loader-content">
        <div class="loader-logo">
          <span class="logo-icon">🌍</span>
          <span class="logo-text">HopeBridge</span>
        </div>
        <div class="loader-bar">
          <div class="loader-progress"></div>
        </div>
        <div class="loader-text">Loading hope...</div>
      </div>
    `;
    loader.style.cssText = `
      position: fixed;
      inset: 0;
      background: linear-gradient(135deg, #0f4c5c 0%, #0a3a47 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      transition: opacity 0.6s cubic-bezier(0.65, 0, 0.35, 1), visibility 0.6s;
    `;

    const style = document.createElement('style');
    style.textContent = `
      #page-loader .loader-content { text-align: center; color: white; }
      #page-loader .loader-logo { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 30px; }
      #page-loader .logo-icon { font-size: 48px; animation: loaderPulse 1.5s ease-in-out infinite; }
      #page-loader .logo-text { font-size: 32px; font-weight: 700; font-family: 'Playfair Display', serif; letter-spacing: 2px; }
      #page-loader .loader-bar { width: 200px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 10px; overflow: hidden; margin: 0 auto; }
      #page-loader .loader-progress { height: 100%; width: 0; background: linear-gradient(90deg, #ff6b6b, #ffd166, #ff6b6b); background-size: 200% 100%; border-radius: 10px; animation: loaderProgress 1.5s ease forwards, shimmer 1.5s ease infinite; }
      #page-loader .loader-text { margin-top: 16px; font-size: 14px; opacity: 0.7; letter-spacing: 3px; text-transform: uppercase; }
      @keyframes loaderPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
      @keyframes loaderProgress { to { width: 100%; } }
      @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    `;
    document.head.appendChild(style);
    document.body.prepend(loader);

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        setTimeout(() => loader.remove(), 600);
      }, 800);
    });
  };
  createPageLoader();

  /* ===============================
     Custom Cursor
     =============================== */
  const createCustomCursor = () => {
    if (window.innerWidth < 768) return; // Skip on mobile

    const cursorDot = document.createElement('div');
    const cursorRing = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorRing.className = 'cursor-ring';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();

    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, [data-cursor]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorRing.style.borderColor = 'var(--accent)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.borderColor = 'var(--primary)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  };
  createCustomCursor(); // Enabled custom cursor

  /* ===============================
     Advanced Scroll Motion (Skew & Velocity)
     =============================== */
  // Use Lenis velocity to skew elements
  function updateScrollSkew(time) {
    const velocity = lenis.velocity;
    const skewAmount = velocity * 0.05; // Adjust sensitivity

    // Apply skew to images or specific sections
    const skewElements = document.querySelectorAll('.skew-on-scroll');
    skewElements.forEach(el => {
      el.style.transform = `skewY(${Math.max(Math.min(skewAmount, 5), -5)}deg) scale(1.02)`; // Clamp skew
      el.style.transition = 'transform 0.1s ease-out';
    });

    // Parallax for marked elements
    const parallaxElements = document.querySelectorAll('[data-speed]');
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-speed'));
      const yPos = -(window.scrollY * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  }

  // Hook into Lenis raf
  lenis.on('scroll', updateScrollSkew);

  /* ===============================
     Mobile Menu with Premium Animation
     =============================== */
  const mobileBtn = document.getElementById('mobile-menu-btn');
  let mobileMenu = null;

  if (mobileBtn) {
    mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.id = 'mobile-menu';
    // Determine initial transform based on direction
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    const initialTransform = isRTL ? '-translate-x-full' : 'translate-x-full';

    mobileMenu.className =
      `fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl z-[60] transform ${initialTransform} transition-all duration-500 ease-out flex flex-col pt-10 px-6 overflow-y-auto`;

    mobileMenu.innerHTML = `
      <div class="flex justify-end mb-8">
        <button id="close-menu" class="text-4xl text-secondary dark:text-white focus:outline-none transition-transform hover:rotate-90 duration-300">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="flex flex-col space-y-4 text-xl font-serif font-bold text-secondary dark:text-white stagger-children">
        <a href="index.html" class="menu-link p-4 rounded-2xl hover:bg-primary/10 transition-all duration-300 transform hover:translate-x-2">Home V1</a>
        <a href="index2.html" class="menu-link p-4 rounded-2xl hover:bg-primary/10 transition-all duration-300 transform hover:translate-x-2">Home V2</a>
        <a href="causes-grid.html" class="menu-link p-4 rounded-2xl hover:bg-primary/10 transition-all duration-300 transform hover:translate-x-2">Causes</a>
        <a href="about.html" class="menu-link p-4 rounded-2xl hover:bg-primary/10 transition-all duration-300 transform hover:translate-x-2">About Us</a>
        <a href="contact.html" class="menu-link p-4 rounded-2xl hover:bg-primary/10 transition-all duration-300 transform hover:translate-x-2">Contact</a>

        <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p class="text-sm font-sans font-bold text-gray-400 mb-4 uppercase tracking-wider">Dashboards</p>
          <a href="admin-dashboard.html" class="menu-sub-link flex items-center gap-3 p-4 rounded-2xl hover:bg-secondary/10 transition-all duration-300"><i class="fas fa-tachometer-alt text-primary"></i> Admin Dashboard</a>
          <a href="donor-dashboard.html" class="menu-sub-link flex items-center gap-3 p-4 rounded-2xl hover:bg-secondary/10 transition-all duration-300"><i class="fas fa-user text-primary"></i> User Dashboard</a>
        </div>

        <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p class="text-sm font-sans font-bold text-gray-400 mb-4 uppercase tracking-wider">Settings</p>
          <div class="flex items-center gap-4">
            <button id="mobile-theme-toggle" class="flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 transition-all duration-300">
              <i class="fas fa-moon dark:hidden"></i>
              <i class="fas fa-sun hidden dark:inline"></i>
              <span class="font-sans text-base">Theme</span>
            </button>
            <button id="mobile-rtl-toggle" class="flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-primary/10 transition-all duration-300">
              <i class="fas fa-globe"></i>
              <span class="font-sans text-base">RTL/LTR</span>
            </button>
          </div>
        </div>

        <div class="pt-4">
          <a href="login.html" class="block w-full text-center p-4 rounded-2xl bg-primary text-white font-sans font-bold hover:bg-primary-dark transition-all duration-300">Log In</a>
        </div>

      </div>
    `;

    document.body.appendChild(mobileMenu);

    const openMenu = () => {
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      if (isRTL) {
        mobileMenu.classList.remove('-translate-x-full');
      } else {
        mobileMenu.classList.remove('translate-x-full');
      }
      mobileMenu.classList.add('translate-x-0');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      if (isRTL) {
        mobileMenu.classList.add('-translate-x-full');
      } else {
        mobileMenu.classList.add('translate-x-full');
      }
      mobileMenu.classList.remove('translate-x-0');
      document.body.style.overflow = '';
    };

    mobileBtn.addEventListener('click', e => {
      e.stopPropagation();
      openMenu();
    });

    mobileMenu.querySelector('#close-menu').addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', closeMenu)
    );

    // Mobile theme toggle
    const mobileThemeToggle = mobileMenu.querySelector('#mobile-theme-toggle');
    if (mobileThemeToggle) {
      mobileThemeToggle.addEventListener('click', () => {
        if (typeof toggleTheme === 'function') {
          toggleTheme();
        } else {
          document.documentElement.classList.toggle('dark');
          localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        }
      });
    }

    // Mobile RTL toggle
    const mobileRTLToggle = mobileMenu.querySelector('#mobile-rtl-toggle');
    if (mobileRTLToggle) {
      mobileRTLToggle.addEventListener('click', () => {
        if (typeof toggleRTL === 'function') {
          toggleRTL();
        } else {
          const html = document.documentElement;
          const dir = html.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
          html.setAttribute('dir', dir);
          localStorage.setItem('hopebridge_dir', dir);
        }
        // Update mobile menu position after RTL toggle
        closeMenu();
        setTimeout(() => {
          const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
          mobileMenu.classList.remove('translate-x-full', '-translate-x-full', 'translate-x-0');
          mobileMenu.classList.add(isRTL ? '-translate-x-full' : 'translate-x-full');
        }, 100);
      });
    }
  }

  /* ===============================
     Premium Navbar Scroll Effect
     =============================== */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (navbar) {
      navbar.classList.toggle('navbar-scrolled', currentScroll > 50);

      // Hide/show navbar on scroll direction
      if (currentScroll > lastScroll && currentScroll > 200) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      lastScroll = currentScroll;
    }
  });

  /* ===============================
     Enhanced Scroll Reveal with Stagger
     =============================== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add stagger delay based on index within viewport
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '-50px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* ===============================
     Premium Counter Animation with Easing
     =============================== */
  const counterElements = document.querySelectorAll('.counter');

  const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

  const counterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = +el.dataset.target;
        const duration = 2500;
        const startTime = performance.now();

        const update = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeOutExpo(progress);
          const current = Math.floor(easedProgress * target);

          el.textContent = current.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target.toLocaleString() + '+';
            // Add celebration effect
            el.classList.add('animate-bounceIn');
          }
        };

        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counterElements.forEach(el => counterObserver.observe(el));

  /* ===============================
     Impact Calculator with Smooth Transitions
     =============================== */
  const slider = document.getElementById('impact-slider');
  const amountSpan = document.getElementById('donation-amount');
  const track = document.getElementById('slider-track');
  const thumb = document.getElementById('slider-thumb');
  const impactTitle = document.getElementById('impact-title');
  const impactDesc = document.getElementById('impact-desc');
  const impactIcon = document.getElementById('impact-icon');
  const impactImage = document.getElementById('impact-image');

  const impacts = [
    { min: 0, title: "1 School Kit", desc: "Provides basic stationary for one child.", icon: "✏️", img: "assets/education.jpg" },
    { min: 50, title: "5 School Kits", desc: "Learning materials for 5 children.", icon: "📚", img: "assets/education.jpg" },
    { min: 100, title: "Clean Water", desc: "Safe water for a family for 1 month.", icon: "💧", img: "assets/clean-water.jpg" },
    { min: 250, title: "Health Checkup", desc: "Medical screening for infants.", icon: "🩺", img: "assets/yemen-clinic.jpg" },
    { min: 400, title: "Community Garden", desc: "Seeds & tools for a village garden.", icon: "🌱", img: "assets/environment.jpg" }
  ];

  let currentImpact = null;

  if (slider) {
    slider.addEventListener('input', () => {
      const val = +slider.value;
      const percent = (val / slider.max) * 100;

      // Animate amount change
      animateValue(amountSpan, parseInt(amountSpan.textContent) || 0, val, 200);

      track.style.width = percent + '%';
      thumb.style.left = percent + '%';

      const impact = [...impacts].reverse().find(i => val >= i.min);
      if (impact && impact !== currentImpact) {
        currentImpact = impact;

        // Animate impact change
        const container = impactTitle.parentElement;
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';

        setTimeout(() => {
          impactTitle.textContent = impact.title;
          impactDesc.textContent = impact.desc;
          impactIcon.textContent = impact.icon;
          impactIcon.classList.add('animate-bounceIn');
          if (impactImage) {
            impactImage.style.opacity = '0';
            impactImage.src = impact.img;
            setTimeout(() => impactImage.style.opacity = '0.1', 100);
          }

          container.style.opacity = '1';
          container.style.transform = 'translateY(0)';
        }, 200);

        setTimeout(() => {
          impactIcon.classList.remove('animate-bounceIn');
        }, 800);
      }
    });
  }

  // Helper function to animate number values
  function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (range * easeOutExpo(progress)));
      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  /* ===============================
     Enhanced 3D Tilt Effect
     =============================== */
  document.querySelectorAll('[data-tilt]').forEach(el => {
    let rect, mouseX, mouseY;

    el.addEventListener('mouseenter', () => {
      rect = el.getBoundingClientRect();
      el.style.transition = 'transform 0.1s ease-out';
    });

    el.addEventListener('mousemove', e => {
      if (!rect) return;

      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      const rotateX = ((mouseY - rect.height / 2) / (rect.height / 2)) * -12;
      const rotateY = ((mouseX - rect.width / 2) / (rect.width / 2)) * 12;
      const brightness = 1 + ((mouseY / rect.height) * 0.1);

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      el.style.filter = `brightness(${brightness})`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.5s ease-out, filter 0.5s ease-out';
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      el.style.filter = 'brightness(1)';
      rect = null;
    });
  });

  /* ===============================
     Magnetic Button Effect
     =============================== */
  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  /* ===============================
     Smooth Parallax Effect
     =============================== */
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;

        document.querySelectorAll('.parallax-bg').forEach(bg => {
          const speed = bg.dataset.speed || 0.5;
          bg.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Parallax for images
        document.querySelectorAll('.img-parallax img').forEach(img => {
          const rect = img.getBoundingClientRect();
          const scrollPercent = (rect.top + rect.height / 2) / window.innerHeight;
          const offset = (scrollPercent - 0.5) * 50;
          img.style.transform = `translateY(${offset}px) scale(1.1)`;
        });

        ticking = false;
      });
      ticking = true;
    }
  });

  /* ===============================
     Progress Bar Animation
     =============================== */
  const progressBars = document.querySelectorAll('[data-progress]');

  const progressObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const progress = bar.dataset.progress || bar.style.width;
          bar.style.width = '0';

          setTimeout(() => {
            bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            bar.style.width = progress;
          }, 100);

          progressObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  progressBars.forEach(bar => progressObserver.observe(bar));

  /* ===============================
     Text Reveal Animation
     =============================== */
  const textReveals = document.querySelectorAll('.text-reveal');

  textReveals.forEach(text => {
    const words = text.textContent.split(' ');
    text.innerHTML = words.map(word =>
      `<span class="inline-block overflow-hidden"><span class="inline-block transform translate-y-full">${word}</span></span>`
    ).join(' ');
  });

  const textObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const spans = entry.target.querySelectorAll('span span');
          spans.forEach((span, i) => {
            setTimeout(() => {
              span.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
              span.style.transform = 'translateY(0)';
            }, i * 100);
          });
          textObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  textReveals.forEach(text => textObserver.observe(text));

  /* ===============================
     Smooth Scroll for Anchor Links
     =============================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* ===============================
     Image Lazy Loading with Fade
     =============================== */
  const lazyImages = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '0';
          img.src = img.dataset.src;
          img.onload = () => {
            img.style.transition = 'opacity 0.5s ease-out';
            img.style.opacity = '1';
          };
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: '50px' }
  );

  lazyImages.forEach(img => imageObserver.observe(img));

  /* ===============================
     Hover Card Shine Effect
     =============================== */
  document.querySelectorAll('.card-shine').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});

/* ===============================
   FAQ Toggle (Global)
   =============================== */
window.toggleFAQ = function (button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('i');

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
    icon.classList.remove('rotate-180');
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
    icon.classList.add('rotate-180');
  }
};

/* ===============================
   RTL Toggle
   =============================== */
function toggleRTL() {
  const html = document.documentElement;
  const dir = html.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
  html.setAttribute('dir', dir);
  localStorage.setItem('hopebridge_dir', dir);
}

if (localStorage.getItem('hopebridge_dir') === 'rtl') {
  document.documentElement.setAttribute('dir', 'rtl');
}
