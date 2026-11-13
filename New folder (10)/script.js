'use strict';

/* =====================================================
   KAKASHI FAST FOOD — SCRIPT.JS
   Data, cart, carousels, filters, nav, forms
   ===================================================== */

/* ---------- 1. PRODUCT DATA ----------
   Edit this array to add, remove, or change menu items.
   image: path under /images/
   category: one of burgers | lavash | hotdogs | pizza | fries | drinks | sets
*/
const PRODUCTS = [
  { id: 'b1', category: 'burgers', name: 'Klassik Burger', desc: "Mol go'shti, pishloq, pomidor va maxsus sous bilan.", price: 28000, image: 'assets/images/burgers/classic.png', badge: 'Mashhur' },
  { id: 'b2', category: 'burgers', name: 'Dabl Chizburger', desc: "Ikki qavat go'sht va erigan pishloq bilan to'yimli burger.", price: 36000, image: 'assets/images/burgers/double-cheese.png', badge: 'Yangi' },
  { id: 'b3', category: 'burgers', name: "Tovuq Burger", desc: "Qarsildoq tovuq filesi, salat va yengil sous bilan.", price: 26000, image: 'assets/images/burgers/chicken.png' },
  { id: 'l1', category: 'lavash', name: "Go'shtli Lavash", desc: "Mol go'shti, sabzavotlar va maxsus sous bilan o'ralgan.", price: 24000, image: 'assets/images/lavash/beef.png', badge: 'Mashhur' },
  { id: 'l2', category: 'lavash', name: 'Tovuq Lavash', desc: "Grilda pishirilgan tovuq go'shti va yangi sabzavotlar.", price: 22000, image: 'assets/images/lavash/chicken.png' },
  { id: 'l3', category: 'lavash', name: 'Pishloqli Lavash', desc: "Mol go'shti va ko'p pishloq bilan to'yimli tanlov.", price: 25000, image: 'assets/images/lavash/cheese.png' },
  { id: 'h1', category: 'hotdogs', name: 'Klassik Hot-dog', desc: "Sochka, krep sous va qovurilgan piyoz bilan.", price: 18000, image: 'assets/images/hotdogs/classic.png' },
  { id: 'h2', category: 'hotdogs', name: 'Pishloqli Hot-dog', desc: "Erigan pishloq va maxsus sous qo'shilgan.", price: 21000, image: 'assets/images/hotdogs/cheese.png', badge: 'Yangi' },
  { id: 'p1', category: 'pizza', name: "Pepperoni Pitsa", desc: "Pomidor sousi, mozarella va pepperoni kolbasa.", price: 48000, image: 'assets/images/pizza/pepperoni.png', badge: 'Mashhur' },
  { id: 'p2', category: 'pizza', name: 'Margarita Pitsa', desc: "Mozarella, pomidor va rayhon bilan klassik tanlov.", price: 42000, image: 'assets/images/pizza/margherita.png' },
  { id: 'p3', category: 'pizza', name: 'Go\u2018shtli Pitsa', desc: "Mol go'shti, kolbasa va qo'shimcha pishloq bilan.", price: 52000, image: 'assets/images/pizza/meat.png' },
  { id: 'f1', category: 'fries', name: 'Kartoshka Fri (O\u2018rta)', desc: "Qarsildoq va tuzli, issiqligicha xizmat qilinadi.", price: 12000, image: 'assets/images/drinks/fries-medium.png' },
  { id: 'f2', category: 'fries', name: 'Pishloqli Fri', desc: "Erigan pishloq sousi bilan qoplangan kartoshka fri.", price: 17000, image: 'assets/images/drinks/fries-cheese.png', badge: 'Yangi' },
  { id: 'd1', category: 'drinks', name: 'Gazli Ichimlik 0.5L', desc: "Sovuq va tetiklantiruvchi gazli ichimlik.", price: 8000, image: 'assets/images/drinks/soda.png' },
  { id: 'd2', category: 'drinks', name: 'Tabiiy Sharbat', desc: "Yangi mevalardan tayyorlangan tabiiy sharbat.", price: 10000, image: 'assets/images/drinks/juice.png' },
  { id: 's1', category: 'sets', name: 'Kakashi Seti', desc: "Burger, kartoshka fri va ichimlik — barchasi birgalikda.", price: 42000, image: 'assets/images/promotions/combo1.png', badge: 'Mashhur' },
  { id: 's2', category: 'sets', name: 'Oilaviy Set', desc: "2 ta burger, 2 ta fri va 2 ta ichimlik, 4 kishi uchun.", price: 89000, image: 'assets/images/promotions/combo2.png' },
];

