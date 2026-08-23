<script lang="ts">
  interface Props {
    size?: number;
  }
  let { size = 44 }: Props = $props();
</script>

<img
  src="/thomas-logo.svg"
  alt=""
  class="logo"
  width={size}
  height={size}
/>

<style>
  .logo {
    display: block;
    border-radius: 50%;
    flex-shrink: 0;
  }
</style>
