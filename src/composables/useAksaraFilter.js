import { computed, ref } from "vue";
import { useStore } from "vuex";

/**
 * Filtered, searchable view of aksara data driven by a reactive query.
 * Search matches title only (not description).
 */
export function useAksaraFilter() {
  const store = useStore();

  const query = ref("");

  const filtered = computed(() => {
    const q = query.value.trim().toLowerCase();
    let list = store.getters["aksara/all"];
    if (q) {
      list = list.filter((a) => a.title.toLowerCase().includes(q));
    }
    return list;
  });

  const count = computed(() => filtered.value.length);

  return { query, filtered, count };
}
