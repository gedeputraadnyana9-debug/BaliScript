<script setup>
import AudioButton from "@/components/shared/AudioButton.vue";
import BaseCard from "@/components/base/BaseCard.vue";

defineProps({
  item: { type: Object, required: true },
  showDetail: { type: Boolean, default: false },
});
</script>

<template>
  <BaseCard interactive class="aksara-card" :padding="'lg'">
    <span class="aksara-card__glyph" aria-hidden="true">{{ item.character }}</span>

    <h3 class="aksara-card__title">{{ item.title }}</h3>
    <p class="aksara-card__pron">/{{ item.pronunciation }}/</p>

    <div class="aksara-card__category">
      <span class="aksara-card__dot" aria-hidden="true"></span>{{ item.category }}
    </div>

    <div class="aksara-card__footer">
      <AudioButton :speak="item.pronunciation" :label="`Dengar ${item.pronunciation}`" size="sm" />
      <router-link v-if="showDetail" :to="`/aksara#${item.slug}`" class="aksara-card__link">Detail</router-link>
    </div>
  </BaseCard>
</template>

<style scoped>
.aksara-card { display: flex; flex-direction: column; height: 100%; padding: var(--sp-5); }

.aksara-card__glyph {
  font-size: clamp(3rem, 8vw, 4rem);
  line-height: 1;
  color: var(--color-primary);
  background: linear-gradient(140deg, var(--color-primary-soft), var(--c-primary-100));
  border-radius: var(--r-lg);
  padding: 0.25rem 1rem 0.35rem;
  display: inline-block;
  margin-bottom: var(--sp-3);
  align-self: flex-start;
}

.aksara-card__title { font-size: var(--fs-xl); margin: 0 0 var(--sp-1); }
.aksara-card__pron { font-family: var(--font-mono); color: var(--color-secondary); font-weight: var(--fw-semibold); margin: 0 0 var(--sp-3); }

.aksara-card__category { display: flex; align-items: center; gap: var(--sp-2); margin: var(--sp-4) 0; font-size: var(--fs-xs); color: var(--color-text-soft); font-weight: var(--fw-medium); }
.aksara-card__dot { width: 6px; height: 6px; border-radius: var(--r-full); background: var(--color-accent); }

.aksara-card__footer { display: flex; justify-content: space-between; align-items: center; gap: var(--sp-2); margin-top: auto; }
.aksara-card__link { font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--color-primary); }
.aksara-card__link:hover { color: var(--c-primary-700); }
</style>
