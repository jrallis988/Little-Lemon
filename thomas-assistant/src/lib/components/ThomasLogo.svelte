<script lang="ts">
  import { THOMAS_TAGLINE } from "$lib/thomas-persona";

  interface Props {
    variant?: "full" | "mark" | "avatar";
    width?: number;
    height?: number;
  }

  let { variant = "full", width, height }: Props = $props();

  const markSrc = "/thomas-mark.svg";
  const markSize = $derived(width ?? height ?? 36);
</script>

{#if variant === "full"}
  <div class="logo-lockup" role="img" aria-label="Thomas is your own personal bartender">
    <span class="wordmark">Thomas</span>
    <span class="swoosh" aria-hidden="true"></span>
    <span class="emblem" aria-hidden="true">
      <span class="line"></span>
      <svg class="bow" viewBox="0 0 28 16" fill="none" aria-hidden="true">
        <path
          d="M1 8 L7 2 L14 8 L21 2 L27 8 L21 14 L14 8 L7 14 Z"
          fill="var(--cognac)"
        />
        <rect x="12.2" y="4.5" width="3.6" height="7" rx="0.8" fill="var(--midnight)" />
      </svg>
      <span class="line"></span>
    </span>
    <span class="tagline">{THOMAS_TAGLINE}</span>
  </div>
{:else}
  <img
    src={markSrc}
    alt="Thomas"
    class="logo mark"
    width={markSize}
    height={markSize}
  />
{/if}

<style>
  .logo-lockup {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
    line-height: 1;
    flex-shrink: 0;
    width: max-content;
    max-width: 100%;
  }

  .wordmark {
    font-family: "Pinyon Script", Georgia, cursive;
    font-size: 2.35rem;
    color: var(--midnight);
    letter-spacing: 0.01em;
    line-height: 0.95;
    padding: 0 0.15rem;
  }

  .swoosh {
    display: block;
    width: 7.5rem;
    height: 0.22rem;
    margin-top: -0.05rem;
    border-radius: 999px;
    background: var(--cognac);
    transform: scaleY(0.55) rotate(-1deg);
  }

  .emblem {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin-top: 0.28rem;
    width: 100%;
    max-width: 11rem;
  }

  .line {
    flex: 1;
    height: 1px;
    background: var(--cognac);
    opacity: 0.85;
  }

  .bow {
    width: 1.15rem;
    height: 0.7rem;
    flex-shrink: 0;
  }

  .tagline {
    margin-top: 0.35rem;
    font-size: 0.48rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    color: var(--cognac);
    text-align: center;
    white-space: nowrap;
  }

  .logo.mark {
    display: block;
    flex-shrink: 0;
    border-radius: 50%;
  }

  :global(.app-header.compact) .wordmark {
    font-size: 1.85rem;
  }

  :global(.app-header.compact) .swoosh {
    width: 5.8rem;
  }

  :global(.app-header.compact) .emblem {
    max-width: 8.5rem;
    margin-top: 0.2rem;
  }

  :global(.app-header.compact) .tagline {
    font-size: 0.42rem;
    letter-spacing: 0.16em;
    margin-top: 0.28rem;
  }
</style>
