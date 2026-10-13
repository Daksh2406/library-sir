// ============ NAVBAR SCROLL EFFECT ============
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ============ MOBILE MENU ============
const burger = document.querySelector('.nav__burger');
const mobileMenu = document.querySelector('.nav__mobile');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    document.body.style.overflow = open ? 'hidden' : '';
    burger.setAttribute('aria-expanded', String(open));
  });
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    })
  );
}

// ============ ACTIVE NAV LINK ============
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link, .nav__mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ============ FAQ ACCORDION ============
document.querySelectorAll('.faq__q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ============ SCROLL REVEAL ============
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  revealObserver.observe(el);
});

// ============ DYNAMIC CONTENT INJECTION ============
// Facilities
const facilitiesGrid = document.getElementById('facilities-grid');
if (facilitiesGrid && typeof FACILITIES !== 'undefined') {
  facilitiesGrid.innerHTML = FACILITIES.map(f => `
    <div class="card facility reveal">
      <div class="facility__icon"><i data-lucide="${f.icon}"></i></div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </div>
  `).join('');
}

// Plans
const plansGrid = document.getElementById('plans-grid');
if (plansGrid && typeof PLANS !== 'undefined') {
  plansGrid.innerHTML = PLANS.map(p => `
    <div class="card plan ${p.popular ? 'popular' : ''} reveal">
      ${p.popular ? '<span class="plan__badge">Most Popular</span>' : ''}
      <h3>${p.name}</h3>
      <div class="plan__price">${p.price}<small>/ plan</small></div>
      <div class="plan__duration">${p.duration}</div>
      <ul class="plan__features">
        ${p.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <a href="book-visit.html" class="btn ${p.popular ? 'btn-primary' : 'btn-ghost'}">Enquire Now</a>
    </div>
  `).join('');
}

// FAQs
const faqList = document.getElementById('faq-list');
if (faqList && typeof FAQS !== 'undefined') {
  faqList.innerHTML = FAQS.map(f => `
    <div class="faq__item">
      <button class="faq__q" aria-expanded="false">${f.q}</button>
      <div class="faq__a">${f.a}</div>
    </div>
  `).join('');
  // Rebind accordion
  document.querySelectorAll('.faq__q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

// Live seat counter — placeholder (Supabase aane ke baad real data)
const seatCounter = document.getElementById('live-seats');
if (seatCounter) {
  seatCounter.textContent = '—';
  // NOTE: Ye placeholder hai. Stage 2 mein Supabase se real data aayega.
}

// Re-init lucide icons after injecting dynamic content
if (window.lucide) window.lucide.createIcons();