<script lang="ts">
  import ThomasLogo from "$lib/components/ThomasLogo.svelte";
  import { isCloudDemo } from "$lib/api";
  import {
    BUSINESS_PRODUCT_LINE,
    BUSINESS_SUPPORTING,
    PERSONAL_POSITIONING,
    PERSONAL_TAGLINE,
  } from "$lib/thomas-persona";
  import { appState, setMode } from "$lib/stores/app.svelte";

  interface Props {
    compact?: boolean;
  }

  let { compact = false }: Props = $props();

  const personal = $derived(appState.mode === "personal");
</script>

<header class="app-header" class:compact>
  <div class="header-main" class:desktop-brand={!compact}>
    <ThomasLogo variant="full" mode={appState.mode} />
    {#if compact}
      <span class="supporting mobile-tagline">
        {personal ? PERSONAL_POSITIONING : BUSINESS_SUPPORTING}
      </span>
    {:else}
      <div class="desktop-meta">
        <span class="product-line">
          {personal ? PERSONAL_TAGLINE : BUSINESS_PRODUCT_LINE}
        </span>
        <span class="supporting">
          {personal ? PERSONAL_POSITIONING : BUSINESS_SUPPORTING}
        </span>
      </div>
    {/if}
  </div>
  <div class="status-group">
    <div class="mode-switch" role="group" aria-label="Product mode">
      <button
        type="button"
        class:active={personal}
        onclick={() => setMode("personal")}
      >
        Personal
      </button>
      <button
        type="button"
        class:active={!personal}
        onclick={() => setMode("business")}
      >
        Business
      </button>
    </div>
    {#if !compact}
      <span class="status on-premise">● On-Premise</span>
    {/if}
    {#if isCloudDemo && !compact}
      <span class="status cloud">☁ Cloud Demo</span>
    {/if}
  </div>
</header>

<style>
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    padding: 0.7rem 1.5rem;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .app-header.compact {
    padding: 0.35rem 0.75rem 0.4rem;
    align-items: flex-start;
  }

  .app-header.compact .header-main {
    flex: 1;
    min-width: 0;
  }

  .app-header.compact .status-group {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    gap: 0.25rem;
    max-width: 48%;
  }

  .header-main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.12rem;
    min-width: 0;
  }

  .desktop-meta {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    padding-left: 0.15rem;
  }

  .product-line {
    font-size: 0.68rem;
    color: var(--text-muted);
    line-height: 1.2;
    align-self: center;
    width: 100%;
    text-align: center;
  }

  .supporting {
    font-size: 0.7rem;
    color: var(--midnight);
    font-style: italic;
    line-height: 1.2;
    align-self: center;
    width: 100%;
    text-align: center;
  }

  .desktop-brand .product-line,
  .desktop-brand .supporting {
    text-align: left;
    align-self: flex-start;
  }

  .mobile-tagline {
    font-size: 0.68rem;
    margin-top: 0.1rem;
    align-self: center;
    text-align: center;
    width: 100%;
  }

  .status-group {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.2rem;
    flex-shrink: 0;
  }

  .mode-switch {
    display: flex;
    border: 1px solid var(--border);
    border-radius: 999px;
    overflow: hidden;
    background: var(--surface-2);
  }

  .mode-switch button {
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 0.28rem 0.55rem;
    cursor: pointer;
  }

  .mode-switch button.active {
    background: var(--accent-light);
    color: var(--midnight);
  }

  .status {
    font-size: 0.62rem;
    font-weight: 600;
    padding: 0.18rem 0.45rem;
    border-radius: 999px;
    line-height: 1.2;
    white-space: nowrap;
  }

  .status.on-premise {
    color: var(--green);
    background: var(--green-bg);
    border: 1px solid rgba(45, 138, 94, 0.22);
  }

  .status.cloud {
    color: var(--cloud-blue);
    background: var(--cloud-bg);
    border: 1px solid transparent;
    font-weight: 500;
    opacity: 0.85;
  }

  @media (min-width: 769px) {
    .status-group {
      flex-direction: row;
      align-items: center;
      gap: 0.4rem;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .status,
    .mode-switch button {
      font-size: 0.72rem;
      padding: 0.28rem 0.65rem;
    }
  }
</style>
