<script setup>
import BaseButton from "@/components/base/BaseButton.vue";

const goals = [
  { title: "Memperkenalkan aksara Bali", desc: "Mengenalkan bentuk, bunyi, dan jenis aksara Bali kepada generasi muda." },
  { title: "Membantu berdasarkan jenjang", desc: "Materi disusun untuk SD, SMP, SMA, dan SMK secara bertahap." },
  { title: "Pengalaman belajar interaktif", desc: "Visual, audio, latihan menulis, dan cerita rakyat dalam satu tempat." },
  { title: "Pelestarian budaya", desc: "Mendukung pelestarian budaya Bali melalui teknologi modern." },
];

const stack = [
  { name: "Vue 3", role: "Framework utama" },
  { name: "Vite", role: "Build tool" },
  { name: "Vue Router 4", role: "Navigasi halaman" },
  { name: "Vuex 4", role: "State management" },
  { name: "Canvas API", role: "Latihan menulis" },
  { name: "Web Audio", role: "Pemutaran pelafalan" },
];
</script>

<template>
  <div class="about">
    <section class="about__hero container">
      <span class="page-head__eyebrow">Tentang Kami</span>
      <h1>Pelestarian Aksara Bali Lewat Teknologi</h1>
      <p class="about__lead">
        BaliScript adalah website edukasi interaktif yang membantu pelajar mengenal, membaca, mendengar,
        dan menulis aksara Bali melalui pembelajaran digital yang sederhana dan menarik.
      </p>
    </section>

    <section class="container about__goals">
      <h2>Tujuan Utama</h2>
      <div class="goals-grid">
        <div v-for="g in goals" :key="g.title" class="goal">
          <h3>{{ g.title }}</h3>
          <p>{{ g.desc }}</p>
        </div>
      </div>
    </section>

    <section class="container about__problem">
      <div class="problem-card">
        <h2>Permasalahan & Solusi</h2>
        <div class="problem-pair">
          <div>
            <h3>Permasalahan</h3>
            <p>Banyak pelajar mengalami kesulitan mengenali bentuk aksara, memahami pelafalan, dan mempraktikkan penulisannya.</p>
          </div>
          <div>
            <h3>Solusi</h3>
            <p>Menghadirkan media pembelajaran yang menggabungkan materi visual, audio, latihan interaktif, dan cerita rakyat Bali.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="container about__users">
      <h2>Target Pengguna</h2>
      <div class="users">
        <div class="user user--sd"><h3>SD</h3><p>Pengenalan bentuk dan bunyi aksara.</p></div>
        <div class="user user--smp"><h3>SMP</h3><p>Memahami jenis aksara dan latihan membaca.</p></div>
        <div class="user user--sma"><h3>SMA/SMK</h3><p>Memperdalam pemahaman serta membaca cerita beraksara Bali.</p></div>
      </div>
    </section>

    <section class="container about__tech">
      <h2>Dibangun Dengan</h2>
      <div class="tech-grid">
        <div v-for="t in stack" :key="t.name" class="tech">
          <span class="tech__name">{{ t.name }}</span>
          <span class="tech__role">{{ t.role }}</span>
        </div>
      </div>
    </section>

    <section class="about__cta">
      <div class="container about__cta-inner">
        <h2>Mulai Perjalananmu</h2>
        <p>Kenali aksara Bali hari ini juga — gratis dan untuk semua jenjang.</p>
        <BaseButton as="router-link" to="/aksara" variant="primary" size="lg">Belajar Sekarang</BaseButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about__hero { padding: var(--sp-16) var(--sp-4) var(--sp-8); max-width: 760px; }
@media (min-width: 768px) { .about__hero { padding-inline: var(--sp-8); } }
.about__hero h1 { margin: var(--sp-2) 0 var(--sp-4); }
.about__lead { font-size: var(--fs-lg); color: var(--color-text-muted); }
.page-head__eyebrow { display: block; font-size: var(--fs-sm); font-weight: var(--fw-bold); letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-secondary); }

.about__goals, .about__problem, .about__users, .about__tech { padding: var(--sp-10) var(--sp-4); }
@media (min-width: 768px) { .about__goals, .about__problem, .about__users, .about__tech { padding-inline: var(--sp-8); } }
.about__goals h2, .about__users h2, .about__tech h2 { margin-bottom: var(--sp-6); }

.goals-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--sp-5); }
.goal { padding: var(--sp-6); border-radius: var(--r-lg); border: 1px solid var(--color-border); background: var(--color-surface); }
.goal h3 { font-size: var(--fs-lg); margin-bottom: var(--sp-2); }
.goal p { color: var(--color-text-muted); margin: 0; }

.problem-card { background: linear-gradient(140deg, var(--c-primary-50), var(--c-accent-50)); border-radius: var(--r-2xl); padding: var(--sp-10); border: 1px solid var(--c-primary-100); }
.problem-card h2 { margin-bottom: var(--sp-6); }
.problem-pair { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-8); }
.problem-pair h3 { font-size: var(--fs-lg); color: var(--color-secondary); margin-bottom: var(--sp-2); }
.problem-pair p { margin: 0; color: var(--color-text); }

.users { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-5); }
.user { padding: var(--sp-6); border-radius: var(--r-lg); border: 1px solid var(--color-border); background: var(--color-surface); border-top: 4px solid var(--c-neutral-300); }
.user h3 { font-size: var(--fs-xl); margin-bottom: var(--sp-2); }
.user p { color: var(--color-text-muted); margin: 0; }
.user--sd { border-top-color: var(--c-success-500); }
.user--smp { border-top-color: var(--c-primary-500); }
.user--sma { border-top-color: var(--c-secondary-500); }

.tech-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-4); }
.tech { display: flex; flex-direction: column; gap: var(--sp-1); padding: var(--sp-5); border: 1px solid var(--color-border); border-radius: var(--r-lg); background: var(--color-surface); }
.tech__name { font-weight: var(--fw-bold); font-size: var(--fs-lg); color: var(--color-primary); }
.tech__role { font-size: var(--fs-sm); color: var(--color-text-muted); }

.about__cta { background: var(--c-neutral-900); color: #fff; padding: var(--sp-16) 0; margin-top: var(--sp-10); }
.about__cta-inner { text-align: center; }
.about__cta h2 { color: #fff; margin-bottom: var(--sp-3); }
.about__cta p { color: var(--c-neutral-300); margin-bottom: var(--sp-6); }

@media (max-width: 860px) { .goals-grid, .problem-pair, .users, .tech-grid { grid-template-columns: 1fr; } }
</style>
