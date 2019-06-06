import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    free_text: null,
    creator_username: null,
    base_uri: null,
    current_dataset_index: 0
  },
  mutations: {
    update_free_text(state, free_text) {
      state.free_text = free_text;
    },
    update_creator_username(state, creator_username) {
      state.creator_username = creator_username;
    },
    update_base_uri(state, base_uri) {
      state.base_uri = base_uri;
    },
    update_current_dataset_index(state, index) {
      state.current_dataset_index = index;
    },
    clear_all(state) {
      state.free_text = null;
      state.creator_username = null;
      state.base_uri = null;
    }
  },
  actions: {}
});
