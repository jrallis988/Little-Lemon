<script lang="ts">
  import { chatWithAssistant } from "$lib/api";
  import ThomasAvatar from "$lib/components/ThomasAvatar.svelte";
  import { suggestedPrompts, THOMAS_TAGLINE } from "$lib/thomas-persona";
  import {
    appState,
    addChatMessage,
    buildChatContext,
    toggleChat,
  } from "$lib/stores/app.svelte";

  interface Props {
    fullscreen?: boolean;
  }

  let { fullscreen = false }: Props = $props();

  let input = $state("");
  let sending = $state(false);
  let messagesEl: HTMLDivElement | undefined = $state();
  let inputEl: HTMLTextAreaElement | undefined = $state();

  const showSuggestions = $derived(
    !sending &&
      appState.chatMessages.length === 1 &&
      appState.chatMessages[0]?.role === "assistant",
  );

  function resizeInput() {
    if (!inputEl) return;
    inputEl.style.height = "auto";
    inputEl.style.height = `${Math.min(inputEl.scrollHeight, 120)}px`;
  }

  async function sendMessage(text?: string) {
    const message = (text ?? input).trim();
    if (!message || sending) return;

    addChatMessage("user", message);
    input = "";
    resizeInput();
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

  $effect(() => {
    appState.chatMessages;
    requestAnimationFrame(() => {
      messagesEl?.scrollTo({ top: messagesEl.scrollHeight });
    });
  });
</script>

<aside
  class="chat-panel"
  class:collapsed={!fullscreen && !appState.chatOpen}
  class:fullscreen
>
  {#if fullscreen || appState.chatOpen}
    {#if fullscreen}
      <div class="assistant-bar">
        <span class="assistant-tagline">{THOMAS_TAGLINE}</span>
      </div>
    {:else}
      <header class="chat-header">
        <ThomasAvatar size={38} />
        <span class="assistant-tagline sidebar">{THOMAS_TAGLINE}</span>
        <button type="button" class="toggle" onclick={toggleChat} aria-label="Toggle chat">
          {appState.chatOpen ? "→" : "←"}
        </button>
      </header>
    {/if}

    <div class="chat-body">
      <div class="messages" bind:this={messagesEl}>
        {#each appState.chatMessages as msg, i (i)}
          <div class="exchange {msg.role}">
            {#if msg.role === "assistant"}
              <ThomasAvatar size={32} />
            {/if}
            <div class="bubble">
              <p>{msg.content}</p>
            </div>
          </div>
        {/each}

        {#if showSuggestions}
          <div class="suggestions">
            <span class="suggestions-label">Try asking</span>
            <div class="suggestion-chips">
              {#each suggestedPrompts as prompt}
                <button type="button" class="chip" onclick={() => sendMessage(prompt)}>
                  <span class="chip-text">{prompt}</span>
                  <span class="chip-arrow" aria-hidden="true">→</span>
                </button>
              {/each}
            </div>
          </div>
        {/if}

        {#if sending}
          <div class="exchange assistant typing">
            <ThomasAvatar size={32} />
            <div class="bubble">
              <p>One moment…</p>
            </div>
          </div>
        {/if}
      </div>

      <form
        class="composer"
        onsubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <div class="composer-field">
          <textarea
            bind:this={inputEl}
            bind:value={input}
            rows="1"
            placeholder="Ask Thomas anything…"
            disabled={sending}
            aria-label="Message to Thomas"
            oninput={resizeInput}
            onkeydown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          ></textarea>
          <button
            type="submit"
            class="send"
            disabled={sending || !input.trim()}
            aria-label="Send message"
          >
            ➤
          </button>
        </div>
      </form>
    </div>
  {:else}
    <header class="chat-header collapsed-only">
      <ThomasAvatar size={32} />
      <button type="button" class="toggle" onclick={toggleChat} aria-label="Open chat">
        ←
      </button>
    </header>
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
    min-height: 0;
  }

  .chat-panel.collapsed {
    width: 52px;
    min-width: 52px;
  }

  .chat-panel.fullscreen {
    flex: 1;
    width: 100%;
    min-width: 0;
    border-left: none;
  }

  .assistant-bar {
    padding: 0.4rem 0.85rem;
    border-bottom: 1px solid var(--chat-border);
    background: var(--surface);
    flex-shrink: 0;
  }

  .assistant-tagline {
    display: block;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    color: var(--cognac);
    line-height: 1.2;
  }

  .assistant-tagline.sidebar {
    flex: 1;
    min-width: 0;
  }

  .chat-header {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.65rem 0.85rem;
    border-bottom: 1px solid var(--chat-border);
    background: var(--surface);
    flex-shrink: 0;
  }

  .chat-header.collapsed-only {
    flex-direction: column;
    justify-content: center;
    padding: 0.5rem 0.35rem;
    gap: 0.35rem;
  }

  .toggle {
    width: 34px;
    height: 34px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    color: var(--text-muted);
    font-size: 0.95rem;
    cursor: pointer;
    flex-shrink: 0;
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
    padding: 0.85rem;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
  }

  .exchange {
    display: flex;
    gap: 0.5rem;
    align-items: flex-end;
  }

  .exchange.user {
    flex-direction: row-reverse;
  }

  .bubble {
    max-width: min(85%, 28rem);
    padding: 0.65rem 0.8rem;
    border-radius: 14px;
    line-height: 1.38;
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
    font-size: 1.0625rem;
    box-shadow: 0 1px 2px rgba(8, 21, 35, 0.04);
  }

  .exchange.user .bubble {
    background: var(--cognac);
    color: #fff;
    border-bottom-right-radius: 4px;
    font-size: 0.95rem;
    line-height: 1.35;
  }

  .exchange.typing .bubble p {
    opacity: 0.6;
    font-style: italic;
  }

  .suggestions {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding-top: 0.1rem;
  }

  .suggestions-label {
    font-size: 0.66rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--chat-muted);
  }

  .suggestion-chips {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .chip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.65rem;
    text-align: left;
    padding: 0.5rem 0.7rem;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.72);
    color: var(--midnight);
    font-size: 0.86rem;
    line-height: 1.32;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(8, 21, 35, 0.03);
  }

  .chip-text {
    flex: 1;
    min-width: 0;
  }

  .chip-arrow {
    flex-shrink: 0;
    color: var(--cognac);
    font-size: 0.9rem;
    opacity: 0.75;
  }

  .chip:active {
    border-color: rgba(199, 138, 44, 0.45);
    background: var(--accent-light);
  }

  .composer {
    flex-shrink: 0;
    padding: 0.5rem 0.75rem;
    padding-bottom: calc(0.5rem + env(safe-area-inset-bottom, 0));
    background: var(--surface);
    border-top: 1px solid var(--chat-border);
  }

  .composer-field {
    display: flex;
    align-items: flex-end;
    gap: 0.3rem;
    padding: 0.22rem 0.22rem 0.22rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--surface-2);
  }

  .composer-field:focus-within {
    border-color: var(--cognac);
    box-shadow: 0 0 0 2px rgba(199, 138, 44, 0.14);
  }

  .composer-field textarea {
    flex: 1;
    min-width: 0;
    min-height: 22px;
    max-height: 120px;
    padding: 0.38rem 0;
    border: none;
    background: transparent;
    color: var(--text);
    font-size: 16px;
    line-height: 1.35;
    resize: none;
    font-family: inherit;
  }

  .composer-field textarea:focus {
    outline: none;
  }

  .composer-field textarea::placeholder {
    color: var(--placeholder);
  }

  .send {
    width: 34px;
    height: 34px;
    border: none;
    border-radius: 50%;
    background: var(--cognac);
    color: #fff;
    font-size: 0.9rem;
    cursor: pointer;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    padding: 0;
    box-shadow: 0 1px 3px rgba(199, 138, 44, 0.35);
  }

  .send:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    box-shadow: none;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .chat-panel:not(.fullscreen) {
      width: 320px;
      min-width: 280px;
    }
  }

  @media (max-width: 768px) {
    .assistant-bar {
      padding: 0.35rem 0.75rem;
    }

    .messages {
      padding: 0.7rem 0.75rem;
      gap: 0.6rem;
    }

    .exchange.assistant .bubble {
      font-size: 1.0625rem;
      line-height: 1.36;
      padding: 0.6rem 0.75rem;
    }

    .chip {
      padding: 0.48rem 0.65rem;
      font-size: 0.84rem;
    }
  }
</style>
