<script lang="ts">
  import { listAuditTrails, exportAuditTrails } from "$lib/api";
  import { appState } from "$lib/stores/app.svelte";

  let exporting = $state(false);

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
      a.download = `thomas-audit-${Date.now()}.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      appState.error = String(e);
    } finally {
      exporting = false;
    }
  }

  $effect(() => {
    loadTrails();
  });
</script>

<section class="panel">
  <header class="panel-header">
    <h2>Audit Trail</h2>
    <div class="export-actions">
      <button type="button" class="btn-export" disabled={exporting} onclick={() => handleExport("csv")}>
        Export CSV
      </button>
      <button type="button" class="btn-export" disabled={exporting} onclick={() => handleExport("json")}>
        Export JSON
      </button>
    </div>
  </header>

  <p class="desc">
    Immutable local logbook — every scan, shift close, and resolution is timestamped on-device.
  </p>

  <div class="trail-list">
    {#if appState.auditTrails.length === 0}
      <p class="empty">No audit entries yet. Actions will appear here automatically.</p>
    {:else}
      {#each appState.auditTrails as trail (trail.id)}
        <article class="trail-card">
          <div class="trail-top">
            <span class="action-type">{trail.action_type}</span>
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
    gap: 1rem;
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
    font-size: 1.5rem;
    font-weight: 700;
  }

  .export-actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn-export {
    min-height: 44px;
    padding: 0 1rem;
    font-weight: 600;
    border-radius: 8px;
    border: 2px solid var(--border);
    background: var(--surface-2);
    color: var(--text);
    cursor: pointer;
  }

  .btn-export:hover:not(:disabled) {
    border-color: var(--accent);
  }

  .desc {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .trail-list {
    flex: 1;
    overflow-y: auto;
  }

  .empty { color: var(--text-muted); }

  .trail-card {
    padding: 1rem;
    margin-bottom: 0.75rem;
    border-radius: 10px;
    background: var(--surface-2);
    border: 1px solid var(--border);
  }

  .trail-top {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .action-type {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--accent);
  }

  .timestamp {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .details {
    margin: 0 0 0.5rem;
    font-size: 0.95rem;
    line-height: 1.4;
  }

  .user {
    font-size: 0.75rem;
    color: var(--text-muted);
  }
</style>
