<script setup>
import BaseButton from "@/components/base/BaseButton.vue";
</script>

<template>
  <div class="notfound container">
    <div class="notfound__inner">
      <div class="notfound__code" aria-hidden="true">
        <span>᭟</span>
      </div>
      <h1>Halaman Tidak Ditemukan</h1>
      <p>Sepertinya halaman yang kamu cari tidak ada. Mungkin sudah dipindahkan atau tidak pernah ada.</p>
      <div class="notfound__actions">
        <BaseButton as="router-link" to="/" variant="primary" size="md">Kembali ke Beranda</BaseButton>
        <BaseButton as="router-link" to="/aksara" variant="outline" size="md">Lihat Aksara</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notfound { min-height: 60vh; display: grid; place-items: center; padding: var(--sp-12) var(--sp-4); text-align: center; }
.notfound__inner { max-width: 480px; }
.notfound__code { font-size: clamp(5rem, 16vw, 9rem); line-height: 1; color: var(--color-primary); opacity: 0.6; margin-bottom: var(--sp-4); }
.notfound h1 { margin-bottom: var(--sp-3); }
.notfound p { color: var(--color-text-muted); margin-bottom: var(--sp-6); }
.notfound__actions { display: flex; gap: var(--sp-3); justify-content: center; flex-wrap: wrap; }
</style>
