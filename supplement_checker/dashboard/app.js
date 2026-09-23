(() => {
  const state = {
    token: localStorage.getItem("cd_token") || "",
    clientId: localStorage.getItem("cd_client") || "",
    profileId: localStorage.getItem("cd_profile") || "",
    ingredients: [],
    termsAccepted: false,
  };

  const $ = (id) => document.getElementById(id);

  function headers(json = true) {
    const h = {};
    if (json) h["Content-Type"] = "application/json";
    if (state.token) h.Authorization = `Bearer ${state.token}`;
    if (state.clientId) h["X-Client-Id"] = state.clientId;
    return h;
  }

  async function api(path, options = {}) {
    const res = await fetch(path, options);
    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = { raw: text }; }
    if (!res.ok) {
      const detail = data?.detail;
      const msg = typeof detail === "string"
        ? detail
        : detail?.message || data?.message || res.statusText;
      const err = new Error(msg || `HTTP ${res.status}`);
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  function setStatus(id, msg, cls = "") {
    const el = $(id);
    el.textContent = msg || "";
    el.className = `status ${cls}`.trim();
  }

  function unlock(cardId, on) {
    $(cardId).classList.toggle("locked", !on);
  }

  function refreshLocks() {
    const authed = Boolean(state.token);
    unlock("cardTerms", authed);
    unlock("cardProfile", authed && state.termsAccepted);
    unlock("cardScan", authed && state.termsAccepted && Boolean(state.profileId));
    unlock("cardCompare", authed && state.termsAccepted && Boolean(state.profileId) && state.ingredients.length > 0);
    $("sessionMeta").textContent = authed
      ? `Session · ${state.clientId || "authenticated"}`
      : "Signed out";
  }

  async function loadNotice() {
    const notice = await api("/legal/notice");
    $("noticeBody").textContent = notice.body;
  }

  async function register() {
    try {
      const data = await api("/auth/register", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          email: $("email").value.trim(),
          password: $("password").value,
          display_name: $("displayName").value.trim() || null,
        }),
      });
      state.token = data.access_token;
      state.clientId = data.user.client_id;
      localStorage.setItem("cd_token", state.token);
      localStorage.setItem("cd_client", state.clientId);
      setStatus("authStatus", `Registered as ${data.user.email}`, "ok");
      refreshLocks();
    } catch (e) {
      setStatus("authStatus", e.message, "error");
    }
  }

  async function login() {
    try {
      const data = await api("/auth/login", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          email: $("email").value.trim(),
          password: $("password").value,
        }),
      });
      state.token = data.access_token;
      state.clientId = data.user.client_id;
      localStorage.setItem("cd_token", state.token);
      localStorage.setItem("cd_client", state.clientId);
      setStatus("authStatus", `Signed in as ${data.user.email}`, "ok");
      refreshLocks();
    } catch (e) {
      setStatus("authStatus", e.message, "error");
    }
  }

  async function logout() {
    try {
      await api("/auth/logout", { method: "POST", headers: headers(false) });
    } catch (_) { /* ignore */ }
    state.token = "";
    state.clientId = "";
    state.profileId = "";
    state.termsAccepted = false;
    localStorage.removeItem("cd_token");
    localStorage.removeItem("cd_client");
    localStorage.removeItem("cd_profile");
    setStatus("authStatus", "Signed out");
    refreshLocks();
  }

  async function acceptTerms() {
    try {
      await api("/legal/accept", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ accepted: true }),
      });
      state.termsAccepted = true;
      setStatus("termsStatus", "Notice accepted", "ok");
      refreshLocks();
    } catch (e) {
      setStatus("termsStatus", e.message, "error");
    }
  }

  async function seedProfile() {
    try {
      // Use demo seed endpoint then re-create under auth+terms for ownership.
      const demo = await api("/demo/seed?verified=false", { method: "POST" });
      const full = await api(`/profiles/${demo.profile.profile_id}`);
      const created = await api("/profiles", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ profile: full.full }),
      });
      state.profileId = created.profile.profile_id;
      localStorage.setItem("cd_profile", state.profileId);
      renderMetrics(created.profile);
      setStatus("profileStatus", "Demo profile ingested (unverified)", "ok");
      refreshLocks();
    } catch (e) {
      setStatus("profileStatus", e.message, "error");
    }
  }

  function renderMetrics(summary) {
    const items = [
      ["Conditions", summary.condition_count],
      ["Meds", summary.medication_count],
      ["Allergies", summary.allergy_count],
      ["Risk tokens", summary.risk_token_count],
    ];
    $("profileMetrics").innerHTML = items.map(([label, value]) => (
      `<div class="metric"><strong>${value ?? "—"}</strong><span>${label}</span></div>`
    )).join("");
  }

  async function verifyProfile() {
    if (!state.profileId) {
      setStatus("profileStatus", "Load a profile first", "error");
      return;
    }
    try {
      const data = await api(`/profiles/${state.profileId}/verify`, {
        method: "POST",
        headers: headers(),
      });
      renderMetrics(data.profile);
      setStatus("profileStatus", "Profile verified — analysis unlocked", "ok");
      refreshLocks();
    } catch (e) {
      setStatus("profileStatus", e.message, "error");
    }
  }

  function renderIngredients(list) {
    $("ingredientGrid").innerHTML = list.map((item) => (
      `<article class="ingredient">
        <strong>${item.name}</strong>
        <span>${item.amount ?? "—"} ${item.unit ?? ""}</span>
      </article>`
    )).join("");
  }

  async function scanLabel() {
    if (!state.profileId) return;
    try {
      const file = $("labelFile").files?.[0];
      const form = new FormData();
      if (file) form.append("file", file);
      const res = await fetch(`/labels/scan/${state.profileId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.token}`,
          "X-Client-Id": state.clientId,
        },
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail?.message || data?.detail || res.statusText);
      state.ingredients = data.ingredients || [];
      renderIngredients(state.ingredients);
      setStatus("scanStatus", `${data.provider} OCR · ${state.ingredients.length} ingredients`, "ok");
      refreshLocks();
    } catch (e) {
      setStatus("scanStatus", e.message, "error");
    }
  }

  async function compare() {
    if (!state.profileId || !state.ingredients.length) return;
    try {
      const data = await api(`/compare/${state.profileId}`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          ingredients: state.ingredients,
          use_live_literature: false,
        }),
      });
      $("findings").innerHTML = (data.findings || []).map((f) => (
        `<article class="finding ${f.severity}">
          <h3>${f.title}</h3>
          <p>${f.rationale}</p>
          <ul class="citations">${(f.citations || []).slice(0, 3).map((c) => (
            `<li>${c.title || c.url || "citation"}</li>`
          )).join("")}</ul>
        </article>`
      )).join("");
      $("gaps").innerHTML = (data.data_gaps || []).map((g) => (
        `<article class="gap">
          <h3>Data Gap Identified — ${g.ingredient}</h3>
          <p>${g.ui_message}</p>
        </article>`
      )).join("");
      setStatus("compareStatus", data.message || "Comparison complete", "ok");
    } catch (e) {
      setStatus("compareStatus", e.message, "error");
    }
  }

  $("termsCheck").addEventListener("change", (e) => {
    $("btnAcceptTerms").disabled = !e.target.checked;
  });
  $("btnRegister").addEventListener("click", register);
  $("btnLogin").addEventListener("click", login);
  $("btnLogout").addEventListener("click", logout);
  $("btnAcceptTerms").addEventListener("click", acceptTerms);
  $("btnSeedProfile").addEventListener("click", seedProfile);
  $("btnVerify").addEventListener("click", verifyProfile);
  $("btnScan").addEventListener("click", scanLabel);
  $("btnCompare").addEventListener("click", compare);

  loadNotice().catch((e) => { $("noticeBody").textContent = e.message; });
  refreshLocks();
})();
