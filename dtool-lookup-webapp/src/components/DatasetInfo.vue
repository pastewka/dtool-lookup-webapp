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
      <h5>README</h5>
      <pre>{{ yaml.stringify(dataset.readme) }}</pre>
    </div>

    <div class="card-footer">
      <h5>Items</h5>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="item in dataset.manifest.items"
          v-bind:key="item"
        >
          {{ item.relpath }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
var moment = require("moment");
var yaml = require("json2yaml");
export default {
  name: "DatasetInfo",
  props: {
    datasetHits: Array
  },
  data: function() {
    return {
      moment: moment,
      yaml: yaml
    };
  },
  computed: {
    dataset: function() {
      return this.datasetHits[this.$store.state.current_dataset_index];
    }
  }
};
</script>

<style></style>
