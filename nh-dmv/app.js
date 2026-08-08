(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* Mobile nav */
  const nav = $('#life-nav');
  const toggle = $('.nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* Toast */
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

  /* Query helpers */
  const params = new URLSearchParams(location.search);
  window.NHDMVParams = params;

  /* Way badges */
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

  /* Home / license / shared service grids */
  function initServiceBrowser(root = document) {
    const grid = $('#service-grid', root);
    if (!grid || !window.NHDMV) return;

    const filter = grid.dataset.filterCategory || 'all';
    const source = window.NHDMV.services.filter(
      (s) => filter === 'all' || s.category === filter
    );

    const query = $('#intent-query', root);
    const chips = $$('.chip[data-filter]', root);
    const empty = $('#service-empty', root);
    let active = chips.find((c) => c.getAttribute('aria-pressed') === 'true')?.dataset.filter || 'all';

    function render() {
      const q = (query?.value || '').toLowerCase().trim();
      let visible = 0;
      grid.innerHTML = source
        .map((s) => {
          const hay = `${s.name} ${s.blurb} ${s.group}`.toLowerCase();
          const matchFilter = active === 'all' || s.group === active || s.category === active;
          const matchQuery = !q || hay.includes(q);
          const show = matchFilter && matchQuery;
          if (show) visible += 1;
          return `<a class="service-tile${show ? '' : ' is-hidden'}" href="${s.href}" data-group="${s.group}">
            <h3>${s.name}</h3>
            <p>${s.blurb}</p>
            <div class="ways">${wayBadges(s.ways)}</div>
          </a>`;
        })
        .join('');
      if (empty) empty.classList.toggle('is-visible', visible === 0);
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

  /* Dashboard status list */
  function initDashboardTeaser() {
    const list = $('#dash-status-list');
    if (!list || !window.NHDMV) return;
    list.innerHTML = window.NHDMV.dashboardItems
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

  function initDashboardPage() {
    const list = $('#dashboard-appts');
    if (!list || !window.NHDMV) return;
    const user = window.NHDMV.user;
    const nameEl = $('#dash-user-name');
    if (nameEl) nameEl.textContent = user.name;

    list.innerHTML = `
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
          <p>${user.licenseType} · expires ${user.licenseExpires}</p>
        </div>
        <div class="appt-actions">
          <a class="btn btn-primary btn-sm" href="renew.html">Start renewal</a>
        </div>
      </div>
      <div class="appt-row">
        <div>
          <span class="badge badge-info">On file</span>
          <h3 style="margin-top:0.4rem">Vehicle registration</h3>
          <p>Plate ${user.plate} · next due with municipal clerk</p>
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

  /* Branches */
  function initBranches() {
    const grid = $('#branch-grid');
    if (!grid || !window.NHDMV) return;
    const region = $('#branch-region');
    const status = $('#branch-status');
    const query = $('#branch-query');

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
      grid.innerHTML = window.NHDMV.branches
        .filter((b) => (r === 'all' || b.region === r) && (s === 'all' || b.status === s))
        .filter((b) => !q || `${b.name} ${b.address}`.toLowerCase().includes(q))
        .map((b) => {
          const [cls, label] = statusLabel[b.status] || statusLabel.open;
          return `<article class="branch" id="${b.id}">
            <div class="branch-top">
              <h3>${b.name}</h3>
              <span class="live-dot ${cls}">${label}</span>
            </div>
            <p class="branch-addr">${b.address}</p>
            <p class="branch-meta">${b.hours}</p>
            <p class="branch-meta">${b.services}</p>
            <div class="branch-actions">
              <a class="btn btn-primary btn-sm" href="appointments.html?branch=${b.id}">Book here</a>
              <a class="btn btn-secondary btn-sm" href="checklist.html">What to bring</a>
            </div>
          </article>`;
        })
        .join('');
    }

    region?.addEventListener('change', render);
    status?.addEventListener('change', render);
    query?.addEventListener('input', render);
    render();
  }

  /* Appointment booking */
  function initAppointments() {
    const form = $('#appt-form');
    if (!form || !window.NHDMV) return;

    const serviceSel = $('#appt-service');
    const branchSel = $('#appt-branch');
    const dateSel = $('#appt-date');
    const slotsEl = $('#slot-grid');
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
      return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
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
      slotsEl.innerHTML = times
        .map((t, i) => `<button type="button" class="slot" data-time="${t}" ${i === 2 && dateSel.value === '2026-03-13' ? 'disabled' : ''}>${t}</button>`)
        .join('');
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

    [serviceSel, branchSel, dateSel].forEach((el) => el.addEventListener('change', () => {
      if (el === dateSel) renderSlots();
      else syncSummary();
    }));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!selectedTime) {
        toast('Select a time slot to continue');
        return;
      }
      const confirm = $('#appt-confirm');
      if (confirm) {
        confirm.hidden = false;
        confirm.querySelector('[data-confirm-detail]').textContent =
          `${summary.service.textContent} · ${summary.branch.textContent} · ${summary.date.textContent} · ${selectedTime}`;
      }
      toast('Appointment held in this demo — no live booking sent');
      confirm?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    if (params.get('reschedule')) {
      toast('Reschedule mode — pick a new time for your knowledge test');
    }

    renderSlots();
  }

  /* Document wizard */
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
        $$('.option', intentOptions).forEach((o) => o.classList.toggle('is-selected', o.querySelector('input').checked));
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
      list.addEventListener('change', (e) => {
        const item = e.target.closest('.check-item');
        if (item) item.classList.toggle('is-checked', e.target.checked);
      });
    }

    function showStep(n) {
      step = n;
      steps.forEach((p, i) => { p.hidden = i !== step; });
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
        ? `<h3>You’re ready to book</h3><p>All required documents for this path are checked. Continue to choose a branch and time — no external redirect.</p>
           <div style="margin-top:1rem"><a class="btn btn-primary" href="appointments.html?service=${selectedIntent === 'real-id' ? 'real-id' : selectedIntent === 'transfer' ? 'transfer' : 'knowledge-test'}">Book appointment</a></div>`
        : `<h3>${checked} of ${total} documents checked</h3><p>Gather the remaining originals before booking. Appointments without complete documents often require a return visit.</p>`;
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

  /* REAL ID eligibility mini-checker */
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
        ? `<h3>Likely eligible to book</h3><p>Based on your checklist, proceed to an in-person REAL ID appointment with originals in hand.</p>
           <div style="margin-top:1rem;display:flex;gap:0.5rem;flex-wrap:wrap">
             <a class="btn btn-primary" href="appointments.html?service=real-id">Book REAL ID appointment</a>
             <a class="btn btn-secondary" href="checklist.html?intent=real-id">Full document wizard</a>
           </div>`
        : `<h3>Complete the checklist first</h3><p>Missing documents are the #1 reason REAL ID visits fail. Finish the items above or open the full wizard.</p>`;
    });
  }

  /* Renewal demo flow */
  function initRenewal() {
    const form = $('#renew-form');
    if (!form) return;
    const type = params.get('type') || 'license';
    const title = $('#renew-title');
    if (title) {
      title.textContent =
        type === 'non-driver' ? 'Renew non-driver ID' :
        type === 'duplicate' ? 'Request duplicate credential' :
        'Renew driver license';
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

  /* Records inline actions */
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

  initServiceBrowser();
  initDashboardTeaser();
  initDashboardPage();
  initBranches();
  initAppointments();
  initWizard();
  initRealIdChecker();
  initRenewal();
  initRecordsActions();
})();
