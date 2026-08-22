<script lang="ts">
  import {
    listInventoryScans,
    recordInventoryScan,
    getInventorySummary,
  } from "$lib/api";
  import { appState, currentUser, addChatMessage } from "$lib/stores/app.svelte";
  import { butlerScanNote } from "$lib/thomas-persona";
  import { varianceLevel } from "$lib/types";

  let sku = $state("");
  let expectedQty = $state(0);
  let actualQty = $state(0);
  let submitting = $state(false);

  async function loadScans() {
    appState.inventoryScans = await listInventoryScans();
    appState.summary = await getInventorySummary();
  }

  async function handleScan() {
    if (!sku.trim()) {
      appState.error = "If I may — we'll need a product code before I can verify the count.";
      return;
    }
    submitting = true;
    appState.error = null;
    try {
      const scan = await recordInventoryScan(
        sku.trim().toUpperCase(),
        expectedQty,
        actualQty,
        currentUser,
      );
      appState.inventoryScans = [scan, ...appState.inventoryScans];
      appState.summary = await getInventorySummary();

      const level = varianceLevel(scan.variance);
      addChatMessage("assistant", butlerScanNote(scan.sku, scan.variance, level));

      sku = "";
      expectedQty = 0;
      actualQty = 0;
    } catch (e) {
      appState.error = String(e);
    } finally {
      submitting = false;
    }
  }

  $effect(() => {
    loadScans();
  });
</script>

<section class="panel">
  <header class="panel-header">
    <h2>Inventory Scan</h2>
    {#if appState.summary}
      <div class="summary-badges">
        <span class="badge exact">{appState.summary.exact_matches} exact</span>
        <span class="badge minor">{appState.summary.minor_variances} minor</span>
        <span class="badge critical">{appState.summary.critical_variances} critical</span>
      </div>
    {/if}
  </header>

  <form class="scan-form" onsubmit={(e) => { e.preventDefault(); handleScan(); }}>
    <label>
      <span>SKU / Barcode</span>
      <input
        type="text"
        bind:value={sku}
        placeholder="Scan or enter SKU"
        autocomplete="off"
      />
    </label>
    <div class="qty-row">
      <label>
        <span>Expected Qty</span>
        <input type="number" min="0" bind:value={expectedQty} />
      </label>
      <label>
        <span>Actual Qty</span>
        <input type="number" min="0" bind:value={actualQty} />
      </label>
    </div>
    <button type="submit" class="btn-primary" disabled={submitting}>
      {submitting ? "Recording…" : "Verify Scan"}
    </button>
  </form>

  <div class="scan-list">
    <h3>Recent Scans</h3>
    {#if appState.inventoryScans.length === 0}
      <p class="empty">No scans yet. Verify your first item above.</p>
    {:else}
      {#each appState.inventoryScans as scan (scan.id)}
        {@const level = varianceLevel(scan.variance)}
        <article class="scan-card {level}">
          <div class="scan-main">
            <strong>{scan.sku}</strong>
            <span class="variance">
              {scan.variance === 0 ? "✓ Exact" : `Δ ${scan.variance}`}
            </span>
          </div>
          <div class="scan-meta">
            <span>Exp: {scan.expected_qty}</span>
            <span>Act: {scan.actual_qty}</span>
            <span>{scan.timestamp}</span>
          </div>
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

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  h3 {
    margin: 0 0 0.75rem;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
  }

  .summary-badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .badge {
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .badge.exact { background: var(--green-bg); color: var(--green); }
  .badge.minor { background: var(--yellow-bg); color: var(--yellow); }
  .badge.critical { background: var(--red-bg); color: var(--red); }

  .scan-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 12px;
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

  input:focus {
    outline: none;
    border-color: var(--accent);
  }

  .qty-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .btn-primary {
    min-height: 56px;
    font-size: 1.1rem;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    background: var(--accent);
    color: #000;
    cursor: pointer;
    transition: transform 0.1s, opacity 0.1s;
  }

  .btn-primary:hover:not(:disabled) { transform: scale(1.01); }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

  .scan-list {
    flex: 1;
    overflow-y: auto;
    padding-right: 0.25rem;
  }

  .empty {
    color: var(--text-muted);
    margin: 0;
  }

  .scan-card {
    padding: 1rem;
    margin-bottom: 0.75rem;
    border-radius: 10px;
    border-left: 4px solid;
    background: var(--surface-2);
  }

  .scan-card.exact { border-color: var(--green); }
  .scan-card.minor { border-color: var(--yellow); }
  .scan-card.critical { border-color: var(--red); }

  .scan-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .scan-main strong { font-size: 1.15rem; }
  .variance { font-weight: 700; }

  .scan-card.exact .variance { color: var(--green); }
  .scan-card.minor .variance { color: var(--yellow); }
  .scan-card.critical .variance { color: var(--red); }

  .scan-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.8rem;
    color: var(--text-muted);
    flex-wrap: wrap;
  }
</style>
