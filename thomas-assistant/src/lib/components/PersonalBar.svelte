<script lang="ts">
  import type { AlcoholKind } from "$lib/types";
  import {
    addPersonalBottle,
    appState,
    askThomas,
    kindLabel,
    removePersonalBottle,
  } from "$lib/stores/app.svelte";

  let name = $state("");
  let kind = $state<AlcoholKind>("wine");
  let notes = $state("");
  let adding = $state(false);

  const kinds: { id: AlcoholKind; label: string }[] = [
    { id: "wine", label: "Wine" },
    { id: "beer", label: "Beer" },
    { id: "spirits", label: "Spirits" },
    { id: "bubbles", label: "Sparkling" },
  ];

  function submit() {
    const trimmed = name.trim();
    if (!trimmed) return;
    addPersonalBottle({ name: trimmed, kind, notes: notes.trim() });
    name = "";
    notes = "";
    kind = "wine";
    adding = false;
  }
</script>

<section class="panel">
  <header class="panel-header">
    <div>
      <h2>My Bar</h2>
      <p class="lead">What’s on the shelf at home — Thomas will pour from here first.</p>
    </div>
    {#if !adding}
      <button type="button" class="add-btn" onclick={() => (adding = true)}>
        Add a bottle
      </button>
    {/if}
  </header>

  <div class="scroll-body">
    {#if adding}
      <form
        class="add-form"
        onsubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label>
          <span>Name</span>
          <input
            type="text"
            bind:value={name}
            placeholder="e.g. House Cabernet"
            aria-label="Bottle name"
          />
        </label>
        <div class="kind-row" role="group" aria-label="Type">
          {#each kinds as item}
            <button
              type="button"
              class:active={kind === item.id}
              onclick={() => (kind = item.id)}
            >
              {item.label}
            </button>
          {/each}
        </div>
        <label>
          <span>Note (optional)</span>
          <input
            type="text"
            bind:value={notes}
            placeholder="Weeknight red, leftover half-bottle…"
          />
        </label>
        <div class="form-actions">
          <button type="button" class="ghost" onclick={() => (adding = false)}>
            Cancel
          </button>
          <button type="submit" class="primary" disabled={!name.trim()}>
            Save to my bar
          </button>
        </div>
      </form>
    {/if}

    {#if appState.personalBottles.length === 0 && !adding}
      <p class="empty">
        Your bar is empty. Add a bottle, or ask Thomas where to buy something for tonight.
      </p>
      <div class="empty-actions">
        <button type="button" class="primary" onclick={() => (adding = true)}>
          Add a bottle
        </button>
        <button
          type="button"
          class="ghost"
          onclick={() => askThomas("Where can I buy a good bottle for tonight near me?")}
        >
          Where should I buy?
        </button>
      </div>
    {:else}
      {#each appState.personalBottles as bottle (bottle.id)}
        <article class="bottle">
          <div class="bottle-top">
            <span class="kind">{kindLabel(bottle.kind)}</span>
            <button
              type="button"
              class="remove"
              onclick={() => removePersonalBottle(bottle.id)}
              aria-label="Remove {bottle.name}"
            >
              Remove
            </button>
          </div>
          <h3>{bottle.name}</h3>
          {#if bottle.notes}
            <p>{bottle.notes}</p>
          {/if}
          <span class="meta">Added {bottle.addedAt}</span>
          <div class="notice-actions">
            <button
              type="button"
              class="action primary"
              onclick={() =>
                askThomas(`What should I know about pouring ${bottle.name}?`)}
            >
              Ask Thomas
            </button>
            <button
              type="button"
              class="action"
              onclick={() =>
                askThomas(`Where can I buy more ${bottle.name} near me?`)}
            >
              Buy more nearby
            </button>
          </div>
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
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
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

  .add-btn,
  .primary,
  .ghost,
  .action {
    min-height: 36px;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
  }

  .add-btn,
  .primary,
  .action.primary {
    background: var(--cognac);
    border: 1px solid var(--cognac);
    color: #fff;
  }

  .ghost,
  .action {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--midnight);
  }

  .add-form,
  .bottle {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.85rem 0.9rem;
  }

  .add-form label {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    margin-bottom: 0.65rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-muted);
  }

  .add-form input {
    min-height: 40px;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.4rem 0.65rem;
    font-size: 0.95rem;
    color: var(--midnight);
  }

  .kind-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-bottom: 0.65rem;
  }

  .kind-row button {
    min-height: 34px;
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--surface-2);
    color: var(--midnight);
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
  }

  .kind-row button.active {
    background: var(--accent-light);
    border-color: var(--cognac);
    color: var(--midnight);
  }

  .form-actions,
  .empty-actions,
  .notice-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .empty {
    margin: 0;
    font-style: italic;
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.45;
  }

  .bottle-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .kind {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--cognac);
  }

  .remove {
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 0.72rem;
    font-weight: 600;
    cursor: pointer;
  }

  .bottle h3 {
    margin: 0.3rem 0 0.25rem;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.05rem;
    color: var(--midnight);
  }

  .bottle p {
    margin: 0 0 0.35rem;
    font-size: 0.88rem;
    color: var(--text-muted);
  }

  .meta {
    display: block;
    font-size: 0.72rem;
    color: var(--text-muted);
    margin-bottom: 0.65rem;
  }
</style>
