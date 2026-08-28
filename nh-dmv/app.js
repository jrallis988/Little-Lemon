(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const AUTH_KEY = 'nhdmv_demo_signed_in';
  const BOOKING_KEY = 'nhdmv_demo_booking';

  const isSignedIn = () => localStorage.getItem(AUTH_KEY) === '1';
  const setSignedIn = (on) => {
    if (on) localStorage.setItem(AUTH_KEY, '1');
    else localStorage.removeItem(AUTH_KEY);
  };

  /* Mobile nav */
  const nav = $('#life-nav');
  const toggle = $('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  function toast(message) {
    let el = $('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove('is-visible'), 2800);
  }
  window.NHDMVToast = toast;

  const params = new URLSearchParams(location.search);
  // cleanUrls drops ?query on redirect — prefer hash deep-links: #id or #key=value&...
  if (location.hash) {
    const raw = location.hash.replace(/^#/, '');
    if (raw.includes('=')) {
      new URLSearchParams(raw).forEach((v, k) => {
        if (!params.has(k)) params.set(k, v);
      });
    } else if (raw && !params.has('id')) {
      params.set('id', raw);
      if (!params.has('intent')) params.set('intent', raw);
    }
  }
  window.NHDMVParams = params;

  function wayBadges(ways = []) {
    const map = {
      online: ['way-online', 'Online'],
      appt: ['way-appt', 'Appointment'],
      drop: ['way-drop', 'Drop box'],
      mail: ['way-mail', 'Mail']
    };
    return ways
      .map((w) => {
        const [cls, label] = map[w] || ['', w];
        return `<span class="way ${cls}">${label}</span>`;
      })
      .join('');
  }

  /* Auth chrome — Sign in / Dashboard / Sign out across pages */
  function initAuthChrome() {
    const tools = $('.header-tools');
    if (!tools) return;
    let slot = $('#auth-slot');
    if (!slot) {
      slot = document.createElement('div');
      slot.id = 'auth-slot';
      slot.className = 'auth-slot';
      const bookBtn = tools.querySelector('.btn-primary');
      tools.insertBefore(slot, bookBtn || tools.firstChild);
    }

    function render() {
      if (isSignedIn()) {
        const name = window.NHDMV?.user?.name?.split(' ')[0] || 'Account';
        slot.innerHTML = `
          <a class="btn btn-navy btn-sm" href="dashboard.html">${name}'s dashboard</a>
          <button type="button" class="btn btn-ghost btn-sm" data-sign-out>Sign out</button>`;
      } else {
        slot.innerHTML = `<button type="button" class="btn btn-navy btn-sm" data-sign-in>Sign in</button>`;
      }
    }

    slot.addEventListener('click', (e) => {
      if (e.target.closest('[data-sign-in]')) {
        setSignedIn(true);
        toast(`Signed in as ${window.NHDMV?.user?.name || 'demo resident'}`);
        render();
        initHomeAuth();
      }
      if (e.target.closest('[data-sign-out]')) {
        setSignedIn(false);
        toast('Signed out');
        render();
        initHomeAuth();
        if (location.pathname.includes('dashboard')) {
          location.href = 'index.html';
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('[data-sign-in-hero]')) return;
      setSignedIn(true);
      toast(`Signed in as ${window.NHDMV?.user?.name || 'demo resident'}`);
      render();
      initHomeAuth();
    });

    render();
  }

  /* Guest vs signed-in home */
  function initHomeAuth() {
    const on = isSignedIn();
    $$('[data-home-guest]').forEach((el) => {
      el.hidden = on;
    });
    $$('[data-home-member]').forEach((el) => {
      el.hidden = !on;
    });
    const dashList = $('#dash-status-list');
    if (on && dashList && window.NHDMV) {
      dashList.innerHTML = window.NHDMV.dashboardItems
        .map(
          (item) => `<a class="status-item" href="${item.href}">
            <span class="status-dot ${item.tone === 'warn' ? 'warn' : item.tone === 'alert' ? 'alert' : ''}" aria-hidden="true"></span>
            <div>
              <h3>${item.title}</h3>
              <p>${item.detail}</p>
            </div>
            <span class="status-meta">${item.meta}</span>
          </a>`
        )
        .join('');
    }
  }

  function initServiceBrowser() {
    const grid = $('#service-grid');
    if (!grid || !window.NHDMV) return;

    const filter = grid.dataset.filterCategory || 'all';
    const source = window.NHDMV.services.filter(
      (s) => filter === 'all' || s.category === filter
    );

    const query = $('#intent-query');
    const chips = $$('.chip[data-filter]');
    const empty = $('#service-empty');
    let active = chips.find((c) => c.getAttribute('aria-pressed') === 'true')?.dataset.filter || 'all';

    function render() {
      const q = (query?.value || '').toLowerCase().trim();
      let visible = 0;
      grid.innerHTML = source
        .map((s) => {
          const hay = `${s.name} ${s.blurb} ${s.group} ${s.fee || ''}`.toLowerCase();
          const matchFilter = active === 'all' || s.group === active || s.category === active;
          const matchQuery = !q || hay.includes(q);
          const show = matchFilter && matchQuery;
          if (show) visible += 1;
          const fee = s.fee ? `<span class="fee-chip">${s.fee}</span>` : '';
          return `<a class="service-tile${show ? '' : ' is-hidden'}" href="${s.href}" data-group="${s.group}">
            <h3>${s.name}</h3>
            <p>${s.blurb}</p>
            <div class="ways">${wayBadges(s.ways)}${fee}</div>
          </a>`;
        })
        .join('');
      if (empty) {
        empty.classList.toggle('is-visible', visible === 0);
        if (visible === 0) {
          empty.innerHTML = `<strong>No matching services.</strong><p>Try another keyword, clear filters, or <a href="appointments.html">book an appointment</a> and describe your need.</p>`;
        }
      }
    }

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        active = chip.dataset.filter || 'all';
        chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
        render();
      });
    });
    query?.addEventListener('input', render);
    render();
  }

  function initDashboardTeaser() {
    /* handled by initHomeAuth when signed in */
  }

  function initDashboardPage() {
    const list = $('#dashboard-appts');
    if (!list || !window.NHDMV) return;

    if (!isSignedIn()) {
      setSignedIn(true);
    }

    const user = window.NHDMV.user;
    const nameEl = $('#dash-user-name');
    if (nameEl) nameEl.textContent = user.name.split(' ')[0];

    const booking = JSON.parse(sessionStorage.getItem(BOOKING_KEY) || 'null');
    const extra = booking
      ? `<div class="appt-row">
          <div>
            <span class="badge badge-ok">Just booked</span>
            <h3 style="margin-top:0.4rem">${booking.service}</h3>
            <p>${booking.branch} · ${booking.date} · ${booking.time}</p>
            <p style="margin-top:0.35rem"><a href="confirmation.html">View receipt</a> · confirmation ${booking.confirmationId}</p>
          </div>
          <div class="appt-actions">
            <a class="btn btn-secondary btn-sm" href="appointments.html#service=${encodeURIComponent(booking.serviceId || 'other')}&reschedule=1">Reschedule</a>
          </div>
        </div>`
      : '';

    list.innerHTML = `
      ${extra}
      <div class="appt-row">
        <div>
          <span class="badge badge-ok">Confirmed</span>
          <h3 style="margin-top:0.4rem">Knowledge test</h3>
          <p>Concord DMV · Thursday, Mar 12, 2026 · 10:30 AM</p>
        </div>
        <div class="appt-actions">
          <a class="btn btn-secondary btn-sm" href="appointments.html#service=knowledge-test&reschedule=1">Reschedule</a>
          <button type="button" class="btn btn-ghost btn-sm" data-cancel="knowledge">Cancel</button>
        </div>
      </div>
      <div class="appt-row">
        <div>
          <span class="badge badge-warn">Action needed</span>
          <h3 style="margin-top:0.4rem">License renewal window</h3>
          <p>${user.licenseType} · expires ${user.licenseExpires} · REAL ID fee $60.00</p>
        </div>
        <div class="appt-actions">
          <a class="btn btn-primary btn-sm" href="renew.html">Start renewal</a>
        </div>
      </div>
      <div class="appt-row">
        <div>
          <span class="badge badge-info">On file</span>
          <h3 style="margin-top:0.4rem">Vehicle registration</h3>
          <p>Plate ${user.plate} · pay town/city permit fees before state portion</p>
        </div>
        <div class="appt-actions">
          <a class="btn btn-secondary btn-sm" href="vehicle.html">Manage vehicle</a>
        </div>
      </div>`;

    list.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-cancel]');
      if (!btn) return;
      btn.closest('.appt-row')?.remove();
      toast('Appointment canceled in this demo');
    });
  }

  function initBranches() {
    const grid = $('#branch-grid');
    if (!grid || !window.NHDMV) return;
    const region = $('#branch-region');
    const status = $('#branch-status');
    const query = $('#branch-query');
    let empty = $('#branch-empty');
    if (!empty) {
      empty = document.createElement('div');
      empty.id = 'branch-empty';
      empty.className = 'empty-state';
      empty.setAttribute('role', 'status');
      grid.after(empty);
    }

    const statusLabel = {
      open: ['', 'Open · slots available'],
      busy: ['limited', 'Busy · limited slots'],
      limited: ['limited', 'Limited hours'],
      closed: ['closed', 'Closed']
    };

    function render() {
      const r = region?.value || 'all';
      const s = status?.value || 'all';
      const q = (query?.value || '').toLowerCase().trim();
      const matches = window.NHDMV.branches
        .filter((b) => (r === 'all' || b.region === r) && (s === 'all' || b.status === s))
        .filter((b) => !q || `${b.name} ${b.address} ${b.services}`.toLowerCase().includes(q));

      grid.innerHTML = matches
        .map((b) => {
          const [cls, label] = statusLabel[b.status] || statusLabel.open;
          const note = b.note ? `<p class="branch-meta"><em>${b.note}</em></p>` : '';
          const bookDisabled = b.status === 'closed';
          return `<article class="branch" id="${b.id}">
            <div class="branch-top">
              <h3>${b.name}</h3>
              <span class="live-dot ${cls}">${label}</span>
            </div>
            <p class="branch-addr">${b.address}</p>
            <p class="branch-meta">${b.hours}</p>
            <p class="branch-meta">${b.services}</p>
            ${note}
            <div class="branch-actions">
              ${bookDisabled
                ? `<button type="button" class="btn btn-secondary btn-sm" disabled>Closed</button>`
                : `<a class="btn btn-primary btn-sm" href="appointments.html#branch=${b.id}">Book here</a>`}
              <a class="btn btn-secondary btn-sm" href="checklist.html">What to bring</a>
            </div>
          </article>`;
        })
        .join('');

      empty.classList.toggle('is-visible', matches.length === 0);
      empty.innerHTML = matches.length
        ? ''
        : `<strong>No branches match those filters.</strong><p>Clear the search or choose another region. Need help? Call <a href="tel:6032274000">603-227-4000</a>.</p>`;
    }

    region?.addEventListener('change', render);
    status?.addEventListener('change', render);
    query?.addEventListener('input', render);
    render();
  }

  function initAppointments() {
    const form = $('#appt-form');
    if (!form || !window.NHDMV) return;

    const serviceSel = $('#appt-service');
    const branchSel = $('#appt-branch');
    const dateSel = $('#appt-date');
    const slotsEl = $('#slot-grid');
    const slotEmpty = $('#slot-empty');
    const summary = {
      service: $('#sum-service'),
      branch: $('#sum-branch'),
      date: $('#sum-date'),
      time: $('#sum-time')
    };

    serviceSel.innerHTML = window.NHDMV.appointmentServices
      .map((s) => `<option value="${s.id}">${s.label}</option>`)
      .join('');
    branchSel.innerHTML = window.NHDMV.branches
      .map((b) => `<option value="${b.id}">${b.name}</option>`)
      .join('');
    dateSel.innerHTML = Object.keys(window.NHDMV.slots)
      .map((d) => `<option value="${d}">${formatDate(d)}</option>`)
      .join('');

    const preService = params.get('service');
    const preBranch = params.get('branch');
    if (preService && [...serviceSel.options].some((o) => o.value === preService)) {
      serviceSel.value = preService;
    }
    if (preBranch && [...branchSel.options].some((o) => o.value === preBranch)) {
      branchSel.value = preBranch;
    }

    let selectedTime = null;

    function formatDate(iso) {
      const d = new Date(`${iso}T12:00:00`);
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }

    function syncSummary() {
      summary.service.textContent = serviceSel.selectedOptions[0]?.textContent || '—';
      summary.branch.textContent = branchSel.selectedOptions[0]?.textContent || '—';
      summary.date.textContent = formatDate(dateSel.value);
      summary.time.textContent = selectedTime || 'Choose a time';
    }

    function renderSlots() {
      const times = window.NHDMV.slots[dateSel.value] || [];
      selectedTime = null;
      if (!times.length) {
        slotsEl.innerHTML = '';
        if (slotEmpty) {
          slotEmpty.hidden = false;
          slotEmpty.innerHTML = `<strong>No times left on this date.</strong><p>Same-day and next-day slots release daily when available. Try another day, another branch, or call <a href="tel:6032274000">603-227-4000</a>.</p>`;
        }
      } else {
        if (slotEmpty) slotEmpty.hidden = true;
        slotsEl.innerHTML = times
          .map(
            (t, i) =>
              `<button type="button" class="slot" data-time="${t}" ${
                i === 2 && dateSel.value === '2026-03-13' ? 'disabled aria-disabled="true"' : ''
              }>${t}</button>`
          )
          .join('');
      }
      syncSummary();
    }

    slotsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.slot');
      if (!btn || btn.disabled) return;
      $$('.slot', slotsEl).forEach((s) => s.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedTime = btn.dataset.time;
      syncSummary();
    });

    [serviceSel, branchSel, dateSel].forEach((el) =>
      el.addEventListener('change', () => {
        if (el === dateSel) renderSlots();
        else syncSummary();
      })
    );

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const times = window.NHDMV.slots[dateSel.value] || [];
      if (!times.length) {
        toast('No slots on that date — pick another day');
        return;
      }
      if (!selectedTime) {
        toast('Select a time slot to continue');
        return;
      }

      const booking = {
        confirmationId: `NH-${Date.now().toString().slice(-8)}`,
        serviceId: serviceSel.value,
        service: serviceSel.selectedOptions[0].textContent,
        branchId: branchSel.value,
        branch: branchSel.selectedOptions[0].textContent,
        branchAddress: window.NHDMV.branches.find((b) => b.id === branchSel.value)?.address || '',
        dateIso: dateSel.value,
        date: formatDate(dateSel.value),
        time: selectedTime,
        name: window.NHDMV.user.name,
        email: window.NHDMV.user.email,
        phone: window.NHDMV.meta.phone,
        createdAt: new Date().toISOString()
      };
      sessionStorage.setItem(BOOKING_KEY, JSON.stringify(booking));
      setSignedIn(true);
      location.href = 'confirmation.html';
    });

    if (params.get('reschedule')) {
      toast('Reschedule mode — pick a new time');
    }

    renderSlots();
  }

  function initConfirmation() {
    const root = $('#confirmation-root');
    if (!root) return;
    const booking = JSON.parse(sessionStorage.getItem(BOOKING_KEY) || 'null');
    if (!booking) {
      root.innerHTML = `
        <div class="empty-state is-visible" style="display:block">
          <strong>No appointment receipt found.</strong>
          <p>Book a time first, then your printable confirmation will appear here.</p>
          <p style="margin-top:1rem"><a class="btn btn-primary" href="appointments.html">Book appointment</a></p>
        </div>`;
      return;
    }

    root.innerHTML = `
      <div class="receipt" id="receipt">
        <div class="receipt-banner">
          <p class="section-kicker" style="color:var(--navy-mid)">Appointment confirmation</p>
          <h1>You’re on the calendar</h1>
          <p>Confirmation <strong>${booking.confirmationId}</strong> · demo receipt (not sent to state systems)</p>
        </div>
        <div class="receipt-grid">
          <div>
            <h2>Visit details</h2>
            <div class="summary-row"><span>Service</span><span>${booking.service}</span></div>
            <div class="summary-row"><span>Branch</span><span>${booking.branch}</span></div>
            <div class="summary-row"><span>Address</span><span>${booking.branchAddress || '—'}</span></div>
            <div class="summary-row"><span>Date</span><span>${booking.date}</span></div>
            <div class="summary-row"><span>Time</span><span>${booking.time}</span></div>
          </div>
          <div>
            <h2>Resident</h2>
            <div class="summary-row"><span>Name</span><span>${booking.name}</span></div>
            <div class="summary-row"><span>Email</span><span>${booking.email}</span></div>
            <div class="summary-row"><span>Help line</span><span><a href="tel:6032274000">603-227-4000</a></span></div>
          </div>
        </div>
        <div class="result-box" style="margin-top:1.25rem">
          <h3>Before you go</h3>
          <p>Bring original documents. Run the <a href="checklist.html">What to bring</a> checklist. Confirmation emails on the live site come from noreply@dos.nh.gov — check spam.</p>
        </div>
        <div class="hero-actions" style="margin-top:1.25rem">
          <button type="button" class="btn btn-primary" onclick="window.print()">Print receipt</button>
          <a class="btn btn-navy" href="dashboard.html">View dashboard</a>
          <a class="btn btn-secondary" href="checklist.html">What to bring</a>
        </div>
      </div>`;
  }

  function initWizard() {
    const root = $('#doc-wizard');
    if (!root || !window.NHDMV) return;

    const intent = params.get('intent') || 'real-id';
    const presets = window.NHDMV.checklistPresets;
    const steps = $$('.wizard-panel', root);
    const stepTabs = $$('.wizard-step', root);
    let step = 0;
    let selectedIntent = presets[intent] ? intent : 'real-id';

    const intentOptions = $('#intent-options');
    if (intentOptions) {
      intentOptions.innerHTML = Object.entries(presets)
        .map(
          ([key, val]) => `<label class="option ${key === selectedIntent ? 'is-selected' : ''}">
            <input type="radio" name="intent" value="${key}" ${key === selectedIntent ? 'checked' : ''}>
            <div><h3>${val.title.replace(' checklist', '')}</h3><p>Guided document check for this transaction</p></div>
          </label>`
        )
        .join('');

      intentOptions.addEventListener('change', (e) => {
        if (e.target.name !== 'intent') return;
        selectedIntent = e.target.value;
        $$('.option', intentOptions).forEach((o) =>
          o.classList.toggle('is-selected', o.querySelector('input').checked)
        );
      });
    }

    function renderDocs() {
      const list = $('#doc-check-list');
      const preset = presets[selectedIntent];
      if (!list || !preset) return;
      $('#docs-title').textContent = preset.title;
      list.innerHTML = preset.docs
        .map(
          (d) => `<label class="check-item" data-doc="${d.id}">
            <input type="checkbox" value="${d.id}">
            <div><h3>${d.label}</h3><p>${d.hint}</p></div>
          </label>`
        )
        .join('');
      list.onchange = (e) => {
        const item = e.target.closest('.check-item');
        if (item) item.classList.toggle('is-checked', e.target.checked);
      };
    }

    function showStep(n) {
      step = n;
      steps.forEach((p, i) => {
        p.hidden = i !== step;
      });
      stepTabs.forEach((t, i) => {
        t.classList.toggle('is-active', i === step);
        t.classList.toggle('is-done', i < step);
      });
      if (step === 1) renderDocs();
      if (step === 2) evaluate();
    }

    function evaluate() {
      const boxes = $$('#doc-check-list input[type="checkbox"]');
      const total = boxes.length;
      const checked = boxes.filter((b) => b.checked).length;
      const box = $('#wizard-result');
      const ready = checked === total && total > 0;
      box.className = `result-box ${ready ? '' : 'warn'}`;
      box.innerHTML = ready
        ? `<h3>You’re ready to book</h3><p>All required documents for this path are checked. Continue to choose a branch and time.</p>
           <div style="margin-top:1rem"><a class="btn btn-primary" href="appointments.html#service=${
             selectedIntent === 'real-id' ? 'real-id' : selectedIntent === 'transfer' ? 'transfer' : 'knowledge-test'
           }">Book appointment</a></div>`
        : `<h3>${checked} of ${total} documents checked</h3>
           <p class="empty-hint">Missing originals are the #1 reason visits fail. Gather the rest before you burn a slot — or book only if you’re sure you can get them in time.</p>
           <div style="margin-top:1rem;display:flex;gap:0.5rem;flex-wrap:wrap">
             <button type="button" class="btn btn-secondary" data-back>Back to checklist</button>
             <a class="btn btn-navy" href="fees.html">See common fees</a>
           </div>`;
    }

    root.addEventListener('click', (e) => {
      const next = e.target.closest('[data-next]');
      const back = e.target.closest('[data-back]');
      if (next) {
        if (step === 0 && !selectedIntent) return toast('Choose a transaction first');
        showStep(Math.min(step + 1, steps.length - 1));
      }
      if (back) showStep(Math.max(step - 1, 0));
    });

    showStep(0);
  }

  function initRealIdChecker() {
    const form = $('#realid-checker');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const answers = $$('input[type="checkbox"]', form);
      const ok = answers.every((a) => a.checked);
      const out = $('#realid-result');
      out.hidden = false;
      out.className = `result-box ${ok ? '' : 'warn'}`;
      out.innerHTML = ok
        ? `<h3>Likely eligible to book</h3><p>REAL ID Operator fee is <strong>$60.00</strong> on the official schedule. Bring originals to your appointment.</p>
           <div style="margin-top:1rem;display:flex;gap:0.5rem;flex-wrap:wrap">
             <a class="btn btn-primary" href="appointments.html#service=real-id">Book REAL ID appointment</a>
             <a class="btn btn-secondary" href="checklist.html#intent=real-id">Full document wizard</a>
           </div>`
        : `<h3>Complete the checklist first</h3><p>Missing documents are the #1 reason REAL ID visits fail. Finish the items above or open the full wizard.</p>`;
    });
  }

  function initRenewal() {
    const form = $('#renew-form');
    if (!form) return;
    const type = params.get('type') || 'license';
    const title = $('#renew-title');
    if (title) {
      title.textContent =
        type === 'non-driver'
          ? 'Renew non-driver ID'
          : type === 'duplicate'
            ? 'Request duplicate credential'
            : 'Renew driver license';
    }
    const feeHint = $('#renew-fee-hint');
    if (feeHint) {
      feeHint.textContent =
        type === 'non-driver'
          ? 'Official fee: $20.00'
          : type === 'duplicate'
            ? 'Official fee: $20.00'
            : 'Official fees: Operator $50.00 · REAL ID Operator $60.00';
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const upgrade = $('#renew-option')?.value;
      if (upgrade === 'yes') {
        window.location.href = 'real-id.html#from=renew';
        return;
      }
      const panel = $('#renew-done');
      if (panel) {
        panel.hidden = false;
        toast('Renewal request simulated — stayed on NH DMV concept');
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  function initRecordsActions() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-inline-action]');
      if (!btn) return;
      const target = document.getElementById(btn.dataset.inlineAction);
      if (!target) return;
      target.hidden = false;
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      toast('Opened inline workflow — no subdomain hop');
    });

    $$('form[data-demo-submit]').forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const done = form.querySelector('[data-demo-done]');
        if (done) done.hidden = false;
        toast('Submitted in-demo — not sent to state systems');
      });
    });
  }

  function initNotices() {
    const list = $('#official-notices');
    if (!list || !window.NHDMV?.notices) return;
    list.innerHTML = window.NHDMV.notices
      .filter((n) => n.id !== 'scam')
      .slice(0, 4)
      .map((n) => `<p><strong>${n.title}:</strong> ${n.body}</p>`)
      .join('');
  }

  function initFeesPage() {
    const root = $('#fees-root');
    if (!root || !window.NHDMV?.fees) return;
    const { licensing, cdl, other } = window.NHDMV.fees;
    const categories = [
      { id: 'licensing', title: 'Driver licensing', lede: 'Operator, REAL ID, duplicates, and ID cards. Fee changes noted as of January 1, 2026.', rows: licensing },
      { id: 'cdl', title: 'Commercial licensing', lede: 'CDL classes, learner permits, and endorsements.', rows: cdl },
      { id: 'other', title: 'Registration, plates & records', lede: 'Vehicle registration also requires town/city permit fees before the state portion.', rows: other },
      {
        id: 'testing',
        title: 'Testing & related',
        lede: 'Testing is typically bundled with credential fees — confirm at booking.',
        rows: [
          { name: 'Knowledge / road testing', amount: 'Included in path · confirm at appointment' },
          { name: 'Motorcycle endorsement (first-time)', amount: '$30.00' },
          { name: 'Motorcycle endorsement renewal', amount: '$5.00' }
        ]
      }
    ];

    const search = $('#fee-search');
    const nav = $('#fee-cats');

    function table(rows) {
      return `<div class="fee-table" role="table">${rows
        .map(
          (r) =>
            `<div class="fee-row" role="row"><span role="cell">${r.name}</span><strong role="cell">${r.amount}</strong></div>`
        )
        .join('')}</div>`;
    }

    function render(q = '') {
      const query = q.toLowerCase().trim();
      const blocks = categories
        .map((cat) => {
          const rows = cat.rows.filter((r) => !query || `${r.name} ${r.amount} ${cat.title}`.toLowerCase().includes(query));
          if (!rows.length) return '';
          return `<section class="panel fee-panel" id="fee-${cat.id}">
            <h2>${cat.title}</h2>
            <p class="panel-lede">${cat.lede}</p>
            ${table(rows)}
            <p class="field-hint">Related: <a href="online.html">Can I do this online?</a> · <a href="search.html">Find a service</a></p>
          </section>`;
        })
        .filter(Boolean);

      root.innerHTML =
        blocks.join('') ||
        `<div class="empty-state is-visible" style="display:block"><strong>No fees match “${q}”.</strong><p>Try “REAL ID”, “duplicate”, or “plate” — or <a href="search.html">describe your task</a>.</p></div>`;

      root.insertAdjacentHTML(
        'beforeend',
        `<section class="panel">
          <h2>Accepted payment types</h2>
          <ul class="plain-list">${window.NHDMV.payments.map((p) => `<li>${p}</li>`).join('')}</ul>
          <p class="panel-lede" style="margin-top:1rem;margin-bottom:0">Source: <a href="${window.NHDMV.meta.feesSource}" rel="noopener">dmv.nh.gov licensing fees</a>. Demo mirror only.</p>
        </section>`
      );
    }

    if (nav) {
      nav.innerHTML = categories
        .map((c) => `<a class="chip" href="#fee-${c.id}">${c.title}</a>`)
        .join('');
    }
    search?.addEventListener('input', () => render(search.value));
    render(params.get('q') || '');
  }

  function statusBadge(status) {
    const map = {
      online: ['status-pill status-online', 'Online', 'Complete entirely online'],
      partial: ['status-pill status-partial', 'Partially online', 'Start online, finish at DMV'],
      visit: ['status-pill status-visit', 'DMV visit required', 'Requires an in-person visit']
    };
    const [cls, label, hint] = map[status] || map.visit;
    return `<span class="${cls}" title="${hint}"><span class="status-pill-label">${label}</span><span class="status-pill-hint">${hint}</span></span>`;
  }

  function initHomeTasks() {
    const grid = $('#home-task-grid');
    if (!grid || !window.NHDMV?.homeTasks) return;
    grid.innerHTML = window.NHDMV.homeTasks
      .map(
        (t) => `<a class="task-chip" href="${t.href}">
          <strong>${t.label}</strong>
          <span>${t.hint}</span>
        </a>`
      )
      .join('');
  }

  function initServiceDetail() {
    const root = $('#service-detail-root');
    if (!root || !window.NHDMV?.serviceDetails) return;
    const id = params.get('id');
    const empty = $('#service-detail-empty');
    const detail = window.NHDMV.serviceDetails[id];
    const title = $('#service-detail-title');
    const lede = $('#service-detail-lede');

    if (!detail) {
      if (empty) empty.classList.add('is-visible');
      return;
    }
    if (empty) empty.classList.remove('is-visible');
    if (title) title.textContent = detail.title;
    if (lede) lede.textContent = detail.summary;
    document.title = `${detail.title} — NH DMV`;

    const related = (detail.related || [])
      .map((rid) => {
        const r = window.NHDMV.serviceDetails[rid];
        if (!r) return '';
        return `<a class="tax-item" href="service.html#${rid}"><div><h3>${r.title}</h3><p>${r.onlineLabel}</p></div><span class="tax-cta">Open →</span></a>`;
      })
      .join('');

    root.innerHTML = `
      <div class="service-detail">
        <div class="service-detail-main">
          <div class="status-row">${statusBadge(detail.online)}</div>
          <section class="panel">
            <h2>Who is eligible</h2>
            <p class="panel-lede">${detail.eligible}</p>
          </section>
          <section class="panel">
            <h2>What documents are required</h2>
            <ul class="plain-list">${detail.docs.map((d) => `<li>${d}</li>`).join('')}</ul>
            <p class="field-hint"><a href="checklist.html#intent=${id === 'real-id' ? 'real-id' : id === 'transfer' ? 'transfer' : id === 'first-license' ? 'first-license' : 'real-id'}">See acceptable documents →</a></p>
          </section>
          <section class="panel">
            <h2>Expected process</h2>
            <ol class="process-list">${detail.process.map((p) => `<li>${p}</li>`).join('')}</ol>
          </section>
          ${related ? `<section class="panel"><h2>Related services</h2><div class="tax-list">${related}</div></section>` : ''}
        </div>
        <aside class="service-rail sticky-rail">
          <div class="summary-card">
            <h2>At a glance</h2>
            <div class="summary-row"><span>Cost</span><span>${detail.cost}</span></div>
            <div class="summary-row"><span>Appointment</span><span>${detail.appointment ? 'Required' : 'Not usually required'}</span></div>
            <div class="summary-row"><span>Where</span><span>${detail.where}</span></div>
            <div class="hero-actions" style="margin-top:1rem;flex-direction:column">
              <a class="btn btn-primary btn-block" href="${detail.primaryCta.href}">${detail.primaryCta.label}</a>
              ${detail.secondaryCta ? `<a class="btn btn-secondary btn-block" href="${detail.secondaryCta.href}">${detail.secondaryCta.label}</a>` : ''}
            </div>
          </div>
          <div class="panel readiness-card">
            <h2>Before you begin</h2>
            <ul class="ready-list">
              ${detail.beforeBegin.map((b) => `<li><span class="ready-dot" aria-hidden="true"></span>${b}</li>`).join('')}
            </ul>
            <a class="btn btn-navy btn-sm" href="checklist.html">Open readiness checklist</a>
          </div>
        </aside>
      </div>
      <div class="mobile-sticky-cta" role="region" aria-label="Primary action">
        <a class="btn btn-primary" href="${detail.primaryCta.href}">${detail.primaryCta.label}</a>
      </div>`;
  }

  function initOnlineGuide() {
    const grid = $('#online-grid');
    if (!grid || !window.NHDMV?.onlineGuide) return;
    const chips = $$('[data-online-filter]');
    const empty = $('#online-empty');
    let active = 'all';

    function render() {
      const items = window.NHDMV.onlineGuide.filter((i) => active === 'all' || i.status === active);
      grid.innerHTML = items
        .map(
          (i) => `<a class="online-card" href="${i.href}" data-status="${i.status}">
            ${statusBadge(i.status)}
            <h3>${i.title}</h3>
            <p>${i.blurb}</p>
            <span class="more">See requirements</span>
          </a>`
        )
        .join('');
      if (empty) empty.classList.toggle('is-visible', items.length === 0);
    }

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        active = chip.dataset.onlineFilter || 'all';
        chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
        render();
      });
    });
    render();
  }

  function initTaskSearch() {
    const input = $('#task-search');
    const results = $('#task-search-results');
    if (!input || !results || !window.NHDMV?.searchIntents) return;
    const empty = $('#task-search-empty');

    function score(intent, q) {
      const hay = `${intent.phrases.join(' ')} ${intent.title} ${intent.blurb}`.toLowerCase();
      if (!q) return 1;
      if (hay.includes(q)) return 3;
      return q.split(/\s+/).filter((w) => w.length > 2 && hay.includes(w)).length;
    }

    function render(qRaw) {
      const q = (qRaw || '').toLowerCase().trim();
      const ranked = window.NHDMV.searchIntents
        .map((intent) => ({ intent, s: score(intent, q) }))
        .filter((x) => (q ? x.s > 0 : true))
        .sort((a, b) => b.s - a.s);

      const primary = ranked[0];
      const rest = ranked.slice(1, 6);

      results.innerHTML = '';
      if (primary) {
        results.innerHTML += `<a class="search-primary" href="${primary.intent.href}">
          <span class="section-kicker">Best match</span>
          <h2>${primary.intent.title}</h2>
          <p>${primary.intent.blurb}</p>
          <span class="badge badge-info">${primary.intent.badge}</span>
        </a>`;
      }
      results.innerHTML += rest
        .map(
          (x) => `<a class="service-tile" href="${x.intent.href}">
            <h3>${x.intent.title}</h3>
            <p>${x.intent.blurb}</p>
            <div class="ways"><span class="fee-chip">${x.intent.badge}</span></div>
          </a>`
        )
        .join('');

      if (empty) empty.classList.toggle('is-visible', ranked.length === 0);
    }

    $$('[data-task-example]').forEach((chip) => {
      chip.addEventListener('click', () => {
        input.value = chip.dataset.taskExample || '';
        render(input.value);
        input.focus();
      });
    });
    input.addEventListener('input', () => render(input.value));
    const pre = params.get('q');
    if (pre) input.value = pre;
    render(input.value);
  }

  function initHeaderSearch() {
    const tools = $('.header-tools');
    if (!tools || $('#header-search-link')) return;
    const link = document.createElement('a');
    link.id = 'header-search-link';
    link.className = 'btn btn-ghost btn-sm header-search-link';
    link.href = 'search.html';
    link.textContent = 'Search';
    const book = tools.querySelector('.btn-primary');
    tools.insertBefore(link, book || tools.firstChild);
  }

  function initBranchDetail() {
    const root = $('#branch-detail-root');
    if (!root || !window.NHDMV) return;
    const id = params.get('id');
    const branch = window.NHDMV.branches.find((b) => b.id === id);
    const empty = $('#branch-detail-empty');
    const content = $('#branch-detail-content');
    const title = $('#branch-detail-title');
    const lede = $('#branch-detail-lede');
    if (!branch) return;
    if (empty) empty.hidden = true;
    if (content) content.hidden = false;
    if (title) title.textContent = `${branch.name} DMV`;
    if (lede) lede.textContent = `${branch.address} · ${branch.hours}`;
    document.title = `${branch.name} DMV — NH DMV`;

    const extra = window.NHDMV.branchDetails?.[id] || {};
    const set = (sel, val) => {
      const el = $(sel);
      if (el) el.textContent = val || '—';
    };
    set('#branch-address', branch.address);
    set('#branch-hours', branch.hours);
    set('#branch-region-label', `Region: ${branch.region}`);
    set('#branch-services', (extra.servicesList || branch.services.split(';')).join ? (extra.servicesList || []).join(' · ') || branch.services : branch.services);
    const servicesEl = $('#branch-services');
    if (servicesEl && extra.servicesList) {
      servicesEl.innerHTML = `<ul class="plain-list">${extra.servicesList.map((s) => `<li>${s}</li>`).join('')}</ul>`;
    } else if (servicesEl) servicesEl.textContent = branch.services;
    set('#branch-parking', extra.parking || 'See branch for on-site parking guidance');
    set('#branch-accessibility', extra.accessibility || 'Contact the branch for accessibility details');
    set('#branch-directions', extra.directions || branch.address);
    set('#branch-note', branch.note || extra.waitNote || 'In-person services require an appointment.');
    const status = $('#branch-status');
    if (status) {
      status.textContent =
        branch.status === 'busy'
          ? 'Busy · book ahead'
          : branch.status === 'limited'
            ? 'Limited hours / availability'
            : branch.status === 'closed'
              ? 'Closed'
              : 'Open · appointment slots when available';
      status.className = `badge ${branch.status === 'busy' ? 'badge-warn' : branch.status === 'closed' ? 'badge-alert' : 'badge-ok'}`;
    }
    const book = $('#branch-book-link');
    if (book) book.href = `appointments.html#branch=${branch.id}`;
    const maps = $('#branch-maps-link');
    if (maps) {
      maps.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address + ' New Hampshire')}`;
      maps.target = '_blank';
    }

    const sel = $('#branch-before-go');
    const out = $('#branch-before-go-result');
    if (sel) {
      const options = [
        { label: 'REAL ID', intent: 'real-id' },
        { label: 'License renewal / duplicate', intent: 'address' },
        { label: 'Out-of-state transfer', intent: 'transfer' },
        { label: 'First license / knowledge test', intent: 'first-license' },
        { label: 'Name change', intent: 'name-change' }
      ];
      sel.innerHTML =
        `<option value="">Select a service…</option>` +
        options.map((o) => `<option value="${o.intent}">${o.label}</option>`).join('');
      const sync = () => {
        if (!out) return;
        if (!sel.value) {
          out.hidden = true;
          return;
        }
        const preset = window.NHDMV.checklistPresets[sel.value];
        if (!preset) return;
        out.hidden = false;
        out.innerHTML = `<h3>Bring these</h3><ul class="plain-list">${preset.docs
          .map((d) => `<li><strong>${d.label}</strong> — ${d.hint}</li>`)
          .join('')}</ul>
          <p style="margin-top:0.75rem"><a href="checklist.html#intent=${sel.value}">Open full readiness checklist →</a></p>`;
      };
      sel.addEventListener('change', sync);
    }
  }

  function initBranchesMap() {
    const map = $('#branch-map');
    if (!map || !window.NHDMV) return;
    const regions = {
      north: { label: 'North', x: 48, y: 12 },
      west: { label: 'West', x: 22, y: 48 },
      central: { label: 'Central', x: 48, y: 42 },
      south: { label: 'South', x: 52, y: 68 },
      seacoast: { label: 'Seacoast', x: 78, y: 55 }
    };
    map.innerHTML = `
      <div class="map-canvas" role="img" aria-label="Stylized New Hampshire branch regions">
        ${Object.entries(regions)
          .map(
            ([key, r]) =>
              `<button type="button" class="map-pin" style="left:${r.x}%;top:${r.y}%" data-map-region="${key}" aria-label="${r.label} region">${r.label}</button>`
          )
          .join('')}
      </div>
      <p class="field-hint">Select a region to filter the list. Pins are illustrative — not GPS-precise.</p>`;
    map.addEventListener('click', (e) => {
      const pin = e.target.closest('[data-map-region]');
      if (!pin) return;
      const region = $('#branch-region');
      if (region) {
        region.value = pin.dataset.mapRegion;
        region.dispatchEvent(new Event('change'));
      }
      $$('.map-pin', map).forEach((p) => p.classList.toggle('is-active', p === pin));
    });
  }

  /* Enhance branch cards with detail links */
  const _initBranches = initBranches;
  initBranches = function () {
    _initBranches();
    const grid = $('#branch-grid');
    if (!grid) return;
    const obs = new MutationObserver(() => {
      $$('.branch', grid).forEach((card) => {
        if (card.dataset.enhanced) return;
        card.dataset.enhanced = '1';
        const id = card.id;
        const actions = $('.branch-actions', card);
        if (actions && id) {
          actions.insertAdjacentHTML(
            'afterbegin',
            `<a class="btn btn-navy btn-sm" href="branch.html#${id}">Branch details</a>`
          );
        }
      });
    });
    obs.observe(grid, { childList: true });
    grid.dispatchEvent(new Event('DOMNodeInserted')); // nudge
    // trigger once after first render
    setTimeout(() => {
      $$('.branch', grid).forEach((card) => {
        if (card.dataset.enhanced) return;
        card.dataset.enhanced = '1';
        const actions = $('.branch-actions', card);
        if (actions && card.id) {
          actions.insertAdjacentHTML(
            'afterbegin',
            `<a class="btn btn-navy btn-sm" href="branch.html#${card.id}">Branch details</a>`
          );
        }
      });
    }, 0);
  };

  function initNewResident() {
    const root = $('#new-resident-quiz');
    if (!root) return;
    const steps = $$('[data-quiz-step]', root);
    const indicators = $$('[data-quiz-step-indicator]', root);
    const plan = $('#new-resident-plan');
    let step = 0;
    const answers = { license: 'transfer', vehicle: 'yes', title: 'yes', docs: 'ready' };

    root.addEventListener('change', (e) => {
      const input = e.target.closest('[data-nr-answer]');
      if (!input) return;
      answers[input.dataset.nrAnswer] = input.value;
      const group = input.closest('.option-grid');
      if (group) {
        $$('.option', group).forEach((o) => o.classList.toggle('is-selected', o.querySelector('input')?.checked));
      }
    });

    function show(n) {
      step = n;
      steps.forEach((p, i) => {
        p.hidden = i !== step;
      });
      indicators.forEach((t, i) => {
        t.classList.toggle('is-active', i === step);
        t.classList.toggle('is-done', i < step);
      });
    }

    function buildPlan() {
      if (!plan) return;
      const items = [];
      if (answers.license === 'transfer') {
        items.push({ title: 'Transfer your out-of-state license', href: 'service.html#transfer', detail: '60 days after establishing residency · appointment required' });
      } else if (answers.license === 'first') {
        items.push({ title: 'Get your first NH license', href: 'first-license.html', detail: 'Guided journey: education → tests → credential' });
      } else {
        items.push({ title: 'Apply for non-driver ID', href: 'service.html#non-driver', detail: 'Photo ID without driving privileges' });
      }
      if (answers.vehicle === 'yes') {
        items.push({ title: 'Register your vehicle', href: 'service.html#reg-new', detail: 'Municipal fees first, then state registration' });
      }
      if (answers.title === 'yes' && answers.vehicle === 'yes') {
        items.push({ title: 'Transfer or obtain NH title', href: 'service.html#title', detail: 'Bring ownership documents — drop box or appointment' });
      }
      items.push({
        title: answers.docs === 'ready' ? 'Confirm residency documents' : 'Gather residency documentation',
        href: 'checklist.html#intent=transfer',
        detail: 'Two proofs of NH residency are required for most credential paths'
      });
      items.push({ title: 'Find a convenient branch', href: 'branches.html', detail: 'Appointment-only visits — check hours first' });

      plan.hidden = false;
      const list = $('#new-resident-plan-list') || plan;
      const html = `
          <ol class="plan-list">
            ${items
              .map(
                (it, i) => `<li>
                  <span class="plan-num">${i + 1}</span>
                  <div>
                    <h3><a href="${it.href}">${it.title}</a></h3>
                    <p>${it.detail}</p>
                  </div>
                </li>`
              )
              .join('')}
          </ol>`;
      if ($('#new-resident-plan-list')) {
        $('#new-resident-plan-list').innerHTML = html;
        const actions = plan.querySelector('.hero-actions');
        if (actions) {
          actions.innerHTML = `
            <a class="btn btn-primary" href="${items[0].href}">Start step 1</a>
            <a class="btn btn-secondary" href="online.html">Can I do any of this online?</a>
            <a class="btn btn-navy" href="branches.html">Find a branch</a>`;
        }
      } else {
        plan.innerHTML = `<div class="panel plan-card"><h2>Welcome to New Hampshire</h2>${html}</div>`;
      }
      plan.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    root.addEventListener('click', (e) => {
      if (e.target.closest('[data-quiz-next]')) {
        if (step >= steps.length - 1) {
          root.hidden = true;
          buildPlan();
        } else show(step + 1);
      }
      if (e.target.closest('[data-quiz-back]')) show(Math.max(step - 1, 0));
      if (e.target.closest('[data-quiz-finish]')) {
        root.hidden = true;
        buildPlan();
      }
    });
    show(0);
  }

  function initFirstLicenseJourney() {
    const journey = $('#license-journey');
    if (!journey || !window.NHDMV?.firstLicenseJourney) return;
    const steps = window.NHDMV.firstLicenseJourney;
    let current = Number(params.get('step') || 2);
    if (Number.isNaN(current) || current < 0 || current >= steps.length) current = 2;

    const currentEl = $('#journey-current');
    const reqEl = $('#journey-requirements');
    const nextEl = $('#journey-next-action');

    function render() {
      $$('[data-journey-step]', journey).forEach((el, i) => {
        el.classList.toggle('is-active', i === current);
        el.classList.toggle('is-done', i < current);
      });
      const step = steps[current];
      if (!step) return;
      if (currentEl) {
        const heading = $('#journey-current-heading', currentEl);
        const lede = $('.panel-lede', currentEl);
        if (heading) heading.textContent = step.title;
        if (lede) lede.textContent = step.body;
      }
      if (reqEl) {
        reqEl.innerHTML = `<ul class="check-list">${step.reqs
          .map((r) => `<li class="check-item"><div><h3>${r}</h3></div></li>`)
          .join('')}</ul>`;
      }
      if (nextEl) {
        nextEl.innerHTML = `
          <a class="btn btn-primary" href="${step.action.href}">${step.action.label}</a>
          <button type="button" class="btn btn-secondary" data-journey-prev ${current === 0 ? 'disabled' : ''}>Previous step</button>
          <button type="button" class="btn btn-navy" data-journey-next ${current === steps.length - 1 ? 'disabled' : ''}>Next step</button>`;
      }
    }

    journey.addEventListener('click', (e) => {
      const tab = e.target.closest('[data-journey-step]');
      if (!tab) return;
      current = Number(tab.dataset.journeyStep);
      render();
    });
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-journey-next]')) {
        current = Math.min(current + 1, steps.length - 1);
        render();
      }
      if (e.target.closest('[data-journey-prev]')) {
        current = Math.max(current - 1, 0);
        render();
      }
    });
    render();
  }

  function initAddressWizard() {
    const form = $('#address-wizard');
    if (!form) return;
    const steps = $$('[data-address-step]', form);
    const indicators = $$('[data-address-step-indicator]', form);
    const error = $('#address-error');
    let step = 0;

    function show(n) {
      step = n;
      steps.forEach((p, i) => {
        p.hidden = i !== step;
      });
      indicators.forEach((t, i) => {
        t.classList.toggle('is-active', i === step);
        t.classList.toggle('is-done', i < step);
      });
    }

    const reviewLicense = $('#addr-review-license');
    const reviewName = $('#addr-review-name');
    const reviewAddress = $('#addr-review-address');
    function fillReview() {
      if (reviewLicense) reviewLicense.textContent = $('#addr-license')?.value || '';
      if (reviewName) reviewName.textContent = $('#addr-last')?.value || '';
      const street = $('#addr-street')?.value || '';
      const unit = $('#addr-unit')?.value;
      const city = $('#addr-city')?.value || '';
      const zip = $('#addr-zip')?.value || '';
      if (reviewAddress) {
        reviewAddress.textContent = `${street}${unit ? ` ${unit}` : ''}, ${city} NH ${zip}`;
      }
    }

    form.addEventListener('click', (e) => {
      if (e.target.closest('[data-address-next]')) {
        if (step === 1 && params.get('demo') === 'bad-doc') {
          form.hidden = true;
          if (error) error.hidden = false;
          return;
        }
        if (step === 1) fillReview();
        show(Math.min(step + 1, steps.length - 1));
      }
      if (e.target.closest('[data-address-back]')) show(Math.max(step - 1, 0));
      if (e.target.closest('[data-address-submit]')) {
        e.preventDefault();
        show(steps.length - 1);
        toast('Address change submitted (demo)');
      }
      if (e.target.closest('[data-address-show-error]')) {
        form.hidden = true;
        if (error) error.hidden = false;
      }
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('[data-address-retry]')) return;
      if (error) error.hidden = true;
      form.hidden = false;
      show(1);
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      show(steps.length - 1);
      toast('Address change submitted (demo)');
    });
    show(0);
  }

  function initReadinessChecklist() {
    /* Enhance wizard evaluate already exists; add demo almost-ready state */
    const root = $('#doc-wizard');
    if (!root) return;
    if (params.get('demo') !== 'almost') return;

    // After docs render, pre-check all but last
    const orig = root.querySelector('[data-next]');
    const observer = new MutationObserver(() => {
      const boxes = $$('#doc-check-list input[type="checkbox"]');
      if (boxes.length < 2) return;
      boxes.forEach((b, i) => {
        const on = i < boxes.length - 1;
        b.checked = on;
        b.closest('.check-item')?.classList.toggle('is-checked', on);
        b.closest('.check-item')?.classList.toggle('is-missing', !on);
      });
      const meter = $('#readiness-meter');
      if (meter) {
        const done = boxes.length - 1;
        meter.innerHTML = readinessMeter(done, boxes.length, params.get('intent') || 'real-id');
      }
    });
    observer.observe(root, { childList: true, subtree: true });
  }

  function readinessMeter(done, total, intent) {
    const missing = total - done;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const title = window.NHDMV?.checklistPresets?.[intent]?.title || 'Appointment readiness';
    return `
      <div class="readiness-hero ${missing ? 'is-attention' : 'is-ready'}">
        <p class="section-kicker">${title.replace(' checklist', '').toUpperCase()}</p>
        <h2>${missing ? 'You’re almost ready.' : 'You’re ready.'}</h2>
        <p class="readiness-count"><strong>${done} of ${total}</strong> requirements complete</p>
        <div class="readiness-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}" aria-label="${done} of ${total} requirements complete">
          <span style="width:${pct}%"></span>
        </div>
        ${
          missing
            ? `<div class="missing-callout" role="status"><strong>${missing} item${missing > 1 ? 's' : ''} still needed</strong><p>Finish these before you travel — no surprises at the counter.</p><a href="#doc-check-list">See acceptable documents →</a></div>`
            : `<div class="ready-callout" role="status"><strong>All requirements checked</strong><p>You can book with confidence.</p></div>`
        }
      </div>`;
  }

  // Patch wizard evaluate for richer readiness UI
  const _initWizard = initWizard;
  initWizard = function () {
    _initWizard();
    const root = $('#doc-wizard');
    if (!root) return;
    const body0 = $('.wizard-panel', root);
    if (body0 && !$('#readiness-meter')) {
      const meter = document.createElement('div');
      meter.id = 'readiness-meter';
      meter.className = 'readiness-meter';
      root.insertBefore(meter, root.firstChild.nextSibling);
    }
    root.addEventListener('change', () => {
      const boxes = $$('#doc-check-list input[type="checkbox"]');
      if (!boxes.length) return;
      const done = boxes.filter((b) => b.checked).length;
      const intent = $$('#intent-options input:checked')[0]?.value || params.get('intent') || 'real-id';
      const meter = $('#readiness-meter');
      if (meter) meter.innerHTML = readinessMeter(done, boxes.length, intent);
      boxes.forEach((b) => {
        const item = b.closest('.check-item');
        if (!item) return;
        item.classList.toggle('is-checked', b.checked);
        item.classList.toggle('is-missing', !b.checked);
      });
    });
  };

  function initProactiveDashboard() {
    const host = $('#attention-board');
    if (!host || !window.NHDMV?.attentionCards) return;
    host.innerHTML = window.NHDMV.attentionCards
      .map(
        (c) => `<article class="attention-card tone-${c.tone}">
          <p class="attention-eyebrow">${c.eyebrow}</p>
          <h3>${c.title}</h3>
          <p>${c.body}</p>
          <a class="btn btn-primary btn-sm" href="${c.href}">${c.cta} →</a>
        </article>`
      )
      .join('');
  }

  function initMyRecords() {
    const online = $('#records-online');
    const formal = $('#records-formal');
    if (!online || !window.NHDMV?.myRecords) return;
    const row = (items) =>
      items
        .map(
          (i) => `<a class="tax-item" href="${i.href}"><div><h3>${i.title}</h3><p>${i.detail}</p></div><span class="tax-cta">${i.action} →</span></a>`
        )
        .join('');
    online.innerHTML = row(window.NHDMV.myRecords.availableOnline);
    if (formal) formal.innerHTML = row(window.NHDMV.myRecords.formalRequest);
  }

  function initProblemDemo() {
    const host = $('#problem-demos');
    if (!host || !window.NHDMV?.problemStates) return;
    host.innerHTML = Object.values(window.NHDMV.problemStates)
      .map(
        (p) => `<article class="problem-card">
          <h3>${p.title}</h3>
          <p>${p.body}</p>
          <a class="btn btn-navy btn-sm" href="${p.href}">${p.next} →</a>
        </article>`
      )
      .join('');
  }

  function initSiteConnectivity() {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const file = !path || path === 'nh-dmv' ? 'index.html' : path.includes('.html') ? path : `${path}.html`;

    const hubs = [
      { href: 'index.html', label: 'Home', match: ['index.html', ''] },
      {
        href: 'license.html',
        label: 'License & ID',
        match: [
          'license.html',
          'renew.html',
          'real-id.html',
          'first-license.html',
          'service.html',
          'change-address.html',
          'new-resident.html'
        ]
      },
      { href: 'vehicle.html', label: 'Vehicle', match: ['vehicle.html', 'america-250.html'] },
      { href: 'records.html', label: 'Records', match: ['records.html'] },
      { href: 'appointments.html', label: 'Appointments', match: ['appointments.html', 'confirmation.html'] },
      { href: 'branches.html', label: 'Branches', match: ['branches.html', 'branch.html', 'locations.html'] }
    ];
    const tools = [
      { href: 'search.html', label: 'Search' },
      { href: 'online.html', label: 'Can I do this online?' },
      { href: 'checklist.html', label: 'Am I ready?' },
      { href: 'fees.html', label: 'Fees' },
      { href: 'dashboard.html', label: 'Dashboard' }
    ];
    const journeys = [
      { href: 'service.html#dl-renew', label: 'Renew license' },
      { href: 'service.html#real-id', label: 'REAL ID' },
      { href: 'service.html#duplicate', label: 'Replace license' },
      { href: 'first-license.html', label: 'First license' },
      { href: 'new-resident.html', label: 'New resident' },
      { href: 'america-250.html', label: 'America 250 plate' },
      { href: 'appointments.html#how-to-video', label: 'Appointment video' },
      { href: 'change-address.html', label: 'Change address' },
      { href: 'online.html', label: 'Skip the trip' },
      { href: 'search.html', label: 'Task search' }
    ];

    const nav = $('#life-nav');
    if (nav) {
      hubs.forEach((h) => {
        const a = nav.querySelector(`a[href="${h.href}"]`);
        if (!a) return;
        if (h.match.includes(file)) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
      if (!nav.querySelector('[data-nav-extra]')) {
        nav.insertAdjacentHTML(
          'beforeend',
          `<a href="search.html" data-nav-extra>Search</a>
           <a href="online.html" data-nav-extra>Online?</a>
           <a href="checklist.html" data-nav-extra>Checklist</a>
           <a href="fees.html" data-nav-extra>Fees</a>`
        );
      }
      $$('a[data-nav-extra]', nav).forEach((a) => {
        const hrefFile = (a.getAttribute('href') || '').split('?')[0];
        if (hrefFile === file) a.setAttribute('aria-current', 'page');
      });
    }

    const toolsEl = $('.header-tools');
    if (toolsEl && !$('#header-online-link')) {
      const online = document.createElement('a');
      online.id = 'header-online-link';
      online.className = 'btn btn-ghost btn-sm header-search-link';
      online.href = 'online.html';
      online.textContent = 'Online?';
      const search = $('#header-search-link');
      toolsEl.insertBefore(online, search || toolsEl.querySelector('.btn-primary') || toolsEl.firstChild);
    }

    const main = $('#main');
    if (main && !$('#portal-connect')) {
      const strip = document.createElement('nav');
      strip.id = 'portal-connect';
      strip.className = 'portal-connect';
      strip.setAttribute('aria-label', 'Explore this portal');
      strip.innerHTML = `
        <div class="portal-connect-inner">
          <div>
            <p class="section-kicker">Stay in this portal</p>
            <h2 class="portal-connect-title">Everything connects here</h2>
            <p>No off-site forms hop. Pick any destination below — same NH DMV concept throughout.</p>
          </div>
          <div class="portal-connect-grid">
            <div>
              <h3>Main</h3>
              <ul>${hubs.map((h) => `<li><a href="${h.href}">${h.label}</a></li>`).join('')}</ul>
            </div>
            <div>
              <h3>Tools</h3>
              <ul>${tools.map((t) => `<li><a href="${t.href}">${t.label}</a></li>`).join('')}</ul>
            </div>
            <div>
              <h3>Common tasks</h3>
              <ul>${journeys.map((j) => `<li><a href="${j.href}">${j.label}</a></li>`).join('')}</ul>
            </div>
          </div>
        </div>`;
      main.appendChild(strip);
    }

    const footer = $('.app-footer');
    if (footer) {
      footer.innerHTML = `
        <div class="footer-inner footer-connected">
          <div>
            <div class="footer-brand">NH DMV</div>
            <p>Digital service experience by Artistic Fountain. Demo only — all flows stay inside this portal.</p>
            <div class="hero-actions" style="margin-top:0.85rem">
              <a class="btn btn-primary btn-sm" href="appointments.html">Book appointment</a>
              <a class="btn btn-secondary btn-sm" href="search.html">Search tasks</a>
            </div>
          </div>
          <div>
            <h3>Main</h3>
            <ul>${hubs.map((h) => `<li><a href="${h.href}">${h.label}</a></li>`).join('')}</ul>
          </div>
          <div>
            <h3>Tools</h3>
            <ul>${tools.map((t) => `<li><a href="${t.href}">${t.label}</a></li>`).join('')}</ul>
          </div>
          <div>
            <h3>Tasks</h3>
            <ul>
              ${journeys
                .slice(0, 6)
                .map((j) => `<li><a href="${j.href}">${j.label}</a></li>`)
                .join('')}
              <li><a href="../index.html">Artistic Fountain portfolio</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 Artistic Fountain · Conceptual redesign — not affiliated with the State of New Hampshire.</span>
          <a href="index.html">Back to portal home</a>
        </div>`;
    }

    document.addEventListener(
      'click',
      (e) => {
        const a = e.target.closest('a[href]');
        if (!a) return;
        const href = a.getAttribute('href') || '';
        if (!href.includes('dmv.nh.gov')) return;
        e.preventDefault();
        if (href.includes('licensing-fees') || href.includes('fees')) location.href = 'fees.html';
        else if (href.includes('hours') || href.includes('locations')) location.href = 'branches.html';
        else location.href = 'online.html';
        toast('Opened the in-portal version — stayed on this site');
      },
      true
    );
  }

  initAuthChrome();
  initHeaderSearch();
  initSiteConnectivity();
  initHomeAuth();
  initHomeTasks();
  initServiceBrowser();
  initDashboardTeaser();
  initDashboardPage();
  initProactiveDashboard();
  initBranches();
  initBranchesMap();
  initBranchDetail();
  initAppointments();
  initConfirmation();
  initWizard();
  initReadinessChecklist();
  initRealIdChecker();
  initRenewal();
  initRecordsActions();
  initMyRecords();
  initNotices();
  initFeesPage();
  initServiceDetail();
  initOnlineGuide();
  initTaskSearch();
  initNewResident();
  initFirstLicenseJourney();
  initAddressWizard();
  initProblemDemo();
})();
