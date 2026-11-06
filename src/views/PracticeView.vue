<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useStore } from "vuex";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseCard from "@/components/base/BaseCard.vue";
import { loadAksaraFont, scoreHandwriting } from "@/composables/useHandwritingScore.js";

const store = useStore();
const aksaraList = computed(() => store.getters["aksara/all"]);
const categories = computed(() =>
  store.getters["aksara/categories"].map((cat) => ({
    name: cat,
    items: aksaraList.value.filter((a) => a.category === cat),
  }))
);
const practicedCount = computed(() => store.getters["aksara/practicedCount"]);
const averageScore = computed(() => store.getters["aksara/averageScore"]);
const total = computed(() => aksaraList.value.length);

const canvasRef = ref(null);
const guide = ref(aksaraList.value[0]);
const color = ref("#1565c0");
const brush = ref(12);
const showGuide = ref(true);
const history = ref([]);
const ctx = ref(null);
const result = ref(null);
let drawing = false;
let last = { x: 0, y: 0 };

const colors = ["#1565c0", "#e53935", "#fb8c00", "#43a047", "#8e24aa", "#263238"];

const guideScore = computed(() => store.getters["aksara/scoreOf"](guide.value.id));

function feedbackFor(score) {
  if (score >= 80) return { label: "Sangat tepat!", tone: "great" };
  if (score >= 55) return { label: "Sudah baik, rapikan lagi.", tone: "good" };
  return { label: "Coba lagi, ikuti bayangan aksaranya.", tone: "retry" };
}

function setupCanvas() {
  const c = canvasRef.value;
  if (!c) return;
  const rect = c.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  c.width = rect.width * dpr;
  c.height = rect.height * dpr;
  const context = c.getContext("2d");
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.lineCap = "round";
  context.lineJoin = "round";
  ctx.value = context;
}

function pos(e) {
  const c = canvasRef.value;
  const rect = c.getBoundingClientRect();
  const t = e.touches ? e.touches[0] : e;
  return { x: t.clientX - rect.left, y: t.clientY - rect.top };
}

function start(e) {
  e.preventDefault();
  drawing = true;
  last = pos(e);
  saveSnapshot();
}

function draw(e) {
  if (!drawing) return;
  e.preventDefault();
  const p = pos(e);
  const c = ctx.value;
  c.strokeStyle = color.value;
  c.lineWidth = brush.value;
  c.beginPath();
  c.moveTo(last.x, last.y);
  c.lineTo(p.x, p.y);
  c.stroke();
  last = p;
}

function stop() { drawing = false; }

function saveSnapshot() {
  const c = canvasRef.value;
  if (!c) return;
  try {
    history.value.push(c.toDataURL());
    if (history.value.length > 30) history.value.shift();
  } catch { /* ignore */ }
}

function clearCanvas() {
  const c = canvasRef.value;
  if (!c) return;
  saveSnapshot();
  ctx.value.save();
  ctx.value.setTransform(1, 0, 0, 1, 0, 0);
  ctx.value.clearRect(0, 0, c.width, c.height);
  ctx.value.restore();
  result.value = null;
}

function undo() {
  if (!history.value.length) return;
  const img = new Image();
  img.onload = () => {
    const c = canvasRef.value;
    ctx.value.save();
    ctx.value.setTransform(1, 0, 0, 1, 0, 0);
    ctx.value.clearRect(0, 0, c.width, c.height);
    ctx.value.drawImage(img, 0, 0, c.width, c.height);
    ctx.value.restore();
    history.value.pop();
  };
  img.src = history.value.pop();
  result.value = null;
}

function checkScore() {
  const c = canvasRef.value;
  if (!c) return;
  const outcome = scoreHandwriting(c, guide.value.character);
  result.value = outcome;
  if (!outcome.empty) {
    store.dispatch("aksara/recordScore", { id: guide.value.id, score: outcome.score });
  }
}

