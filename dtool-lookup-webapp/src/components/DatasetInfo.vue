<template>
  <div class="datasetInfo">
    <h2>Dataset Info</h2>
    <table>
      <tr>
        <th>Name</th>
        <td>{{ dataset.name }}</td>
      </tr>
      <tr>
        <th>URI</th>
        <td>{{ dataset.uri }}</td>
      </tr>
      <tr>
        <th>Creator</th>
        <td>{{ dataset.creator_username }}</td>
      </tr>
      <tr>
        <th>Created at</th>
        <td>{{ moment(dataset.created_at).format("YYYY-MM-DD") }}</td>
      </tr>
      <tr>
        <th colspan="2">README</th>
      </tr>
      <tr>
        <td colspan="2">
          <pre>{{ yaml.stringify(dataset.readme) }}</pre>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
var moment = require("moment");
var yaml = require("json2yaml");
export default {
  name: "DatasetInfo",
  props: {
    dataset: Object
  },
  data: function() {
    return {
      moment: moment,
      yaml: yaml
    };
  }
};
</script>

<style></style>
