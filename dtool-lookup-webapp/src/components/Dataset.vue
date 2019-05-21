<template>
  <div class="dataset">
    <h2>Dataset</h2>
    <input type="text" v-model="dataset_uri" v-on:keyup.enter="search" />
    <section v-if="errored">
      <p>
        Aplogies, we're not able to retrieve this informaiton at the moment,
        please try again later.
      </p>
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-if="datasets.length > 0">
          <table>
            <tr>
              <th>Name</th>
              <td>{{ datasets[0].name }}</td>
            </tr>
            <tr>
              <th>URI</th>
              <td>{{ datasets[0].uri }}</td>
            </tr>
            <tr>
              <th>Creator</th>
              <td>{{ datasets[0].creator_username }}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{{ moment(datasets[0].created_at).format("YYYY-MM-DD") }}</td>
            </tr>
            <tr>
              <th colspan="2">README</th>
            </tr>
            <tr>
              <td colspan="2">
                <pre>{{ yaml.stringify(datasets[0].readme) }}</pre>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
var moment = require("moment");
var yaml = require("json2yaml");

export default {
  name: "Dataset",
  props: {
    lookup_url: String,
    auth_str: String
  },
  data: function() {
    return {
      moment: moment,
      yaml: yaml,
      datasets: null,
      loading: true,
      errored: false,
      dataset_uri: ""
    };
  },
  computed: {
    source: function() {
      return this.lookup_url + "/dataset/search";
    },
    num_datasets: function() {
      return this.datasets.length;
    }
  },
  methods: {
    get_query: function() {
      return { uri: this.dataset_uri };
    },
    search: function() {
      this.$http
        .post(this.source, this.get_query(), {
          headers: {
            Authorization: this.auth_str,
            "Content-Type": "application/json"
          }
        })
        .then(response => (this.datasets = response.data))
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<style></style>