async function selectAksara(a) {
  guide.value = a;
  result.value = null;
  history.value = [];
  await loadAksaraFont(a.character);
  clearCanvas();
  result.value = null;
}

onMounted(async () => {
  setupCanvas();
  await loadAksaraFont(guide.value.character);
  window.addEventListener("resize", setupCanvas);
});
onBeforeUnmount(() => window.removeEventListener("resize", setupCanvas));
watch(brush, () => { if (ctx.value) ctx.value.lineWidth = brush.value; });
</script>

<template>
  <div class="practice container">
    <header class="page-head">
      <span class="page-head__eyebrow">Praktik Menulis</span>
      <h1>Latihan Menulis Aksara</h1>
      <p class="page-head__lead">Pilih aksara, ikuti bayangannya, lalu tulis sendiri. Tekan "Cek Skor" untuk melihat ketepatanmu.</p>
    </header>

    <div class="summary">
      <div class="summary__item"><strong>{{ practicedCount }}/{{ total }}</strong><span>aksara sudah dilatih</span></div>
      <div class="summary__item"><strong>{{ averageScore }}</strong><span>rata-rata skor terbaik</span></div>
    </div>

    <div class="practice__layout">
      <aside class="practice__sidebar">
        <div v-for="group in categories" :key="group.name" class="group">
          <h3>{{ group.name }}</h3>
          <div class="picker">
            <button
              v-for="a in group.items"
              :key="a.id"
              class="picker__item"
              :class="{ 'picker__item--active': guide.id === a.id }"
              :title="a.title"
              @click="selectAksara(a)"
            >
              <span class="picker__glyph">{{ a.character }}</span>
              <span class="picker__name">{{ a.title }}</span>
              <span v-if="store.getters['aksara/scoreOf'](a.id)" class="picker__score">
                {{ store.getters['aksara/scoreOf'](a.id).best }}
              </span>
            </button>
          </div>
        </div>
      </aside>

      <section class="practice__main">
        <BaseCard padding="lg" class="canvas-card">
          <div class="canvas-card__head">
            <div class="guide-info">
              <span class="guide-glyph">{{ guide.character }}</span>
              <div>
                <h3 class="guide-title">{{ guide.title }}</h3>
                <p class="guide-pron">/{{ guide.pronunciation }}/</p>
                <p class="guide-best" v-if="guideScore">Skor terbaik: {{ guideScore.best }} (latihan {{ guideScore.attempts }}x)</p>
              </div>
            </div>
            <label class="toggle">
              <input type="checkbox" v-model="showGuide" />
              <span>Tampilkan panduan</span>
            </label>
          </div>

          <div class="canvas-wrap">
            <span v-if="showGuide" class="canvas-guide" aria-hidden="true">{{ guide.character }}</span>
            <canvas
              ref="canvasRef"
              class="canvas"
              @mousedown="start"
              @mousemove="draw"
              @mouseup="stop"
              @mouseleave="stop"
              @touchstart="start"
              @touchmove="draw"
              @touchend="stop"
            ></canvas>
          </div>

          <div class="tools">
            <div class="tools__group">
              <span class="tools__label">Warna</span>
              <div class="swatches">
                <button
                  v-for="col in colors"
                  :key="col"
                  class="swatch"
                  :class="{ 'swatch--active': color === col }"
                  :style="{ background: col }"
                  :aria-label="`Warna ${col}`"
                  @click="color = col"
                ></button>
              </div>
            </div>
            <div class="tools__group">
              <span class="tools__label">Kuas</span>
              <input type="range" min="4" max="30" v-model.number="brush" class="range" />
              <span class="tools__value">{{ brush }}px</span>
            </div>
            <div class="tools__actions">
              <BaseButton variant="ghost" size="sm" @click="undo" :disabled="!history.length">Batal</BaseButton>
              <BaseButton variant="secondary" size="sm" @click="clearCanvas">Hapus</BaseButton>
              <BaseButton variant="primary" size="sm" @click="checkScore">Cek Skor</BaseButton>
            </div>
          </div>

          <div v-if="result" class="score" :class="`score--${result.empty ? 'empty' : feedbackFor(result.score).tone}`" role="status">
            <template v-if="result.empty">
              <p class="score__msg">Tulis aksara di kanvas dulu, lalu tekan Cek Skor.</p>
            </template>
            <template v-else>
              <div class="score__value">{{ result.score }}<span>/100</span></div>
              <div class="score__text">
                <p class="score__msg">{{ feedbackFor(result.score).label }}</p>
                <p class="score__detail">Ketepatan garis: {{ result.precision }}% · Bagian aksara yang terisi: {{ result.recall }}%</p>
              </div>
            </template>
          </div>
        </BaseCard>
      </section>
    </div>
  </div>
