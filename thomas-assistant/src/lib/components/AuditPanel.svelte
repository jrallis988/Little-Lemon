<script lang="ts">
  import { listAuditTrails, exportAuditTrails } from "$lib/api";
  import { appState, addChatMessage, setMobileScreen } from "$lib/stores/app.svelte";
  import type { AuditTrail } from "$lib/types";

  type RecordFilter = "all" | "cellar_check" | "close_night" | "restock_order";

  let exporting = $state(false);
  let filter = $state<RecordFilter>("all");
  let query = $state("");
  let employee = $state("all");
  let expandedId = $state<number | null>(null);

  const actionLabels: Record<string, string> = {
    cellar_check: "Cellar check",
    close_night: "Close the night",
    inventory_scan: "Cellar check",
    shift_close: "Close the night",
    restock_order: "Restock order",
  };

  function normalizeType(actionType: string): RecordFilter | "other" {
    if (actionType === "inventory_scan" || actionType === "cellar_check")
      return "cellar_check";
    if (actionType === "shift_close" || actionType === "close_night")
      return "close_night";
    if (actionType === "restock_order") return "restock_order";
    return "other";
  }

  const employees = $derived(
    Array.from(
      new Set(appState.auditTrails.map((t) => t.user_id).filter(Boolean)),
    ).sort(),
  );

  const filtered = $derived.by(() => {
    const q = query.trim().toLowerCase();
    return appState.auditTrails.filter((trail) => {
      const type = normalizeType(trail.action_type);
      if (filter !== "all" && type !== filter) return false;
      if (employee !== "all" && trail.user_id !== employee) return false;
      if (!q) return true;
      return (
        trail.details.toLowerCase().includes(q) ||
        trail.user_id.toLowerCase().includes(q) ||
        labelFor(trail.action_type).toLowerCase().includes(q) ||
        trail.timestamp.toLowerCase().includes(q)
      );
    });
  });

  async function loadTrails() {
    appState.auditTrails = await listAuditTrails(200);
  }

  async function handleExport(format: "csv" | "json") {
    exporting = true;
    try {
      const data = await exportAuditTrails(format);
      const blob = new Blob([data], {
        type: format === "csv" ? "text/csv" : "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `thomas-record-${Date.now()}.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      appState.error = String(e);
    } finally {
      exporting = false;
    }
  }

  function labelFor(actionType: string): string {
    return actionLabels[actionType] ?? actionType.replace(/_/g, " ");
  }

  function askAbout(trail: AuditTrail) {
    addChatMessage(
      "user",
      `Tell me about this record: ${labelFor(trail.action_type)} — ${trail.details}`,
    );
    addChatMessage(
      "assistant",
      `From The Record (${trail.timestamp}, ${trail.user_id}): ${trail.details}. I can help you recount, prepare a restock, or look at tonight’s close next.`,
    );
    setMobileScreen("chat");
  }

  $effect(() => {
    loadTrails();
  });
</script>

<section class="panel">
  <header class="panel-header">
    <div>
      <p class="eyebrow">Thomas for Business</p>
      <h2>The Record</h2>
      <p class="lead">
        Operational memory for the house — filter by work, person, or product, then export for the proprietor.
      </p>
    </div>
    <div class="export-actions">
      <button
        type="button"
        class="btn-export"
        disabled={exporting}
        onclick={() => handleExport("csv")}
      >
        CSV
      </button>
      <button
        type="button"
        class="btn-export"
        disabled={exporting}
        onclick={() => handleExport("json")}
      >
        JSON
      </button>
    </div>
  </header>

  <div class="toolbar">
    <input
      type="search"
      placeholder="Search product, till, notes…"
      bind:value={query}
      aria-label="Search the record"
    />
    <div class="filters" role="group" aria-label="Filter by type">
      {#each [
        ["all", "All"],
        ["cellar_check", "Cellar"],
        ["close_night", "Close"],
        ["restock_order", "Restock"],
      ] as [id, label]}
        <button
          type="button"
          class:active={filter === id}
          onclick={() => (filter = id as RecordFilter)}
        >
          {label}
        </button>
      {/each}
    </div>
    {#if employees.length > 0}
      <label class="employee-filter">
        <span>Who</span>
        <select bind:value={employee}>
          <option value="all">Everyone</option>
          {#each employees as person}
            <option value={person}>{person}</option>
          {/each}
        </select>
      </label>
    {/if}
  </div>

  <div class="trail-list">
    {#if appState.auditTrails.length === 0}
      <p class="empty">Nothing recorded yet.</p>
    {:else if filtered.length === 0}
      <p class="empty">No entries match that filter.</p>
    {:else}
      <p class="count">{filtered.length} shown</p>
      {#each filtered as trail (trail.id)}
        <article
          class="trail-card"
          class:open={expandedId === trail.id}
        >
          <button
            type="button"
            class="trail-top"
            onclick={() =>
              (expandedId = expandedId === trail.id ? null : trail.id)}
          >
            <span class="action-type">{labelFor(trail.action_type)}</span>
            <span class="timestamp">{trail.timestamp}</span>
          </button>
          <p class="details">{trail.details}</p>
          <div class="trail-foot">
            <span class="user">{trail.user_id}</span>
            <button type="button" class="ask" onclick={() => askAbout(trail)}>
              Ask Thomas
            </button>
          </div>
          {#if expandedId === trail.id}
            <div class="trail-detail">
              <dl>
                <div>
                  <dt>Type</dt>
                  <dd>{labelFor(trail.action_type)}</dd>
                </div>
                <div>
                  <dt>When</dt>
                  <dd>{trail.timestamp}</dd>
                </div>
                <div>
                  <dt>Who</dt>
                  <dd>{trail.user_id}</dd>
                </div>
                <div>
                  <dt>Entry id</dt>
                  <dd>#{trail.id}</dd>
                </div>
              </dl>
            </div>
          {/if}
        </article>
      {/each}
    {/if}
  </div>
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
    gap: 1rem;
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

  .export-actions {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .btn-export {
    min-height: 40px;
    padding: 0 0.85rem;
    font-weight: 600;
    font-size: 0.8rem;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    cursor: pointer;
  }

  .btn-export:hover:not(:disabled) {
    border-color: var(--accent);
    color: var(--accent);
  }

  .toolbar {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    flex-shrink: 0;
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

  .employee-filter {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-muted);
  }

  .employee-filter select {
    min-height: 36px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface);
    padding: 0 0.55rem;
    color: var(--midnight);
    font-weight: 600;
  }

  .trail-list {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
  }

  .count {
    margin: 0 0 0.45rem;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .empty {
    color: var(--text-muted);
    font-size: 0.9rem;
    font-style: italic;
  }

  .trail-card {
    padding: 0.75rem 0.9rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    background: var(--surface);
    border: 1px solid var(--border);
  }

  .trail-top {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.35rem;
    width: 100%;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    text-align: left;
  }

  .action-type {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--accent);
  }

  .timestamp {
    font-size: 0.72rem;
    color: var(--text-muted);
  }

  .details {
    margin: 0 0 0.4rem;
    font-size: 0.88rem;
    line-height: 1.45;
    color: var(--text);
  }

  .trail-foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }

  .user {
    font-size: 0.72rem;
    color: var(--text-muted);
  }

  .ask {
    border: none;
    background: transparent;
    color: var(--cognac);
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
  }

  .trail-detail {
    margin-top: 0.55rem;
    padding-top: 0.55rem;
    border-top: 1px solid var(--border);
  }

  .trail-detail dl {
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.45rem 0.75rem;
  }

  .trail-detail dt {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .trail-detail dd {
    margin: 0.1rem 0 0;
    font-size: 0.85rem;
    color: var(--midnight);
  }
</style>
