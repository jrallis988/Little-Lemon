<script lang="ts">
  import { listAuditTrails, exportAuditTrails } from "$lib/api";
  import { appState } from "$lib/stores/app.svelte";

  let exporting = $state(false);

  const actionLabels: Record<string, string> = {
    cellar_check: "Cellar check",
    close_night: "Close the night",
    inventory_scan: "Cellar check",
    shift_close: "Close the night",
  };

  async function loadTrails() {
    appState.auditTrails = await listAuditTrails();
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

  $effect(() => {
    loadTrails();
  });
</script>

<section class="panel">
  <header class="panel-header">
    <h2>The Record</h2>
    <div class="export-actions">
      <button
        type="button"
        class="btn-export"
        disabled={exporting}
        onclick={() => handleExport("csv")}
      >
        For the proprietor (CSV)
      </button>
      <button
        type="button"
        class="btn-export"
        disabled={exporting}
        onclick={() => handleExport("json")}
      >
        For the proprietor (JSON)
      </button>
    </div>
  </header>

  <p class="desc">
    A careful record of the evening — every count and closing, kept here for the
    proprietor's review.
  </p>

  <div class="trail-list">
    {#if appState.auditTrails.length === 0}
      <p class="empty">Nothing noted yet. Thomas will keep the record as you work.</p>
    {:else}
      {#each appState.auditTrails as trail (trail.id)}
        <article class="trail-card">
          <div class="trail-top">
            <span class="action-type">{labelFor(trail.action_type)}</span>
            <span class="timestamp">{trail.timestamp}</span>
          </div>
          <p class="details">{trail.details}</p>
          <span class="user">{trail.user_id}</span>
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
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  h2 {
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.35rem;
    font-weight: 700;
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

  .desc {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.88rem;
    font-style: italic;
  }

  .trail-list {
    flex: 1;
    overflow-y: auto;
  }

  .empty {
    color: var(--text-muted);
    font-size: 0.9rem;
    font-style: italic;
  }

  .trail-card {
    padding: 0.85rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    background: var(--surface);
    border: 1px solid var(--border);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  }

  .trail-top {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.4rem;
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

  .user {
    font-size: 0.72rem;
    color: var(--text-muted);
  }
</style>
