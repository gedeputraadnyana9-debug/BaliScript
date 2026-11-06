import { aksara } from "@/data/aksara.js";

const state = () => ({ items: aksara, loaded: true, scores: {} });

const getters = {
  all: (s) => s.items,
  byId: (s) => (id) => s.items.find((a) => a.id === id),
  bySlug: (s) => (slug) => s.items.find((a) => a.slug === slug),
  byLevel: (s) => (level) =>
    level === "ALL" ? s.items : s.items.filter((a) => a.level === level || a.level === "ALL"),
  levels: (s) => {
    const set = new Set(s.items.map((a) => a.level));
    return ["ALL", ...Array.from(set).filter((l) => l !== "ALL")];
  },
  categories: (s) => Array.from(new Set(s.items.map((a) => a.category))),
  scoreOf: (s) => (id) => s.scores[id] || null,
  practicedCount: (s) => Object.keys(s.scores).length,
  averageScore: (s) => {
    const values = Object.values(s.scores).map((r) => r.best);
    if (!values.length) return 0;
    return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
  },
};

const mutations = {
  RECORD_SCORE(s, { id, score }) {
    const prev = s.scores[id] || { best: 0, attempts: 0, last: 0 };
    s.scores = {
      ...s.scores,
      [id]: {
        best: Math.max(prev.best, score),
        attempts: prev.attempts + 1,
        last: score,
      },
    };
  },
};

const actions = {
  recordScore({ commit }, payload) {
    commit("RECORD_SCORE", payload);
  },
};

export default { namespaced: true, state, getters, mutations, actions };
