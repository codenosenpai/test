/**
 * Frigelis — Animations GSAP + ScrollTrigger
 * Stratégie : performance first, scroll-driven, mobile-safe
 */

// ── PREFERSREDUCEDMOTION guard ──────────────────────────────
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReduced) { console.log('[Frigelis] Animations désactivées (prefers-reduced-motion)'); }

// ── REGISTER ───────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ── HELPERS ────────────────────────────────────────────────
const ease = 'power3.out';
const easeBack = 'back.out(1.4)';

function fromBelow(el, opts = {}) {
  return gsap.from(el, { y: 48, opacity: 0, duration: 0.75, ease, ...opts });
}

// ── 1. HERO ─────────────────────────────────────────────────
function animHero() {
  if (prefersReduced) return;

  const tl = gsap.timeline({ defaults: { ease, duration: 0.7 } });

  // Eyebrow pill
  tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.55 })

  // H1 — chaque ligne
  .from('.hero-h1', { y: 36, opacity: 0, duration: 0.7 }, '-=0.3')

  // Sous-titre
  .from('.hero-left h2', { y: 24, opacity: 0, duration: 0.6 }, '-=0.45')

  // Lead
  .from('.hero-lead', { y: 20, opacity: 0, duration: 0.6 }, '-=0.45')

  // Badge dispo
  .from('#hero .hero-left > div[style*="ecfdf5"]', { scale: 0.9, opacity: 0, duration: 0.5, ease: easeBack }, '-=0.35')

  // CTA buttons
  .from('.hero-actions .btn', { y: 16, opacity: 0, stagger: 0.1, duration: 0.5, ease: easeBack }, '-=0.3')

  // Trust bar
  .from('.hero-trust', { y: 16, opacity: 0, duration: 0.5 }, '-=0.25')

  // Feature cards (right column) — slide depuis la droite
  .from('.hero-feat-card', {
    x: 60,
    opacity: 0,
    stagger: 0.12,
    duration: 0.65,
    ease: easeBack,
    clearProps: 'all',
  }, '-=0.5');
}

// ── 2. STATS RIBBON — compteurs + fade ──────────────────────
function animStats() {
  if (prefersReduced) return;

  gsap.from('.stat-item', {
    scrollTrigger: { trigger: '#stats', start: 'top 80%', once: true },
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.65,
    ease,
  });
}

// ── 3. SECTIONS GÉNÉRIQUES — data-fade override ─────────────
// On remplace le système CSS IntersectionObserver par GSAP
// pour des timings plus précis
function animSections() {
  if (prefersReduced) return;

  // Section headers
  document.querySelectorAll('.sec-header').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      y: 40, opacity: 0, duration: 0.7, ease,
    });
  });
}

// ── 4. SERVICE CARDS — stagger depuis le bas ────────────────
function animServiceCards() {
  if (prefersReduced) return;

  // MutationObserver: les cards sont injectées dynamiquement par le JS
  const observer = new MutationObserver(() => {
    const cards = document.querySelectorAll('.svc-card');
    if (!cards.length) return;
    observer.disconnect();

    // Annuler l'animation inline fadeUp du HTML pour éviter le conflit
    cards.forEach(c => c.style.animation = 'none');

    gsap.from(cards, {
      scrollTrigger: { trigger: '#svc-grid', start: 'top 80%', once: true },
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.65,
      ease,
      clearProps: 'all',
    });
  });
  const grid = document.getElementById('svc-grid');
  if (grid) observer.observe(grid, { childList: true });
}

// ── 5. SYMPTOM CARDS ─────────────────────────────────────────
function animSymptomCards() {
  if (prefersReduced) return;

  gsap.from('.symptom-card', {
    scrollTrigger: { trigger: '#symptom-grid', start: 'top 80%', once: true },
    y: 40,
    opacity: 0,
    stagger: 0.09,
    duration: 0.6,
    ease: easeBack,
    clearProps: 'all',
  });
}

// ── 6. AVANT/APRÈS REVEAL ────────────────────────────────────
function animAvantApres() {
  if (prefersReduced) return;

  const section = document.querySelector('#hero ~ * ~ * ~ * ~ * ~ * section');
  // Sélection plus sûre par contenu
  const avantApresSection = Array.from(document.querySelectorAll('section')).find(
    s => s.querySelector('.sec-tag-light')?.textContent?.includes('Hygiène')
  );

  if (!avantApresSection) return;

  const [leftCol, rightCol] = avantApresSection.querySelectorAll(':scope .container > div > div');

  if (leftCol) {
    gsap.from(leftCol, {
      scrollTrigger: { trigger: avantApresSection, start: 'top 75%', once: true },
      x: -50, opacity: 0, duration: 0.8, ease,
    });
  }
  if (rightCol) {
    gsap.from(rightCol, {
      scrollTrigger: { trigger: avantApresSection, start: 'top 75%', once: true },
      x: 50, opacity: 0, duration: 0.8, ease, delay: 0.15,
    });

    // Badge prix — pop
    const badge = rightCol.querySelector('div[style*="position:absolute"]');
    if (badge) {
      gsap.from(badge, {
        scrollTrigger: { trigger: avantApresSection, start: 'top 70%', once: true },
        scale: 0, opacity: 0, duration: 0.55, ease: easeBack, delay: 0.5,
      });
    }
  }
}

