import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    free_text: null
  },
  mutations: {
    update_free_text(state, free_text) {
      state.free_text = free_text;
    }
  },
  actions: {}
});
