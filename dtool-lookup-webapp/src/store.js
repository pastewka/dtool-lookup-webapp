import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    free_text: null,
    creator_usernames: [],
    base_uris: [],
    tags: [],
    current_dataset_index: 0,
    current_dataset: null,
    current_dataset_manifest: null,
    current_dataset_readme: null,
    current_dataset_annotations: null,
    num_filtered: 0
  },
  mutations: {
    update_free_text(state, free_text) {
      state.free_text = free_text;
    },
    update_creator_usernames(state, creator_usernames) {
      state.creator_usernames = creator_usernames;
    },
    update_base_uris(state, base_uris) {
      state.base_uris = base_uris;
    },
    update_tags(state, tags) {
      state.tags = tags;
    },
    update_current_dataset_index(state, index) {
      state.current_dataset_index = index;
    },
    update_current_dataset(state, dataset) {
      state.current_dataset = dataset;
    },
    update_current_dataset_manifest(state, manifest) {
      state.current_dataset_manifest = manifest;
    },
    update_current_dataset_readme(state, readme) {
      state.current_dataset_readme = readme;
    },
    update_current_dataset_annotations(state, annotations) {
      state.current_dataset_annotations = annotations;
    },
    update_num_filtered(state, num_filtered) {
      state.num_filtered = num_filtered;
    },
    clear_all(state) {
      state.free_text = null;
      state.creator_usernames = [];
      state.tags = [];
      state.base_uris = [];
    }
  },
  actions: {}
});
