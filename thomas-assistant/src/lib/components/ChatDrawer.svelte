<script lang="ts">
  import { chatWithAssistant } from "$lib/api";
  import {
    appState,
    addChatMessage,
    buildChatContext,
    toggleChat,
  } from "$lib/stores/app.svelte";

  let input = $state("");
  let sending = $state(false);
  let messagesEl: HTMLDivElement | undefined = $state();

  async function sendMessage() {
    const text = input.trim();
    if (!text || sending) return;

    addChatMessage("user", text);
    input = "";
    sending = true;

    try {
      const context = buildChatContext();
      const reply = await chatWithAssistant(text, context);
      addChatMessage("assistant", reply);
    } catch (e) {
      addChatMessage("assistant", `Error: ${e}`);
    } finally {
      sending = false;
      messagesEl?.scrollTo({ top: messagesEl.scrollHeight, behavior: "smooth" });
    }
  }

  $effect(() => {
    appState.chatMessages;
    messagesEl?.scrollTo({ top: messagesEl.scrollHeight });
  });
</script>

<aside class="chat-drawer" class:collapsed={!appState.chatOpen}>
  <header class="chat-header">
    <div>
      <h2>Thomas</h2>
      <span class="status">Local assistant · Ollama-ready</span>
    </div>
    <button type="button" class="toggle" onclick={toggleChat} aria-label="Toggle chat">
      {appState.chatOpen ? "→" : "←"}
    </button>
  </header>

  {#if appState.chatOpen}
    <div class="messages" bind:this={messagesEl}>
      {#each appState.chatMessages as msg, i (i)}
        <div class="message {msg.role}">
          <p>{msg.content}</p>
        </div>
      {/each}
      {#if sending}
        <div class="message assistant typing">
          <p>Thinking…</p>
        </div>
      {/if}
    </div>

    <form class="chat-input" onsubmit={(e) => { e.preventDefault(); sendMessage(); }}>
      <input
        type="text"
        bind:value={input}
        placeholder="Ask about inventory, shifts, audits…"
        disabled={sending}
      />
      <button type="submit" disabled={sending || !input.trim()}>Send</button>
    </form>
  {/if}
</aside>

<style>
  .chat-drawer {
    display: flex;
    flex-direction: column;
    width: 380px;
    min-width: 320px;
    background: var(--surface);
    border-left: 2px solid var(--border);
    transition: width 0.2s ease;
  }

  .chat-drawer.collapsed {
    width: 56px;
    min-width: 56px;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--border);
    background: var(--surface-2);
  }

  .chat-header h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--accent);
  }

  .status {
    font-size: 0.7rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .toggle {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 8px;
    background: var(--surface);
    color: var(--text);
    font-size: 1.2rem;
    cursor: pointer;
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .message {
    max-width: 95%;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    font-size: 0.95rem;
    line-height: 1.45;
  }

  .message p { margin: 0; }

  .message.user {
    align-self: flex-end;
    background: var(--accent);
    color: #000;
    border-bottom-right-radius: 4px;
  }

  .message.assistant {
    align-self: flex-start;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-bottom-left-radius: 4px;
  }

  .message.typing p {
    opacity: 0.7;
    font-style: italic;
  }

  .chat-input {
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    border-top: 1px solid var(--border);
  }

  .chat-input input {
    flex: 1;
    min-height: 48px;
    padding: 0 0.75rem;
    border-radius: 10px;
    border: 2px solid var(--border);
    background: var(--surface-2);
    color: var(--text);
    font-size: 0.95rem;
  }

  .chat-input button {
    min-width: 72px;
    min-height: 48px;
    border: none;
    border-radius: 10px;
    background: var(--accent);
    color: #000;
    font-weight: 700;
    cursor: pointer;
  }

  .chat-input button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
