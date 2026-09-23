<script lang="ts">
  import {
    addHouseProduct,
    appState,
    removeHouseProduct,
    restoreDefaultCatalog,
    updateHouseProduct,
  } from "$lib/stores/app.svelte";
  import { PRODUCT_UNITS } from "$lib/product-catalog";

  let name = $state("");
  let unit = $state("cases");
  let par = $state<number | "">("");
  let notice = $state("");

  function add() {
    const product = addHouseProduct({
      name,
      unit,
      par: par === "" ? undefined : Number(par),
    });
    if (!product) {
      notice = "Give the product a name first.";
      return;
    }
    name = "";
    par = "";
    unit = "cases";
    notice = `${product.name} is on the lineup.`;
  }
</script>

<article class="card">
  <h3>House lineup</h3>
  <p>
    These are the products Cellar and Restock know about. Add what you actually pour —
    the starter list is only a suggestion.
  </p>

  {#if notice}
    <p class="flash" role="status">{notice}</p>
  {/if}

  <ul class="lineup">
    {#each appState.products as product (product.sku)}
      <li>
        <div class="line">
          <input
            type="text"
            value={product.name}
            aria-label="Product name"
            onchange={(e) =>
              updateHouseProduct(product.sku, {
                name: (e.currentTarget as HTMLInputElement).value,
              })}
          />
          <select
            value={product.unit}
            aria-label="Unit for {product.name}"
            onchange={(e) =>
              updateHouseProduct(product.sku, {
                unit: (e.currentTarget as HTMLSelectElement).value,
              })}
          >
            {#each PRODUCT_UNITS as u}
              <option value={u}>{u}</option>
            {/each}
          </select>
          <input
            type="number"
            min="0"
            class="par"
            value={product.par ?? ""}
            placeholder="Par"
            aria-label="Usual on-hand for {product.name}"
            onchange={(e) => {
              const n = Number((e.currentTarget as HTMLInputElement).value);
              updateHouseProduct(product.sku, {
                par: Number.isFinite(n) && n > 0 ? n : undefined,
              });
            }}
          />
          <button
            type="button"
            class="remove"
            onclick={() => removeHouseProduct(product.sku)}
          >
            Remove
          </button>
        </div>
        <span class="sku">{product.sku}</span>
      </li>
    {/each}
  </ul>

  {#if appState.products.length === 0}
    <p class="empty">No products yet — add one below or restore the starter lineup.</p>
  {/if}

  <form
    class="add"
    onsubmit={(e) => {
      e.preventDefault();
      add();
    }}
  >
    <input type="text" bind:value={name} placeholder="Product name" aria-label="New product name" />
    <select bind:value={unit} aria-label="New product unit">
      {#each PRODUCT_UNITS as u}
        <option value={u}>{u}</option>
      {/each}
    </select>
    <input
      type="number"
      min="0"
      class="par"
      bind:value={par}
      placeholder="Par"
      aria-label="Usual on-hand"
    />
    <button type="submit" class="primary" disabled={!name.trim()}>Add</button>
  </form>

  <button type="button" class="ghost" onclick={() => restoreDefaultCatalog()}>
    Restore starter lineup
  </button>
</article>

<style>
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.85rem 0.9rem;
  }

  h3 {
    margin: 0 0 0.35rem;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--midnight);
  }

  p {
    margin: 0 0 0.7rem;
    font-size: 0.88rem;
    color: var(--text-muted);
    line-height: 1.4;
  }

  .flash {
    background: var(--green-bg);
    color: var(--green);
    font-weight: 600;
    padding: 0.45rem 0.65rem;
    border-radius: 8px;
  }

  .lineup {
    list-style: none;
    margin: 0 0 0.75rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .line {
    display: grid;
    grid-template-columns: 1fr 5.5rem 4rem auto;
    gap: 0.35rem;
    align-items: center;
  }

  input,
  select {
    min-height: 36px;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.3rem 0.45rem;
    font-size: 0.85rem;
    color: var(--midnight);
    background: var(--surface);
    width: 100%;
    box-sizing: border-box;
  }

  .par {
    text-align: right;
  }

  .sku {
    display: block;
    font-size: 0.65rem;
    color: var(--text-muted);
    margin-top: 0.15rem;
    letter-spacing: 0.04em;
  }

  .remove {
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 0.72rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
  }

  .add {
    display: grid;
    grid-template-columns: 1fr 5.5rem 4rem auto;
    gap: 0.35rem;
    margin-bottom: 0.65rem;
  }

  .primary,
  .ghost {
    min-height: 36px;
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
  }

  .primary {
    background: var(--cognac);
    border: 1px solid var(--cognac);
    color: #fff;
  }

  .primary:disabled {
    opacity: 0.45;
  }

  .ghost {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--midnight);
  }

  .empty {
    font-style: italic;
  }

  @media (max-width: 480px) {
    .line,
    .add {
      grid-template-columns: 1fr 1fr;
    }

    .remove,
    .primary {
      grid-column: 1 / -1;
    }
  }
</style>
