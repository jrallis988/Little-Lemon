/**
 * Shared SEO helpers — set document title/description and inject OG tags when data-seo is present
 * Usage on <html> or via body dataset is optional; pages can also include tags statically.
 */
(() => {
  const seo = document.querySelector('[data-seo-title]');
  if (!seo) return;
  const title = seo.getAttribute('data-seo-title');
  const desc = seo.getAttribute('data-seo-description') || '';
  if (title) document.title = title;
  let meta = document.querySelector('meta[name="description"]');
  if (!meta && desc) {
    meta = document.createElement('meta');
    meta.name = 'description';
    document.head.appendChild(meta);
  }
  if (meta && desc) meta.content = desc;
})();
