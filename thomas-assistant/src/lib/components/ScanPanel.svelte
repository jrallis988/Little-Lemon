<script lang="ts">
  import {
    listInventoryScans,
    recordInventoryScan,
    getInventorySummary,
  } from "$lib/api";
  import { appState, currentUser, addChatMessage } from "$lib/stores/app.svelte";
  import { butlerScanNote } from "$lib/thomas-persona";
  import {
    PRODUCT_CATALOG,
    countGapLabel,
    lookupProduct,
    productName,
    productUnit,
    statusBadgeLabel,
  } from "$lib/product-catalog";
  import { varianceLevel } from "$lib/types";

  let productInput = $state("");
  let expectedQty = $state(0);
  let actualQty = $state(0);
  let submitting = $state(false);

  function resolveSku(input: string): string {
    const trimmed = input.trim().toUpperCase();
    const byName = PRODUCT_CATALOG.find(
      (p) => p.name.toLowerCase() === input.trim().toLowerCase(),
    );
    if (byName) return byName.sku;
    return trimmed;
  }

  async function loadScans() {
    appState.inventoryScans = await listInventoryScans();
    appState.summary = await getInventorySummary();
  }

  async function handleScan() {
    if (!productInput.trim()) {
      appState.error = "Which product shall we count?";
      return;
    }
    submitting = true;
    appState.error = null;
    const sku = resolveSku(productInput);
    try {
      const scan = await recordInventoryScan(
        sku,
        expectedQty,
        actualQty,
        currentUser,
      );
      appState.inventoryScans = [scan, ...appState.inventoryScans];
      appState.summary = await getInventorySummary();

      const level = varianceLevel(scan.variance);
      addChatMessage("assistant", butlerScanNote(scan.sku, scan.variance, level));

      productInput = "";
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
    <h2>Cellar Check</h2>
    {#if appState.summary}
      <div class="summary-badges">
        <span class="badge exact">{statusBadgeLabel("exact", appState.summary.exact_matches)}</span>
        <span class="badge minor">{statusBadgeLabel("minor", appState.summary.minor_variances)}</span>
        <span class="badge critical">{statusBadgeLabel("critical", appState.summary.critical_variances)}</span>
      </div>
    {/if}
  </header>

  <form
    class="scan-form panel-card"
    onsubmit={(e) => {
      e.preventDefault();
      handleScan();
    }}
  >
    <label>
      <span>Product</span>
      <input
        type="text"
        bind:value={productInput}
        placeholder="Scan or type — e.g. House Porter"
        list="product-suggestions"
        autocomplete="off"
      />
      <datalist id="product-suggestions">
        {#each PRODUCT_CATALOG as product}
          <option value={product.name}>{product.sku}</option>
        {/each}
      </datalist>
      {#if productInput && lookupProduct(resolveSku(productInput))}
        <span class="hint">{lookupProduct(resolveSku(productInput))!.sku} · {productUnit(resolveSku(productInput))}</span>
      {/if}
    </label>
    <div class="qty-row">
      <label>
        <span>Should have</span>
        <input type="number" min="0" bind:value={expectedQty} />
      </label>
      <label>
        <span>Counted</span>
        <input type="number" min="0" bind:value={actualQty} />
      </label>
    </div>
    <button type="submit" class="btn-primary" disabled={submitting}>
      {submitting ? "One moment…" : "Confirm count"}
    </button>
  </form>

  <div class="scan-list">
    <h3>Checked today</h3>
    {#if appState.inventoryScans.length === 0}
      <p class="empty">Nothing counted yet.</p>
    {:else}
      {#each appState.inventoryScans as scan (scan.id)}
        {@const level = varianceLevel(scan.variance)}
        <article class="scan-card {level}">
          <div class="scan-main">
            <div>
              <strong>{productName(scan.sku)}</strong>
              <span class="sku">{scan.sku}</span>
            </div>
            <span class="gap {level}">{countGapLabel(scan.variance)}</span>
          </div>
          <div class="scan-meta">
            <span>Should: {scan.expected_qty}</span>
            <span>Counted: {scan.actual_qty}</span>
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
    gap: 0.85rem;
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
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.35rem;
    font-weight: 700;
  }

  h3 {
    margin: 0 0 0.65rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    font-weight: 600;
  }

  .summary-badges {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .badge {
    padding: 0.3rem 0.65rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .badge.exact { background: var(--green-bg); color: var(--green); }
  .badge.minor { background: var(--yellow-bg); color: var(--yellow); }
  .badge.critical { background: var(--red-bg); color: var(--red); }

  .scan-form {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-muted);
  }

  .hint {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--accent);
  }

  input {
    min-height: 48px;
    padding: 0 0.85rem;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid var(--border);
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
    gap: 0.85rem;
  }

  .scan-list {
    flex: 1;
    overflow-y: auto;
  }

  .empty {
    color: var(--text-muted);
    margin: 0;
    font-size: 0.9rem;
    font-style: italic;
  }

  .scan-card {
    padding: 0.85rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-left-width: 4px;
  }

  .scan-card.exact { border-left-color: var(--green); }
  .scan-card.minor { border-left-color: var(--yellow); }
  .scan-card.critical { border-left-color: var(--red); }

  .scan-main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.35rem;
    gap: 0.5rem;
  }

  .scan-main strong {
    display: block;
    font-size: 1rem;
    font-family: Georgia, "Times New Roman", serif;
  }

  .sku {
    font-size: 0.72rem;
    color: var(--text-muted);
  }

  .gap {
    font-weight: 700;
    font-size: 0.85rem;
    white-space: nowrap;
  }

  .gap.exact { color: var(--green); }
  .gap.minor { color: var(--yellow); }
  .gap.critical { color: var(--red); }

  .scan-meta {
    display: flex;
    gap: 0.85rem;
    font-size: 0.75rem;
    color: var(--text-muted);
    flex-wrap: wrap;
  }
</style>
