// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Navbar shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 40
    ? 'rgba(10,10,15,0.97)'
    : 'rgba(10,10,15,0.85)';
});

// Animate sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
});

// ── Particles Canvas ─────────────────────────
(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles;
  const PARTICLE_COUNT = 80;
  const MAX_DIST = 150;
  const MOUSE_RADIUS = 180;

  const mouse = { x: -9999, y: -9999 };

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.5 + 1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Update & draw dots
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Mouse attraction
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.015;
        p.vx += dx * force;
        p.vy += dy * force;
      }

      // Speed limit
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 1.5) { p.vx *= 0.98; p.vy *= 0.98; }

      p.x += p.vx;
      p.y += p.vy;

      // Bounce
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(108,99,255,0.8)';
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const ex = p.x - q.x, ey = p.y - q.y;
        const d = Math.sqrt(ex * ex + ey * ey);
        if (d < MAX_DIST) {
          const alpha = 1 - d / MAX_DIST;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(108,99,255,${alpha * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect to mouse
      if (dist < MOUSE_RADIUS) {
        const alpha = 1 - dist / MOUSE_RADIUS;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(167,139,250,${alpha * 0.6})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  resize();
  createParticles();
  draw();
})();

// Contact form feedback
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Mensagem enviada!';
  btn.disabled = true;
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.textContent = 'Enviar Mensagem';
    btn.disabled = false;
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});
