import { stories } from "@/data/stories.js";

const state = () => ({ items: stories, loaded: true });

const getters = {
  all: (s) => s.items,
  byId: (s) => (id) => s.items.find((st) => st.id === id),
  bySlug: (s) => (slug) => s.items.find((st) => st.slug === slug),
  byLevel: (s) => (level) =>
    level === "ALL"
      ? s.items
      : s.items.filter((st) => st.level === level || st.level === "ALL"),
  levels: (s) => {
    const set = new Set(s.items.map((st) => st.level));
    return ["ALL", ...Array.from(set).filter((l) => l !== "ALL")];
  },
  categories: (s) => Array.from(new Set(s.items.map((st) => st.category))),
};

const mutations = {};
const actions = {};

export default { namespaced: true, state, getters, mutations, actions };
