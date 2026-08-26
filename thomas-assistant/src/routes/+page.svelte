<script lang="ts">
  import ScanPanel from "$lib/components/ScanPanel.svelte";
  import ReconcilePanel from "$lib/components/ReconcilePanel.svelte";
  import AuditPanel from "$lib/components/AuditPanel.svelte";
  import BusinessHome from "$lib/components/BusinessHome.svelte";
  import ChatDrawer from "$lib/components/ChatDrawer.svelte";
  import AppHeader from "$lib/components/AppHeader.svelte";
  import { appState, setActiveTab, setMobileScreen } from "$lib/stores/app.svelte";
  import { TAB_LABELS } from "$lib/thomas-persona";
  import type { MobileScreen, WorkflowTab } from "$lib/types";

  const tabs: { id: WorkflowTab; label: string }[] = [
    { id: "home", label: TAB_LABELS.home },
    { id: "inventory", label: TAB_LABELS.inventory },
    { id: "shift", label: TAB_LABELS.shift },
    { id: "audit", label: TAB_LABELS.audit },
  ];

  const mobileNav: { id: MobileScreen; label: string }[] = [
    { id: "home", label: "Home" },
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

<div class="app-shell" class:mobile={isMobile} class:business={appState.mode === "business"}>
  <AppHeader compact={isMobile} />

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
          {#if appState.activeTab === "home"}
            <BusinessHome />
          {:else if appState.activeTab === "inventory"}
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
    gap: 0.45rem;
    margin-bottom: 1rem;
    flex-shrink: 0;
  }

  .tab-nav button {
    flex: 1;
    min-height: 48px;
    font-size: 0.88rem;
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
    min-height: 50px;
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 0.7rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0.45rem 0.15rem;
  }

  .bottom-nav button.active {
    color: var(--cognac);
    box-shadow: inset 0 -2px 0 var(--cognac);
  }
</style>
