<script setup>
import { useAksaraFilter } from "@/composables/useAksaraFilter.js";
import AksaraCard from "@/components/shared/AksaraCard.vue";
import SearchBar from "@/components/shared/SearchBar.vue";
import EmptyState from "@/components/shared/EmptyState.vue";
import BaseButton from "@/components/base/BaseButton.vue";

const { query, filtered, count } = useAksaraFilter();
</script>

<template>
  <div class="aksara-page container">
    <header class="page-head">
      <span class="page-head__eyebrow">Pusat Pembelajaran</span>
      <h1>Belajar Aksara Bali</h1>
      <p class="page-head__lead">
        Telusuri kumpulan aksara Bali. Klik tombol dengar untuk mendengar pelafalannya.
      </p>
    </header>

    <div class="toolbar">
      <SearchBar v-model="query" placeholder="Cari nama aksara..." />
    </div>

    <p class="result-count">{{ count }} aksara ditemukan</p>

    <div v-if="filtered.length" class="grid">
      <AksaraCard v-for="a in filtered" :key="a.id" :item="a" />
    </div>
    <EmptyState
      v-else
      title="Aksara tidak ditemukan"
      message="Coba kata kunci lain."
    >
      <BaseButton variant="outline" size="md" @click="query = ''">Reset Pencarian</BaseButton>
    </EmptyState>
  </div>
</template>

<style scoped>
.aksara-page { padding: var(--sp-10) var(--sp-4) var(--sp-20); }
@media (min-width: 768px) { .aksara-page { padding-inline: var(--sp-8); } }

.page-head { max-width: 640px; margin-bottom: var(--sp-8); }
.page-head__eyebrow { display: block; font-size: var(--fs-sm); font-weight: var(--fw-bold); letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-secondary); margin-bottom: var(--sp-2); }
.page-head h1 { margin-bottom: var(--sp-3); }
.page-head__lead { color: var(--color-text-muted); font-size: var(--fs-lg); }

.toolbar { display: flex; flex-wrap: wrap; gap: var(--sp-4); align-items: center; margin-bottom: var(--sp-4); }

.result-count { font-size: var(--fs-sm); color: var(--color-text-soft); margin: 0 0 var(--sp-5); }

.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sp-5); }
@media (max-width: 980px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .grid { grid-template-columns: 1fr; } }

.toolbar :deep(.search) { min-width: 240px; max-width: 480px; }
@media (max-width: 640px) { .toolbar :deep(.search) { max-width: none; width: 100%; } }
</style>
