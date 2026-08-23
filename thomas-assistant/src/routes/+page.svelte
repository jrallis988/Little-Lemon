<script lang="ts">
  import ScanPanel from "$lib/components/ScanPanel.svelte";
  import ReconcilePanel from "$lib/components/ReconcilePanel.svelte";
  import AuditPanel from "$lib/components/AuditPanel.svelte";
  import ChatDrawer from "$lib/components/ChatDrawer.svelte";
  import ThomasLogo from "$lib/components/ThomasLogo.svelte";
  import { appState, setActiveTab, setMobileScreen } from "$lib/stores/app.svelte";
  import { TAB_LABELS } from "$lib/thomas-persona";
  import type { MobileScreen, WorkflowTab } from "$lib/types";

  const tabs: { id: WorkflowTab; label: string }[] = [
    { id: "inventory", label: TAB_LABELS.inventory },
    { id: "shift", label: TAB_LABELS.shift },
    { id: "audit", label: TAB_LABELS.audit },
  ];

  const mobileNav: { id: MobileScreen; label: string }[] = [
    { id: "chat", label: "Chat" },
    { id: "inventory", label: "Cellar" },
    { id: "shift", label: "Close" },
    { id: "audit", label: "Record" },
  ];

  let isMobile = $state(false);

  $effect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => {
      isMobile = mq.matches;
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  });
</script>

<div class="app-shell" class:mobile={isMobile}>
  <header class="top-bar">
    <div class="brand">
      <ThomasLogo variant="full" />
    </div>
  </header>

  {#if appState.error}
    <div class="error-banner" role="alert">
      {appState.error}
      <button type="button" onclick={() => (appState.error = null)}>Dismiss</button>
    </div>
  {/if}

  <div class="main-layout">
    {#if !isMobile || appState.mobileScreen !== "chat"}
      <section class="workflow-panel">
        {#if !isMobile}
          <nav class="tab-nav" aria-label="House workflows">
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
        {/if}

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
    {/if}

    {#if !isMobile}
      <ChatDrawer />
    {:else if appState.mobileScreen === "chat"}
      <ChatDrawer fullscreen />
    {/if}
  </div>

  {#if isMobile}
    <nav class="bottom-nav" aria-label="Main navigation">
      {#each mobileNav as item}
        <button
          type="button"
          class:active={appState.mobileScreen === item.id}
          onclick={() => setMobileScreen(item.id)}
        >
          {item.label}
        </button>
      {/each}
    </nav>
  {/if}
</div>

<style>
  .app-shell {
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    background: var(--bg);
    color: var(--text);
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  }

  .brand {
    display: flex;
    align-items: center;
  }

  .brand :global(.logo.full) {
    max-height: 56px;
    max-width: 160px;
  }

  .error-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: var(--red-bg);
    color: var(--red);
    font-weight: 600;
    flex-shrink: 0;
    border-bottom: 1px solid rgba(196, 74, 74, 0.2);
    font-size: 0.9rem;
  }

  .error-banner button {
    background: transparent;
    border: 1px solid var(--red);
    color: var(--red);
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    flex-shrink: 0;
  }

  .main-layout {
    display: flex;
    flex: 1;
    overflow: hidden;
    min-height: 0;
  }

  .workflow-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 1rem 1.5rem;
    background: var(--bg);
    min-width: 0;
  }

  .mobile .workflow-panel {
    padding: 0.75rem 1rem;
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
  }

  .tab-nav button.active {
    background: var(--accent);
    color: var(--accent-text);
    border-color: var(--accent);
  }

  .tab-content {
    flex: 1;
    overflow: hidden;
    min-height: 0;
  }

  .bottom-nav {
    display: flex;
    flex-shrink: 0;
    border-top: 1px solid var(--border);
    background: var(--surface);
    padding-bottom: env(safe-area-inset-bottom, 0);
  }

  .bottom-nav button {
    flex: 1;
    min-height: 52px;
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0.5rem 0.25rem;
  }

  .bottom-nav button.active {
    color: var(--accent);
    box-shadow: inset 0 -2px 0 var(--accent);
  }

  @media (min-width: 769px) {
    .top-bar {
      padding: 0.85rem 1.5rem;
    }

    .brand :global(.logo.full) {
      max-height: 72px;
      max-width: 200px;
    }
  }
</style>
