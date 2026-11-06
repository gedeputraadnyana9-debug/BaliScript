<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseCard from "@/components/base/BaseCard.vue";
import EmptyState from "@/components/shared/EmptyState.vue";

const props = defineProps({ slug: { type: String, required: true } });
const store = useStore();
const router = useRouter();

const story = computed(() => store.getters["stories/bySlug"](props.slug));
const more = computed(() =>
  store.getters["stories/all"].filter((s) => s.slug !== props.slug).slice(0, 3)
);
</script>

<template>
  <article v-if="story" class="detail">
    <div class="container detail__nav">
      <BaseButton as="button" variant="ghost" size="sm" class="detail__back" @click="router.push('/cerita')">
        ← Kembali ke daftar
      </BaseButton>
    </div>
    <div class="detail__hero" :style="{ '--g': story.id % 2 ? '#0b87a3' : '#ba4029', '--cover': `url('${story.imageUrl}')` }">
      <div class="container detail__hero-inner">
        <span class="detail__cat">{{ story.category }}</span>
        <span class="detail__level" :class="`level--${(story.level || 'all').replace('/', '-').toLowerCase()}`">{{ story.level }}</span>
        <h1>{{ story.title }}</h1>
        <p>{{ story.summary }}</p>
      </div>
      <svg class="detail__wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40c240 20 480 20 720 5s480-20 720-5v35H0z" fill="var(--color-bg)" /></svg>
    </div>

    <div class="container detail__body">
      <section class="detail__aksara">
        <h2>Teks Aksara Bali</h2>
        <BaseCard class="aksara-panel">
          <p class="aksara-panel__text" lang="ban" dir="ltr">{{ story.aksaraText }}</p>
        </BaseCard>
      </section>

      <section class="detail__intro">
        <h2>Bahasa Indonesia</h2>
        <BaseCard class="text-panel">
          <p class="detail__desc">{{ story.description }}</p>
        </BaseCard>
      </section>

      <section class="detail__highlights">
        <h2>Nilai & Pesan</h2>
        <ul class="highlights">
          <li v-for="(h, i) in story.highlights" :key="i" class="highlights__item">
            <span class="highlights__dot" aria-hidden="true"></span>{{ h }}
          </li>
        </ul>
      </section>
    </div>

    <section class="container detail__more">
      <h2>Cerita Lainnya</h2>
      <div class="more-grid">
        <router-link v-for="m in more" :key="m.id" :to="`/cerita/${m.slug}`" class="more-card">
          <span class="more-card__cat">{{ m.category }}</span>
          <h3>{{ m.title }}</h3>
          <p>{{ m.summary }}</p>
        </router-link>
      </div>
    </section>
  </article>

  <div v-else class="container">
    <EmptyState title="Cerita tidak ditemukan" message="Cerita yang kamu cari tidak tersedia." >
      <BaseButton as="router-link" to="/cerita" variant="primary" size="md">Lihat Semua Cerita</BaseButton>
    </EmptyState>
  </div>
</template>

<style scoped>
.detail__nav { padding-top: var(--sp-6); margin-bottom: var(--sp-6); }
.detail__nav .detail__back { background: var(--c-accent-100); color: var(--color-ink); }
.detail__nav .detail__back:hover { background: var(--c-accent-300); color: var(--color-ink); }

.detail__hero {
  position: relative;
  background:
    linear-gradient(150deg, color-mix(in srgb, var(--g, var(--color-primary)) 88%, transparent), color-mix(in srgb, var(--g, var(--color-primary)) 75%, black)),
    var(--cover) center / cover no-repeat;
  color: #fff;
  padding: var(--sp-12) 0 var(--sp-20);
}
.detail__hero-inner { position: relative; z-index: 1; max-width: 760px; }
.detail__cat { display: inline-block; font-size: var(--fs-sm); font-weight: var(--fw-bold); letter-spacing: 0.06em; text-transform: uppercase; color: var(--c-accent-200); margin-bottom: var(--sp-2); }
.detail__level { display: inline-block; margin-left: var(--sp-2); font-size: var(--fs-xs); font-weight: var(--fw-bold); padding: 0.25rem 0.6rem; border-radius: var(--r-full); background: rgba(255,255,255,0.18); color: #fff; }
.detail__hero h1 { color: #fff; font-size: clamp(2rem, 5vw, var(--fs-5xl)); margin-bottom: var(--sp-3); }
.detail__hero p { color: rgba(255,255,255,0.9); font-size: var(--fs-lg); }
.detail__wave { position: absolute; bottom: -1px; left: 0; width: 100%; height: 50px; }

.detail__body { max-width: var(--container-narrow); padding: var(--sp-12) var(--sp-4) 0; }
@media (min-width: 768px) { .detail__body { padding-inline: var(--sp-8); } }
.detail__intro { margin-bottom: var(--sp-8); }
.detail__desc { font-size: var(--fs-lg); line-height: var(--lh-relaxed); color: var(--color-text); margin: 0; }
.detail__aksara { margin-bottom: var(--sp-8); }
.detail__aksara h2, .detail__intro h2 { font-size: var(--fs-xl); margin-bottom: var(--sp-3); }

.aksara-panel, .text-panel { padding: var(--sp-6); }
.aksara-panel { background: linear-gradient(180deg, var(--c-primary-50), var(--color-surface)); border-color: var(--c-primary-100); }
.aksara-panel__text { font-size: clamp(1.5rem, 4vw, 2.25rem); line-height: 1.8; color: var(--c-primary-800); margin: 0; text-align: center; word-break: break-word; }

.highlights { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--sp-3); }
.highlights__item { display: flex; align-items: flex-start; gap: var(--sp-3); padding: var(--sp-4); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--r-lg); }
.highlights__dot { flex: none; width: 10px; height: 10px; border-radius: 50%; background: var(--color-accent); margin-top: 0.4rem; }

.level--sd { background: var(--c-success-700) !important; }
.level--smp { background: var(--c-primary-800) !important; }
.level--sma-smk { background: var(--c-secondary-700) !important; }

.detail__more { padding: var(--sp-12) var(--sp-4) var(--sp-20); }
@media (min-width: 768px) { .detail__more { padding-inline: var(--sp-8); } }
.detail__more h2 { margin-bottom: var(--sp-5); }
.more-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-4); }
.more-card { display: flex; flex-direction: column; padding: var(--sp-5); border: 1px solid var(--color-border); border-radius: var(--r-lg); background: var(--color-surface); color: inherit; transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out); }
.more-card:hover { transform: translateY(-3px); box-shadow: var(--sh-md); color: inherit; }
.more-card__cat { font-size: var(--fs-xs); font-weight: var(--fw-bold); text-transform: uppercase; color: var(--color-secondary); }
.more-card h3 { font-size: var(--fs-lg); margin: var(--sp-1) 0 var(--sp-2); }
.more-card p { font-size: var(--fs-sm); color: var(--color-text-muted); margin: 0; }
@media (max-width: 860px) { .more-grid { grid-template-columns: 1fr; } }
</style>
