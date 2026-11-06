import { createStore } from "vuex";
import aksara from "./modules/aksara.js";
import stories from "./modules/stories.js";

export default createStore({
  modules: { aksara, stories },
});
