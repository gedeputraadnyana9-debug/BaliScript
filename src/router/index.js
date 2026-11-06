import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    meta: { title: "Beranda" },
  },
  {
    path: "/aksara",
    name: "aksara",
    component: () => import("@/views/AksaraView.vue"),
    meta: { title: "Belajar Aksara" },
  },
  {
    path: "/latihan",
    name: "practice",
    component: () => import("@/views/PracticeView.vue"),
    meta: { title: "Latihan Menulis" },
  },
  {
    path: "/cerita",
    name: "stories",
    component: () => import("@/views/StoriesView.vue"),
    meta: { title: "Cerita Rakyat Bali" },
  },
  {
    path: "/cerita/:slug",
    name: "story-detail",
    component: () => import("@/views/DetailView.vue"),
    props: true,
    meta: { title: "Detail Cerita" },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
    meta: { title: "Tentang" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/NotFoundView.vue"),
    meta: { title: "Tidak Ditemukan" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
