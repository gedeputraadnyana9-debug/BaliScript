<script setup>
defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (v) => ["primary", "secondary", "accent", "ghost", "outline"].includes(v),
  },
  size: {
    type: String,
    default: "md",
    validator: (v) => ["sm", "md", "lg"].includes(v),
  },
  block: { type: Boolean, default: false },
  as: { type: String, default: "button" },
});
</script>

<template>
  <component
    :is="as"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block }]"
  >
    <slot />
  </component>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  font-family: var(--font-sans);
  font-weight: var(--fw-semibold);
  letter-spacing: 0.01em;
  border: 3px solid var(--color-ink);
  border-radius: var(--r-full);
  box-shadow: var(--sh-sm);
  cursor: pointer;
  transition: transform var(--dur-fast) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out),
    background-color var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out);
  text-decoration: none;
  white-space: nowrap;
}
.btn:hover { transform: translateY(-2px); box-shadow: var(--sh-md); }
.btn:active { transform: translate(2px, 2px); box-shadow: none; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: var(--sh-sm); }

.btn--sm { padding: 0.4rem 0.9rem; font-size: var(--fs-sm); }
.btn--md { padding: 0.6rem 1.25rem; font-size: var(--fs-base); }
.btn--lg { padding: 0.8rem 1.75rem; font-size: var(--fs-lg); }

.btn--block { width: 100%; }

.btn--primary {
  background: var(--color-primary);
  color: var(--color-primary-contrast);
}
.btn--primary:hover {
  background: var(--c-primary-500);
  color: var(--color-primary-contrast);
}

.btn--secondary {
  background: var(--color-secondary);
  color: var(--color-secondary-contrast);
}
.btn--secondary:hover {
  background: var(--c-secondary-500);
  color: var(--color-secondary-contrast);
}

.btn--accent {
  background: var(--color-accent);
  color: var(--color-accent-contrast);
}
.btn--accent:hover {
  background: var(--c-accent-300);
  color: var(--color-accent-contrast);
}

.btn--ghost {
  background: var(--c-neutral-0);
  color: var(--color-text);
}
.btn--ghost:hover {
  background: var(--c-accent-100);
}

.btn--outline {
  background: var(--c-neutral-0);
  color: var(--color-primary);
}
.btn--outline:hover {
  background: var(--color-primary-soft);
}
</style>
