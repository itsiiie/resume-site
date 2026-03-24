/* ================================================
   SHASHANK PORTFOLIO — main.js
   ================================================ */

// ===== PAGE LOAD FADE =====
document.documentElement.style.opacity = '0';
document.documentElement.style.transition = 'opacity 0.5s ease';
window.addEventListener('load', () => {
  document.documentElement.style.opacity = '1';
});

// ===== CUSTOM CURSOR =====
const dot   = document.getElementById('cursorDot');
const ring  = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';
});

(function trackRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(trackRing);
})();

document.querySelectorAll('a, button, .proj-card, .fl-card, .skill-block, .contact-card, .num-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

// ===== NAVBAR SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', window.scrollY > 60);
}, { passive: true });

// ===== HAMBURGER =====
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(l => {
  l.addEventListener('click', () => mobileMenu?.classList.remove('open'));
});

// ===== PARTICLES CANVAS =====
const canvas = document.getElementById('canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const COUNT = 75;
  const pts = Array.from({ length: COUNT }, () => ({
    x:  Math.random() * window.innerWidth,
    y:  Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r:  Math.random() * 1.4 + 0.4,
    a:  Math.random() * 0.45 + 0.08,
  }));

  let pmx = -9999, pmy = -9999;
  document.addEventListener('mousemove', e => { pmx = e.clientX; pmy = e.clientY; }, { passive: true });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // lines between close points
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.hypot(dx, dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,229,255,${0.07 * (1 - d / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }

    pts.forEach(p => {
      // mouse interaction
      const mdx = p.x - pmx, mdy = p.y - pmy;
      const md  = Math.hypot(mdx, mdy);
      if (md < 110) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,229,255,${0.22 * (1 - md / 110)})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(pmx, pmy);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,229,255,${p.a})`;
      ctx.fill();

      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });

    requestAnimationFrame(draw);
  }
  draw();
}

// ===== TYPING ANIMATION =====
const typed = document.getElementById('typed');
if (typed) {
  const words = [
    'scalable infra.',
    'CI/CD pipelines.',
    'DevSecOps systems.',
    'cloud automation.',
    'things that ship.',
  ];
  let wi = 0, ci = 0, del = false;

  function type() {
    const word = words[wi];
    if (!del) {
      typed.textContent = word.slice(0, ++ci);
      if (ci === word.length) { del = true; return setTimeout(type, 1800); }
      setTimeout(type, 55);
    } else {
      typed.textContent = word.slice(0, --ci);
      if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
      setTimeout(type, 30);
    }
  }
  setTimeout(type, 900);
}

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObs.observe(el));

// ===== HERO PARALLAX =====
const heroInner = document.querySelector('.hero-inner');
window.addEventListener('scroll', () => {
  if (!heroInner) return;
  const y = window.scrollY;
  if (y < window.innerHeight * 1.2) {
    heroInner.style.transform = `translateY(${y * 0.28}px)`;
    heroInner.style.opacity   = `${1 - (y / window.innerHeight) * 1.4}`;
  }
}, { passive: true });

// ===== ACTIVE NAV LINK =====
const sections   = document.querySelectorAll('section[id], div[id]');
const navAnchors = document.querySelectorAll('.nav-menu a');

const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + e.target.id) a.style.color = 'var(--accent)';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObs.observe(s));