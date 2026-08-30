/**
 * PetSmart redesign — shared header / footer / mobile nav
 * Usage: place <div id="ps-header" data-base="../" data-active="shop"></div>
 *        and <div id="ps-footer" data-base="../"></div>
 */
const PetSmartChrome = (() => {
  const ICONS = {
    store: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s-7-5.4-7-11a7 7 0 1114 0c0 5.6-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
    account: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>`,
    cart: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h11l3-8H7"/></svg>`,
    search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>`,
    logo: `<svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="8" fill="#e31837"/><circle cx="14" cy="15" r="4" fill="white"/><circle cx="26" cy="15" r="4" fill="white"/><circle cx="11" cy="24" r="3.5" fill="white"/><circle cx="29" cy="24" r="3.5" fill="white"/><ellipse cx="20" cy="28" rx="5" ry="4" fill="white"/></svg>`,
  };

  function navCurrent(active, key) {
    return active === key ? ' aria-current="page"' : '';
  }

  function headerHTML(base, active) {
    return `
  <div class="concept-ribbon">
    Conceptual redesign by <a href="${base}../index.html">Artistic Fountain</a> — not an official PetSmart site.
  </div>
  <header class="header">
    <div class="header-inner">
      <a class="brand" href="${base}index.html" aria-label="PetSmart home">
        ${ICONS.logo}
        <span class="brand-text"><span class="pet">Pet</span><span class="smart">Smart</span></span>
      </a>
      <nav aria-label="Primary">
        <ul class="header-nav">
          <li><a href="${base}shop/index.html"${navCurrent(active, 'shop')}>Shop</a></li>
          <li><a href="${base}services/index.html"${navCurrent(active, 'services')}>Services</a></li>
          <li><a href="${base}adopt/index.html"${navCurrent(active, 'adopt')}>Adopt</a></li>
          <li><a href="${base}care/index.html"${navCurrent(active, 'care')}>Pet Care</a></li>
          <li><a href="${base}stores/index.html"${navCurrent(active, 'stores')}>Stores</a></li>
        </ul>
      </nav>
      <form class="header-search search-bar" data-search-form data-base="${base}" role="search" aria-label="Site search">
        ${ICONS.search}
        <input type="search" name="q" placeholder="Search food, toys, brands…" aria-label="Search products">
      </form>
      <div class="header-actions">
        <a class="header-action" href="${base}stores/index.html" aria-label="Find a store">${ICONS.store}<span class="action-label">Stores</span></a>
        <a class="header-action" href="${base}account/index.html" aria-label="Account">${ICONS.account}<span class="action-label">Account</span></a>
        <a class="header-action" href="${base}shop/cart.html" aria-label="Shopping cart">${ICONS.cart}<span class="cart-count" hidden>0</span></a>
        <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
  <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
    <form class="mobile-search search-bar" data-search-form data-base="${base}" role="search">
      ${ICONS.search}
      <input type="search" name="q" placeholder="Search products…" aria-label="Search">
    </form>
    <ul>
      <li><a href="${base}shop/index.html"${navCurrent(active, 'shop')}>Shop</a></li>
      <li><a href="${base}services/index.html"${navCurrent(active, 'services')}>Services</a></li>
      <li><a href="${base}adopt/index.html"${navCurrent(active, 'adopt')}>Adopt</a></li>
      <li><a href="${base}care/index.html"${navCurrent(active, 'care')}>Pet Care</a></li>
      <li><a href="${base}stores/index.html"${navCurrent(active, 'stores')}>Stores</a></li>
      <li><a href="${base}account/index.html">Account</a></li>
    </ul>
  </nav>`;
  }

  function footerHTML(base) {
    return `
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="${base}index.html" aria-label="PetSmart home">
          <span class="brand-text"><span class="pet">Pet</span><span class="smart">Smart</span></span>
        </a>
        <p>Everything for pets — adoption, shopping, services, and trusted care resources in one modern experience.</p>
      </div>
      <div class="footer-col">
        <h3>Shop</h3>
        <ul>
          <li><a href="${base}shop/index.html">All categories</a></li>
          <li><a href="${base}shop/category.html?cat=dog-food">Dog food</a></li>
          <li><a href="${base}shop/category.html?cat=cat-food">Cat food</a></li>
          <li><a href="${base}shop/category.html?cat=toys">Toys</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Services</h3>
        <ul>
          <li><a href="${base}services/grooming.html">Grooming</a></li>
          <li><a href="${base}services/training.html">Training</a></li>
          <li><a href="${base}services/day-camp.html">Doggie Day Camp</a></li>
          <li><a href="${base}services/vet.html">Veterinary</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Adopt &amp; Care</h3>
        <ul>
          <li><a href="${base}adopt/index.html">Find a pet</a></li>
          <li><a href="${base}care/index.html">Pet care hub</a></li>
          <li><a href="${base}stores/index.html">Store locator</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h3>Account</h3>
        <ul>
          <li><a href="${base}account/index.html">Sign in</a></li>
          <li><a href="${base}account/orders.html">Order history</a></li>
          <li><a href="${base}account/favorites.html">Saved items</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 PetSmart redesign concept — Artistic Fountain</span>
      <span>Not affiliated with PetSmart, Inc.</span>
    </div>
  </footer>
  <div class="a11y-panel" role="region" aria-label="Accessibility options">
    <div class="a11y-menu" id="a11y-menu">
      <button type="button" id="a11y-large-text">Larger text</button>
      <button type="button" id="a11y-high-contrast">High contrast</button>
      <button type="button" id="a11y-reduce-motion">Reduce motion</button>
    </div>
    <button class="a11y-toggle" type="button" aria-label="Accessibility options" aria-expanded="false" aria-controls="a11y-menu">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
    </button>
  </div>`;
  }

  function mount() {
    const headerHost = document.getElementById('ps-header');
    if (headerHost) {
      const base = headerHost.dataset.base || '';
      const active = headerHost.dataset.active || '';
      headerHost.outerHTML = headerHTML(base, active);
    }
    const footerHost = document.getElementById('ps-footer');
    if (footerHost) {
      const base = footerHost.dataset.base || '';
      footerHost.outerHTML = footerHTML(base);
    }
  }

  return { mount, headerHTML, footerHTML };
})();

PetSmartChrome.mount();