const POPULAR_IDS = ['b1', 'l1', 'p1', 's1', 'b2'];

const PROMO_SLIDES = [
  { discount: '-20%', title: 'Combo \u21161 aksiyasi', text: "Burger, kartoshka fri va ichimlikni birgalikda arzon narxda oling.", image: 'assets/images/promotions/promo1.png' },
  { discount: '2 ta 1 narxiga', title: 'Lavash juftligi', text: "Do'stingiz bilan baham ko'ring — ikkinchi lavash sovg'a sifatida.", image: 'assets/images/promotions/promo2.png' },
  { discount: '-15%', title: 'Pitsa kechasi', text: "Har kuni soat 20:00 dan keyin barcha pitsalarga chegirma.", image: 'assets/images/promotions/promo3.png' },
];

const TESTIMONIALS = [
  { name: 'Aziz Karimov', rating: 5, text: "Juda mazali va tez yetkazib berishadi! Doimiy mijozlariga aylandim.", avatar: 'assets/images/customers/customer1.png' },
  { name: 'Dilnoza Yusupova', rating: 5, text: "Burgerlari eng yaxshisi! Har safar yangi va issiq keladi.", avatar: 'assets/images/customers/customer2.png' },
  { name: 'Javohir Toshev', rating: 4, text: "Narxlari hamyonbop, sifati esa a'lo darajada. Tavsiya qilaman.", avatar: 'assets/images/customers/customer3.png' },
  { name: 'Madina Rahimova', rating: 5, text: "Lavashlari shunchaki ajoyib! Xizmat ko'rsatish ham juda yaxshi.", avatar: 'assets/images/customers/customer4.png' },
];

/* ---------- 2. HELPERS ---------- */
function formatPrice(num) {
  return num.toLocaleString('ru-RU').replace(/,/g, ' ') + " so'm";
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

/* ---------- 3. HEADER / NAV ---------- */
function initHeaderNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      nav.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active-link'));
      link.classList.add('active-link');
    });
  });

  // Highlight active section link on scroll
  const sections = ['top', 'menyu', 'biz-haqimizda', 'aksiyalar', 'aloqa']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        nav.querySelectorAll('.nav-link').forEach(l => {
          l.classList.toggle('active-link', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ---------- 4. SCROLL REVEAL ---------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('.section-head, .feature-card, .about-copy, .contact-info');
  targets.forEach(t => t.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(t => io.observe(t));
}

/* ---------- 5. CART ---------- */
const Cart = {
  STORAGE_KEY: 'kakashi_cart_v1',
  items: [],

  load() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      this.items = raw ? JSON.parse(raw) : [];
    } catch (e) {
      this.items = [];
    }
  },

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) { /* storage unavailable — cart stays in-memory for this session */ }
  },

  add(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const existing = this.items.find(i => i.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ id: product.id, qty: 1 });
    }
    this.save();
    this.render();
  },

  remove(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.save();
    this.render();
  },

  setQty(productId, qty) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;
    if (qty <= 0) { this.remove(productId); return; }
    item.qty = qty;
    this.save();
    this.render();
  },

  totalCount() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  totalPrice() {
    return this.items.reduce((sum, i) => {
      const product = PRODUCTS.find(p => p.id === i.id);
      return sum + (product ? product.price * i.qty : 0);
    }, 0);
  },

  render() {
    const countEl = document.getElementById('cart-count');
    countEl.textContent = this.totalCount();
    countEl.classList.remove('bump');
    void countEl.offsetWidth; // restart animation
    countEl.classList.add('bump');

    const listEl = document.getElementById('cart-items');
    const emptyEl = document.getElementById('cart-empty');
    const footerEl = document.getElementById('cart-footer');

    if (this.items.length === 0) {
      listEl.innerHTML = '';
      emptyEl.style.display = 'block';
      footerEl.style.display = 'none';
      return;
    }

    emptyEl.style.display = 'none';
    footerEl.style.display = 'block';

    listEl.innerHTML = this.items.map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return '';
      return `
        <li class="cart-item" data-id="${product.id}">
          <img src="${product.image}" alt="${escapeHtml(product.name)}" width="64" height="64">
          <div class="cart-item-info">
            <h4>${escapeHtml(product.name)}</h4>
            <span>${formatPrice(product.price)}</span>
            <div class="qty-control">
              <button type="button" class="qty-minus" aria-label="Kamaytirish">\u2212</button>
              <span class="qty-value">${item.qty}</span>
              <button type="button" class="qty-plus" aria-label="Oshirish">+</button>
            </div>
          </div>
          <button type="button" class="cart-item-remove">O'chirish</button>
        </li>`;
    }).join('');

    document.getElementById('cart-total').textContent = formatPrice(this.totalPrice());
  }
};

