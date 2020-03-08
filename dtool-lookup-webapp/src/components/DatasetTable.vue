<template>
  <div>
    <div class="list-group">
      <a
        href=""
        class="list-group-item list-group-item-action"
        v-for="(dataset, index) in datasetHits"
        v-bind:class="{ active: selected === index }"
        v-bind:key="dataset.uri"
        @click.prevent="updateSelectedDataset(index)"
      >
        <div class="d-flex  justify-content-between">
          <h6 class="mb-1">{{ dataset.name }}</h6>
          <small>{{ moment(dataset.created_at).format("YYYY-MM-DD") }}</small>
        </div>

        <div class="d-flex  justify-content-between">
          <small>{{ dataset.creator_username }}</small>
          <small>{{ dataset.uuid }}</small>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
var moment = require("moment");
export default {
  name: "DatasetTable",
  props: {
    datasetHits: Array
  },
  data: function() {
    return {
      moment: moment
    };
  },
  computed: {
    selected: function() {
      return this.$store.state.current_dataset_index;
    }
  },
  methods: {
    updateSelectedDataset: function(index) {
      this.$store.commit("update_current_dataset_index", index);
      this.$store.commit("update_current_dataset", this.datasetHits[index]);
      this.$emit("update-manifest");
      this.$emit("update-readme");
    }
  }
};
</script>

<style></style>
