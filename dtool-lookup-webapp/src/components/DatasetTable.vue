<template>
  <div>
    <table class="table table-striped">
      <thead class="thead">
        <tr>
          <th>Name</th>
          <th>Creator</th>
          <th>Created at</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(dataset, index) in datasetHits"
          v-bind:key="dataset.uri"
          @click="updateSelectedDataset(index)"
        >
          <td>{{ dataset.name }}</td>
          <td>{{ dataset.creator_username }}</td>
          <td>{{ moment(dataset.created_at).format("YYYY-MM-DD") }}</td>
        </tr>
      </tbody>
    </table>
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
  methods: {
    updateSelectedDataset: function(index) {
      this.$emit("update-selected-dataset", index);
    }
  }
};
</script>

<style></style>
