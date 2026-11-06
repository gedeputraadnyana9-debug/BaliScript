<script setup>
import BaseCard from "@/components/base/BaseCard.vue";

defineProps({
  story: { type: Object, required: true },
});
</script>

<template>
  <router-link :to="`/cerita/${story.slug}`" class="story-link">
    <BaseCard interactive class="story-card">
      <div class="story-card__media">
        <img :src="story.imageUrl" :alt="story.title" loading="lazy" class="story-card__img" />
      </div>

      <div class="story-card__body">
        <span class="story-card__cat">{{ story.category }}</span>
        <h3 class="story-card__title">{{ story.title }}</h3>
        <p class="story-card__summary">{{ story.summary }}</p>
      </div>
    </BaseCard>
  </router-link>
</template>

<style scoped>
.story-link { display: block; height: 100%; color: inherit; text-decoration: none; }
.story-card { overflow: hidden; display: flex; flex-direction: column; height: 100%; padding: 0; }

.story-card__media { position: relative; overflow: hidden; }
.story-card__img { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; transition: transform var(--dur-base) var(--ease-out); }
.story-link:hover .story-card__img { transform: scale(1.04); }

.story-card__body { padding: var(--sp-5); flex: 1; display: flex; flex-direction: column; }
.story-card__cat { font-size: var(--fs-xs); font-weight: var(--fw-bold); letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-secondary); }
.story-card__title { font-size: var(--fs-xl); margin: var(--sp-1) 0 var(--sp-2); }
.story-card__summary { font-size: var(--fs-sm); color: var(--color-text-muted); margin: 0; flex: 1; }
</style>
