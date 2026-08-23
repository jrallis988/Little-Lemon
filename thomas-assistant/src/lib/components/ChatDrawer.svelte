<script lang="ts">
  import { chatWithAssistant } from "$lib/api";
  import { suggestedPrompts } from "$lib/thomas-persona";
  import ThomasLogo from "$lib/components/ThomasLogo.svelte";
  import {
    appState,
    addChatMessage,
    buildChatContext,
    toggleChat,
  } from "$lib/stores/app.svelte";

  let input = $state("");
  let sending = $state(false);
  let messagesEl: HTMLDivElement | undefined = $state();

  async function sendMessage(text?: string) {
    const message = (text ?? input).trim();
    if (!message || sending) return;

    addChatMessage("user", message);
    input = "";
    sending = true;

    try {
      const context = buildChatContext();
      const reply = await chatWithAssistant(message, context);
      addChatMessage("assistant", reply);
    } catch {
      addChatMessage(
        "assistant",
        "Forgive me — something unexpected arose. Might you try once more?",
      );
    } finally {
      sending = false;
      messagesEl?.scrollTo({ top: messagesEl.scrollHeight, behavior: "smooth" });
    }
  }

  function usePrompt(prompt: string) {
    sendMessage(prompt);
  }

  $effect(() => {
    appState.chatMessages;
    messagesEl?.scrollTo({ top: messagesEl.scrollHeight });
  });
</script>

<aside class="chat-panel" class:collapsed={!appState.chatOpen}>
  <header class="chat-header">
    <div class="chat-identity">
      <ThomasLogo size={40} />
      <div>
        <h2>Thomas</h2>
        <span class="subtitle">Your Personal Bartender</span>
      </div>
    </div>
    <button type="button" class="toggle" onclick={toggleChat} aria-label="Toggle chat">
      {appState.chatOpen ? "→" : "←"}
    </button>
  </header>

  {#if appState.chatOpen}
    <div class="chat-body">
      <div class="messages" bind:this={messagesEl}>
        {#each appState.chatMessages as msg, i (i)}
          <div class="exchange {msg.role}">
            {#if msg.role === "assistant"}
              <ThomasLogo size={28} />
            {/if}
            <div class="bubble">
              <p>{msg.content}</p>
            </div>
          </div>
        {/each}
        {#if sending}
          <div class="exchange assistant typing">
            <ThomasLogo size={28} />
            <div class="bubble">
              <p>One moment, please…</p>
            </div>
          </div>
        {/if}
      </div>

      {#if appState.chatMessages.length <= 1}
        <div class="prompts">
          <span class="prompts-label">Try asking</span>
          <div class="prompt-chips">
            {#each suggestedPrompts as prompt}
              <button type="button" class="chip" onclick={() => usePrompt(prompt)}>
                {prompt}
              </button>
            {/each}
          </div>
        </div>
      {/if}

      <form
        class="chat-input"
        onsubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          type="text"
          bind:value={input}
          placeholder="Ask Thomas about pairings, our brews, or anything…"
          disabled={sending}
          aria-label="Message to Thomas"
        />
        <button type="submit" disabled={sending || !input.trim()} aria-label="Send">
          Ask
        </button>
      </form>
    </div>
  {/if}
</aside>

<style>
  .chat-panel {
    display: flex;
    flex-direction: column;
    width: 380px;
    min-width: 320px;
    background: var(--chat-bg);
    border-left: 1px solid var(--chat-border);
    transition: width 0.2s ease;
  }

  .chat-panel.collapsed {
    width: 52px;
    min-width: 52px;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--chat-border);
    background: var(--surface);
  }

  .chat-identity {
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  .chat-identity h2 {
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--text);
  }

  .subtitle {
    display: block;
    font-size: 0.62rem;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
  }

  .toggle {
    width: 36px;
    height: 36px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--surface);
    color: var(--text-muted);
    font-size: 1rem;
    cursor: pointer;
  }

  .chat-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    min-height: 0;
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .exchange {
    display: flex;
    gap: 0.5rem;
    align-items: flex-end;
  }

  .exchange.user {
    flex-direction: row-reverse;
  }

  .exchange :global(.logo) {
    flex-shrink: 0;
  }

  .bubble {
    max-width: 85%;
    padding: 0.75rem 0.9rem;
    border-radius: 12px;
    font-size: 0.88rem;
    line-height: 1.5;
  }

  .bubble p {
    margin: 0;
  }

  .exchange.assistant .bubble {
    background: var(--chat-bubble-assistant);
    border: 1px solid var(--chat-border);
    color: var(--chat-text);
    border-bottom-left-radius: 4px;
    font-family: Georgia, "Times New Roman", serif;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  }

  .exchange.user .bubble {
    background: var(--chat-bubble-user);
    color: #fff;
    border-bottom-right-radius: 4px;
  }

  .exchange.typing .bubble p {
    opacity: 0.6;
    font-style: italic;
  }

  .prompts {
    padding: 0 1rem 0.75rem;
    flex-shrink: 0;
  }

  .prompts-label {
    display: block;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--chat-muted);
    margin-bottom: 0.45rem;
    font-weight: 600;
  }

  .prompt-chips {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .chip {
    text-align: left;
    padding: 0.5rem 0.7rem;
    border-radius: 8px;
    border: 1px solid var(--chat-border);
    background: var(--surface);
    color: var(--chat-text);
    font-size: 0.8rem;
    cursor: pointer;
    transition: border-color 0.15s;
  }

  .chip:hover {
    border-color: var(--accent);
  }

  .chat-input {
    display: flex;
    gap: 0.5rem;
    padding: 0.85rem 1rem;
    border-top: 1px solid var(--chat-border);
    background: var(--surface);
  }

  .chat-input input {
    flex: 1;
    min-height: 44px;
    padding: 0 0.75rem;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface-2);
    color: var(--text);
    font-size: 0.85rem;
  }

  .chat-input input::placeholder {
    color: var(--chat-muted);
  }

  .chat-input button {
    min-width: 56px;
    min-height: 44px;
    border: none;
    border-radius: 8px;
    background: var(--accent);
    color: var(--accent-text);
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
  }

  .chat-input button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
</style>
