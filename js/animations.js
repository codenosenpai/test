/**
 * Frigelis — Animations v2 — Cinématique
 * Text splitting · Clip reveals · Stagger dramatique
 */

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const touch   = window.matchMedia('(pointer: coarse)').matches;

/* ─────────────────────────────────────────────────
   1. HERO — INTRO CINÉMATIQUE
───────────────────────────────────────────────── */
function animHero() {
  if (reduced) {
    gsap.set(['.hero-eyebrow','.hero-h1','.hero-lead','.hero-actions','.hero-trust','.hero-feat-card'], { opacity: 1 });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  tl.from('.hero-eyebrow', {
    x: -32, opacity: 0, scale: 0.88, duration: 0.65,
  })

  .add(() => {
    const h1 = document.querySelector('.hero-h1');
    if (!h1) return;
    const lines = [];
    Array.from(h1.childNodes).forEach(node => {
      if (node.nodeType === 3 && node.textContent.trim()) {
        const wrap = document.createElement('span');
        wrap.style.cssText = 'display:block;overflow:hidden;line-height:1.05';
        const inner = document.createElement('span');
        inner.style.cssText = 'display:block';
        inner.textContent = node.textContent;
        wrap.appendChild(inner);
        h1.replaceChild(wrap, node);
        lines.push(inner);
      } else if (node.nodeName === 'SPAN' || node.nodeName === 'BR') {
        if (node.nodeName === 'BR') return;
        const wrap = document.createElement('span');
        wrap.style.cssText = 'display:block;overflow:hidden;line-height:1.05';
        const inner = node.cloneNode(true);
        inner.style.display = 'block';
        wrap.appendChild(inner);
        h1.replaceChild(wrap, node);
        lines.push(inner);
      }
    });
    if (lines.length) {
      gsap.from(lines, { y: '110%', duration: 0.9, stagger: 0.13, ease: 'power4.out' });
    }
  }, '-=0.3')

  .from('.hero-left h2', { y: 24, opacity: 0, duration: 0.6 }, '-=0.5')
  .from('.hero-lead',    { y: 20, opacity: 0, duration: 0.6 }, '-=0.45')

  .from('#hero .hero-left > div[style*="ecfdf5"]', {
    scaleX: 0, transformOrigin: 'left center', opacity: 0,
    duration: 0.55, ease: 'back.out(1.6)',
  }, '-=0.35')

  .from('.hero-actions .btn', {
    y: 20, opacity: 0, stagger: 0.1, duration: 0.55, ease: 'back.out(1.4)',
  }, '-=0.3')

  .from('.hero-left > p[style*="0.75rem"]', { opacity: 0, duration: 0.4 }, '-=0.2')
  .from('.hero-trust', { y: 16, opacity: 0, duration: 0.5 }, '-=0.2')

  .from('.hero-feat-card', {
    x: 90, opacity: 0, rotateY: 10,
    stagger: 0.1, duration: 0.75,
    ease: 'back.out(1.3)', clearProps: 'all',
  }, '-=0.55');
}

/* ─────────────────────────────────────────────────
   2. STATS
───────────────────────────────────────────────── */
function animStats() {
  if (reduced) return;
  gsap.from('.stat-item', {
    scrollTrigger: { trigger: '#stats', start: 'top 82%', once: true },
    y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'back.out(1.4)',
  });
  ScrollTrigger.create({
    trigger: '#stats', start: 'top 80%', once: true,
    onEnter: () => setTimeout(() => {
      gsap.fromTo('.stat-n', { color: '#38bdf8' }, {
        color: '#ffffff', duration: 1.2, stagger: 0.1, ease: 'power2.inOut',
      });
    }, 1400),
  });
}

/* ─────────────────────────────────────────────────
   3. SECTION HEADERS — clip wipe
───────────────────────────────────────────────── */
function animHeaders() {
  if (reduced) return;
  document.querySelectorAll('.sec-h').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      clipPath: 'inset(0% 100% 0% 0%)',
      duration: 0.9, ease: 'power4.inOut',
    });
  });
  document.querySelectorAll('.sec-tag').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      x: -30, opacity: 0, duration: 0.55, ease: 'power3.out',
    });
  });
  document.querySelectorAll('.sec-sub').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.1,
    });
  });
}

