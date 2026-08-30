<script lang="ts">
  import {
    listInventoryScans,
    recordInventoryScan,
    getInventorySummary,
  } from "$lib/api";
  import {
    buildCellarRows,
    filterCellarRows,
    type CellarFilter,
  } from "$lib/business-intelligence";
  import {
    appState,
    currentUser,
    addChatMessage,
    setActiveTab,
    setMobileScreen,
  } from "$lib/stores/app.svelte";
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

  type CellarView = "overview" | "count";

  let view = $state<CellarView>("overview");
  let filter = $state<CellarFilter>("all");
  let query = $state("");
  let expandedSku = $state<string | null>(null);

  let productInput = $state("");
  let expectedQty = $state(0);
  let actualQty = $state(0);
  let submitting = $state(false);

  const rows = $derived(buildCellarRows(appState.inventoryScans));
  const visible = $derived(filterCellarRows(rows, filter, query));
  const health = $derived({
    exact: rows.filter((r) => r.level === "exact").length,
    attention: rows.filter((r) => r.level !== "exact").length,
    low: rows.filter((r) => r.runningLow).length,
  });

  function resolveSku(input: string): string {
    const trimmed = input.trim().toUpperCase();
    const byName = PRODUCT_CATALOG.find(
      (p) => p.name.toLowerCase() === input.trim().toLowerCase(),
    );
    if (byName) return byName.sku;
    return trimmed;
  }

  async function loadScans() {
    appState.inventoryScans = await listInventoryScans(100);
    appState.summary = await getInventorySummary();
  }

  function startCount(sku?: string, expected?: number) {
    view = "count";
    if (sku) {
      productInput = productName(sku);
      expectedQty = expected ?? 0;
      actualQty = 0;
    }
  }

  function toggleExpand(sku: string) {
    expandedSku = expandedSku === sku ? null : sku;
  }

  function askAbout(name: string) {
    addChatMessage("user", `How does ${name} look in the cellar?`);
    addChatMessage(
      "assistant",
      `Pulling ${name} from today’s picture — open Cellar Overview for the full history, or Restock if we’re short.`,
    );
    setMobileScreen("chat");
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
      view = "overview";
      expandedSku = sku.toUpperCase();
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
    <div>
      <p class="eyebrow">Thomas for Business</p>
      <h2>{view === "overview" ? "Cellar overview" : "Cellar check"}</h2>
      <p class="lead">
        {view === "overview"
          ? "Inventory health across the house — search, filter, and open a product’s history."
          : "Log a count. I’ll note the gap and refresh the overview."}
      </p>
    </div>
    <div class="view-toggle" role="group" aria-label="Cellar view">
      <button
        type="button"
        class:active={view === "overview"}
        onclick={() => (view = "overview")}
      >
        Overview
      </button>
      <button
        type="button"
        class:active={view === "count"}
        onclick={() => startCount()}
      >
        New count
      </button>
    </div>
  </header>

  {#if view === "overview"}
    <div class="scroll-body">
      <section class="health" aria-label="Cellar health">
        <article class="health-card">
          <span class="label">All set</span>
          <strong>{health.exact}</strong>
        </article>
        <article class="health-card warn">
          <span class="label">Needs look</span>
          <strong>{health.attention}</strong>
        </article>
        <article class="health-card low">
          <span class="label">Running low</span>
          <strong>{health.low}</strong>
        </article>
      </section>

      <div class="toolbar">
        <input
          type="search"
          placeholder="Search product or SKU…"
          bind:value={query}
          aria-label="Search cellar"
        />
        <div class="filters" role="group" aria-label="Filter products">
          {#each [
            ["all", "All"],
            ["attention", "Attention"],
            ["low", "Low"],
            ["exact", "Exact"],
          ] as [id, label]}
            <button
              type="button"
              class:active={filter === id}
              onclick={() => (filter = id as CellarFilter)}
            >
              {label}
            </button>
          {/each}
        </div>
      </div>

      {#if visible.length === 0}
        <p class="empty">
          {rows.length === 0
            ? "Nothing counted yet — start a cellar check."
            : "No products match that filter."}
        </p>
        {#if rows.length === 0}
          <button type="button" class="btn-primary" onclick={() => startCount()}>
            Start a count
          </button>
        {/if}
      {:else}
        <ul class="product-list">
          {#each visible as row (row.sku)}
            <li class="product {row.level}" class:open={expandedSku === row.sku.toUpperCase()}>
              <button
                type="button"
                class="product-main"
                onclick={() => toggleExpand(row.sku.toUpperCase())}
              >
                <div class="product-id">
                  <strong>{row.name}</strong>
                  <span class="meta"
                    >{row.onHand} on hand · {row.expected} expected · {row.unit}</span
                  >
                </div>
                <span class="gap {row.level}">
                  {row.runningLow && row.level !== "critical" ? "Low · " : ""}
                  {countGapLabel(row.variance)}
                </span>
              </button>

              {#if expandedSku === row.sku.toUpperCase()}
                <div class="product-detail">
                  <p class="checked">Last checked {row.lastChecked}</p>
                  <h4>History</h4>
                  <ul class="history">
                    {#each row.history as scan (scan.id)}
                      {@const level = varianceLevel(scan.variance)}
                      <li>
                        <span class="gap {level}">{countGapLabel(scan.variance)}</span>
                        <span
                          >{scan.actual_qty}/{scan.expected_qty} · {scan.timestamp}</span
                        >
                      </li>
                    {/each}
                  </ul>
                  <div class="detail-actions">
                    <button type="button" class="btn-secondary" onclick={() => startCount(row.sku, row.expected)}>
                      Recount
                    </button>
                    {#if row.runningLow || row.variance < 0}
                      <button
                        type="button"
                        class="btn-secondary"
                        onclick={() => {
                          setActiveTab("order");
                          setMobileScreen("order");
                        }}
                      >
                        Restock
                      </button>
                    {/if}
                    <button type="button" class="btn-ghost" onclick={() => askAbout(row.name)}>
                      Ask Thomas
                    </button>
                  </div>
                </div>
              {/if}
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  {:else}
    <form
      class="scan-form panel-card"
      onsubmit={(e) => {
        e.preventDefault();
        handleScan();
      }}
    >
      {#if appState.summary}
        <div class="summary-badges">
          <span class="badge exact"
            >{statusBadgeLabel("exact", appState.summary.exact_matches)}</span
          >
          <span class="badge minor"
            >{statusBadgeLabel("minor", appState.summary.minor_variances)}</span
          >
          <span class="badge critical"
            >{statusBadgeLabel("critical", appState.summary.critical_variances)}</span
          >
        </div>
      {/if}
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
          <span class="hint"
            >{lookupProduct(resolveSku(productInput))!.sku} · {productUnit(
              resolveSku(productInput),
            )}</span
          >
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
      <div class="form-actions">
        <button type="submit" class="btn-primary" disabled={submitting}>
          {submitting ? "One moment…" : "Confirm count"}
        </button>
        <button type="button" class="btn-ghost" onclick={() => (view = "overview")}>
          Back to overview
        </button>
      </div>
    </form>

    <div class="scan-list">
      <h3>Checked today</h3>
      {#if appState.inventoryScans.length === 0}
        <p class="empty">Nothing counted yet.</p>
      {:else}
        {#each appState.inventoryScans.slice(0, 8) as scan (scan.id)}
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
  {/if}
</section>

<style>
  .panel {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    height: 100%;
    overflow: hidden;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
    flex-wrap: wrap;
    flex-shrink: 0;
  }

  .eyebrow {
    margin: 0 0 0.2rem;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--cognac);
  }

  h2 {
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--midnight);
  }

  .lead {
    margin: 0.3rem 0 0;
    font-size: 0.86rem;
    color: var(--text-muted);
    line-height: 1.35;
    max-width: 36rem;
  }

  .view-toggle {
    display: flex;
    gap: 0.3rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.2rem;
  }

  .view-toggle button {
    min-height: 36px;
    padding: 0 0.75rem;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--text-muted);
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
  }

  .view-toggle button.active {
    background: var(--cognac);
    color: #fff;
  }

  .scroll-body {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-bottom: 0.5rem;
  }

  .health {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.45rem;
  }

  .health-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.65rem 0.7rem;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .health-card .label {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .health-card strong {
    font-size: 1.15rem;
    color: var(--midnight);
  }

  .health-card.warn strong {
    color: var(--cognac);
  }

  .health-card.low strong {
    color: var(--red);
  }

  .toolbar {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .toolbar input[type="search"] {
    min-height: 44px;
    padding: 0 0.85rem;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface);
    font-size: 16px;
    color: var(--text);
  }

  .filters {
    display: flex;
    gap: 0.3rem;
    flex-wrap: wrap;
  }

  .filters button {
    min-height: 32px;
    padding: 0 0.65rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-muted);
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
  }

  .filters button.active {
    background: var(--midnight);
    border-color: var(--midnight);
    color: #fff;
  }

  .product-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .product {
    background: var(--surface);
    border: 1px solid var(--border);
    border-left-width: 4px;
    border-radius: 10px;
    overflow: hidden;
  }

  .product.exact {
    border-left-color: var(--green);
  }
  .product.minor {
    border-left-color: var(--cognac);
  }
  .product.critical {
    border-left-color: var(--red);
  }

  .product-main {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.8rem 0.85rem;
    border: none;
    background: transparent;
    text-align: left;
    cursor: pointer;
    color: inherit;
  }

  .product-id strong {
    display: block;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1rem;
    color: var(--midnight);
  }

  .product-id .meta {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .gap {
    font-weight: 700;
    font-size: 0.82rem;
    white-space: nowrap;
  }
  .gap.exact {
    color: var(--green);
  }
  .gap.minor {
    color: var(--cognac);
  }
  .gap.critical {
    color: var(--red);
  }

  .product-detail {
    padding: 0 0.85rem 0.85rem;
    border-top: 1px solid var(--border);
  }

  .checked {
    margin: 0.55rem 0 0.35rem;
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .product-detail h4 {
    margin: 0 0 0.35rem;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .history {
    list-style: none;
    margin: 0 0 0.65rem;
    padding: 0;
  }

  .history li {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--text-muted);
    padding: 0.25rem 0;
    border-bottom: 1px solid var(--border);
  }

  .detail-actions,
  .form-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .btn-primary,
  .btn-secondary,
  .btn-ghost {
    min-height: 40px;
    padding: 0 0.85rem;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-primary {
    background: var(--cognac);
    border: 1px solid var(--cognac);
    color: #fff;
  }

  .btn-secondary {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--midnight);
  }

  .btn-ghost {
    background: transparent;
    border: 1px solid transparent;
    color: var(--cognac);
  }

  .scan-form {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.9rem;
    flex-shrink: 0;
  }

  .summary-badges {
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;
  }

  .badge {
    padding: 0.28rem 0.6rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 600;
  }
  .badge.exact {
    background: var(--green-bg);
    color: var(--green);
  }
  .badge.minor {
    background: var(--yellow-bg);
    color: var(--yellow);
  }
  .badge.critical {
    background: var(--red-bg);
    color: var(--red);
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

  .scan-form input {
    min-height: 48px;
    padding: 0 0.85rem;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface-2);
    color: var(--text);
  }

  .qty-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem;
  }

  .scan-list {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
  }

  h3 {
    margin: 0 0 0.55rem;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
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
  .scan-card.exact {
    border-left-color: var(--green);
  }
  .scan-card.minor {
    border-left-color: var(--yellow);
  }
  .scan-card.critical {
    border-left-color: var(--red);
  }

  .scan-main {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.35rem;
  }

  .scan-main strong {
    display: block;
    font-family: Georgia, "Times New Roman", serif;
  }

  .sku {
    font-size: 0.72rem;
    color: var(--text-muted);
  }

  .scan-meta {
    display: flex;
    gap: 0.85rem;
    font-size: 0.75rem;
    color: var(--text-muted);
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    .health {
      grid-template-columns: 1fr;
    }
  }
</style>
