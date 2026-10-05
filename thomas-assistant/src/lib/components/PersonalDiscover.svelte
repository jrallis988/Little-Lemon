<script lang="ts">
  import ThomasLogo from "$lib/components/ThomasLogo.svelte";
  import { appState, askThomas, kindLabel } from "$lib/stores/app.svelte";

  const fromBar = $derived(
    appState.personalBottles.length > 0
      ? `What should I pour from my bar tonight? I have ${appState.personalBottles
          .slice(0, 4)
          .map((b) => b.name)
          .join(", ")}.`
      : "What should I pick up for a quiet night in?",
  );

  const cards = $derived([
    {
      title: "Tonight from your bar",
      detail:
        appState.personalBottles.length > 0
          ? `Thomas will choose among ${appState.personalBottles
              .slice(0, 3)
              .map((b) => b.name)
              .join(", ")}.`
          : "Add a bottle on My Bar, or ask Thomas what to buy first.",
      prompt: fromBar,
      cta: "Ask Thomas",
    },
    {
      title: "Where to buy nearby",
      detail: appState.userArea
        ? `Local picks near ${appState.userArea}.`
        : "Set your city or ZIP in Chat, then we’ll point you to the right shop.",
      prompt: "Where can I buy a bold red near me?",
      cta: "Find shops",
    },
    {
      title: "Pair with dinner",
      detail: "Steak, roast chicken, or a simple pasta — Thomas will match the glass.",
      prompt: "What pairs with roast chicken?",
      cta: "Get a pairing",
    },
    {
      title: "Something new",
      detail: "A beginner-friendly IPA, a weeknight whiskey, or a bottle of bubbles.",
      prompt: "Recommend a beginner-friendly IPA I can buy nearby.",
      cta: "Surprise me",
    },
  ]);
</script>

<section class="panel">
  <header class="panel-header">
    <div>
      <h2>Discover</h2>
      <p class="lead">What to pour, what to cook with, and where to buy it near you.</p>
    </div>
  </header>

  <div class="scroll-body">
    {#if appState.personalBottles.length > 0}
      <p class="on-shelf">
        On the shelf:
        {appState.personalBottles
          .slice(0, 5)
          .map((b) => `${b.name} (${kindLabel(b.kind)})`)
          .join(" · ")}
      </p>
    {/if}

    {#each cards as card}
      <article class="card">
        <div class="section-head">
          <ThomasLogo variant="mark" width={28} height={28} />
          <h3>{card.title}</h3>
        </div>
        <p>{card.detail}</p>
        <button type="button" class="cta" onclick={() => askThomas(card.prompt)}>
          {card.cta}
          <span aria-hidden="true">→</span>
        </button>
      </article>
    {/each}
  </div>
</section>

<style>
  .panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    gap: 0.75rem;
  }

  .panel-header {
    flex-shrink: 0;
  }

  h2 {
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.45rem;
    font-weight: 700;
    color: var(--midnight);
  }

  .lead {
    margin: 0.35rem 0 0;
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.4;
  }

  .scroll-body {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    padding-bottom: var(--scroll-end-pad);
    -webkit-overflow-scrolling: touch;
  }

  .on-shelf {
    margin: 0;
    font-size: 0.82rem;
    color: var(--text-muted);
    line-height: 1.4;
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.85rem 0.9rem;
  }

  .section-head {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin-bottom: 0.4rem;
  }

  h3 {
    margin: 0;
    font-size: 0.95rem;
    font-family: Georgia, "Times New Roman", serif;
    color: var(--midnight);
  }

  .card p {
    margin: 0 0 0.7rem;
    font-size: 0.88rem;
    color: var(--text-muted);
    line-height: 1.4;
  }

  .cta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 40px;
    padding: 0.45rem 0.85rem;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--surface-2);
    color: var(--midnight);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
  }

  .cta span {
    color: var(--cognac);
  }
</style>
