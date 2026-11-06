<script setup>
const year = new Date().getFullYear();
const links = [
  { to: "/", label: "Beranda" },
  { to: "/aksara", label: "Belajar Aksara" },
  { to: "/latihan", label: "Latihan" },
  { to: "/cerita", label: "Cerita Bali" },
  { to: "/about", label: "Tentang" },
];
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <div class="footer__logo" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
            <path d="M6 30c0-8 4-13 12-13s12 5 12 13" stroke="var(--c-primary-300)" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="18" cy="11" r="5" stroke="var(--c-secondary-300)" stroke-width="2.5" />
            <circle cx="18" cy="11" r="1.8" fill="var(--c-accent-400)" />
          </svg>
        </div>
        <div>
          <p class="footer__name">BaliScript</p>
          <p class="footer__tagline">Belajar Aksara Bali dengan Cara yang Menyenangkan</p>
        </div>
      </div>

      <nav class="footer__links" aria-label="Navigasi footer">
        <router-link v-for="l in links" :key="l.to" :to="l.to" class="footer__link">{{ l.label }}</router-link>
      </nav>
    </div>

    <div class="container footer__bar">
      <p>&copy; {{ year }} BaliScript — Pelestarian budaya Bali melalui teknologi.</p>
      <p class="footer__made">Dibuat untuk pelajar Bali</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: var(--sp-24);
  background: var(--c-neutral-900);
  color: var(--c-neutral-200);
  padding-top: var(--sp-12);
}
.footer__inner {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-8);
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: var(--sp-10);
}
.footer__brand { display: flex; gap: var(--sp-3); align-items: center; max-width: 320px; }
.footer__logo { display: grid; place-items: center; width: 44px; height: 44px; background: rgba(255,255,255,0.06); border-radius: var(--r-md); }
.footer__name { font-weight: var(--fw-bold); font-size: var(--fs-lg); margin: 0; color: #fff; }
.footer__tagline { font-size: var(--fs-sm); color: var(--c-neutral-400); margin: var(--sp-1) 0 0; }
.footer__links { display: flex; flex-wrap: wrap; gap: var(--sp-2) var(--sp-6); }
.footer__link { color: var(--c-neutral-300); font-size: var(--fs-sm); }
.footer__link:hover { color: var(--c-accent-300); }

.footer__bar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
  justify-content: space-between;
  padding: var(--sp-5) var(--sp-4);
  border-top: 1px solid rgba(255,255,255,0.08);
  font-size: var(--fs-xs);
  color: var(--c-neutral-400);
}
.footer__bar p { margin: 0; }
</style>
