<script lang="ts">
  interface Props {
    variant?: "full" | "mark" | "avatar";
    width?: number;
    height?: number;
  }

  let { variant = "full", width, height }: Props = $props();

  const src = $derived(
    variant === "full"
      ? "/thomas-logo.svg"
      : variant === "avatar"
        ? "/thomas-avatar.svg"
        : "/thomas-mark.svg",
  );
  const w = $derived(
    width ?? (variant === "full" ? 200 : variant === "avatar" ? 36 : 32),
  );
  const h = $derived(
    height ?? (variant === "full" ? 72 : variant === "avatar" ? 36 : 32),
  );
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

  .logo.mark,
  .logo.avatar {
    border-radius: 50%;
  }
</style>
