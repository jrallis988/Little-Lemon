<script lang="ts">
  import { recordShiftLog, listShiftLogs } from "$lib/api";
  import { appState, currentUser, addChatMessage } from "$lib/stores/app.svelte";

  let step = $state(1);
  let registerId = $state("REG-01");
  let cashExpected = $state(500);
  let cashActual = $state(500);
  let backroomOk = $state(false);
  let pin = $state("");
  let submitting = $state(false);

  const steps = ["Cash Count", "Back-Room Check", "Sign-Off"];

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
      appState.error = "Invalid PIN. Use 1234 for demo sign-off.";
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

      const variance = log.variance;
      const msg =
        Math.abs(variance) <= 5
          ? `Shift closed for ${registerId}. Cash variance $${variance.toFixed(2)} — within tolerance.`
          : `Shift closed with cash variance $${variance.toFixed(2)} on ${registerId}. Manager review recommended.`;
      addChatMessage("assistant", msg);

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
    <h2>Shift Reconciliation</h2>
    <div class="step-indicator">
      {#each steps as label, i}
        <span class="step" class:active={step === i + 1} class:done={step > i + 1}>
          {i + 1}. {label}
        </span>
      {/each}
    </div>
  </header>

  <div class="step-content">
    {#if step === 1}
      <div class="step-panel">
        <h3>Step 1 — Register / Drawer Cash Count</h3>
        <label>
          <span>Register ID</span>
          <input type="text" bind:value={registerId} />
        </label>
        <div class="qty-row">
          <label>
            <span>Expected Cash ($)</span>
            <input type="number" step="0.01" bind:value={cashExpected} />
          </label>
          <label>
            <span>Actual Cash ($)</span>
            <input type="number" step="0.01" bind:value={cashActual} />
          </label>
        </div>
        <p class="variance-preview">
          Variance: <strong class:warn={Math.abs(cashActual - cashExpected) > 5}>
            ${(cashActual - cashExpected).toFixed(2)}
          </strong>
        </p>
        <button type="button" class="btn-primary" onclick={nextStep}>Continue →</button>
      </div>
    {:else if step === 2}
      <div class="step-panel">
        <h3>Step 2 — Back-Room Status Check</h3>
        <p class="check-desc">Confirm back-room inventory is secured and discrepancies are logged.</p>
        <button
          type="button"
          class="toggle-btn"
          class:checked={backroomOk}
          onclick={() => (backroomOk = !backroomOk)}
        >
          {backroomOk ? "✓ Back-room secured" : "Tap to confirm back-room status"}
        </button>
        <div class="nav-row">
          <button type="button" class="btn-secondary" onclick={prevStep}>← Back</button>
          <button type="button" class="btn-primary" disabled={!backroomOk} onclick={nextStep}>
            Continue →
          </button>
        </div>
      </div>
    {:else}
      <div class="step-panel">
        <h3>Step 3 — Digital Sign-Off</h3>
        <p class="check-desc">Enter manager PIN to close the shift. Demo PIN: 1234</p>
        <label>
          <span>PIN</span>
          <input type="password" inputmode="numeric" maxlength="4" bind:value={pin} placeholder="••••" />
        </label>
        <div class="nav-row">
          <button type="button" class="btn-secondary" onclick={prevStep}>← Back</button>
          <button type="button" class="btn-primary" disabled={submitting || pin.length < 4} onclick={completeShift}>
            {submitting ? "Closing…" : "Close Shift"}
          </button>
        </div>
      </div>
    {/if}
  </div>

  <div class="log-list">
    <h3>Recent Shift Logs</h3>
    {#if appState.shiftLogs.length === 0}
      <p class="empty">No shift logs yet.</p>
    {:else}
      {#each appState.shiftLogs as log (log.id)}
        <article class="log-card" class:warn={Math.abs(log.variance) > 5}>
          <strong>{log.register_id}</strong>
          <span>Δ ${log.variance.toFixed(2)}</span>
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
    gap: 1.25rem;
    height: 100%;
    overflow: hidden;
  }

  .panel-header h2 {
    margin: 0 0 0.75rem;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .step-indicator {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .step {
    padding: 0.4rem 0.75rem;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    background: var(--surface-2);
    color: var(--text-muted);
    border: 1px solid var(--border);
  }

  .step.active {
    background: var(--accent);
    color: #000;
    border-color: var(--accent);
  }

  .step.done {
    border-color: var(--green);
    color: var(--green);
  }

  .step-content { flex-shrink: 0; }

  .step-panel {
    padding: 1.25rem;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-muted);
  }

  input {
    min-height: 52px;
    padding: 0 1rem;
    font-size: 1.1rem;
    border-radius: 10px;
    border: 2px solid var(--border);
    background: var(--surface);
    color: var(--text);
  }

  .qty-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .variance-preview {
    margin: 0;
    font-size: 1rem;
  }

  .variance-preview .warn { color: var(--red); }

  .check-desc {
    margin: 0;
    color: var(--text-muted);
  }

  .toggle-btn {
    min-height: 72px;
    font-size: 1.1rem;
    font-weight: 700;
    border: 2px dashed var(--border);
    border-radius: 12px;
    background: var(--surface);
    color: var(--text-muted);
    cursor: pointer;
  }

  .toggle-btn.checked {
    border-style: solid;
    border-color: var(--green);
    background: var(--green-bg);
    color: var(--green);
  }

  .nav-row {
    display: flex;
    gap: 0.75rem;
  }

  .btn-primary, .btn-secondary {
    flex: 1;
    min-height: 56px;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 10px;
    cursor: pointer;
    border: none;
  }

  .btn-primary {
    background: var(--accent);
    color: #000;
  }

  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-secondary {
    background: var(--surface);
    color: var(--text);
    border: 2px solid var(--border);
  }

  .log-list {
    flex: 1;
    overflow-y: auto;
  }

  .log-list h3 {
    margin: 0 0 0.75rem;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
  }

  .empty { color: var(--text-muted); margin: 0; }

  .log-card {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.25rem 1rem;
    padding: 0.85rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    background: var(--surface-2);
    border-left: 4px solid var(--green);
  }

  .log-card.warn { border-color: var(--red); }
  .meta {
    grid-column: 1 / -1;
    font-size: 0.75rem;
    color: var(--text-muted);
  }
</style>
