<script setup>
defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Cari..." },
});
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="search">
    <svg class="search__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    <input
      class="search__input"
      type="search"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <button
      v-if="modelValue"
      class="search__clear"
      type="button"
      aria-label="Hapus pencarian"
      @click="$emit('update:modelValue', '')"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.search {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--r-full);
  padding: 0 0.5rem 0 2.75rem;
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.search:focus-within { border-color: var(--color-primary); box-shadow: 0 0 0 4px var(--c-primary-100); }

.search__icon { position: absolute; left: 0.9rem; color: var(--color-text-soft); pointer-events: none; }

.search__input {
  flex: 1;
  border: 0;
  background: transparent;
  padding: 0.65rem 0.25rem;
  font-size: var(--fs-base);
  font-family: inherit;
  color: var(--color-text);
  outline: none;
}
.search__input::placeholder { color: var(--color-text-soft); }
.search__input::-webkit-search-cancel-button { display: none; }

.search__clear {
  display: grid; place-items: center;
  width: 26px; height: 26px;
  border: 0; background: var(--c-neutral-100);
  border-radius: var(--r-full); color: var(--color-text-muted);
  transition: background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}
.search__clear:hover { background: var(--c-neutral-200); color: var(--color-text); }
</style>
