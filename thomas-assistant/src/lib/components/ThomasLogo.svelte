<script lang="ts">
  interface Props {
    variant?: "full" | "mark";
    width?: number;
    height?: number;
  }

  let { variant = "full", width, height }: Props = $props();

  const src = $derived(variant === "mark" ? "/thomas-mark.svg" : "/thomas-logo.svg");
  const w = $derived(width ?? (variant === "mark" ? 32 : 200));
  const h = $derived(height ?? (variant === "mark" ? 32 : 72));
</script>

<img {src} alt="Thomas" class="logo {variant}" width={w} height={h} />

<style>
  .logo {
    display: block;
    flex-shrink: 0;
  }

  .logo.full {
    height: auto;
    max-height: 72px;
    width: auto;
    max-width: 200px;
  }

  .logo.mark {
    border-radius: 50%;
  }
</style>
