<script lang="ts">
  interface Props {
    size?: number;
    class?: string;
  }

  let { size = 36, class: className = "" }: Props = $props();
</script>

<img
  src="/thomas-avatar.svg"
  alt=""
  class="avatar {className}"
  width={size}
  height={size}
  aria-hidden="true"
/>

<style>
  .avatar {
    display: block;
    flex-shrink: 0;
    border-radius: 50%;
  }
</style>
