/* ═══════════════════════════════════════
   MAIN.JS — Interações & Animações
═══════════════════════════════════════ */

'use strict';

/* ── LOADER ──────────────────────────*/
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    triggerHeroAnimations();
  }, 600);
});

document.body.style.overflow = 'hidden';

function triggerHeroAnimations() {
  document.querySelectorAll('.hero .reveal').forEach(el => {
    el.classList.add('visible');
  });
}

/* ── CUSTOM CURSOR ───────────────────*/
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let followerX = 0, followerY = 0;
let mouseX   = 0, mouseY    = 0;

if (cursor && cursorFollower && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  (function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  })();

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
  });
} else {
  if (cursor) cursor.style.display = 'none';
  if (cursorFollower) cursorFollower.style.display = 'none';
}

/* ── NAVBAR ──────────────────────────*/
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

// Scroll: adiciona classe .scrolled
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
}, { passive: true });

// Mobile menu
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Fecha ao clicar em link
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}

// Active link no scroll
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')} 0px -50% 0px` });

sections.forEach(s => navObserver.observe(s));

/* ── REVEAL ON SCROLL ────────────────*/
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  // Pula elementos do hero (já animados pelo loader)
  if (!el.closest('.hero')) {
    revealObserver.observe(el);
  }
});

/* ── COUNTER ANIMATION ───────────────*/
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const startVal = 0;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    // Easing out expo
    const eased = 1 - Math.pow(2, -10 * progress);
    el.textContent = Math.floor(eased * (target - startVal) + startVal);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }

  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target, 10);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat__number[data-target]').forEach(el => {
  counterObserver.observe(el);
});

/* ── SLIDER DE DEPOIMENTOS ───────────*/
const track     = document.getElementById('sliderTrack');
const prevBtn   = document.getElementById('prevBtn');
const nextBtn   = document.getElementById('nextBtn');
const dotsWrap  = document.getElementById('sliderDots');

if (track) {
  const cards          = track.querySelectorAll('.depoimento-card');
  let currentIndex     = 0;
  let autoPlayInterval = null;
  let isDragging       = false;
  let startX           = 0;
  let scrollLeft       = 0;

  function getVisibleCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - getVisibleCount());
  }

  // Cria dots
  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    const count = getMaxIndex() + 1;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Depoimento ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goTo(index) {
    const max = getMaxIndex();
    currentIndex = Math.max(0, Math.min(index, max));

    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap);
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === max;

    updateDots();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(currentIndex - 1); resetAutoPlay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(currentIndex + 1); resetAutoPlay(); });

  // Autoplay
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      const max = getMaxIndex();
      goTo(currentIndex < max ? currentIndex + 1 : 0);
    }, 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  // Touch/drag
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].pageX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - e.changedTouches[0].pageX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    }
    resetAutoPlay();
  });

  // Init
  buildDots();
  goTo(0);
  startAutoPlay();

  window.addEventListener('resize', () => {
    buildDots();
    goTo(Math.min(currentIndex, getMaxIndex()));
  });
}

/* ── BACK TO TOP ─────────────────────*/
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── SMOOTH ANCHOR SCROLL ────────────*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const navbarH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--navbar-h'),
      10
    ) || 76;

    const top = target.getBoundingClientRect().top + window.scrollY - navbarH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── CONTACT FORM ────────────────────*/
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!validateForm()) return;

    const btn = form.querySelector('[type="submit"]');
    const originalHTML = btn.innerHTML;

    // Loading state
    btn.disabled = true;
    btn.innerHTML = '<span style="opacity:.7">Enviando…</span>';

    // Simulação de envio (substitua por sua integração real)
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.disabled  = false;
      form.reset();

      if (formSuccess) {
        formSuccess.style.display = 'flex';
        setTimeout(() => formSuccess.style.display = 'none', 5000);
      }
    }, 1500);

    // ─── INTEGRAÇÃO REAL ─────────────────────
    // Para integrar com um backend, EmailJS, Formspree, etc.,
    // substitua o setTimeout acima pelo seu código de envio.
    //
    // Exemplo Formspree:
    // const data = new FormData(form);
    // fetch('https://formspree.io/f/SEU_ID', {
    //   method: 'POST', body: data, headers: { Accept: 'application/json' }
    // }).then(r => r.ok ? showSuccess() : showError());
    // ─────────────────────────────────────────

    // ─── INTEGRAÇÃO REAL ─────────────────────
    // Para integrar com um backend, EmailJS, Formspree, etc.,
    // substitua o setTimeout acima pelo seu código de envio.
    //
    // Exemplo Formspree:
    const data = new FormData(form);
    fetch('https://formspree.io/f/maqvpljp', {
      method: 'POST', body: data, headers: { Accept: 'application/json' }
    }).then(r => r.ok ? showSuccess() : showError());
    // ─────────────────────────────────────────
  });
}

function validateForm() {
  let valid = true;

  form.querySelectorAll('[required]').forEach(field => {
    field.style.borderColor = '';

    if (!field.value.trim()) {
      field.style.borderColor = '#ef4444';
      field.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
      if (valid) field.focus();
      valid = false;
    }
  });

  const email = form.querySelector('#email');
  if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.style.borderColor = '#ef4444';
    email.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
    if (valid) email.focus();
    valid = false;
  }

  return valid;
}

// Remove erro ao digitar
if (form) {
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
      field.style.borderColor = '';
      field.style.boxShadow = '';
    });
  });
}

/* ── PHONE MASK ──────────────────────*/
const phoneInput = document.getElementById('telefone');
if (phoneInput) {
  phoneInput.addEventListener('input', e => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (val.length > 10) {
      val = val.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (val.length > 6) {
      val = val.replace(/^(\d{2})(\d{4})(\d*)$/, '($1) $2-$3');
    } else if (val.length > 2) {
      val = val.replace(/^(\d{2})(\d*)$/, '($1) $2');
    }
    e.target.value = val;
  });
}

/* ── PARALLAX SUTIL (Hero blobs) ─────*/
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const blobs = document.querySelectorAll('.hero__blob');
      blobs.forEach((blob, i) => {
        const speed = 0.05 + i * 0.03;
        blob.style.transform = `translateY(${y * speed}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ── FOOTER YEAR ─────────────────────*/
document.querySelectorAll('.footer__bottom span').forEach(span => {
  span.innerHTML = span.innerHTML.replace('2025', new Date().getFullYear());
});
