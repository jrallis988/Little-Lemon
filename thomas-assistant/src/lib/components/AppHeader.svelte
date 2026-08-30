<script lang="ts">
  import ThomasLogo from "$lib/components/ThomasLogo.svelte";
  import { isCloudDemo } from "$lib/api";
  import {
    BUSINESS_PRODUCT_LINE,
    BUSINESS_SUPPORTING,
  } from "$lib/thomas-persona";

  interface Props {
    compact?: boolean;
  }

  let { compact = false }: Props = $props();
</script>

<header class="app-header" class:compact>
  <div class="header-main" class:desktop-brand={!compact}>
    <ThomasLogo variant="full" mode="business" />
    {#if compact}
      <span class="supporting mobile-tagline">{BUSINESS_SUPPORTING}</span>
    {:else}
      <div class="desktop-meta">
        <span class="product-line">{BUSINESS_PRODUCT_LINE}</span>
        <span class="supporting">{BUSINESS_SUPPORTING}</span>
      </div>
    {/if}
  </div>
  <div class="status-group">
    {#if !compact}
      <span class="mode-pill business">Business</span>
    {/if}
    <span class="status on-premise">● On-Premise</span>
    {#if isCloudDemo}
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
    max-width: 42%;
  }

  .app-header.compact .status {
    font-size: 0.58rem;
    padding: 0.15rem 0.38rem;
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

  .mode-pill {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.18rem 0.45rem;
    border-radius: 999px;
    line-height: 1.2;
  }

  .mode-pill.business {
    color: var(--midnight);
    background: var(--accent-light);
    border: 1px solid rgba(199, 138, 44, 0.35);
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
    .mode-pill {
      font-size: 0.72rem;
      padding: 0.28rem 0.65rem;
    }
  }
</style>