function initCart() {
  Cart.load();
  Cart.render();

  const cartBtn = document.getElementById('cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartClose = document.getElementById('cart-close');
  const overlay = document.getElementById('overlay');

  function openCart() {
    cartDrawer.classList.add('is-open');
    overlay.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
  }
  function closeCart() {
    cartDrawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
  }

  cartBtn.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  overlay.addEventListener('click', () => {
    closeCart();
    closeCheckout();
  });

  document.getElementById('cart-items').addEventListener('click', (e) => {
    const li = e.target.closest('.cart-item');
    if (!li) return;
    const id = li.dataset.id;
    const item = Cart.items.find(i => i.id === id);
    if (!item) return;

    if (e.target.classList.contains('qty-plus')) {
      Cart.setQty(id, item.qty + 1);
    } else if (e.target.classList.contains('qty-minus')) {
      Cart.setQty(id, item.qty - 1);
    } else if (e.target.classList.contains('cart-item-remove')) {
      Cart.remove(id);
      showToast("Mahsulot savatdan o'chirildi");
    }
  });

  // Add-to-cart delegation (menu grid + popular carousel use the same class)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart-btn');
    if (!btn) return;
    const id = btn.dataset.id;
    Cart.add(id);
    btn.classList.add('added');
    setTimeout(() => btn.classList.remove('added'), 200);
    showToast("Savatga qo'shildi!");
  });

  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (Cart.items.length === 0) return;
    closeCart();
    openCheckout();
  });
}

/* ---------- 6. CHECKOUT MODAL ---------- */
function openCheckout() {
  const modal = document.getElementById('checkout-modal');
  const overlay = document.getElementById('checkout-overlay');
  const summary = document.getElementById('checkout-summary');

  summary.innerHTML = Cart.items.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return '';
    return `<div class="row"><span>${escapeHtml(product.name)} \u00d7 ${item.qty}</span><span>${formatPrice(product.price * item.qty)}</span></div>`;
  }).join('');
  document.getElementById('checkout-total').textContent = formatPrice(Cart.totalPrice());

  modal.classList.add('is-open');
  overlay.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeCheckout() {
  const modal = document.getElementById('checkout-modal');
  const overlay = document.getElementById('checkout-overlay');
  modal.classList.remove('is-open');
  overlay.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}

function initCheckout() {
  document.getElementById('checkout-close').addEventListener('click', closeCheckout);
  document.getElementById('checkout-overlay').addEventListener('click', closeCheckout);

  const form = document.getElementById('checkout-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('checkout-name');
    const phone = document.getElementById('checkout-phone');
    const address = document.getElementById('checkout-address');
    let valid = true;

    valid = validateField(name, 'checkout-name-error', v => v.trim().length >= 2, "Ismingizni to'liq kiriting") && valid;
    valid = validateField(phone, 'checkout-phone-error', v => /^[\d\s()+-]{7,}$/.test(v.trim()), "Telefon raqamini to'g'ri kiriting") && valid;
    valid = validateField(address, 'checkout-address-error', v => v.trim().length >= 5, "Manzilni to'liq kiriting") && valid;

    const status = document.getElementById('checkout-status');
    if (!valid) {
      status.textContent = "Iltimos, barcha maydonlarni to'g'ri to'ldiring.";
      status.className = 'form-status error';
      return;
    }

    // Frontend-only demonstration — no backend exists, so nothing is actually sent.
    status.textContent = "Demo rejimida buyurtmangiz qabul qilindi! (Haqiqiy buyurtma yuborilmadi — backend mavjud emas)";
    status.className = 'form-status success';

    setTimeout(() => {
      Cart.items = [];
      Cart.save();
      Cart.render();
      closeCheckout();
      form.reset();
      status.textContent = '';
      showToast("Rahmat! Buyurtmangiz (demo) qabul qilindi.");
    }, 1800);
  });
}

