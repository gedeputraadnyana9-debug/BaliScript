<script setup>
import { ref, watch, onBeforeUnmount, onMounted } from "vue";
import { useRoute } from "vue-router";
import BaseButton from "@/components/base/BaseButton.vue";

const route = useRoute();
const open = ref(false);

const links = [
  { to: "/", label: "Beranda", exact: true },
  { to: "/aksara", label: "Belajar Aksara" },
  { to: "/latihan", label: "Latihan" },
  { to: "/cerita", label: "Cerita Bali" },
  { to: "/about", label: "Tentang" },
];

const isActive = (link) =>
  link.exact ? route.path === link.to : route.path.startsWith(link.to);

function onKey(e) {
  if (e.key === "Escape") open.value = false;
}

watch(() => route.fullPath, () => { open.value = false; });
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <router-link to="/" class="brand" aria-label="BaliScript beranda">
        <span class="brand__mark" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M6 30c0-8 4-13 12-13s12 5 12 13" stroke="var(--color-primary)" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="18" cy="11" r="5" stroke="var(--color-secondary)" stroke-width="2.5" />
            <circle cx="18" cy="11" r="1.8" fill="var(--color-accent)" />
          </svg>
        </span>
        <span class="brand__text">Bali<strong>Script</strong></span>
      </router-link>

      <button
        class="menu-toggle"
        :class="{ 'menu-toggle--open': open }"
        :aria-expanded="open"
        aria-controls="main-menu"
        aria-label="Buka menu"
        @click="open = !open"
      >
        <span class="menu-toggle__bars" aria-hidden="true"><span></span><span></span><span></span></span>
        <span class="menu-toggle__label">{{ open ? "Tutup" : "Menu" }}</span>
      </button>
    </div>

    <Transition name="menu">
      <nav v-if="open" id="main-menu" class="menu" aria-label="Navigasi utama">
        <div class="container menu__inner">
          <router-link
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="menu__link"
            :class="{ 'menu__link--active': isActive(link) }"
          >
            {{ link.label }}
          </router-link>
          <BaseButton as="router-link" to="/aksara" variant="primary" size="md" block class="menu__cta">
            Mulai Belajar
          </BaseButton>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--c-neutral-0);
  border-bottom: 3px solid var(--color-ink);
  box-shadow: 0 4px 0 var(--c-primary-100);
}
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-h);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  font-size: var(--fs-xl);
  font-weight: var(--fw-bold);
  color: var(--color-text);
}
.brand:hover { color: var(--color-text); }
.brand__mark {
  display: grid;
  place-items: center;
  width: 40px; height: 40px;
  background: var(--c-accent-200);
  border: 3px solid var(--color-ink);
  border-radius: var(--r-md);
  transform: rotate(-6deg);
  transition: transform var(--dur-base) var(--ease-out);
}
.brand:hover .brand__mark { transform: rotate(6deg) scale(1.05); }
.brand__text strong { color: var(--color-primary); }

.menu-toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  padding: 0.5rem 0.9rem;
  background: var(--c-accent-200);
  color: var(--color-ink);
  border: 3px solid var(--color-ink);
  border-radius: var(--r-full);
  box-shadow: var(--sh-sm);
  font-family: var(--font-display);
  font-weight: var(--fw-semibold);
  font-size: var(--fs-sm);
  transition: transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.menu-toggle:hover { transform: translateY(-2px); box-shadow: var(--sh-md); }
.menu-toggle:active { transform: translate(2px, 2px); box-shadow: none; }

.menu-toggle__bars { display: flex; flex-direction: column; gap: 4px; }
.menu-toggle__bars span {
  display: block;
  width: 18px;
  height: 3px;
  background: var(--color-ink);
  border-radius: 2px;
  transition: transform var(--dur-base) var(--ease-out), opacity var(--dur-fast);
}
.menu-toggle--open .menu-toggle__bars span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.menu-toggle--open .menu-toggle__bars span:nth-child(2) { opacity: 0; }
.menu-toggle--open .menu-toggle__bars span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--c-neutral-0);
  border-bottom: 3px solid var(--color-ink);
  box-shadow: 0 8px 0 var(--c-secondary-100);
  padding-block: var(--sp-4) var(--sp-6);
}
.menu__inner { display: flex; flex-direction: column; gap: var(--sp-2); }
.menu__link {
  padding: 0.75rem 1.25rem;
  border: 3px solid var(--color-ink);
  border-radius: var(--r-lg);
  background: var(--c-neutral-0);
  font-family: var(--font-display);
  font-weight: var(--fw-semibold);
  font-size: var(--fs-lg);
  color: var(--color-ink);
  box-shadow: var(--sh-sm);
  transition: transform var(--dur-fast) var(--ease-out), background-color var(--dur-fast) var(--ease-out);
}
.menu__link:hover { transform: translate(-2px, -2px); box-shadow: var(--sh-md); background: var(--c-secondary-50); color: var(--color-ink); }
.menu__link--active { background: var(--c-primary-100); }
.menu__cta { margin-top: var(--sp-2); }

.menu-enter-active, .menu-leave-active { transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out); }
.menu-enter-from, .menu-leave-to { opacity: 0; transform: translateY(-12px); }
@media (prefers-reduced-motion: reduce) { .menu-enter-active, .menu-leave-active { transition: none; } }

@media (min-width: 768px) {
  .menu__inner { max-width: 420px; margin-left: auto; }
}
</style>
