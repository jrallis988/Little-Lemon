/**
 * PetSmart redesign — reusable UI render helpers
 */
const PetSmartUI = (() => {
  const { formatPrice, renderStars } = PetSmartData;

  function productCard(product, basePath = '') {
    const price = product.salePrice || product.price;
    const hasSale = product.salePrice && product.salePrice < product.price;
    return `
      <article class="product-card">
        <a href="${basePath}shop/product.html?id=${product.id}" class="card__link">
          <div class="product-card__media">
            ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
            <img src="${product.image}" alt="${product.name}" loading="lazy" width="300" height="300">
          </div>
          <div class="product-card__body">
            <p class="product-card__brand">${product.brand}</p>
            <h3 class="product-card__name">${product.name}</h3>
            <p class="product-card__rating" aria-label="Rated ${product.rating} out of 5 stars">
              <span aria-hidden="true">${renderStars(product.rating)}</span>
              (${product.reviews.toLocaleString()})
            </p>
            <p class="product-card__price${hasSale ? ' product-card__price--sale' : ''}">
              ${formatPrice(price)}
              ${hasSale ? `<span class="product-card__price-old">${formatPrice(product.price)}</span>` : ''}
            </p>
          </div>
        </a>
      </article>
    `;
  }

  function resourceCard(article, basePath = '') {
    return `
      <a href="${basePath}care/article.html?id=${article.id}" class="resource-card reveal">
        <div class="resource-card__media">
          <img src="${article.image}" alt="" loading="lazy" width="400" height="250">
        </div>
        <div class="resource-card__body">
          <p class="resource-card__topic">${article.topic}</p>
          <h3 class="resource-card__title">${article.title}</h3>
          <p class="resource-card__excerpt">${article.excerpt}</p>
          <p class="resource-card__meta">${article.readTime} read</p>
        </div>
      </a>
    `;
  }

  function categoryCard(category, basePath = '') {
    return `
      <a href="${basePath}shop/category.html?cat=${category.slug}" class="card card__link reveal">
        <div class="card__media">
          <img src="${category.image}" alt="${category.name}" loading="lazy" width="400" height="300">
        </div>
        <div class="card__body">
          <p class="card__eyebrow">Shop</p>
          <h3 class="card__title">${category.name}</h3>
        </div>
      </a>
    `;
  }

  function storeCard(store, basePath = '') {
    return `
      <article class="store-card reveal">
        <div>
          <h3><a href="${basePath}stores/detail.html?id=${store.id}">${store.name}</a></h3>
          <p class="text-muted text-small">${store.address}, ${store.city}, ${store.state} ${store.zip}</p>
          <p class="text-small">${store.hours}</p>
          <p class="text-small">${store.services.join(' · ')}</p>
        </div>
        <div>
          <a class="btn btn-outline btn-sm" href="${basePath}stores/detail.html?id=${store.id}">Store details</a>
        </div>
      </article>
    `;
  }

  function petCard(pet, basePath = '') {
    const store = PetSmartData.getStore(pet.store);
    return `
      <article class="pet-card reveal">
        <a href="${basePath}adopt/pet.html?id=${pet.id}" class="card__link" style="display:contents; text-decoration:none; color:inherit;">
          <div class="pet-card__media">
            <img src="${pet.image}" alt="${pet.name}, ${pet.breed}" loading="lazy" width="400" height="300">
            <span class="badge badge--red pet-card__badge">${pet.species}</span>
          </div>
        </a>
        <div class="pet-card__body">
          <h3 class="pet-card__name"><a href="${basePath}adopt/pet.html?id=${pet.id}" style="text-decoration:none; color:inherit;">${pet.name}</a></h3>
          <p class="pet-card__meta">${pet.breed} · ${pet.age} · ${pet.gender}</p>
          <p class="pet-card__story">${pet.story}</p>
          <p class="text-small text-muted">${store ? store.name : 'Local partner shelter'}</p>
          <a class="btn btn-primary btn-sm" href="${basePath}adopt/pet.html?id=${pet.id}" style="margin-top:var(--space-4);">Meet ${pet.name}</a>
        </div>
      </article>
    `;
  }

  function renderProductGrid(container, products, basePath = '') {
    if (!container) return;
    if (!products.length) {
      container.innerHTML = '<div class="empty-state"><h3>No products found</h3><p>Try adjusting your filters or search terms.</p></div>';
      return;
    }
    container.innerHTML = products.map((p) => productCard(p, basePath)).join('');
  }

  function renderPetGrid(container, pets, basePath = '') {
    if (!container) return;
    if (!pets.length) {
      container.innerHTML = '<div class="empty-state"><h3>No pets match</h3><p>Try another filter or check back soon.</p></div>';
      return;
    }
    container.innerHTML = pets.map((p) => petCard(p, basePath)).join('');
  }

  return { productCard, resourceCard, categoryCard, storeCard, petCard, renderProductGrid, renderPetGrid };
})();

if (typeof module !== 'undefined') module.exports = PetSmartUI;
