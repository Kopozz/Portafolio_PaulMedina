/* ========================================
   ANIMATIONS MODULE
   Scroll reveal, parallax, particles, cursor
   ======================================== */

(function() {
  'use strict';

  // ── Scroll Reveal with IntersectionObserver ──
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // ── Counter Animation ──
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  function animateCounter(el) {
    const target = el.getAttribute('data-count');
    const isPercent = target.includes('%');
    const hasPlus = target.includes('+');
    const numericValue = parseInt(target.replace(/[^0-9]/g, ''), 10);
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(eased * numericValue);

      el.textContent = current + (isPercent ? '%' : '') + (hasPlus ? '+' : '');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  // ── Particles ──
  function initParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;

    const count = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = (60 + Math.random() * 40) + '%';
      particle.style.setProperty('--duration', (6 + Math.random() * 10) + 's');
      particle.style.setProperty('--delay', (Math.random() * 8) + 's');
      particle.style.setProperty('--drift', (Math.random() * 40 - 20) + 'px');
      particle.style.setProperty('--max-opacity', (0.15 + Math.random() * 0.35).toFixed(2));
      particle.style.width = (1 + Math.random() * 2) + 'px';
      particle.style.height = particle.style.width;
      container.appendChild(particle);
    }
  }

  // ── Custom Cursor (Desktop only) ──
  function initCustomCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      dot.classList.add('active');
      ring.classList.add('active');
    });

    // Smooth ring follow
    function updateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      requestAnimationFrame(updateRing);
    }
    updateRing();

    // Hover effect on interactive elements
    const interactives = document.querySelectorAll('a, button, .project-card, .social-link, .carousel-item');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width = '48px';
        ring.style.height = '48px';
        ring.style.borderColor = 'rgba(74, 158, 255, 0.6)';
        dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(0.5)`;
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width = '32px';
        ring.style.height = '32px';
        ring.style.borderColor = 'rgba(74, 158, 255, 0.3)';
        dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(1)`;
      });
    });

    document.addEventListener('mouseleave', () => {
      dot.classList.remove('active');
      ring.classList.remove('active');
    });
  }

  // ── Navbar Scroll Effect ──
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ── Parallax on Hero (mouse) ──
  function initHeroParallax() {
    const heroTitle = document.getElementById('hero-title');
    const heroSub = document.getElementById('hero-subtitle');
    if (!heroTitle) return;

    document.addEventListener('mousemove', (e) => {
      const xFactor = (window.innerWidth / 2 - e.clientX) / 80;
      const yFactor = (window.innerHeight / 2 - e.clientY) / 80;

      if (heroTitle) {
        heroTitle.style.transform = `perspective(1000px) rotateY(${xFactor * 0.5}deg) rotateX(${yFactor * 0.5}deg)`;
      }
      if (heroSub) {
        heroSub.style.transform = `perspective(1000px) rotateY(${xFactor * 0.8}deg) rotateX(${yFactor * 0.8}deg)`;
      }
    });
  }

  // ── Magnetic Buttons ──
  function initMagneticButtons() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const buttons = document.querySelectorAll('.btn-primary, .navbar__link--cta');
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ── Smooth Scroll ──
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });

          // Close mobile menu if open
          const mobileMenu = document.querySelector('.mobile-menu');
          if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
          }
        }
      });
    });
  }

  // ── Mobile Menu ──
  function initMobileMenu() {
    const btn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('mobile-close-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      menu.classList.add('active');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    }
  }

  // ── Initialize All ──
  function init() {
    initScrollReveal();
    initCounters();
    initParticles();
    initNavbar();
    initHeroParallax();
    initSmoothScroll();
    initMobileMenu();

    // Delay cursor and magnetic to avoid jank on load
    setTimeout(() => {
      initCustomCursor();
      initMagneticButtons();
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
