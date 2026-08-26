<script lang="ts">
  import ThomasLogo from "$lib/components/ThomasLogo.svelte";
  import {
    BUSINESS_NOTICES,
    BUSINESS_SNAPSHOT,
    BUSINESS_SUGGESTED_ACTIONS,
  } from "$lib/business-notices";
  import {
    addChatMessage,
    setMobileScreen,
    setActiveTab,
  } from "$lib/stores/app.svelte";
  import type { MobileScreen, NoticeAction, WorkflowTab } from "$lib/types";

  let dismissed = $state<Set<string>>(new Set());

  const visibleNotices = $derived(
    BUSINESS_NOTICES.filter((n) => !dismissed.has(n.id)),
  );

  function runAction(action: NoticeAction, noticeTitle: string) {
    if (action.target === "chat") {
      addChatMessage(
        "user",
        `Tell me more about this: ${noticeTitle}`,
      );
      addChatMessage(
        "assistant",
        `Certainly. Regarding “${noticeTitle}” — I can walk you through the particulars, or we can act on it from Cellar Check, The Record, or tonight’s close.`,
      );
      setMobileScreen("chat");
      return;
    }
    if (action.label === "Prepare order") {
      addChatMessage(
        "assistant",
        `I’ve noted that for a restock suggestion. The Order screen is coming next — for now, ask me what to bring in and I’ll reason from the house’s movement.`,
      );
      setMobileScreen("chat");
      return;
    }
    setMobileScreen(action.target as MobileScreen);
    if (
      action.target === "home" ||
      action.target === "inventory" ||
      action.target === "shift" ||
      action.target === "audit"
    ) {
      setActiveTab(action.target as WorkflowTab);
    }
  }

  function goSuggested(target: "inventory" | "shift" | "chat") {
    setMobileScreen(target);
    if (target !== "chat") setActiveTab(target);
  }
</script>

<section class="panel">
  <header class="panel-header">
    <div>
      <p class="eyebrow">Thomas for Business</p>
      <h2>What needs attention</h2>
      <p class="lead">Thomas knows the house — here’s what he’s noticed today.</p>
    </div>
  </header>

  <div class="scroll-body">
    <section class="snapshot" aria-label="House snapshot">
      <article class="snap-card">
        <span class="snap-label">Inventory</span>
        <strong>{BUSINESS_SNAPSHOT.inventoryExact} exact</strong>
        <span class="snap-meta">
          {BUSINESS_SNAPSHOT.inventoryMinor} minor · {BUSINESS_SNAPSHOT.inventoryAttention} attention
        </span>
      </article>
      <article class="snap-card">
        <span class="snap-label">Tonight’s close</span>
        <strong>{BUSINESS_SNAPSHOT.tonightClose}</strong>
        <span class="snap-meta">REG-01 ready when you are</span>
      </article>
      <article class="snap-card">
        <span class="snap-label">Discrepancies</span>
        <strong>{BUSINESS_SNAPSHOT.recentDiscrepancies} recent</strong>
        <span class="snap-meta">{BUSINESS_SNAPSHOT.runningLow} running low</span>
      </article>
    </section>

    <section class="notices" aria-labelledby="notices-heading">
      <div class="section-head">
        <ThomasLogo variant="mark" width={28} height={28} />
        <h3 id="notices-heading">Thomas noticed</h3>
      </div>

      {#if visibleNotices.length === 0}
        <p class="empty">The house looks quiet. I’ll speak up when something needs you.</p>
      {:else}
        {#each visibleNotices as notice (notice.id)}
          <article class="notice {notice.severity}">
            <div class="notice-top">
              <span class="severity-label">{notice.severity}</span>
            </div>
            <h4>{notice.title}</h4>
            <p>{notice.detail}</p>
            <div class="notice-actions">
              {#each notice.actions as action}
                <button
                  type="button"
                  class="action"
                  class:primary={action.target === "chat" || action.label.includes("Review")}
                  onclick={() => runAction(action, notice.title)}
                >
                  {action.label}
                </button>
              {/each}
            </div>
          </article>
        {/each}
      {/if}
    </section>

    <section class="suggested" aria-label="Suggested actions">
      <h3>Suggested actions</h3>
      <div class="suggested-row">
        {#each BUSINESS_SUGGESTED_ACTIONS as item}
          <button type="button" class="suggested-btn" onclick={() => goSuggested(item.target)}>
            {item.label}
            <span aria-hidden="true">→</span>
          </button>
        {/each}
      </div>
    </section>
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

  .eyebrow {
    margin: 0 0 0.25rem;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--cognac);
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
    gap: 1.1rem;
    padding-bottom: 0.5rem;
    -webkit-overflow-scrolling: touch;
  }

  .snapshot {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .snap-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.7rem 0.65rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .snap-label {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .snap-card strong {
    font-size: 0.92rem;
    color: var(--midnight);
    line-height: 1.25;
  }

  .snap-meta {
    font-size: 0.72rem;
    color: var(--text-muted);
    line-height: 1.3;
  }

  .section-head {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin-bottom: 0.55rem;
  }

  h3 {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--midnight);
  }

  .notice {
    background: var(--surface);
    border: 1px solid var(--border);
    border-left-width: 4px;
    border-radius: 10px;
    padding: 0.85rem 0.9rem;
    margin-bottom: 0.55rem;
  }

  .notice.urgent {
    border-left-color: var(--red);
  }

  .notice.watch {
    border-left-color: var(--cognac);
  }

  .notice.info {
    border-left-color: var(--cloud-blue);
  }

  .severity-label {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .notice.urgent .severity-label {
    color: var(--red);
  }

  .notice.watch .severity-label {
    color: var(--cognac);
  }

  .notice.info .severity-label {
    color: var(--cloud-blue);
  }

  .notice h4 {
    margin: 0.3rem 0 0.35rem;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--midnight);
    line-height: 1.3;
  }

  .notice p {
    margin: 0 0 0.7rem;
    font-size: 0.88rem;
    color: var(--text-muted);
    line-height: 1.4;
  }

  .notice-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .action {
    min-height: 34px;
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--surface-2);
    color: var(--midnight);
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
  }

  .action.primary {
    background: var(--cognac);
    border-color: var(--cognac);
    color: #fff;
  }

  .empty {
    margin: 0;
    font-style: italic;
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .suggested h3 {
    margin-bottom: 0.5rem;
  }

  .suggested-row {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .suggested-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding: 0.7rem 0.85rem;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--midnight);
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
  }

  .suggested-btn span {
    color: var(--cognac);
  }

  @media (max-width: 480px) {
    .snapshot {
      grid-template-columns: 1fr;
    }

    h2 {
      font-size: 1.3rem;
    }
  }
</style>
