
/* ==========================================================================
   Campnio — Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFloatingHearts();
  initScrollReveal();
  initCounters();
  initFAQ();
  initStoriesCarousel();
  initScrollCue();
  initButtons();
});

/* ---------- Navbar: scrolled state + mobile menu ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');

  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Floating hearts background ---------- */
function initFloatingHearts() {
  const field = document.getElementById('heartsField');
  if (!field) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const HEART_COUNT = window.innerWidth < 640 ? 8 : 14;

  for (let i = 0; i < HEART_COUNT; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '&#10084;';

    const size = 10 + Math.random() * 16;
    const left = Math.random() * 100;
    const duration = 14 + Math.random() * 16;
    const delay = Math.random() * 20;
    const drift = (Math.random() - 0.5) * 160;

    heart.style.left = `${left}vw`;
    heart.style.fontSize = `${size}px`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;
    heart.style.setProperty('--drift', `${drift}px`);

    field.appendChild(heart);
  }
}

/* ---------- Scroll reveal for [data-reveal] elements ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => observer.observe(item));
}

/* ---------- Animated stat counters ---------- */
function initCounters() {
  const statsSection = document.getElementById('statsSection');
  if (!statsSection) return;

  const numbers = statsSection.querySelectorAll('.stat-number');

  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = `${current.toFixed(decimals)}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        numbers.forEach(animate);
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  observer.observe(statsSection);
}

/* ---------- FAQ accordion ---------- */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      items.forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ---------- Stories carousel arrows ---------- */
function initStoriesCarousel() {
  const track = document.getElementById('storiesTrack');
  const prev = document.getElementById('storyPrev');
  const next = document.getElementById('storyNext');
  if (!track || !prev || !next) return;

  const scrollByCard = (direction) => {
    const card = track.querySelector('.story-card');
    const gap = 24;
    const amount = card ? card.offsetWidth + gap : 340;
    track.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  prev.addEventListener('click', () => scrollByCard(-1));
  next.addEventListener('click', () => scrollByCard(1));
}

/* ---------- Scroll cue click ---------- */
function initScrollCue() {
  const cue = document.getElementById('scrollCue');
  if (!cue) return;
  cue.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ---------- Primary CTAs (placeholder actions) ---------- */
function initButtons() {
  const scrollToFeatures = () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  document.getElementById('heroSecondaryBtn')?.addEventListener('click', scrollToFeatures);
  document.getElementById('faqContactBtn')?.addEventListener('click', scrollToContact);
  document.getElementById('ctaLearnBtn')?.addEventListener('click', scrollToContact);

  const signupIds = ['signupBtn', 'heroPrimaryBtn', 'ctaSignupBtn'];
  signupIds.forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
      console.log('Sign up flow triggered — connect this to your registration page.');
    });
  });

  document.getElementById('loginBtn')?.addEventListener('click', () => {
    console.log('Log in flow triggered — connect this to your auth page.');
  });
}