/* ─────────────────────────────────────────────────
   4. SERVICE CARDS
───────────────────────────────────────────────── */
function animServiceCards() {
  if (reduced) return;
  const obs = new MutationObserver(() => {
    const cards = document.querySelectorAll('.svc-card');
    if (!cards.length) return;
    obs.disconnect();
    cards.forEach(c => c.style.animation = 'none');
    gsap.from(cards, {
      scrollTrigger: { trigger: '#svc-grid', start: 'top 82%', once: true },
      y: 60, opacity: 0, stagger: 0.1, duration: 0.7,
      ease: 'power3.out', clearProps: 'all',
    });
  });
  const grid = document.getElementById('svc-grid');
  if (grid) obs.observe(grid, { childList: true });
}

/* ─────────────────────────────────────────────────
   5. SYMPTOM CARDS — alternance gauche/droite
───────────────────────────────────────────────── */
function animSymptomCards() {
  if (reduced) return;
  document.querySelectorAll('.symptom-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 88%', once: true },
      x: i % 2 === 0 ? -50 : 50, opacity: 0,
      duration: 0.65, ease: 'power3.out', clearProps: 'all',
    });
  });
}

/* ─────────────────────────────────────────────────
   6. AVANT / APRÈS
───────────────────────────────────────────────── */
function animAvantApres() {
  if (reduced) return;
  const section = Array.from(document.querySelectorAll('section')).find(
    s => s.querySelector('[style*="AVANT"]')
  );
  if (!section) return;
  const cols = section.querySelectorAll(':scope .container > div > div');
  if (cols[0]) gsap.from(cols[0], {
    scrollTrigger: { trigger: section, start: 'top 75%', once: true },
    x: -60, opacity: 0, duration: 0.85, ease: 'power4.out',
  });
  if (cols[1]) {
    gsap.from(cols[1], {
      scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      x: 60, opacity: 0, duration: 0.85, ease: 'power4.out', delay: 0.15,
    });
    const badge = cols[1].querySelector('div[style*="position:absolute"]');
    if (badge) gsap.from(badge, {
      scrollTrigger: { trigger: section, start: 'top 68%', once: true },
      scale: 0, rotation: -15, opacity: 0,
      duration: 0.6, ease: 'back.out(2)', delay: 0.4,
    });
  }
}

/* ─────────────────────────────────────────────────
   7. PROCESS STEPS
───────────────────────────────────────────────── */
function animProcess() {
  if (reduced) return;
  gsap.from('.process-step', {
    scrollTrigger: { trigger: '.process-grid', start: 'top 80%', once: true },
    y: 70, opacity: 0, stagger: 0.15, duration: 0.75,
    ease: 'power4.out', clearProps: 'all',
  });
  gsap.from('.step-num', {
    scrollTrigger: { trigger: '.process-grid', start: 'top 78%', once: true },
    scale: 0, opacity: 0, stagger: 0.15, duration: 0.6,
    ease: 'back.out(2)', delay: 0.2,
  });
}

/* ─────────────────────────────────────────────────
   8. AVIS CARDS
───────────────────────────────────────────────── */
function animAvisCards() {
  if (reduced) return;
  const obs = new MutationObserver(() => {
    const cards = document.querySelectorAll('.avis-card');
    if (!cards.length) return;
    obs.disconnect();
    gsap.from(cards, {
      scrollTrigger: { trigger: '#avis-grid', start: 'top 84%', once: true },
      y: 50, opacity: 0, stagger: 0.13, duration: 0.7,
      ease: 'power3.out', clearProps: 'all',
    });
  });
  const grid = document.getElementById('avis-grid');
  if (grid) obs.observe(grid, { childList: true });
}

