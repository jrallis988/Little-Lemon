<script lang="ts">
  import { appState, askThomas } from "$lib/stores/app.svelte";
</script>

<section class="panel">
  <header class="panel-header">
    <div>
      <h2>History</h2>
      <p class="lead">Bottles you’ve added and questions you’ve asked Thomas.</p>
    </div>
  </header>

  <div class="scroll-body">
    {#if appState.personalEvents.length === 0}
      <p class="empty">
        Nothing here yet. Add a bottle on My Bar or ask Thomas a question — it’ll land in this record.
      </p>
      <button
        type="button"
        class="cta"
        onclick={() => askThomas("What should I pick up for a quiet night in?")}
      >
        Ask Thomas
      </button>
    {:else}
      {#each appState.personalEvents as event (event.id)}
        <article class="event {event.kind}">
          <span class="kind">{event.kind === "bottle" ? "Bar" : "Asked"}</span>
          <h3>{event.title}</h3>
          <p>{event.detail} · {event.timestamp}</p>
        </article>
      {/each}
    {/if}
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
    padding-bottom: var(--scroll-end-pad);
    -webkit-overflow-scrolling: touch;
  }

  .empty {
    margin: 0 0 0.75rem;
    font-style: italic;
    color: var(--text-muted);
    font-size: 0.95rem;
  }

  .cta {
    min-height: 40px;
    padding: 0.45rem 0.9rem;
    border-radius: 999px;
    border: 1px solid var(--cognac);
    background: var(--cognac);
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }

  .event {
    background: var(--surface);
    border: 1px solid var(--border);
    border-left-width: 4px;
    border-radius: 10px;
    padding: 0.75rem 0.9rem;
    margin-bottom: 0.55rem;
  }

  .event.bottle {
    border-left-color: var(--cognac);
  }

  .event.ask {
    border-left-color: var(--cloud-blue);
  }

  .kind {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  h3 {
    margin: 0.25rem 0 0.2rem;
    font-size: 0.98rem;
    color: var(--midnight);
    font-family: Georgia, "Times New Roman", serif;
  }

  .event p {
    margin: 0;
    font-size: 0.8rem;
    color: var(--text-muted);
  }
</style>
