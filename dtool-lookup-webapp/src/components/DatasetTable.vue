<template>
  <div>
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="(dataset, index) in datasetHits"
        v-bind:class="{ active: selected === index }"
        v-bind:key="dataset.uri"
        @click="updateSelectedDataset(index)"
      >
        <div class="d-flex  justify-content-between">
          <h6 class="mb-1">{{ dataset.name }}</h6>
          <small>{{ moment(dataset.created_at).format("YYYY-MM-DD") }}</small>
        </div>

        <div class="d-flex  justify-content-between">
          <small>{{ dataset.creator_username }}</small>
          <small>{{ dataset.uuid }}</small>
        </div>
      </li>
    </ul>
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
      moment: moment,
      selected: 0
    };
  },
  methods: {
    updateSelectedDataset: function(index) {
      this.selected = index;
      this.$emit("update-selected-dataset", index);
    }
  }
};
</script>

<style></style>
