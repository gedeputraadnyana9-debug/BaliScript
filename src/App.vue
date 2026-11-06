<script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import BaseButton from "@/components/base/BaseButton.vue";

const route = useRoute();
const HOME_BACK_ROUTES = ["aksara", "practice", "stories", "about"];
const showHomeBack = computed(() => HOME_BACK_ROUTES.includes(route.name));
const title = computed(() =>
  route.meta?.title ? `${route.meta.title} · BaliScript` : "BaliScript"
);

watch(
  () => route.fullPath,
  () => { if (typeof window !== "undefined") document.title = title.value; },
  { immediate: true }
);
</script>

<template>
  <AppHeader />
  <div v-if="showHomeBack" class="home-back container">
    <BaseButton as="router-link" to="/" variant="accent" size="sm">&larr; Kembali ke Beranda</BaseButton>
  </div>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <AppFooter />
</template>

<style scoped>
main { min-height: 60vh; }
.home-back { padding-top: var(--sp-6); }
.page-enter-active, .page-leave-active { transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out); }
.page-enter-from { opacity: 0; transform: translateY(8px); }
.page-leave-to { opacity: 0; transform: translateY(-8px); }
@media (prefers-reduced-motion: reduce) { .page-enter-active, .page-leave-active { transition: none; } }
</style>