// ── 7. PROCESS STEPS — cascade depuis le bas ────────────────
function animProcess() {
  if (prefersReduced) return;

  gsap.from('.process-step', {
    scrollTrigger: { trigger: '#process', start: 'top 78%', once: true },
    y: 55,
    opacity: 0,
    stagger: 0.13,
    duration: 0.7,
    ease: easeBack,
    clearProps: 'all',
  });
}

// ── 8. AVIS CARDS ────────────────────────────────────────────
function animAvisCards() {
  if (prefersReduced) return;

  const observer = new MutationObserver(() => {
    const cards = document.querySelectorAll('.avis-card');
    if (!cards.length) return;
    observer.disconnect();

    gsap.from(cards, {
      scrollTrigger: { trigger: '#avis-grid', start: 'top 82%', once: true },
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.65,
      ease,
      clearProps: 'all',
    });
  });
  const grid = document.getElementById('avis-grid');
  if (grid) observer.observe(grid, { childList: true });
}

// ── 9. ZONE CARDS — villes ───────────────────────────────────
function animZone() {
  if (prefersReduced) return;

  gsap.from('.zone-city', {
    scrollTrigger: { trigger: '#zone', start: 'top 78%', once: true },
    scale: 0.7,
    opacity: 0,
    stagger: 0.05,
    duration: 0.45,
    ease: easeBack,
    clearProps: 'all',
  });
}

// ── 10. CONTACT SECTION ──────────────────────────────────────
function animContact() {
  if (prefersReduced) return;

  const layout = document.querySelector('.contact-layout');
  if (!layout) return;
  const [left, right] = layout.children;

  if (left) {
    gsap.from(left, {
      scrollTrigger: { trigger: '#contact-section', start: 'top 78%', once: true },
      x: -40, opacity: 0, duration: 0.75, ease,
    });
  }
  if (right) {
    gsap.from(right, {
      scrollTrigger: { trigger: '#contact-section', start: 'top 78%', once: true },
      y: 40, opacity: 0, duration: 0.75, ease, delay: 0.15,
    });
  }
}

// ── 11. NAVBAR SCROLL PARALLAX ──────────────────────────────
function animNavParallax() {
  if (prefersReduced) return;

  // Légère élévation box-shadow sur scroll (complète initNavbar)
  // déjà géré par .navbar.scrolled en CSS, rien à ajouter
}

// ── 12. HOVER MAGNÉTIQUE sur les BTN PRIMAIRES ───────────────
function magneticButtons() {
  if (prefersReduced) return;
  if (window.matchMedia('(pointer: coarse)').matches) return; // pas sur touch

  document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.25;
      gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: easeBack });
    });
  });
}

// ── 13. HIGHLIGHT COUNTER AU SCROLL ─────────────────────────
function animStatNumbers() {
  // Les compteurs natifs sont déjà gérés par animCount() dans index.html
  // On ajoute juste un flash couleur quand ils terminent
  if (prefersReduced) return;

  ScrollTrigger.create({
    trigger: '#stats',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      setTimeout(() => {
        gsap.from('.stat-n', {
          color: 'var(--cyan)',
          duration: 1.5,
          stagger: 0.12,
          ease: 'power2.inOut',
        });
      }, 1200); // après que les compteurs aient fini
    },
  });
}

// ── 14. FLOATING CTA — apparition différée ──────────────────
function animFloatCta() {
  if (prefersReduced) return;

  const btn = document.querySelector('.float-cta');
  if (!btn) return;
  gsap.from(btn, { y: 80, opacity: 0, duration: 0.7, ease: easeBack, delay: 1.5 });
}

// ── 15. TOPBAR SLIDE DOWN ────────────────────────────────────
function animTopbar() {
  if (prefersReduced) return;
  gsap.from('.topbar', { y: -40, opacity: 0, duration: 0.6, ease });
  gsap.from('.navbar', { y: -20, opacity: 0, duration: 0.5, ease, delay: 0.15 });
}

// ── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  animTopbar();
  animHero();
  animStats();
  animStatNumbers();
  animSections();
  animServiceCards();
  animSymptomCards();
  animAvantApres();
  animProcess();
  animAvisCards();
  animZone();
  animContact();
  magneticButtons();
  animFloatCta();
});
