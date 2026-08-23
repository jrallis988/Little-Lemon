<script lang="ts">
  import { recordShiftLog, listShiftLogs } from "$lib/api";
  import { appState, currentUser, addChatMessage } from "$lib/stores/app.svelte";
  import { butlerShiftNote } from "$lib/thomas-persona";
  import { tillGapLabel, tillLabel } from "$lib/product-catalog";

  let step = $state(1);
  let registerId = $state("REG-01");
  let cashExpected = $state(500);
  let cashActual = $state(500);
  let backroomOk = $state(false);
  let pin = $state("");
  let submitting = $state(false);

  const steps = ["Count the till", "Secure the cellar", "Sign off"];

  async function loadLogs() {
    appState.shiftLogs = await listShiftLogs();
  }

  function nextStep() {
    if (step < 3) step += 1;
  }

  function prevStep() {
    if (step > 1) step -= 1;
  }

  async function completeShift() {
    if (pin !== "1234") {
      appState.error =
        "That doesn't seem right. For this demo, the sign-off is 1234.";
      return;
    }
    submitting = true;
    appState.error = null;
    try {
      const log = await recordShiftLog(
        registerId,
        cashExpected,
        cashActual,
        currentUser,
      );
      appState.shiftLogs = [log, ...appState.shiftLogs];
      addChatMessage("assistant", butlerShiftNote(registerId, log.variance));

      step = 1;
      cashExpected = 500;
      cashActual = 500;
      backroomOk = false;
      pin = "";
    } catch (e) {
      appState.error = String(e);
    } finally {
      submitting = false;
    }
  }

  $effect(() => {
    loadLogs();
  });
</script>

<section class="panel">
  <header class="panel-header">
    <h2>Close the Night</h2>
    <div class="step-indicator">
      {#each steps as label, i}
        <span class="step" class:active={step === i + 1} class:done={step > i + 1}>
          {i + 1}. {label}
        </span>
      {/each}
    </div>
  </header>

  <p class="lead">Three steps to close the house — Thomas will walk you through and keep the record.</p>

  <div class="step-content">
    {#if step === 1}
      <div class="step-panel panel-card">
        <h3>Step 1 — Count the till</h3>
        <label>
          <span>Which till?</span>
          <input type="text" bind:value={registerId} />
        </label>
        <div class="qty-row">
          <label>
            <span>Should have ($)</span>
            <input type="number" step="0.01" bind:value={cashExpected} />
          </label>
          <label>
            <span>Counted ($)</span>
            <input type="number" step="0.01" bind:value={cashActual} />
          </label>
        </div>
        <p class="diff-preview">
          Difference:
          <strong class:warn={Math.abs(cashActual - cashExpected) > 5}>
            {tillGapLabel(cashActual - cashExpected)}
          </strong>
        </p>
        <button type="button" class="btn-primary" onclick={nextStep}>Continue →</button>
      </div>
    {:else if step === 2}
      <div class="step-panel panel-card">
        <h3>Step 2 — Secure the cellar</h3>
        <p class="check-desc">
          Confirm the cellar is locked and any discrepancies are noted.
        </p>
        <button
          type="button"
          class="toggle-btn"
          class:checked={backroomOk}
          onclick={() => (backroomOk = !backroomOk)}
        >
          <span class="box-icon" aria-hidden="true">📦</span>
          {backroomOk ? "✓ Cellar secured" : "Tap to confirm cellar is secured"}
        </button>
        <div class="nav-row">
          <button type="button" class="btn-secondary" onclick={prevStep}>← Back</button>
          <button type="button" class="btn-primary" disabled={!backroomOk} onclick={nextStep}>
            Continue →
          </button>
        </div>
      </div>
    {:else}
      <div class="step-panel panel-card">
        <h3>Step 3 — Your sign-off</h3>
        <p class="check-desc">A quick sign-off to close the night. Demo code: 1234</p>
        <label>
          <span>Sign-off</span>
          <input
            type="password"
            inputmode="numeric"
            maxlength="4"
            bind:value={pin}
            placeholder="••••"
          />
        </label>
        <div class="nav-row">
          <button type="button" class="btn-secondary" onclick={prevStep}>← Back</button>
          <button
            type="button"
            class="btn-primary"
            disabled={submitting || pin.length < 4}
            onclick={completeShift}
          >
            {submitting ? "Closing…" : "Close the night"}
          </button>
        </div>
      </div>
    {/if}
  </div>

  <div class="log-list">
    <h3>Tonight's closings</h3>
    {#if appState.shiftLogs.length === 0}
      <p class="empty">No closings yet this evening.</p>
    {:else}
      {#each appState.shiftLogs as log (log.id)}
        <article class="log-card" class:warn={Math.abs(log.variance) > 5}>
          <strong>{tillLabel(log.register_id)}</strong>
          <span>{tillGapLabel(log.variance)}</span>
          <span class="meta">{log.user_id} · {log.timestamp}</span>
        </article>
      {/each}
    {/if}
  </div>
</section>

<style>
  .panel {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    height: 100%;
    overflow: hidden;
  }

  .panel-header h2 {
    margin: 0 0 0.65rem;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.35rem;
    font-weight: 700;
  }

  .lead {
    margin: 0;
    font-size: 0.88rem;
    color: var(--text-muted);
    font-style: italic;
  }

  .step-indicator {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .step {
    padding: 0.35rem 0.65rem;
    border-radius: 6px;
    font-size: 0.72rem;
    font-weight: 600;
    background: var(--surface);
    color: var(--text-muted);
    border: 1px solid var(--border);
  }

  .step.active {
    background: var(--accent);
    color: var(--accent-text);
    border-color: var(--accent);
  }

  .step.done {
    border-color: var(--green);
    color: var(--green);
    background: var(--green-bg);
  }

  .step-content { flex-shrink: 0; }

  .step-panel {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  h3 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 700;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-muted);
  }

  input {
    min-height: 48px;
    padding: 0 0.85rem;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
  }

  .qty-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem;
  }

  .diff-preview {
    margin: 0;
    font-size: 0.95rem;
  }

  .diff-preview .warn { color: var(--red); }

  .check-desc {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .toggle-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 120px;
    font-size: 0.95rem;
    font-weight: 600;
    border: 2px dashed var(--border-strong);
    border-radius: 10px;
    background: var(--surface-2);
    color: var(--text-muted);
    cursor: pointer;
  }

  .box-icon { font-size: 2rem; line-height: 1; }

  .toggle-btn.checked {
    border-style: solid;
    border-color: var(--green);
    background: var(--green-bg);
    color: var(--green);
  }

  .nav-row {
    display: flex;
    gap: 0.65rem;
  }

  .nav-row .btn-primary,
  .nav-row .btn-secondary { flex: 1; }

  .log-list { flex: 1; overflow-y: auto; }

  .log-list h3 {
    margin: 0 0 0.65rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    font-weight: 600;
  }

  .empty {
    color: var(--text-muted);
    margin: 0;
    font-style: italic;
    font-size: 0.9rem;
  }

  .log-card {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.2rem 1rem;
    padding: 0.75rem 1rem;
    margin-bottom: 0.45rem;
    border-radius: 8px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-left: 4px solid var(--green);
  }

  .log-card.warn { border-left-color: var(--red); }

  .meta {
    grid-column: 1 / -1;
    font-size: 0.72rem;
    color: var(--text-muted);
  }
</style>
