<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <h3>{{ dataset.name }}</h3>
        <small>
          Created by <em>{{ dataset.creator_username }}</em> at
          <em>{{ moment(dataset.created_at).format("YYYY-MM-DD") }}</em>
        </small>
      </div>
      <small>{{ dataset.uri }}</small>
    </div>
    <div class="card-body">
      <pre>{{ yaml.stringify(dataset.readme) }}</pre>
    </div>
  </div>
</template>

<script>
var moment = require("moment");
var yaml = require("json2yaml");
export default {
  name: "DatasetInfo",
  props: {
    datasetHits: Array,
    currentDatasetIndex: Number
  },
  data: function() {
    return {
      moment: moment,
      yaml: yaml
    };
  },
  computed: {
    dataset: function() {
      return this.datasetHits[this.currentDatasetIndex];
    }
  }
};
</script>

<style></style>
