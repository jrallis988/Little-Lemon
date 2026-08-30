<script lang="ts">
  import ThomasLogo from "$lib/components/ThomasLogo.svelte";
  import { BUSINESS_PRODUCT_LINE } from "$lib/thomas-persona";

  interface Props {
    onComplete: () => void;
    /** Hold brand before fade-out begins */
    holdMs?: number;
    /** Fade-out duration */
    fadeMs?: number;
  }

  let { onComplete, holdMs = 1400, fadeMs = 480 }: Props = $props();

  let exiting = $state(false);

  $effect(() => {
    const hold = window.setTimeout(() => {
      exiting = true;
    }, holdMs);
    const done = window.setTimeout(() => {
      onComplete();
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
  role="img"
  aria-label="Thomas for Business"
  style="--fade-ms: {fadeMs}ms"
>
  <div class="splash-atmosphere" aria-hidden="true"></div>
  <div class="splash-brand">
    <div class="mark-wrap">
      <ThomasLogo variant="mark" width={88} height={88} />
    </div>
    <ThomasLogo variant="full" mode="business" />
    <p class="product-line">{BUSINESS_PRODUCT_LINE}</p>
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
