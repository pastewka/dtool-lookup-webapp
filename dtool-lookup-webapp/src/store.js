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
    current_dataset_annotations: null
  },
  mutations: {
    update_free_text(state, free_text) {
      state.free_text = free_text;
    },
    update_creator_usernames(state, creator_usernames) {
      console.log("Store: update creator usernames to: " + creator_usernames);
      state.creator_usernames = creator_usernames;
    },
    update_base_uris(state, base_uris) {
      console.log("Store: update base URIs to: " + base_uris);
      state.base_uris = base_uris;
    },
    update_tags(state, tags) {
      console.log("Store: update tags to: " + tags);
      state.tags = tags;
    },
    update_current_dataset_index(state, index) {
      console.log("Store: update current dataset index");
      state.current_dataset_index = index;
    },
    update_current_dataset(state, dataset) {
      console.log("Store: update current dataset");
      state.current_dataset = dataset;
    },
    update_current_dataset_manifest(state, manifest) {
      console.log("Store: update current dataset manifest");
      state.current_dataset_manifest = manifest;
    },
    update_current_dataset_readme(state, readme) {
      console.log("Store: update current dataset readme");
      state.current_dataset_readme = readme;
    },
    update_current_dataset_annotations(state, annotations) {
      console.log("Store: update current dataset annotations");
      state.current_dataset_annotations = annotations;
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
