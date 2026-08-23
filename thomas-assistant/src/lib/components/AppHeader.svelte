<script lang="ts">
  import ThomasAvatar from "$lib/components/ThomasAvatar.svelte";
  import ThomasLogo from "$lib/components/ThomasLogo.svelte";
  import { isCloudDemo } from "$lib/api";

  interface Props {
    compact?: boolean;
  }

  let { compact = false }: Props = $props();
</script>

<header class="app-header" class:compact>
  {#if compact}
    <div class="header-main">
      <ThomasAvatar size={46} />
      <div class="header-copy">
        <strong class="name">Thomas</strong>
        <span class="subtitle">Brewery Operations</span>
      </div>
    </div>
    <div class="status-group">
      <span class="status on-premise">● On-Premise</span>
      {#if isCloudDemo}
        <span class="status cloud">☁ Cloud Demo</span>
      {/if}
    </div>
  {:else}
    <div class="header-main desktop-brand">
      <ThomasLogo variant="full" />
    </div>
    <div class="status-group">
      <span class="status on-premise">● On-Premise</span>
      {#if isCloudDemo}
        <span class="status cloud">☁ Cloud Demo</span>
      {/if}
    </div>
  {/if}
</header>

<style>
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1.5rem;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .app-header.compact {
    padding: 0.45rem 0.85rem;
    align-items: flex-start;
  }

  .header-main {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    min-width: 0;
  }

  .header-copy {
    display: flex;
    flex-direction: column;
    gap: 0.08rem;
    min-width: 0;
  }

  .name {
    font-size: 1rem;
    font-weight: 700;
    color: var(--midnight);
    line-height: 1.1;
  }

  .subtitle {
    font-size: 0.72rem;
    color: var(--text-muted);
    line-height: 1.2;
  }

  .desktop-brand :global(.logo.full) {
    max-height: 64px;
    max-width: 180px;
  }

  .status-group {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.2rem;
    flex-shrink: 0;
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
    }

    .status {
      font-size: 0.72rem;
      padding: 0.28rem 0.65rem;
    }
  }
</style>