</template>

<style scoped>
.practice { padding: var(--sp-10) var(--sp-4) var(--sp-20); }
@media (min-width: 768px) { .practice { padding-inline: var(--sp-8); } }
.page-head { max-width: 640px; margin-bottom: var(--sp-6); }
.page-head__eyebrow { display: block; font-size: var(--fs-sm); font-weight: var(--fw-bold); letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-secondary); margin-bottom: var(--sp-2); }
.page-head h1 { margin-bottom: var(--sp-3); }
.page-head__lead { color: var(--color-text-muted); font-size: var(--fs-lg); }

.summary { display: flex; gap: var(--sp-4); margin-bottom: var(--sp-8); flex-wrap: wrap; }
.summary__item { display: flex; flex-direction: column; padding: var(--sp-3) var(--sp-5); border: 3px solid var(--color-ink); border-radius: var(--r-lg); background: var(--c-accent-200); box-shadow: 4px 4px 0 var(--color-ink); }
.summary__item strong { font-family: var(--font-display); font-size: var(--fs-2xl); color: var(--color-ink); }
.summary__item span { font-size: var(--fs-sm); color: var(--color-ink); }

.practice__layout { display: grid; grid-template-columns: 280px 1fr; gap: var(--sp-6); align-items: start; }
.practice__sidebar { max-height: calc(100vh - var(--header-h) - var(--sp-8)); overflow-y: auto; padding-right: var(--sp-2); position: sticky; top: calc(var(--header-h) + var(--sp-4)); }
.group + .group { margin-top: var(--sp-5); }
.practice__sidebar h3 { font-size: var(--fs-sm); margin-bottom: var(--sp-2); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.06em; }
.picker { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-2); }
.picker__item { position: relative; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: var(--sp-2); border: 2px solid var(--color-border); border-radius: var(--r-md); background: var(--color-surface); transition: transform var(--dur-fast) var(--ease-out), background var(--dur-fast); }
.picker__item:hover { transform: translateY(-2px); background: var(--color-primary-soft); }
.picker__item--active { border-color: var(--color-ink); background: var(--c-accent-100); }
.picker__glyph { font-family: "Noto Sans Balinese", sans-serif; font-size: 1.5rem; color: var(--color-primary); line-height: 1.3; }
.picker__name { font-size: 0.6875rem; color: var(--color-text-muted); text-align: center; line-height: 1.2; }
.picker__score { position: absolute; top: -6px; right: -6px; min-width: 24px; padding: 0 4px; border-radius: var(--r-full); background: var(--c-success-600); color: #fff; font-size: 0.6875rem; font-weight: var(--fw-bold); line-height: 20px; border: 2px solid var(--color-ink); }

.canvas-card { padding: var(--sp-6); }
.canvas-card__head { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--sp-3); margin-bottom: var(--sp-4); }
.guide-info { display: flex; align-items: center; gap: var(--sp-3); }
.guide-glyph { font-family: "Noto Sans Balinese", sans-serif; font-size: 2.5rem; color: var(--color-ink); background: var(--c-accent-100); border: 3px solid var(--color-ink); padding: 0.25rem 1rem; border-radius: var(--r-md); }
.guide-title { margin: 0; font-size: var(--fs-lg); }
.guide-pron { margin: 0; font-family: var(--font-mono); color: var(--color-secondary); font-size: var(--fs-sm); }
.guide-best { margin: 0; font-size: var(--fs-xs); color: var(--color-text-muted); }
.toggle { display: flex; align-items: center; gap: var(--sp-2); font-size: var(--fs-sm); color: var(--color-text-muted); cursor: pointer; }
.toggle input { width: 16px; height: 16px; accent-color: var(--color-primary); }