/* ---------- 7. FORM VALIDATION (shared helper) ---------- */
function validateField(input, errorId, testFn, message) {
  const errorEl = document.getElementById(errorId);
  const field = input.closest('.form-field');
  const value = input.value || '';

  if (!testFn(value)) {
    errorEl.textContent = message;
    if (field) field.classList.add('invalid');
    return false;
  }
  errorEl.textContent = '';
  if (field) field.classList.remove('invalid');
  return true;
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');
    let valid = true;

    valid = validateField(name, 'name-error', v => v.trim().length >= 2, "Ismingizni to'liq kiriting") && valid;
    valid = validateField(phone, 'phone-error', v => /^[\d\s()+-]{7,}$/.test(v.trim()), "Telefon raqamini to'g'ri kiriting") && valid;
    valid = validateField(message, 'message-error', v => v.trim().length >= 5, "Xabaringizni kiriting") && valid;

    const status = document.getElementById('form-status');
    if (!valid) {
      status.textContent = "Iltimos, barcha maydonlarni to'g'ri to'ldiring.";
      status.className = 'form-status error';
      return;
    }

    status.textContent = "Xabaringiz yuborildi! Tez orada siz bilan bog'lanamiz.";
    status.className = 'form-status success';
    form.reset();
  });
}

/* ---------- 8. MENU RENDER + FILTER ---------- */
function renderMenu(filter) {
  const grid = document.getElementById('menu-grid');
  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  if (list.length === 0) {
    grid.innerHTML = '<p class="menu-empty">Bu turkumda hozircha taom topilmadi.</p>';
    return;
  }

  grid.innerHTML = list.map(p => `
    <article class="product-card" data-category="${p.category}">
      <div class="product-media">
        <img src="${p.image}" alt="${escapeHtml(p.name)}" width="320" height="240" loading="lazy">
        ${p.badge ? `<span class="product-badge">${escapeHtml(p.badge)}</span>` : ''}
      </div>
      <div class="product-body">
        <h3>${escapeHtml(p.name)}</h3>
        <p>${escapeHtml(p.desc)}</p>
        <div class="product-footer">
          <span class="product-price">${formatPrice(p.price)}</span>
          <button type="button" class="add-to-cart-btn" data-id="${p.id}" aria-label="Savatga qo'shish: ${escapeHtml(p.name)}">+</button>
        </div>
      </div>
    </article>
  `).join('');
}

function initMenuFilters() {
  renderMenu('all');

  const filterBar = document.getElementById('menu-filters');
  filterBar.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    filterBar.querySelectorAll('.filter-chip').forEach(c => {
      c.classList.remove('active');
      c.setAttribute('aria-selected', 'false');
    });
    chip.classList.add('active');
    chip.setAttribute('aria-selected', 'true');
    renderMenu(chip.dataset.filter);
  });

  // Category cards scroll to menu and apply the matching filter
  document.getElementById('category-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.category-card');
    if (!card) return;
    const category = card.dataset.category;
    const chip = filterBar.querySelector(`.filter-chip[data-filter="${category}"]`);
    if (chip) chip.click();
    document.getElementById('menyu').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ---------- 9. GENERIC CAROUSEL ---------- */
function createCarousel({ trackId, dotsId, prevId, nextId, carouselSelector, slidesPerView = 1 }) {
  const track = document.getElementById(trackId);
  const dotsWrap = document.getElementById(dotsId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  const carousel = document.querySelector(carouselSelector);
  if (!track) return null;

  const slides = Array.from(track.children);
  const getPerView = () => {
    if (typeof slidesPerView === 'function') return slidesPerView();
    return slidesPerView;
  };

  let index = 0;
  let autoplayTimer = null;

  function maxIndex() {
    return Math.max(0, slides.length - getPerView());
  }

  function renderDots() {
    const dotCount = maxIndex() + 1;
    dotsWrap.innerHTML = '';
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `${i + 1}-slayd`);
      if (i === index) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function update() {
    const perView = getPerView();
    const slideWidth = 100 / perView;
    track.style.transform = `translateX(-${index * slideWidth}%)`;
    Array.from(dotsWrap.children).forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  function goTo(i) {
    index = Math.max(0, Math.min(i, maxIndex()));
    update();
  }

  function next() {
    index = index >= maxIndex() ? 0 : index + 1;
    update();
  }

  function prev() {
    index = index <= 0 ? maxIndex() : index - 1;
    update();
  }

  function startAutoplay(interval) {
    stopAutoplay();
    autoplayTimer = setInterval(next, interval);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  prevBtn && prevBtn.addEventListener('click', () => { prev(); restartAutoplayIfNeeded(); });
  nextBtn && nextBtn.addEventListener('click', () => { next(); restartAutoplayIfNeeded(); });

  const isAutoplay = carousel && carousel.dataset.autoplay === 'true';
  const interval = carousel ? parseInt(carousel.dataset.interval, 10) || 5000 : 5000;

  function restartAutoplayIfNeeded() {
    if (isAutoplay) startAutoplay(interval);
  }

  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', restartAutoplayIfNeeded);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', restartAutoplayIfNeeded);
  }

  // Touch / swipe support
  let startX = 0;
  let isDragging = false;
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoplay();
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const delta = endX - startX;
    if (Math.abs(delta) > 40) {
      if (delta < 0) next(); else prev();
    }
    restartAutoplayIfNeeded();
  });

  renderDots();
  update();
  if (isAutoplay) startAutoplay(interval);

  window.addEventListener('resize', () => {
    renderDots();
    update();
  });

  return { goTo, next, prev, refresh: () => { renderDots(); update(); } };
}

