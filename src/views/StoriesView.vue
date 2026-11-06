<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import StoryCard from "@/components/shared/StoryCard.vue";
import SearchBar from "@/components/shared/SearchBar.vue";
import EmptyState from "@/components/shared/EmptyState.vue";
import BaseButton from "@/components/base/BaseButton.vue";

const store = useStore();

const query = ref("");

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  let list = store.getters["stories/all"];
  if (q) {
    list = list.filter((s) => s.title.toLowerCase().includes(q));
  }
  return list;
});
</script>

<template>
  <div class="stories container">
    <header class="page-head">
      <span class="page-head__eyebrow">Warisan Sastra Lisan</span>
      <h1>Cerita Rakyat Bali</h1>
      <p class="page-head__lead">Kumpulan cerita rakyat Bali lengkap dengan teks aksara Bali dan terjemahannya.</p>
    </header>

    <div class="toolbar">
      <SearchBar v-model="query" placeholder="Cari judul cerita..." />
    </div>

    <p class="result-count">{{ filtered.length }} cerita</p>

    <div v-if="filtered.length" class="grid">
      <StoryCard v-for="s in filtered" :key="s.id" :story="s" />
    </div>
    <EmptyState v-else title="Cerita tidak ditemukan" message="Coba kata kunci lain.">
      <BaseButton variant="outline" size="md" @click="query = ''">Reset</BaseButton>
    </EmptyState>
  </div>
</template>

<style scoped>
.stories { padding: var(--sp-10) var(--sp-4) var(--sp-20); }
@media (min-width: 768px) { .stories { padding-inline: var(--sp-8); } }
.page-head { max-width: 640px; margin-bottom: var(--sp-8); }
.page-head__eyebrow { display: block; font-size: var(--fs-sm); font-weight: var(--fw-bold); letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-secondary); margin-bottom: var(--sp-2); }
.page-head h1 { margin-bottom: var(--sp-3); }
.page-head__lead { color: var(--color-text-muted); font-size: var(--fs-lg); }
.toolbar { display: flex; flex-wrap: wrap; gap: var(--sp-4); align-items: center; margin-bottom: var(--sp-4); }
.result-count { font-size: var(--fs-sm); color: var(--color-text-soft); margin: 0 0 var(--sp-5); }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-5); }
.toolbar :deep(.search) { min-width: 240px; max-width: 480px; }
@media (max-width: 980px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } .toolbar :deep(.search) { max-width: none; width: 100%; } }
</style>
