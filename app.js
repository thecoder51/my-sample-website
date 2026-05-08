/* ── Feature cards data ── */
const features = [
  { icon: '⚡', title: 'Lightning Fast', desc: 'Pure HTML, CSS, and JS — no frameworks, no build step, instant load times.' },
  { icon: '📱', title: 'Fully Responsive', desc: 'Looks great on every screen size, from phones to ultra-wide monitors.' },
  { icon: '🎨', title: 'Modern Design', desc: 'Dark theme with smooth gradients, animations, and consistent spacing.' },
  { icon: '♿', title: 'Accessible', desc: 'Semantic HTML and keyboard-friendly interactions out of the box.' },
  { icon: '🔧', title: 'Easy to Customise', desc: 'CSS custom properties make it trivial to swap colours and fonts.' },
  { icon: '🚀', title: 'Deploy Anywhere', desc: 'No server required — host on GitHub Pages, Netlify, or Vercel for free.' },
];

/* ── Render feature cards ── */
function renderFeatures() {
  const grid = document.getElementById('features-grid');
  features.forEach(({ icon, title, desc }) => {
    const card = document.createElement('div');
    card.className = 'feature-card';
    card.innerHTML = `<span class="feature-icon">${icon}</span><h3>${title}</h3><p>${desc}</p>`;
    grid.appendChild(card);
  });
}

/* ── Intersection Observer: fade-in cards ── */
function observeCards() {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
    { threshold: 0.15 }
  );
  document.querySelectorAll('.feature-card').forEach(c => observer.observe(c));
}

/* ── Animate counters ── */
function animateCounters() {
  const stats = document.querySelectorAll('.stat');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const numberEl = el.querySelector('.stat-number');
      const duration = 1400;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        numberEl.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else numberEl.textContent = target;
      }

      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(s => observer.observe(s));
}

/* ── Mobile nav toggle ── */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

/* ── Contact form ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill in all fields.';
      status.className = 'form-status error';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.className = 'form-status error';
      return;
    }

    /* Simulate async send */
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    setTimeout(() => {
      status.textContent = `Thanks, ${name}! Your message has been received.`;
      status.className = 'form-status success';
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }, 1200);
  });
}

/* ── Footer year ── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Boot ── */
renderFeatures();
observeCards();
animateCounters();
initNavToggle();
initContactForm();