function buildPopularSlides() {
  const track = document.getElementById('popular-track');
  track.innerHTML = POPULAR_IDS.map(id => {
    const p = PRODUCTS.find(prod => prod.id === id);
    if (!p) return '';
    return `
      <div class="popular-slide">
        <article class="product-card">
          <div class="product-media">
            <img src="${p.image}" alt="${escapeHtml(p.name)}" width="320" height="240" loading="lazy">
            ${p.badge ? `<span class="product-badge">${escapeHtml(p.badge)}</span>` : ''}
          </div>
          <div class="product-body">
            <h3>${escapeHtml(p.name)}</h3>
            <p>${escapeHtml(p.desc)}</p>
            <div class="product-footer">
              <span class="product-price">${formatPrice(p.price)}</span>
              <button type="button" class="add-to-cart-btn" data-id="${p.id}" aria-label="Savatga qo'shish: ${escapeHtml(p.name)}">+</button>
            </div>
          </div>
        </article>
      </div>`;
  }).join('');
}

function buildPromoSlides() {
  const track = document.getElementById('promo-track');
  track.innerHTML = PROMO_SLIDES.map(slide => `
    <div class="promo-slide">
      <div class="promo-banner">
        <div>
          <span class="promo-discount">${escapeHtml(slide.discount)}</span>
          <h3>${escapeHtml(slide.title)}</h3>
          <p>${escapeHtml(slide.text)}</p>
          <a href="#menyu" class="btn btn-outline-light">Buyurtma berish</a>
        </div>
        <img src="${slide.image}" alt="${escapeHtml(slide.title)}" width="400" height="300" loading="lazy">
      </div>
    </div>
  `).join('');
}

function buildTestimonialSlides() {
  const track = document.getElementById('testimonial-track');
  track.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-slide">
      <div class="testimonial-card">
        <div class="testimonial-stars" aria-label="${t.rating} / 5 yulduz">${'\u2605'.repeat(t.rating)}${'\u2606'.repeat(5 - t.rating)}</div>
        <p class="testimonial-text">\u201C${escapeHtml(t.text)}\u201D</p>
        <div class="testimonial-person">
          <img src="${t.avatar}" alt="${escapeHtml(t.name)}" width="48" height="48">
          <strong>${escapeHtml(t.name)}</strong>
        </div>
      </div>
    </div>
  `).join('');
}

function initCarousels() {
  buildPopularSlides();
  buildPromoSlides();
  buildTestimonialSlides();

  createCarousel({
    trackId: 'popular-track', dotsId: 'popular-dots',
    prevId: 'popular-prev', nextId: 'popular-next',
    carouselSelector: '#popular-carousel',
    slidesPerView: () => window.innerWidth <= 768 ? 1 : (window.innerWidth <= 1024 ? 2 : 3)
  });

  createCarousel({
    trackId: 'promo-track', dotsId: 'promo-dots',
    prevId: 'promo-prev', nextId: 'promo-next',
    carouselSelector: '#promo-carousel',
    slidesPerView: 1
  });

  createCarousel({
    trackId: 'testimonial-track', dotsId: 'testimonial-dots',
    prevId: 'testimonial-prev', nextId: 'testimonial-next',
    carouselSelector: '#testimonial-carousel',
    slidesPerView: 1
  });
}

/* ---------- 10. INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  initHeaderNav();
  initMenuFilters();
  initCarousels();
  initCart();
  initCheckout();
  initContactForm();
  initScrollReveal();
});
