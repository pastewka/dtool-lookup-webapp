import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    free_text: null,
    creator_username: null
  },
  mutations: {
    update_free_text(state, free_text) {
      state.free_text = free_text;
    },
    update_creator_username(state, creator_username) {
      state.creator_username = creator_username;
    }
  },
  actions: {}
});