/* ─────────────────────────────────────────────────
   9. ZONE — villes pop depuis le centre
───────────────────────────────────────────────── */
function animZone() {
  if (reduced) return;
  gsap.from('.zone-city', {
    scrollTrigger: { trigger: '.zone-cities', start: 'top 84%', once: true },
    scale: 0, opacity: 0,
    stagger: { each: 0.04, from: 'center' },
    duration: 0.4, ease: 'back.out(1.7)', clearProps: 'all',
  });
  gsap.from('#zone .zone-left > div[style*="flex-direction"]', {
    scrollTrigger: { trigger: '#zone', start: 'top 78%', once: true },
    x: -40, opacity: 0, stagger: 0.1, duration: 0.55, ease: 'power3.out',
  });
}

/* ─────────────────────────────────────────────────
   10. CONTACT
───────────────────────────────────────────────── */
function animContact() {
  if (reduced) return;
  const left  = document.querySelector('.contact-layout > *:first-child');
  const right = document.querySelector('.contact-layout > *:last-child');
  if (left)  gsap.from(left,  { scrollTrigger: { trigger: '#contact-section', start: 'top 78%', once: true }, x: -50, opacity: 0, duration: 0.8, ease: 'power4.out' });
  if (right) gsap.from(right, { scrollTrigger: { trigger: '#contact-section', start: 'top 78%', once: true }, y: 50,  opacity: 0, duration: 0.8, ease: 'power4.out', delay: 0.18 });
}

/* ─────────────────────────────────────────────────
   11. TOPBAR + NAVBAR
───────────────────────────────────────────────── */
function animNav() {
  if (reduced) return;
  gsap.from('.topbar', { y: -100, duration: 0.7,  ease: 'power4.out' });
  gsap.from('.navbar',  { y: -40, opacity: 0, duration: 0.55, ease: 'power3.out', delay: 0.2 });
}

/* ─────────────────────────────────────────────────
   12. FLOATING CTA
───────────────────────────────────────────────── */
function animFloatCta() {
  if (reduced) return;
  const btn = document.querySelector('.float-cta');
  if (!btn) return;
  gsap.from(btn, { y: 100, opacity: 0, duration: 0.7, ease: 'back.out(1.4)', delay: 1.8 });
}

/* ─────────────────────────────────────────────────
   13. PARALLAX HERO (desktop)
───────────────────────────────────────────────── */
function animHeroParallax() {
  if (reduced || touch) return;
  gsap.to('.hero-right', {
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
    y: -80, ease: 'none',
  });
  gsap.to('.hero-left', {
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2 },
    y: -40, ease: 'none',
  });
}

/* ─────────────────────────────────────────────────
   14. SCROLL PROGRESS BAR
───────────────────────────────────────────────── */
function scrollProgress() {
  if (reduced) return;
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,#2563eb,#38bdf8);z-index:9999;pointer-events:none;box-shadow:0 0 8px rgba(56,189,248,.6);';
  document.body.prepend(bar);
  gsap.to(bar, {
    width: '100%', ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
  });
}

/* ─────────────────────────────────────────────────
   15. HOVER MAGNÉTIQUE
───────────────────────────────────────────────── */
function magneticButtons() {
  if (reduced || touch) return;
  document.querySelectorAll('.btn-primary, .nav-cta, .btn-white').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * 0.22;
      const y = (e.clientY - r.top  - r.height / 2) * 0.22;
      gsap.to(btn, { x, y, duration: 0.35, ease: 'power2.out', overwrite: true });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)', overwrite: true });
    });
  });
}

/* ─────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  scrollProgress();
  animNav();
  animHero();
  animStats();
  animHeaders();
  animServiceCards();
  animSymptomCards();
  animAvantApres();
  animProcess();
  animAvisCards();
  animZone();
  animContact();
  magneticButtons();
  animFloatCta();
  animHeroParallax();
});
