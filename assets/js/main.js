/* =============================================
   PORTFOLIO — Main JavaScript
   ============================================= */

// ===== CUSTOM CURSOR =====
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateOutline() {
  outlineX += (mouseX - outlineX) * 0.15;
  outlineY += (mouseY - outlineY) * 0.15;
  cursorOutline.style.left = outlineX + 'px';
  cursorOutline.style.top = outlineY + 'px';
  requestAnimationFrame(animateOutline);
}
animateOutline();

document.querySelectorAll('a, button, .project-card, .contact-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.6)';
    cursorOutline.style.borderColor = 'rgba(0, 245, 255, 0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorOutline.style.borderColor = 'rgba(0, 245, 255, 0.5)';
  });
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// ===== PARTICLES CANVAS =====
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  let W, H;
  const resize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const PARTICLE_COUNT = 90;
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    });
  }

  let mouseParticleX = -9999, mouseParticleY = -9999;
  document.addEventListener('mousemove', (e) => {
    mouseParticleX = e.clientX;
    mouseParticleY = e.clientY;
  });

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);

    // Connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 245, 255, ${0.08 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Particles
    particles.forEach(p => {
      const dx = p.x - mouseParticleX;
      const dy = p.y - mouseParticleY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 245, 255, ${0.3 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouseParticleX, mouseParticleY);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 245, 255, ${p.alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });

    requestAnimationFrame(drawParticles);
  }

  drawParticles();
}

// ===== TYPED TEXT =====
const typedEl = document.getElementById('typed');
if (typedEl) {
  const phrases = [
    'cloud infrastructure.',
    'CI/CD pipelines.',
    'backend systems.',
    'things that scale.',
    'stuff that works.',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
      setTimeout(type, 60);
    } else {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
      setTimeout(type, 35);
    }
  }

  setTimeout(type, 1000);
}

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// ===== PARALLAX on HERO =====
window.addEventListener('scroll', () => {
  const heroContent = document.querySelector('.hero-content');
  const scrollY = window.scrollY;
  if (heroContent && scrollY < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
    heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 1.5;
  }
});

// ===== ACTIVE NAV LINK on SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});

// ===== SMOOTH SECTION FADE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});