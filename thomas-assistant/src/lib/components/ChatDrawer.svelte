<script lang="ts">
  import { chatWithAssistant } from "$lib/api";
  import { suggestedPrompts } from "$lib/thomas-persona";
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
    } catch (e) {
      addChatMessage("assistant", "Forgive me — something unexpected arose. Might you try once more?");
    } finally {
      sending = false;
      messagesEl?.scrollTo({ top: messagesEl.scrollHeight, behavior: "smooth" });
    }
  }

  function usePrompt(prompt: string) {
    input = prompt;
    sendMessage(prompt);
  }

  $effect(() => {
    appState.chatMessages;
    messagesEl?.scrollTo({ top: messagesEl.scrollHeight });
  });
</script>

<aside class="butler-panel" class:collapsed={!appState.chatOpen}>
  <header class="butler-header">
    <div class="butler-identity">
      <span class="monogram" aria-hidden="true">T</span>
      <div>
        <h2>Thomas</h2>
        <span class="title">Your Beverage Butler</span>
      </div>
    </div>
    <button type="button" class="toggle" onclick={toggleChat} aria-label="Toggle butler panel">
      {appState.chatOpen ? "→" : "←"}
    </button>
  </header>

  {#if appState.chatOpen}
    <div class="butler-body">
      <p class="service-note">Beer & wine connoisseur · On-premise</p>

      <div class="messages" bind:this={messagesEl}>
        {#each appState.chatMessages as msg, i (i)}
          <div class="exchange {msg.role}">
            {#if msg.role === "assistant"}
              <span class="avatar" aria-hidden="true">T</span>
            {/if}
            <div class="bubble">
              <p>{msg.content}</p>
            </div>
          </div>
        {/each}
        {#if sending}
          <div class="exchange assistant typing">
            <span class="avatar" aria-hidden="true">T</span>
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

      <form class="butler-input" onsubmit={(e) => { e.preventDefault(); sendMessage(); }}>
        <input
          type="text"
          bind:value={input}
          placeholder="Ask Thomas about pairings, our brews, or your meal…"
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
  .butler-panel {
    display: flex;
    flex-direction: column;
    width: 400px;
    min-width: 340px;
    background: linear-gradient(180deg, var(--butler-bg-top) 0%, var(--butler-bg) 100%);
    border-left: 1px solid var(--butler-border);
    box-shadow: -8px 0 24px rgba(0, 0, 0, 0.25);
    transition: width 0.2s ease;
  }

  .butler-panel.collapsed {
    width: 56px;
    min-width: 56px;
  }

  .butler-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.1rem;
    border-bottom: 1px solid var(--butler-border);
    background: rgba(0, 0, 0, 0.2);
  }

  .butler-identity {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .monogram {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: linear-gradient(145deg, var(--butler-brass), var(--butler-copper));
    color: #1a0f0a;
    font-family: Georgia, "Times New Roman", serif;
    font-weight: 700;
    font-size: 1.2rem;
    box-shadow: 0 2px 8px rgba(180, 120, 60, 0.35);
  }

  .butler-identity h2 {
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--butler-cream);
    letter-spacing: 0.03em;
  }

  .title {
    display: block;
    font-size: 0.72rem;
    color: var(--butler-brass);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: 600;
  }

  .toggle {
    width: 40px;
    height: 40px;
    border: 1px solid var(--butler-border);
    border-radius: 8px;
    background: transparent;
    color: var(--butler-cream);
    font-size: 1.1rem;
    cursor: pointer;
  }

  .butler-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    min-height: 0;
  }

  .service-note {
    margin: 0;
    padding: 0.6rem 1.1rem 0;
    font-size: 0.72rem;
    color: var(--butler-muted);
    font-style: italic;
    letter-spacing: 0.04em;
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .exchange {
    display: flex;
    gap: 0.6rem;
    align-items: flex-end;
  }

  .exchange.user {
    flex-direction: row-reverse;
  }

  .avatar {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Georgia, serif;
    font-size: 0.75rem;
    font-weight: 700;
    background: linear-gradient(145deg, var(--butler-brass), var(--butler-copper));
    color: #1a0f0a;
  }

  .bubble {
    max-width: 88%;
    padding: 0.85rem 1rem;
    border-radius: 14px;
    font-size: 0.92rem;
    line-height: 1.55;
  }

  .bubble p { margin: 0; }

  .exchange.assistant .bubble {
    background: rgba(255, 248, 240, 0.07);
    border: 1px solid var(--butler-border);
    color: var(--butler-cream);
    border-bottom-left-radius: 4px;
    font-family: Georgia, "Times New Roman", serif;
  }

  .exchange.user .bubble {
    background: linear-gradient(135deg, var(--butler-copper), #8b5a2b);
    color: #fff8f0;
    border-bottom-right-radius: 4px;
  }

  .exchange.typing .bubble p {
    opacity: 0.65;
    font-style: italic;
  }

  .prompts {
    padding: 0 1.1rem 0.75rem;
    flex-shrink: 0;
  }

  .prompts-label {
    display: block;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--butler-muted);
    margin-bottom: 0.5rem;
  }

  .prompt-chips {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .chip {
    text-align: left;
    padding: 0.55rem 0.75rem;
    border-radius: 10px;
    border: 1px solid var(--butler-border);
    background: rgba(255, 248, 240, 0.04);
    color: var(--butler-cream);
    font-size: 0.82rem;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
  }

  .chip:hover {
    border-color: var(--butler-brass);
    background: rgba(212, 165, 90, 0.1);
  }

  .butler-input {
    display: flex;
    gap: 0.5rem;
    padding: 1rem 1.1rem;
    border-top: 1px solid var(--butler-border);
    background: rgba(0, 0, 0, 0.15);
  }

  .butler-input input {
    flex: 1;
    min-height: 48px;
    padding: 0 0.85rem;
    border-radius: 10px;
    border: 1px solid var(--butler-border);
    background: rgba(0, 0, 0, 0.25);
    color: var(--butler-cream);
    font-size: 0.9rem;
  }

  .butler-input input::placeholder {
    color: var(--butler-muted);
    font-style: italic;
  }

  .butler-input button {
    min-width: 64px;
    min-height: 48px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(145deg, var(--butler-brass), var(--butler-copper));
    color: #1a0f0a;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.04em;
    cursor: pointer;
  }

  .butler-input button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
</style>
