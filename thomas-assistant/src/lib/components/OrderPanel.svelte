<script lang="ts">
  import { listInventoryScans, recordRestockApproval } from "$lib/api";
  import {
    buildRestockOrder,
    formatOrderExport,
  } from "$lib/business-intelligence";
  import {
    addChatMessage,
    appState,
    currentUser,
    setActiveTab,
    setMobileScreen,
  } from "$lib/stores/app.svelte";
  import type { OrderLine } from "$lib/types";

  let lines = $state<(OrderLine & { qty: number })[]>([]);
  let approved = $state(false);
  let loading = $state(true);

  async function load() {
    loading = true;
    const scans = await listInventoryScans(100);
    appState.inventoryScans = scans;
    const suggested = buildRestockOrder(scans);
    lines = suggested.map((l) => ({ ...l, qty: l.suggestedQty }));
    approved = false;
    loading = false;
  }

  function adjust(sku: string, delta: number) {
    lines = lines.map((l) =>
      l.sku === sku ? { ...l, qty: Math.max(0, l.qty + delta) } : l,
    );
    approved = false;
  }

  function setQty(sku: string, value: number) {
    const qty = Math.max(0, Math.floor(value) || 0);
    lines = lines.map((l) => (l.sku === sku ? { ...l, qty } : l));
    approved = false;
  }

  function removeLine(sku: string) {
    lines = lines.filter((l) => l.sku !== sku);
    approved = false;
  }

  const activeLines = $derived(lines.filter((l) => l.qty > 0));

  function exportCsv() {
    const csv = formatOrderExport(
      activeLines.map((l) => ({
        name: l.name,
        unit: l.unit,
        qty: l.qty,
        reason: l.reason,
      })),
    );
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `thomas-restock-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function approveOrder() {
    if (activeLines.length === 0) {
      appState.error = "Add at least one line before approving.";
      return;
    }
    const summary = activeLines
      .map((l) => `${l.qty} ${l.unit} ${l.name}`)
      .join("; ");
    void recordRestockApproval(summary, currentUser).then(() => {
      approved = true;
      addChatMessage(
        "assistant",
        `I’ve noted your restock for the proprietor — ${summary}. Nothing ships until they confirm; you can export the list anytime.`,
      );
    });
  }

  function askThomasWhy() {
    if (activeLines.length === 0) {
      addChatMessage(
        "assistant",
        "The cellar looks covered — no restock lines from today’s counts. Run Cellar Check if something feels light.",
      );
    } else {
      const why = activeLines
        .map((l) => `${l.name}: ${l.reason}`)
        .join(" ");
      addChatMessage("user", "Why this restock order?");
      addChatMessage("assistant", why);
    }
    setMobileScreen("chat");
  }

  $effect(() => {
    load();
  });
</script>

<section class="panel">
  <header class="panel-header">
    <div>
      <p class="eyebrow">Thomas for Business</p>
      <h2>Restock order</h2>
      <p class="lead">
        Suggested from today’s cellar picture. Adjust freely — nothing orders
        without your say-so.
      </p>
    </div>
  </header>

  <div class="scroll-body">
    {#if loading}
      <p class="muted">Reading the house…</p>
    {:else if lines.length === 0}
      <p class="empty">
        Nothing looks short right now. When counts run light, I’ll draft an order
        here.
      </p>
      <button
        type="button"
        class="btn-secondary"
        onclick={() => {
          setActiveTab("inventory");
          setMobileScreen("inventory");
        }}
      >
        Go to Cellar Check
      </button>
    {:else}
      <ul class="order-list">
        {#each lines as line (line.sku)}
          <li class="order-line" class:zero={line.qty === 0}>
            <div class="line-top">
              <div>
                <h3>{line.name}</h3>
                <p class="meta">
                  On hand {line.onHand} · expected {line.expected} {line.unit}
                </p>
              </div>
              <button
                type="button"
                class="remove"
                onclick={() => removeLine(line.sku)}
                aria-label="Remove {line.name}"
              >
                Remove
              </button>
            </div>
            <p class="reason">{line.reason}</p>
            <div class="qty-controls">
              <button type="button" onclick={() => adjust(line.sku, -1)} aria-label="Decrease">−</button>
              <label>
                <span class="sr-only">Quantity</span>
                <input
                  type="number"
                  min="0"
                  value={line.qty}
                  oninput={(e) =>
                    setQty(line.sku, Number(e.currentTarget.value))}
                />
              </label>
              <span class="unit">{line.unit}</span>
              <button type="button" onclick={() => adjust(line.sku, 1)} aria-label="Increase">+</button>
            </div>
          </li>
        {/each}
      </ul>

      <div class="actions">
        <button type="button" class="btn-primary" onclick={approveOrder} disabled={activeLines.length === 0}>
          {approved ? "Approved for proprietor" : "Approve order"}
        </button>
        <button type="button" class="btn-secondary" onclick={exportCsv} disabled={activeLines.length === 0}>
          Export CSV
        </button>
        <button type="button" class="btn-ghost" onclick={askThomasWhy}>
          Ask Thomas why
        </button>
      </div>

      {#if approved}
        <p class="approved-note">
          Logged in The Record. Export the CSV for your proprietor — Thomas won’t
          place this with a vendor.
        </p>
      {/if}
    {/if}
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

  .eyebrow {
    margin: 0 0 0.25rem;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--cognac);
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
    gap: 0.85rem;
    padding-bottom: var(--scroll-end-pad);
  }

  .order-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .order-line {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.85rem 0.9rem;
  }

  .order-line.zero {
    opacity: 0.55;
  }

  .line-top {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    align-items: flex-start;
  }

  h3 {
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.05rem;
    color: var(--midnight);
  }

  .meta {
    margin: 0.2rem 0 0;
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .reason {
    margin: 0.55rem 0 0.7rem;
    font-size: 0.86rem;
    color: var(--text-muted);
    line-height: 1.4;
  }

  .remove {
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    flex-shrink: 0;
  }

  .qty-controls {
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }

  .qty-controls button {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface-2);
    color: var(--midnight);
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
  }

  .qty-controls input {
    width: 64px;
    height: 36px;
    text-align: center;
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    color: var(--midnight);
    background: var(--surface);
  }

  .unit {
    font-size: 0.8rem;
    color: var(--text-muted);
    font-weight: 600;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .btn-primary,
  .btn-secondary,
  .btn-ghost {
    min-height: 42px;
    padding: 0.5rem 0.9rem;
    border-radius: 8px;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-primary {
    background: var(--cognac);
    border: 1px solid var(--cognac);
    color: #fff;
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-secondary {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--midnight);
  }

  .btn-secondary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-ghost {
    background: transparent;
    border: 1px solid transparent;
    color: var(--cognac);
  }

  .approved-note {
    margin: 0;
    padding: 0.7rem 0.85rem;
    background: var(--green-bg);
    border: 1px solid rgba(45, 138, 94, 0.22);
    border-radius: 8px;
    color: var(--green);
    font-size: 0.86rem;
    line-height: 1.4;
  }

  .empty,
  .muted {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.92rem;
    line-height: 1.4;
  }

  .empty {
    font-style: italic;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
</style>
