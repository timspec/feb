/* ============================================
   Valentine's Week - Shared JavaScript
   ============================================ */

// --- Floating Hearts ---
function createFloatingHearts() {
  const container = document.querySelector('.hearts-container');
  if (!container) return;

  const colors = ['#e63946', '#ff6b81', '#ff9eaa', '#ff477e', '#f4a261'];

  function spawnHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    const size = Math.random() * 20 + 12;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 8 + 8;
    const delay = Math.random() * 5;

    heart.style.left = left + '%';
    heart.style.animationDuration = duration + 's';
    heart.style.animationDelay = delay + 's';

    heart.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>`;

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, (duration + delay) * 1000);
  }

  // Spawn hearts periodically
  for (let i = 0; i < 8; i++) {
    setTimeout(() => spawnHeart(), i * 600);
  }
  setInterval(spawnHeart, 2000);
}

// --- Navbar Scroll Effect ---
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

// --- Mobile Navigation ---
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });
}

// --- Scroll Animations ---
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// --- Countdown Timer ---
function initCountdown() {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  const valentinesDay = new Date('2026-02-14T00:00:00');

  function updateCountdown() {
    const now = new Date();
    const diff = valentinesDay - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '0';
      document.getElementById('cd-hours').textContent = '0';
      document.getElementById('cd-minutes').textContent = '0';
      document.getElementById('cd-seconds').textContent = '0';

      const msg = document.getElementById('countdown-msg');
      if (msg) msg.textContent = "💖 Happy Valentine's Day! 💖";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = days;
    document.getElementById('cd-hours').textContent = hours;
    document.getElementById('cd-minutes').textContent = minutes;
    document.getElementById('cd-seconds').textContent = seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// --- Sparkle Effect on Click ---
function initSparkles() {
  document.addEventListener('click', (e) => {
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: ${['#e63946', '#ff6b81', '#f4a261', '#ff477e'][Math.floor(Math.random() * 4)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        animation: sparkleAnim 0.6s ease-out forwards;
      `;

      const angle = (Math.random() * 360) * (Math.PI / 180);
      const distance = Math.random() * 50 + 20;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      sparkle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 }
      ], {
        duration: 600,
        easing: 'ease-out'
      });

      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 600);
    }
  });
}

// --- Smooth Page Transitions ---
function initPageTransitions() {
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && !href.startsWith('http')) {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });
}

// --- Set Active Nav Link ---
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// --- Initialize Everything ---
document.addEventListener('DOMContentLoaded', () => {
  createFloatingHearts();
  initNavbar();
  initMobileNav();
  initScrollAnimations();
  initCountdown();
  initSparkles();
  initPageTransitions();
  setActiveNavLink();

  // Page fade in
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  });
});
