/* ========================================
   CAROUSEL MODULE
   Infinite logo carousels + image slider
   ======================================== */

(function() {
  'use strict';

  // ── Language & Framework Logos ──
  const LANG_LOGOS = [
    { name: 'JavaScript', icon: 'fab fa-js-square' },
    { name: 'Python',     icon: 'fab fa-python' },
    { name: 'TypeScript', icon: 'fas fa-code' },
    { name: 'Java',       icon: 'fab fa-java' },
    { name: 'React',      icon: 'fab fa-react' },
    { name: 'Node.js',    icon: 'fab fa-node-js' },
    { name: 'PHP',        icon: 'fab fa-php' },
    { name: 'Swift',      icon: 'fab fa-swift' },
    { name: 'Go',         icon: 'fas fa-wind' },
    { name: 'Rust',       icon: 'fas fa-gear' },
    { name: 'C++',        icon: 'fas fa-c' },
    { name: 'Kotlin',     icon: 'fas fa-k' },
    { name: 'Dart',       icon: 'fas fa-bullseye' },
    { name: 'Ruby',       icon: 'fas fa-gem' },
    { name: 'Angular',    icon: 'fab fa-angular' },
    { name: 'Vue.js',     icon: 'fab fa-vuejs' },
  ];

  // ── Cloud & Database Logos ──
  const CLOUD_LOGOS = [
    { name: 'Firebase',    icon: 'fas fa-fire' },
    { name: 'AWS',         icon: 'fab fa-aws' },
    { name: 'MongoDB',     icon: 'fas fa-leaf' },
    { name: 'PostgreSQL',  icon: 'fas fa-database' },
    { name: 'MySQL',       icon: 'fas fa-server' },
    { name: 'Supabase',    icon: 'fas fa-bolt' },
    { name: 'Redis',       icon: 'fas fa-memory' },
    { name: 'Azure',       icon: 'fab fa-microsoft' },
    { name: 'Docker',      icon: 'fab fa-docker' },
    { name: 'Google Cloud', icon: 'fab fa-google' },
    { name: 'Vercel',      icon: 'fas fa-triangle-exclamation' },
    { name: 'Cloudflare',  icon: 'fab fa-cloudflare' },
  ];

  function buildInfiniteTrack(containerId, logos, directionClass) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Create items HTML (duplicated for seamless loop)
    const itemsHTML = logos.map(l => `
      <div class="carousel-item">
        <i class="${l.icon} carousel-item__icon"></i>
        <span class="carousel-item__name">${l.name}</span>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="carousel-track ${directionClass}">
        ${itemsHTML}${itemsHTML}
      </div>
    `;
  }

  // ── Image Carousel ──
  function initImageCarousel() {
    const carousel = document.getElementById('img-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.img-carousel__track');
    const dots = carousel.querySelectorAll('.img-carousel__dot');
    const prevBtn = carousel.querySelector('.img-carousel__btn--prev');
    const nextBtn = carousel.querySelector('.img-carousel__btn--next');
    const slides = carousel.querySelectorAll('.img-carousel__slide');

    let current = 0;
    const total = slides.length;
    let autoplayTimer;

    function goTo(index) {
      current = ((index % total) + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      updateDots();
    }

    function updateDots() {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(next, 5000);
    }

    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); startAutoplay(); });
    });

    // Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) next();
        else prev();
      }
      startAutoplay();
    }, { passive: true });

    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    updateDots();
    startAutoplay();
  }

  function init() {
    buildInfiniteTrack('lang-carousel', LANG_LOGOS, 'carousel-track--left');
    buildInfiniteTrack('cloud-carousel', CLOUD_LOGOS, 'carousel-track--right');
    initImageCarousel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
