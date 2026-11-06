<script setup>
defineProps({
  title: { type: String, default: "Tidak ada data" },
  message: { type: String, default: "Coba kata kunci atau kategori lain." },
});
</script>

<template>
  <div class="empty">
    <div class="empty__icon" aria-hidden="true">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="2" opacity="0.25" />
        <path d="M22 34c2-3 5-4 10-4s8 1 10 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.5" />
        <circle cx="25" cy="26" r="2.5" fill="currentColor" opacity="0.6" />
        <circle cx="39" cy="26" r="2.5" fill="currentColor" opacity="0.6" />
      </svg>
    </div>
    <h3 class="empty__title">{{ title }}</h3>
    <p class="empty__msg">{{ message }}</p>
    <slot />
  </div>
</template>

<style scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--sp-16) var(--sp-4);
  color: var(--color-text-muted);
}
.empty__icon { color: var(--c-primary-400); margin-bottom: var(--sp-4); }
.empty__title { font-size: var(--fs-xl); margin-bottom: var(--sp-2); color: var(--color-text); }
.empty__msg { max-width: 360px; }
</style>
