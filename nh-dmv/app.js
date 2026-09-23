(() => {
  const nav = document.getElementById('primary-nav');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  const query = document.getElementById('task-query');
  const list = document.getElementById('task-list');
  const empty = document.getElementById('task-empty');
  const chips = document.querySelectorAll('.chip[data-filter]');
  let activeFilter = 'all';

  const items = list ? Array.from(list.querySelectorAll('.task-item')) : [];

  function normalize(value) {
    return (value || '').toLowerCase().trim();
  }

  function applyFilters() {
    if (!items.length) return;
    const q = normalize(query && query.value);
    let visible = 0;

    items.forEach((item, index) => {
      const category = item.dataset.category || '';
      const keywords = normalize(`${item.textContent} ${item.dataset.keywords || ''}`);
      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesQuery = !q || keywords.includes(q);
      const show = matchesFilter && matchesQuery;
      item.classList.toggle('is-hidden', !show);
      if (show) {
        visible += 1;
        item.style.animationDelay = `${Math.min(index, 8) * 40}ms`;
      }
    });

    if (empty) empty.classList.toggle('is-visible', visible === 0);
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      activeFilter = chip.dataset.filter || 'all';
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      applyFilters();
    });
  });

  if (query) {
    query.addEventListener('input', applyFilters);
  }

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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
})();
