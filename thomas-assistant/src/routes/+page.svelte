<script lang="ts">
  import ScanPanel from "$lib/components/ScanPanel.svelte";
  import ReconcilePanel from "$lib/components/ReconcilePanel.svelte";
  import AuditPanel from "$lib/components/AuditPanel.svelte";
  import ChatDrawer from "$lib/components/ChatDrawer.svelte";
  import { isCloudDemo } from "$lib/api";
  import { appState, setActiveTab } from "$lib/stores/app.svelte";
  import type { WorkflowTab } from "$lib/types";

  const tabs: { id: WorkflowTab; label: string }[] = [
    { id: "inventory", label: "Inventory" },
    { id: "shift", label: "Shift Close" },
    { id: "audit", label: "Audit Log" },
  ];
</script>

<div class="app-shell">
  <header class="top-bar">
    <div class="brand">
      <span class="logo">T</span>
      <div>
        <h1>Thomas</h1>
        <p>Brewery operations · Personal beverage butler</p>
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
    padding: 0.75rem 1.25rem;
    background: var(--surface);
    border-bottom: 2px solid var(--border);
    flex-shrink: 0;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: var(--accent);
    color: #000;
    font-weight: 900;
    font-size: 1.4rem;
  }

  .brand h1 {
    margin: 0;
    font-size: 1.35rem;
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  .brand p {
    margin: 0;
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .local-badge {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--green);
    padding: 0.4rem 0.85rem;
    background: var(--green-bg);
    border-radius: 999px;
  }

  .cloud-badge {
    font-size: 0.8rem;
    font-weight: 700;
    color: #7ec8ff;
    padding: 0.4rem 0.85rem;
    background: linear-gradient(135deg, rgba(56, 132, 255, 0.2), rgba(126, 200, 255, 0.15));
    border: 1px solid rgba(126, 200, 255, 0.35);
    border-radius: 999px;
    animation: cloud-pulse 3s ease-in-out infinite;
  }

  @keyframes cloud-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(126, 200, 255, 0.2); }
    50% { box-shadow: 0 0 12px 2px rgba(126, 200, 255, 0.25); }
  }

  .error-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.25rem;
    background: var(--red-bg);
    color: var(--red);
    font-weight: 600;
    flex-shrink: 0;
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
    padding: 1rem 1.25rem;
  }

  .tab-nav {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-shrink: 0;
  }

  .tab-nav button {
    flex: 1;
    min-height: 52px;
    font-size: 1rem;
    font-weight: 700;
    border: 2px solid var(--border);
    border-radius: 10px;
    background: var(--surface-2);
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.15s;
  }

  .tab-nav button.active {
    background: var(--accent);
    color: #000;
    border-color: var(--accent);
  }

  .tab-content {
    flex: 1;
    overflow: hidden;
  }
</style>
