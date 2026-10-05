<script lang="ts">
  import HouseLineup from "$lib/components/HouseLineup.svelte";
  import { getSignoffPin, setSignoffPin } from "$lib/browser-storage";
  import {
    appState,
    clearHouseSignoff,
    loadSampleHouse,
    saveDisplayName,
    saveUserArea,
    setMode,
    signoffIsSet,
    startEmptyHouse,
  } from "$lib/stores/app.svelte";

  let nameDraft = $state(appState.displayName ?? "");
  let areaDraft = $state(appState.userArea ?? "");
  let pinDraft = $state("");
  let pinSet = $state(signoffIsSet());
  let notice = $state("");
  const hasOps = $derived(
    appState.inventoryScans.length > 0 ||
      appState.shiftLogs.length > 0 ||
      appState.auditTrails.length > 0,
  );

  $effect(() => {
    nameDraft = appState.displayName ?? "";
    areaDraft = appState.userArea ?? "";
  });

  function saveName() {
    saveDisplayName(nameDraft);
    flash(
      nameDraft.trim()
        ? `Thomas will greet you as ${nameDraft.trim()}.`
        : "Name cleared — greetings stay unnamed.",
    );
  }

  function flash(text: string) {
    notice = text;
  }

  function saveArea() {
    saveUserArea(areaDraft);
    flash("Area saved — Chat will use this for nearby shops.");
  }

  function savePin() {
    if (pinDraft.length < 4) return;
    setSignoffPin(pinDraft);
    pinSet = true;
    pinDraft = "";
    flash("Sign-off code saved.");
  }

  function clearPin() {
    clearHouseSignoff();
    pinSet = getSignoffPin() != null;
    flash("Sign-off cleared. You’ll set a new one on the next close.");
  }

  function sample() {
    loadSampleHouse();
    flash("Sample night loaded — Shift Overview now has counts and closes.");
  }

  function emptyOps() {
    startEmptyHouse();
    flash("Floor activity cleared. Personal bar and area were kept.");
  }
</script>

<section class="panel">
  <header class="panel-header">
    <div>
      <h2>Settings</h2>
      <p class="lead">Your name, area, sign-off, and optional sample night.</p>
    </div>
  </header>

  <div class="scroll-body">
    {#if notice}
      <p class="flash" role="status">{notice}</p>
    {/if}

    <article class="card">
      <h3>Product</h3>
      <p>Thomas can be your bartender at home or the house copilot at work.</p>
      <div class="mode-switch" role="group" aria-label="Product mode">
        <button
          type="button"
          class:active={appState.mode === "personal"}
          onclick={() => setMode("personal", { keepScreen: true })}
        >
          Personal
        </button>
        <button
          type="button"
          class:active={appState.mode === "business"}
          onclick={() => setMode("business", { keepScreen: true })}
        >
          Business
        </button>
      </div>
    </article>

    <article class="card">
      <h3>Your name</h3>
      <p>Thomas uses this in greetings and on closes. Leave blank if you’d rather stay unnamed.</p>
      <label>
        <span class="sr">Your name</span>
        <input
          type="text"
          bind:value={nameDraft}
          placeholder="e.g. Alex"
          autocomplete="nickname"
          aria-label="Your name"
        />
      </label>
      <button type="button" class="primary" onclick={saveName}>Save name</button>
    </article>

    <article class="card">
      <h3>Your area</h3>
      <p>City or ZIP for where-to-buy recommendations.</p>
      <label>
        <span class="sr">City or ZIP</span>
        <input
          type="text"
          bind:value={areaDraft}
          placeholder="e.g. Austin, TX"
          aria-label="City or ZIP"
        />
      </label>
      <button type="button" class="primary" onclick={saveArea}>Save area</button>
    </article>

    <article class="card">
      <h3>Close sign-off</h3>
      <p>
        {pinSet
          ? "A four-digit code is set for closing the night."
          : "No code yet — you’ll choose one the first time you close."}
      </p>
      <label>
        <span class="sr">New sign-off</span>
        <input
          type="password"
          inputmode="numeric"
          maxlength="4"
          bind:value={pinDraft}
          placeholder="••••"
          aria-label="New sign-off code"
        />
      </label>
      <div class="row">
        <button
          type="button"
          class="primary"
          disabled={pinDraft.length < 4}
          onclick={savePin}
        >
          {pinSet ? "Replace code" : "Set code"}
        </button>
        {#if pinSet}
          <button type="button" class="ghost" onclick={clearPin}>Clear code</button>
        {/if}
      </div>
    </article>

    {#if appState.mode === "business"}
      <HouseLineup />
    {/if}

    <article class="card">
      <h3>House data</h3>
      <p>
        {hasOps
          ? "This device has cellar counts or closes on file."
          : "The house is empty — nothing has been counted or closed yet."}
      </p>
      <p class="hint">
        A sample night is optional. It is never loaded unless you ask.
      </p>
      <div class="row">
        <button type="button" class="primary" onclick={sample}>
          Load a sample night
        </button>
        {#if hasOps}
          <button type="button" class="ghost" onclick={emptyOps}>
            Clear counts & closes
          </button>
        {/if}
      </div>
    </article>

    <p class="legal">
      Recommendations are for adults of legal drinking age where you live.
    </p>
  </div>
</section>

<style>
  .panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    gap: 0.75rem;
  }

  .panel-header {
    flex-shrink: 0;
  }

  h2 {
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.45rem;
    font-weight: 700;
    color: var(--midnight);
  }

  .lead {
    margin: 0.35rem 0 0;
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.4;
  }

  .scroll-body {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    padding-bottom: var(--scroll-end-pad);
    -webkit-overflow-scrolling: touch;
  }

  .flash {
    margin: 0;
    padding: 0.65rem 0.8rem;
    border-radius: 10px;
    background: var(--green-bg);
    color: var(--green);
    font-size: 0.85rem;
    font-weight: 600;
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.85rem 0.9rem;
  }

  h3 {
    margin: 0 0 0.35rem;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--midnight);
  }

  .card p {
    margin: 0 0 0.7rem;
    font-size: 0.88rem;
    color: var(--text-muted);
    line-height: 1.4;
  }

  .hint {
    font-style: italic;
  }

  label {
    display: block;
    margin-bottom: 0.55rem;
  }

  input {
    width: 100%;
    box-sizing: border-box;
    min-height: 40px;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.4rem 0.65rem;
    font-size: 0.95rem;
    color: var(--midnight);
    background: var(--surface);
  }

  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .primary,
  .ghost {
    min-height: 36px;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
  }

  .primary {
    background: var(--cognac);
    border: 1px solid var(--cognac);
    color: #fff;
  }

  .primary:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .ghost {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--midnight);
  }

  .mode-switch {
    display: flex;
    width: fit-content;
    border: 1px solid var(--border);
    border-radius: 999px;
    overflow: hidden;
    background: var(--surface-2);
  }

  .mode-switch button {
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 0.4rem 0.75rem;
    cursor: pointer;
  }

  .mode-switch button.active {
    background: var(--accent-light);
    color: var(--midnight);
  }

  .legal {
    margin: 0.25rem 0 0;
    font-size: 0.75rem;
    color: var(--text-muted);
    line-height: 1.4;
  }
</style>
