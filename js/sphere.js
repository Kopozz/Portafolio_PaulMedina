/* ========================================
   3D INTERACTIVE TECH SPHERE
   Fibonacci sphere with drag-to-rotate
   ======================================== */

(function() {
  'use strict';

  const TECH_ICONS = [
    { name: 'JavaScript',  icon: 'fab fa-js-square',     color: '#F7DF1E' },
    { name: 'Python',      icon: 'fab fa-python',        color: '#3776AB' },
    { name: 'TypeScript',  icon: 'fas fa-code',          color: '#3178C6' },
    { name: 'Java',        icon: 'fab fa-java',          color: '#ED8B00' },
    { name: 'C#',          icon: 'fas fa-hashtag',        color: '#68217A' },
    { name: 'Go',          icon: 'fas fa-wind',           color: '#00ADD8' },
    { name: 'Rust',        icon: 'fas fa-gear',           color: '#CE422B' },
    { name: 'PHP',         icon: 'fab fa-php',           color: '#777BB4' },
    { name: 'Dart',        icon: 'fas fa-bullseye',      color: '#0175C2' },
    { name: 'Swift',       icon: 'fab fa-swift',         color: '#FA7343' },
    { name: 'Kotlin',      icon: 'fas fa-k',             color: '#7F52FF' },
    { name: 'C++',         icon: 'fas fa-c',             color: '#00599C' },
    { name: 'Ruby',        icon: 'fas fa-gem',           color: '#CC342D' },
    { name: 'SQL',         icon: 'fas fa-database',      color: '#4479A1' },
    { name: 'React',       icon: 'fab fa-react',         color: '#61DAFB' },
    { name: 'Node.js',     icon: 'fab fa-node-js',       color: '#339933' },
    { name: 'HTML5',       icon: 'fab fa-html5',         color: '#E34F26' },
    { name: 'CSS3',        icon: 'fab fa-css3-alt',      color: '#1572B6' },
    { name: 'Docker',      icon: 'fab fa-docker',        color: '#2496ED' },
    { name: 'Git',         icon: 'fab fa-git-alt',       color: '#F05032' },
    { name: 'Linux',       icon: 'fab fa-linux',         color: '#FCC624' },
    { name: 'Angular',     icon: 'fab fa-angular',       color: '#DD0031' },
    { name: 'Vue.js',      icon: 'fab fa-vuejs',         color: '#4FC08D' },
    { name: 'AWS',         icon: 'fab fa-aws',           color: '#FF9900' },
  ];

  let sphereEl, items;
  let rotX = -15, rotY = 0;
  let autoRotateSpeed = 0.15;
  let isDragging = false;
  let startX, startY, startRotX, startRotY;
  let velocityX = 0, velocityY = 0;
  let lastMoveTime = 0;
  let animationId;
  let radius;

  function init() {
    const container = document.querySelector('.sphere-container');
    sphereEl = document.querySelector('.sphere');
    if (!container || !sphereEl) return;

    radius = container.offsetWidth < 350 ? 120 : 180;
    createItems();
    positionItems();
    startAnimation();

    // Mouse events
    container.addEventListener('mousedown', onPointerDown);
    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('mouseup', onPointerUp);

    // Touch events
    container.addEventListener('touchstart', onTouchStart, { passive: false });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onPointerUp);

    // Resize
    window.addEventListener('resize', () => {
      radius = container.offsetWidth < 350 ? 120 : 180;
      positionItems();
    });
  }

  function createItems() {
    sphereEl.innerHTML = '';
    items = [];

    TECH_ICONS.forEach((tech, i) => {
      const el = document.createElement('div');
      el.className = 'sphere-item';
      el.innerHTML = `<i class="${tech.icon}" title="${tech.name}"></i>`;
      el.setAttribute('data-tooltip', tech.name);
      el.style.color = tech.color;
      sphereEl.appendChild(el);
      items.push(el);
    });
  }

  function positionItems() {
    const n = items.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Fibonacci sphere

    items.forEach((el, i) => {
      const y = 1 - (i / (n - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;

      el._baseX = Math.cos(theta) * radiusAtY;
      el._baseY = y;
      el._baseZ = Math.sin(theta) * radiusAtY;
    });
  }

  function updatePositions() {
    const radX = (rotX * Math.PI) / 180;
    const radY = (rotY * Math.PI) / 180;

    const cosX = Math.cos(radX), sinX = Math.sin(radX);
    const cosY = Math.cos(radY), sinY = Math.sin(radY);

    items.forEach(el => {
      let x = el._baseX;
      let y = el._baseY;
      let z = el._baseZ;

      // Rotate Y
      let x2 = x * cosY - z * sinY;
      let z2 = x * sinY + z * cosY;

      // Rotate X
      let y2 = y * cosX - z2 * sinX;
      let z3 = y * sinX + z2 * cosX;

      const px = x2 * radius;
      const py = y2 * radius;
      const pz = z3 * radius;

      // Scale & opacity based on depth
      const scale = (pz + radius * 1.5) / (radius * 3);
      const opacity = Math.max(0.15, Math.min(1, scale * 1.2));

      el.style.transform = `translate3d(${px}px, ${py}px, ${pz}px) scale(${0.5 + scale * 0.6})`;
      el.style.opacity = opacity;
      el.style.zIndex = Math.round(pz + radius);
    });
  }

  function startAnimation() {
    function loop() {
      if (!isDragging) {
        // Apply velocity with friction
        if (Math.abs(velocityX) > 0.01 || Math.abs(velocityY) > 0.01) {
          rotY += velocityX;
          rotX += velocityY;
          velocityX *= 0.95;
          velocityY *= 0.95;
        } else {
          // Auto-rotate
          rotY += autoRotateSpeed;
        }
      }

      // Clamp rotX
      rotX = Math.max(-80, Math.min(80, rotX));

      updatePositions();
      animationId = requestAnimationFrame(loop);
    }
    loop();
  }

  function onPointerDown(e) {
    isDragging = true;
    startX = e.clientX || e.pageX;
    startY = e.clientY || e.pageY;
    startRotX = rotX;
    startRotY = rotY;
    velocityX = 0;
    velocityY = 0;
    lastMoveTime = performance.now();
  }

  function onTouchStart(e) {
    if (e.touches.length === 1) {
      e.preventDefault();
      const touch = e.touches[0];
      onPointerDown({ clientX: touch.clientX, clientY: touch.clientY });
    }
  }

  function onPointerMove(e) {
    if (!isDragging) return;

    const currentX = e.clientX || e.pageX;
    const currentY = e.clientY || e.pageY;
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;

    const now = performance.now();
    const dt = now - lastMoveTime;

    if (dt > 0) {
      velocityX = deltaX * 0.002;
      velocityY = deltaY * 0.002;
    }
    lastMoveTime = now;

    rotY = startRotY + deltaX * 0.4;
    rotX = startRotX + deltaY * 0.4;
  }

  function onTouchMove(e) {
    if (!isDragging || e.touches.length !== 1) return;
    e.preventDefault();
    const touch = e.touches[0];
    onPointerMove({ clientX: touch.clientX, clientY: touch.clientY });
  }

  function onPointerUp() {
    isDragging = false;
  }

  // Init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
