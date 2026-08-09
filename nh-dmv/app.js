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
    const guest = $('[data-home-guest]');
    const member = $('[data-home-member]');
    if (!guest && !member) return;
    const on = isSignedIn();
    if (guest) guest.hidden = on;
    if (member) member.hidden = !on;
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
            <a class="btn btn-secondary btn-sm" href="appointments.html?service=${encodeURIComponent(booking.serviceId || 'other')}&reschedule=1">Reschedule</a>
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
          <a class="btn btn-secondary btn-sm" href="appointments.html?service=knowledge-test&reschedule=1">Reschedule</a>
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
                : `<a class="btn btn-primary btn-sm" href="appointments.html?branch=${b.id}">Book here</a>`}
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
           <div style="margin-top:1rem"><a class="btn btn-primary" href="appointments.html?service=${
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
             <a class="btn btn-primary" href="appointments.html?service=real-id">Book REAL ID appointment</a>
             <a class="btn btn-secondary" href="checklist.html?intent=real-id">Full document wizard</a>
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
        window.location.href = 'real-id.html?from=renew';
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
    const table = (rows) =>
      `<div class="fee-table">${rows
        .map((r) => `<div class="fee-row"><span>${r.name}</span><strong>${r.amount}</strong></div>`)
        .join('')}</div>`;

    root.innerHTML = `
      <section class="panel">
        <h2>Driver licensing fees</h2>
        <p class="panel-lede">From the official NH DMV licensing fees page. Fee changes noted as of January 1, 2026.</p>
        ${table(licensing)}
      </section>
      <section class="panel">
        <h2>Commercial license fees</h2>
        ${table(cdl)}
      </section>
      <section class="panel">
        <h2>Common registration &amp; records fees</h2>
        <p class="panel-lede">Vehicle registration also requires town/city permit fees before the state portion can be completed.</p>
        ${table(other)}
      </section>
      <section class="panel">
        <h2>Accepted payment types</h2>
        <ul class="plain-list">${window.NHDMV.payments.map((p) => `<li>${p}</li>`).join('')}</ul>
        <p class="panel-lede" style="margin-top:1rem;margin-bottom:0">Source: <a href="${window.NHDMV.meta.feesSource}" rel="noopener">dmv.nh.gov licensing fees</a>. Demo mirror only.</p>
      </section>`;
  }

  initAuthChrome();
  initHomeAuth();
  initServiceBrowser();
  initDashboardTeaser();
  initDashboardPage();
  initBranches();
  initAppointments();
  initConfirmation();
  initWizard();
  initRealIdChecker();
  initRenewal();
  initRecordsActions();
  initNotices();
  initFeesPage();
})();
