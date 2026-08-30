/**
 * PetSmart redesign — global app behavior
 */
(() => {
  const CART_KEY = 'petsmart-cart';

  /* Navigation */
  const nav = document.getElementById('mobile-nav');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  /* Search */
  const searchForms = document.querySelectorAll('[data-search-form]');
  searchForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="search"], input[name="q"]');
      const q = input ? input.value.trim() : '';
      const base = form.dataset.base || '';
      window.location.href = `${base}shop/search.html${q ? `?q=${encodeURIComponent(q)}` : ''}`;
    });
  });

  /* Cart */
  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateCartBadge();
  }

  function updateCartBadge() {
    document.querySelectorAll('.cart-count').forEach((badge) => {
      const count = getCart().reduce((sum, item) => sum + item.qty, 0);
      badge.textContent = count;
      badge.hidden = count === 0;
    });
  }

  window.PetSmartCart = {
    get: getCart,
    add(productId, qty = 1) {
      const items = getCart();
      const existing = items.find((i) => i.id === productId);
      if (existing) existing.qty += qty;
      else items.push({ id: productId, qty });
      saveCart(items);
    },
    remove(productId) {
      saveCart(getCart().filter((i) => i.id !== productId));
    },
    update(productId, qty) {
      const items = getCart();
      const item = items.find((i) => i.id === productId);
      if (item) {
        item.qty = Math.max(1, qty);
        saveCart(items);
      }
    },
    clear() {
      saveCart([]);
    },
    count() {
      return getCart().reduce((sum, i) => sum + i.qty, 0);
    },
  };

  /* Favorites */
  const FAV_KEY = 'petsmart-favorites';
  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    } catch {
      return [];
    }
  }
  function saveFavorites(ids) {
    localStorage.setItem(FAV_KEY, JSON.stringify(ids));
  }
  window.PetSmartFavorites = {
    get: getFavorites,
    has(id) {
      return getFavorites().includes(id);
    },
    toggle(id) {
      const ids = getFavorites();
      const i = ids.indexOf(id);
      if (i >= 0) ids.splice(i, 1);
      else ids.push(id);
      saveFavorites(ids);
      return ids.includes(id);
    },
  };

  updateCartBadge();

  /* Event delegation for dynamic product actions */
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-add-to-cart]');
    if (addBtn) {
      const id = addBtn.dataset.addToCart;
      const qtyInput = document.getElementById('product-qty');
      const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;
      window.PetSmartCart.add(id, qty);
      const label = addBtn.textContent;
      addBtn.textContent = 'Added!';
      addBtn.disabled = true;
      setTimeout(() => {
        addBtn.textContent = label;
        addBtn.disabled = false;
      }, 1500);
      return;
    }

    const favBtn = e.target.closest('[data-toggle-favorite]');
    if (favBtn) {
      const id = favBtn.dataset.toggleFavorite;
      const saved = window.PetSmartFavorites.toggle(id);
      favBtn.setAttribute('aria-pressed', String(saved));
      favBtn.textContent = saved ? 'Saved' : 'Save for later';
    }
  });

  document.querySelectorAll('[data-toggle-favorite]').forEach((btn) => {
    const id = btn.dataset.toggleFavorite;
    const saved = window.PetSmartFavorites.has(id);
    btn.setAttribute('aria-pressed', String(saved));
    btn.textContent = saved ? 'Saved' : 'Save for later';
  });

  /* Accessibility panel */
  const a11yToggle = document.querySelector('.a11y-toggle');
  const a11yMenu = document.querySelector('.a11y-menu');
  if (a11yToggle && a11yMenu) {
    a11yToggle.addEventListener('click', () => {
      const open = a11yMenu.classList.toggle('is-open');
      a11yToggle.setAttribute('aria-expanded', String(open));
    });

    document.getElementById('a11y-large-text')?.addEventListener('click', () => {
      document.body.classList.toggle('text-large');
    });
    document.getElementById('a11y-high-contrast')?.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
    });
    document.getElementById('a11y-reduce-motion')?.addEventListener('click', () => {
      document.documentElement.style.setProperty('scroll-behavior', 'auto');
    });
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* URL param helper */
  window.PetSmartParams = new URLSearchParams(window.location.search);

  /* Current page nav highlight */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.header-nav a, .mobile-nav a').forEach((link) => {
    if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href').replace(/^\.\.\//, '').replace(/^\.\//, ''))) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();
