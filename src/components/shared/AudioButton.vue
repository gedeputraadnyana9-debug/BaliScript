<script setup>
import { computed } from "vue";
import { useAudio } from "@/composables/useAudio.js";

const props = defineProps({
  src: { type: String, default: "" },
  speak: { type: String, default: "" },
  label: { type: String, default: "Dengar pelafalan" },
  size: { type: String, default: "md" },
});

const { playing, error, play, speak: speakFn, stop } = useAudio();

function toggle() {
  if (playing.value) return stop();
  if (props.speak) return speakFn(props.speak);
  if (props.src) return play(props.src);
}

const title = computed(() => (error.value ? "Audio tidak tersedia" : props.label));
</script>

<template>
  <button
    class="audio-btn"
    :class="[`audio-btn--${size}`, { 'is-playing': playing, 'is-error': error }]"
    :title="title"
    :aria-label="title"
    @click="toggle"
  >
    <span class="audio-btn__icon" aria-hidden="true">
      <svg v-if="!playing" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M11 5L6 9H3v6h3l5 4V5z" fill="currentColor" />
        <path d="M15.5 8.5a5 5 0 010 7M18 6a9 9 0 010 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
        <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
      </svg>
    </span>
    <span v-if="size !== 'icon'" class="audio-btn__label">
      <template v-if="error">Audio gagal</template>
      <template v-else-if="playing">Berhenti</template>
      <template v-else>Dengar</template>
    </span>
    <span v-if="playing" class="audio-btn__wave" aria-hidden="true">
      <i></i><i></i><i></i>
    </span>
  </button>
</template>

<style scoped>
.audio-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface);
  color: var(--color-primary);
  border-radius: var(--r-full);
  font-weight: var(--fw-semibold);
  font-size: var(--fs-sm);
  transition: background-color var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out);
}
.audio-btn:hover { background: var(--color-primary-soft); border-color: var(--color-primary); }
.audio-btn.is-playing { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
.audio-btn.is-error { color: var(--color-error); border-color: var(--c-error-300); }
.audio-btn.is-error:hover { background: var(--c-error-50); }

.audio-btn--sm { padding: 0.35rem 0.7rem; }
.audio-btn--md { padding: 0.5rem 1rem; }
.audio-btn--lg { padding: 0.7rem 1.4rem; }

.audio-btn__wave { display: inline-flex; align-items: flex-end; gap: 2px; height: 16px; margin-left: 2px; }
.audio-btn__wave i {
  width: 3px; height: 6px; background: currentColor; border-radius: 2px;
  animation: wave 0.9s var(--ease-in-out) infinite;
}
.audio-btn__wave i:nth-child(2) { animation-delay: 0.15s; height: 12px; }
.audio-btn__wave i:nth-child(3) { animation-delay: 0.3s; height: 9px; }
@keyframes wave { 0%, 100% { transform: scaleY(0.5); } 50% { transform: scaleY(1); } }

@media (prefers-reduced-motion: reduce) {
  .audio-btn__wave i { animation: none; }
}
</style>