.canvas-wrap { position: relative; background: #fff; border: 3px dashed var(--color-ink); border-radius: var(--r-lg); overflow: hidden; aspect-ratio: 16 / 10; }
.canvas-guide {
  position: absolute; inset: 0;
  display: grid; place-items: center;
  font-family: "Noto Sans Balinese", sans-serif;
  font-size: clamp(8rem, 28vw, 16rem);
  color: var(--c-primary-200);
  opacity: 0.7;
  pointer-events: none; user-select: none;
}
.canvas { position: absolute; inset: 0; width: 100%; height: 100%; touch-action: none; cursor: crosshair; }

.tools { display: flex; flex-wrap: wrap; gap: var(--sp-5); align-items: center; margin-top: var(--sp-5); padding-top: var(--sp-5); border-top: 2px dashed var(--color-border); }
.tools__group { display: flex; align-items: center; gap: var(--sp-2); }
.tools__label { font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--color-text-muted); }
.swatches { display: flex; gap: var(--sp-2); }
.swatch { width: 28px; height: 28px; border-radius: 50%; border: 3px solid var(--color-ink); transition: transform var(--dur-fast) var(--ease-out); }
.swatch:hover { transform: scale(1.1); }
.swatch--active { transform: scale(1.15); box-shadow: 0 0 0 3px #fff inset; }
.range { accent-color: var(--color-primary); width: 100px; }
.tools__value { font-size: var(--fs-sm); color: var(--color-text-soft); font-family: var(--font-mono); }
.tools__actions { margin-left: auto; display: flex; gap: var(--sp-2); flex-wrap: wrap; }

.score { display: flex; align-items: center; gap: var(--sp-4); margin-top: var(--sp-5); padding: var(--sp-4) var(--sp-5); border: 3px solid var(--color-ink); border-radius: var(--r-lg); background: var(--c-neutral-0); box-shadow: 4px 4px 0 var(--color-ink); animation: pop var(--dur-slow) var(--ease-out); }
.score--great { background: var(--c-success-100); }
.score--good { background: var(--c-accent-100); }
.score--retry { background: var(--c-secondary-100); }
.score__value { font-family: var(--font-display); font-size: var(--fs-4xl); font-weight: var(--fw-bold); color: var(--color-ink); line-height: 1; }
.score__value span { font-size: var(--fs-base); color: var(--color-text-muted); margin-left: 2px; }
.score__msg { margin: 0; font-weight: var(--fw-bold); color: var(--color-ink); }
.score__detail { margin: 0; font-size: var(--fs-sm); color: var(--color-text-muted); }
.score__text p { margin: 0; }
@keyframes pop { from { transform: scale(0.96); opacity: 0; } to { transform: scale(1); opacity: 1; } }

@media (max-width: 860px) {
  .practice__layout { grid-template-columns: 1fr; }
  .practice__sidebar { position: static; max-height: none; overflow: visible; }
  .picker { grid-template-columns: repeat(6, 1fr); }
  .tools__actions { margin-left: 0; width: 100%; justify-content: flex-end; }
}
@media (max-width: 560px) { .picker { grid-template-columns: repeat(4, 1fr); } }
</style>
