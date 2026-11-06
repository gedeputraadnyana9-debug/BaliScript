<script setup>
defineProps({
  padding: { type: String, default: "lg" },
  interactive: { type: Boolean, default: false },
});
</script>

<template>
  <div class="card" :class="{ 'card--interactive': interactive }">
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: var(--color-surface);
  border: 3px solid var(--color-ink);
  border-radius: var(--r-xl);
  box-shadow: var(--sh-md);
}
.card--interactive {
  transition: transform var(--dur-base) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out),
    border-color var(--dur-base) var(--ease-out);
}
.card--interactive:hover {
  transform: translate(-2px, -4px);
  box-shadow: var(--sh-lg);
  border-color: var(--color-ink);
}
</style>
