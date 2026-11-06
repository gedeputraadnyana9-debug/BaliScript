<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import BaseButton from "@/components/base/BaseButton.vue";
import AksaraCard from "@/components/shared/AksaraCard.vue";
import StoryCard from "@/components/shared/StoryCard.vue";

const store = useStore();

const featuredAksara = computed(() => store.getters["aksara/all"].slice(0, 4));
const featuredStories = computed(() => store.getters["stories/all"].slice(0, 3));

const levels = [
  { code: "SD", title: "SD", desc: "Pengenalan bentuk & bunyi aksara", icon: "🌿" },
  { code: "SMP", title: "SMP", desc: "Jenis aksara & latihan membaca", icon: "📖" },
  { code: "SMA/SMK", title: "SMA / SMK", desc: "Memperdalam & membaca cerita", icon: "🏛️" },
];

const features = [
  { title: "Belajar Aksara", desc: "Kenali bentuk, bunyi, dan kategori aksara Bali secara visual.", to: "/aksara", cta: "Jelajahi Aksara", color: "primary" },
  { title: "Latihan Menulis", desc: "Praktik menulis aksara Bali langsung di layar dengan kuas digital.", to: "/latihan", cta: "Mulai Latihan", color: "secondary" },
  { title: "Cerita Rakyat", desc: "Baca cerita rakyat Bali dengan teks aksara Bali & terjemahannya.", to: "/cerita", cta: "Baca Cerita", color: "accent" },
];
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__content">
          <span class="hero__badge">Aksara & Budaya Bali</span>
          <h1 class="hero__title">Belajar Aksara Bali dengan Cara yang <span class="hero__hl">Menyenangkan</span></h1>
          <p class="hero__lead">
            BaliScript menghadirkan pembelajaran aksara Bali yang interaktif untuk pelajar SD, SMP, SMA,
            dan SMK di Bali. Kenali bentuk, dengar bunyi, dan praktikkan penulisan aksara leluhur.
          </p>
          <div class="hero__actions">
            <BaseButton as="router-link" to="/aksara" variant="primary" size="lg">Mulai Belajar</BaseButton>
            <BaseButton as="router-link" to="/cerita" variant="outline" size="lg">Baca Cerita</BaseButton>
          </div>

          <div class="hero__stats">
            <div><strong>{{ store.getters['aksara/all'].length }}+</strong><span>Aksara</span></div>
            <div><strong>{{ store.getters['stories/all'].length }}</strong><span>Cerita</span></div>
            <div><strong>3</strong><span>Jenjang</span></div>
          </div>
        </div>

        <div class="hero__art" aria-hidden="true">
          <div class="hero__plate">
            <div class="hero__plate-ring"></div>
            <div class="hero__plate-ring hero__plate-ring--2"></div>
            <div class="hero__glyphs">
              <span>ᬲ</span><span>ᬩ</span><span>ᬓ</span><span>ᬫ</span>
            </div>
            <div class="hero__plate-core">ᬓ</div>
          </div>
        </div>
      </div>

      <svg class="hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 50c180 30 360 30 540 10S900 20 1080 35s240 25 360 15v30H0z" fill="var(--color-bg)" />
      </svg>
    </section>

    <!-- Levels -->
    <section class="container section">
      <div class="section__head">
        <span class="section__eyebrow">Berdasarkan Jenjang</span>
        <h2>Belajar Sesuai Pendidikanmu</h2>
        <p>Materi disusun bertahap dari pengenalan hingga pemahaman mendalam.</p>
      </div>
      <div class="levels">
        <div v-for="l in levels" :key="l.code" class="level-card" :class="`level-card--${l.code.toLowerCase().replace('/', '-')}`">
          <div class="level-card__icon">{{ l.icon }}</div>
          <div class="level-card__body">
            <h3>{{ l.title }}</h3>
            <p>{{ l.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="container section">
      <div class="section__head">
        <span class="section__eyebrow">Apa yang Bisa Kamu Lakukan</span>
        <h2>Tiga Cara Belajar di BaliScript</h2>
      </div>
      <div class="features">
        <div v-for="f in features" :key="f.title" class="feature" :class="`feature--${f.color}`">
          <div class="feature__body">
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
          <router-link :to="f.to" class="feature__cta">{{ f.cta }} →</router-link>
        </div>
      </div>
    </section>

    <!-- Featured Aksara -->
    <section class="container section">
      <div class="section__head section__head--row">
        <div>
          <span class="section__eyebrow">Pengenalan</span>
          <h2>Mulai dari Aksara Dasar</h2>
        </div>
        <BaseButton as="router-link" to="/aksara" variant="outline" size="md">Lihat Semua</BaseButton>
      </div>
      <div class="grid grid--cards">
        <AksaraCard v-for="a in featuredAksara" :key="a.id" :item="a" />
      </div>
    </section>

    <!-- Featured Stories -->
    <section class="container section">
      <div class="section__head section__head--row">
        <div>
          <span class="section__eyebrow">Cerita Rakyat</span>
          <h2>Belajar Lewat Cerita</h2>
        </div>
        <BaseButton as="router-link" to="/cerita" variant="outline" size="md">Lihat Semua</BaseButton>
      </div>
      <div class="grid grid--stories">
        <StoryCard v-for="s in featuredStories" :key="s.id" :story="s" />
      </div>
    </section>

    <section class="cta-band">
      <div class="container cta-band__inner">
        <h2>Siap Melestarikan Aksara Bali?</h2>
        <p>Mari mulai perjalananmu mengenal aksara dan budaya Bali hari ini.</p>
        <BaseButton as="router-link" to="/aksara" variant="accent" size="lg">Mulai Sekarang</BaseButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hero */
.hero {
  position: relative;
  background: linear-gradient(165deg, var(--c-primary-50) 0%, var(--color-bg-alt) 55%, var(--c-accent-50) 100%);
  padding: var(--sp-16) 0 var(--sp-20);
  overflow: hidden;
}
.hero__inner { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: var(--sp-12); align-items: center; }
.hero__badge {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  border-radius: var(--r-full);
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  margin-bottom: var(--sp-4);
}
.hero__title { font-size: clamp(2.2rem, 5vw, var(--fs-6xl)); line-height: 1.05; margin-bottom: var(--sp-5); }
.hero__hl {
  background: linear-gradient(120deg, var(--c-primary-500), var(--c-secondary-500));
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.hero__lead { font-size: var(--fs-lg); color: var(--color-text-muted); max-width: 36ch; margin-bottom: var(--sp-6); }
.hero__actions { display: flex; flex-wrap: wrap; gap: var(--sp-3); margin-bottom: var(--sp-8); }
.hero__stats { display: flex; gap: var(--sp-8); }
.hero__stats strong { display: block; font-size: var(--fs-3xl); color: var(--color-primary); }
.hero__stats span { font-size: var(--fs-sm); color: var(--color-text-soft); }

.hero__art { display: grid; place-items: center; }
.hero__plate { position: relative; width: min(360px, 90%); aspect-ratio: 1; display: grid; place-items: center; }
.hero__plate-ring {
  position: absolute; inset: 0; border: 2px dashed var(--c-primary-300); border-radius: 50%;
  animation: spin 28s linear infinite;
}
.hero__plate-ring--2 { inset: 14%; border-color: var(--c-accent-400); animation-duration: 18s; animation-direction: reverse; }
.hero__glyphs {
  position: absolute; inset: 0;
}
.hero__glyphs span {
  position: absolute; font-size: 2rem; color: var(--color-primary); opacity: 0.65;
}
.hero__glyphs span:nth-child(1) { top: 6%; left: 30%; }
.hero__glyphs span:nth-child(2) { top: 28%; right: 8%; color: var(--color-secondary); }
.hero__glyphs span:nth-child(3) { bottom: 22%; left: 6%; color: var(--color-accent); }
.hero__glyphs span:nth-child(4) { bottom: 6%; right: 28%; color: var(--c-primary-700); }
.hero__plate-core {
  font-size: clamp(4rem, 10vw, 6rem); color: var(--color-primary);
  background: var(--color-surface); width: 46%; aspect-ratio: 1;
  display: grid; place-items: center; border-radius: 50%;
  box-shadow: var(--sh-xl); border: 4px solid var(--color-primary-soft);
}
@keyframes spin { to { transform: rotate(360deg); } }
.hero__wave { position: absolute; bottom: -1px; left: 0; width: 100%; height: 60px; }

/* Sections */
.section { padding-block: var(--sp-16); }
.section__head { max-width: 640px; margin-bottom: var(--sp-8); }
.section__head--row { display: flex; justify-content: space-between; align-items: flex-end; max-width: none; gap: var(--sp-4); flex-wrap: wrap; }
.section__eyebrow { display: block; font-size: var(--fs-sm); font-weight: var(--fw-bold); letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-secondary); margin-bottom: var(--sp-2); }
.section__head h2 { margin-bottom: var(--sp-2); }
.section__head p { color: var(--color-text-muted); margin: 0; }

/* Levels */
.levels { display: grid; grid-template-columns: 1fr; gap: var(--sp-4); }
.level-card { display: flex; align-items: center; gap: var(--sp-5); padding: var(--sp-5) var(--sp-6); border-radius: var(--r-xl); border: 3px solid var(--color-ink); background: var(--color-surface); box-shadow: var(--sh-md); transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out); }
.level-card:hover { transform: translate(-2px, -3px); box-shadow: var(--sh-lg); }
.level-card__icon { flex: 0 0 auto; width: 64px; height: 64px; display: grid; place-items: center; font-size: 2rem; border: 3px solid var(--color-ink); border-radius: 50%; background: var(--c-accent-100); }
.level-card__body { flex: 1; min-width: 0; }
.level-card h3 { margin-bottom: var(--sp-1); }
.level-card p { font-size: var(--fs-base); color: var(--color-text-muted); margin: 0; }
.level-card--sd .level-card__icon { background: var(--c-success-100); }
.level-card--smp .level-card__icon { background: var(--c-primary-100); }
.level-card--sma-smk .level-card__icon { background: var(--c-secondary-100); }
.level-card--sd { border-left: 10px solid var(--c-success-500); }
.level-card--smp { border-left: 10px solid var(--c-primary-500); }
.level-card--sma-smk { border-left: 10px solid var(--c-secondary-500); }

/* Features */
.features { display: grid; grid-template-columns: 1fr; gap: var(--sp-4); }
.feature { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-6); padding: var(--sp-6) var(--sp-8); border-radius: var(--r-xl); background: var(--color-surface); border: 3px solid var(--color-ink); box-shadow: var(--sh-md); transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out); }
.feature:hover { transform: translate(-2px, -3px); box-shadow: var(--sh-lg); }
.feature__body { flex: 1; min-width: 0; }
.feature h3 { margin-bottom: var(--sp-1); }
.feature p { color: var(--color-text-muted); margin: 0; }
.feature__cta { flex: 0 0 auto; padding: var(--sp-2) var(--sp-5); border: 3px solid var(--color-ink); border-radius: var(--r-full); font-weight: var(--fw-bold); color: var(--color-ink); box-shadow: var(--sh-sm); transition: transform var(--dur-fast) var(--ease-out); }
.feature__cta:hover { transform: translateY(-2px); }
.feature--primary { background: var(--c-primary-50); }
.feature--primary .feature__cta { background: var(--c-primary-200); }
.feature--secondary { background: var(--c-secondary-50); }
.feature--secondary .feature__cta { background: var(--c-secondary-200); }
.feature--accent { background: var(--c-accent-50); }
.feature--accent .feature__cta { background: var(--c-accent-200); }

/* Grids */
.grid { display: grid; gap: var(--sp-5); }
.grid--cards { grid-template-columns: repeat(4, 1fr); }
.grid--stories { grid-template-columns: repeat(3, 1fr); }

/* CTA band */
.cta-band { background: linear-gradient(120deg, var(--c-primary-800), var(--c-primary-600)); color: #fff; padding: var(--sp-16) 0; margin-top: var(--sp-8); }
.cta-band__inner { text-align: center; }
.cta-band h2 { color: #fff; margin-bottom: var(--sp-3); }
.cta-band p { color: var(--c-primary-100); margin-bottom: var(--sp-6); }

/* Responsive */
@media (max-width: 980px) {
  .hero__inner { grid-template-columns: 1fr; gap: var(--sp-8); }
  .hero__art { order: -1; }
  .grid--cards { grid-template-columns: repeat(2, 1fr); }
  .grid--stories { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .hero__stats { gap: var(--sp-5); }
  .grid--cards { grid-template-columns: 1fr; }
  .feature { flex-direction: column; align-items: flex-start; padding: var(--sp-5); }
  .level-card { padding: var(--sp-4); gap: var(--sp-4); }
  .level-card__icon { width: 52px; height: 52px; font-size: 1.5rem; }
}
</style>
