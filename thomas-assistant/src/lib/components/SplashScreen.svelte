<script lang="ts">
  import ThomasLogo from "$lib/components/ThomasLogo.svelte";
  import {
    BUSINESS_PRODUCT_LINE,
    PERSONAL_POSITIONING,
  } from "$lib/thomas-persona";
  import type { ProductMode } from "$lib/types";

  interface Props {
    onComplete: (mode: ProductMode) => void;
    chooseMode?: boolean;
    currentMode?: ProductMode;
    ready?: boolean;
    holdMs?: number;
    fadeMs?: number;
  }

  let {
    onComplete,
    chooseMode = false,
    currentMode = "business",
    ready = true,
    holdMs = 1400,
    fadeMs = 480,
  }: Props = $props();

  let exiting = $state(false);

  function finish(mode: ProductMode) {
    exiting = true;
    window.setTimeout(() => onComplete(mode), fadeMs);
  }

  $effect(() => {
    if (!ready || chooseMode) return;
    const hold = window.setTimeout(() => {
      exiting = true;
    }, holdMs);
    const done = window.setTimeout(() => {
      onComplete(currentMode);
    }, holdMs + fadeMs);
    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(done);
    };
  });
</script>

<div
  class="splash"
  class:exiting
  role="dialog"
  aria-label="Thomas"
  style="--fade-ms: {fadeMs}ms"
>
  <div class="splash-atmosphere" aria-hidden="true"></div>
  <div class="splash-brand">
    <div class="mark-wrap">
      <ThomasLogo variant="mark" width={88} height={88} />
    </div>
    <ThomasLogo variant="full" mode={chooseMode ? "business" : currentMode} />
    {#if chooseMode}
      <p class="product-line">Choose how Thomas should meet you</p>
      <div class="mode-choices">
        <button type="button" class="mode-card" onclick={() => finish("personal")}>
          <strong>Personal</strong>
          <span>{PERSONAL_POSITIONING}</span>
        </button>
        <button type="button" class="mode-card" onclick={() => finish("business")}>
          <strong>Business</strong>
          <span>{BUSINESS_PRODUCT_LINE}</span>
        </button>
      </div>
    {:else}
      <p class="product-line">
        {currentMode === "personal" ? PERSONAL_POSITIONING : BUSINESS_PRODUCT_LINE}
      </p>
    {/if}
  </div>
</div>

<style>
  .splash {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);
    padding: env(safe-area-inset-top, 0) env(safe-area-inset-right, 0)
      env(safe-area-inset-bottom, 0) env(safe-area-inset-left, 0);
    opacity: 1;
    transition: opacity var(--fade-ms, 480ms) ease;
    pointer-events: auto;
  }

  .splash.exiting {
    opacity: 0;
    pointer-events: none;
  }

  .splash-atmosphere {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 90% 60% at 50% 35%, rgba(199, 138, 44, 0.14), transparent 58%),
      linear-gradient(165deg, #fbf8f3 0%, var(--ivory) 45%, #ebe3d6 100%);
    pointer-events: none;
  }

  .splash-brand {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 0 1.25rem;
    animation: splash-rise 0.7s ease-out both;
  }

  .mark-wrap {
    animation: splash-mark 0.85s ease-out both;
  }

  .mark-wrap :global(.logo.mark) {
    box-shadow: 0 8px 28px rgba(8, 21, 35, 0.12);
  }

  .product-line {
    margin: 0.35rem 0 0;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-muted);
    text-align: center;
  }

  .mode-choices {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    width: min(22rem, 100%);
    margin-top: 0.5rem;
  }

  .mode-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
    text-align: left;
    padding: 0.85rem 1rem;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--midnight);
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(8, 21, 35, 0.06);
  }

  .mode-card strong {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.05rem;
  }

  .mode-card span {
    font-size: 0.78rem;
    color: var(--text-muted);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-weight: 600;
  }

  @keyframes splash-rise {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes splash-mark {
    from {
      opacity: 0;
      transform: scale(0.88);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .splash {
      transition: none;
    }

    .splash-brand,
    .mark-wrap {
      animation: none;
    }
  }
</style>
