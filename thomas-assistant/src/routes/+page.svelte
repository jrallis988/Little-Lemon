<script lang="ts">
  import ScanPanel from "$lib/components/ScanPanel.svelte";
  import ReconcilePanel from "$lib/components/ReconcilePanel.svelte";
  import AuditPanel from "$lib/components/AuditPanel.svelte";
  import ChatDrawer from "$lib/components/ChatDrawer.svelte";
  import ThomasLogo from "$lib/components/ThomasLogo.svelte";
  import { isCloudDemo } from "$lib/api";
  import { appState, setActiveTab } from "$lib/stores/app.svelte";
  import { TAB_LABELS } from "$lib/thomas-persona";
  import type { WorkflowTab } from "$lib/types";

  const tabs: { id: WorkflowTab; label: string }[] = [
    { id: "inventory", label: TAB_LABELS.inventory },
    { id: "shift", label: TAB_LABELS.shift },
    { id: "audit", label: TAB_LABELS.audit },
  ];
</script>

<div class="app-shell">
  <header class="top-bar">
    <div class="brand">
      <ThomasLogo size={48} />
      <div>
        <h1>Thomas</h1>
        <p>Brewery Operations · Personal Beverage Butler</p>
      </div>
    </div>
    <div class="badges">
      <span class="local-badge">● On-Premise</span>
      {#if isCloudDemo}
        <span class="cloud-badge">☁ Cloud Demo</span>
      {/if}
    </div>
  </header>

  {#if appState.error}
    <div class="error-banner" role="alert">
      {appState.error}
      <button type="button" onclick={() => (appState.error = null)}>Dismiss</button>
    </div>
  {/if}

  <div class="main-layout">
    <section class="workflow-panel">
      <nav class="tab-nav">
        {#each tabs as tab}
          <button
            type="button"
            class:active={appState.activeTab === tab.id}
            onclick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        {/each}
      </nav>

      <div class="tab-content">
        {#if appState.activeTab === "inventory"}
          <ScanPanel />
        {:else if appState.activeTab === "shift"}
          <ReconcilePanel />
        {:else}
          <AuditPanel />
        {/if}
      </div>
    </section>

    <ChatDrawer />
  </div>
</div>

<style>
  .app-shell {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    background: var(--bg);
    color: var(--text);
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.85rem 1.5rem;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .brand h1 {
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: 0.02em;
  }

  .brand p {
    margin: 0;
    font-size: 0.68rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 500;
  }

  .badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .local-badge {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--green);
    padding: 0.35rem 0.8rem;
    background: var(--green-bg);
    border-radius: 999px;
    border: 1px solid rgba(45, 138, 94, 0.2);
  }

  .cloud-badge {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--cloud-blue);
    padding: 0.35rem 0.8rem;
    background: var(--cloud-bg);
    border-radius: 999px;
    border: 1px solid rgba(74, 144, 196, 0.25);
  }

  .error-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background: var(--red-bg);
    color: var(--red);
    font-weight: 600;
    flex-shrink: 0;
    border-bottom: 1px solid rgba(196, 74, 74, 0.2);
  }

  .error-banner button {
    background: transparent;
    border: 1px solid var(--red);
    color: var(--red);
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
  }

  .main-layout {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .workflow-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 1rem 1.5rem;
    background: var(--bg);
  }

  .tab-nav {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-shrink: 0;
  }

  .tab-nav button {
    flex: 1;
    min-height: 48px;
    font-size: 0.95rem;
    font-weight: 600;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.15s;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  }

  .tab-nav button.active {
    background: var(--accent);
    color: var(--accent-text);
    border-color: var(--accent);
  }

  .tab-content {
    flex: 1;
    overflow: hidden;
  }
</style>
