<template>
  <div class="search">
    <h2>Search</h2>
    <input type="text" v-model="query_str" v-on:keyup.enter="search" />
    <section v-if="errored">
      <p>
        Aplogies, we're not able to retrieve this informaiton at the moment,
        please try again later.
      </p>
    </section>
    <section v-else>
      <div v-if="loading"></div>
      <div v-else>
        <div class="pure-g">
          <div class="pure-u-1-2">
            <table class="pure-table-striped">
              <caption>
                {{
                  num_datasets
                }}
                hits for "{{
                  query_str
                }}"
              </caption>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Creator</th>
                  <th>Created at</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(dataset, index) in datasets"
                  v-bind:key="dataset.uri"
                  @mouseover="updateCurrentDatasetIndex(index)"
                >
                  <td>{{ dataset.name }}</td>
                  <td>{{ dataset.creator_username }}</td>
                  <td>
                    {{ moment(dataset.created_at).format("YYYY-MM-DD") }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pure-u-1-2">
            <DatasetInfo :dataset="current_dataset" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import DatasetInfo from "./DatasetInfo.vue";

var moment = require("moment");

export default {
  name: "Search",
  props: {
    lookup_url: String,
    auth_str: String
  },
  data: function() {
    return {
      moment: moment,
      datasets: null,
      loading: true,
      errored: false,
      query_str: "",
      current_dataset_index: 0
    };
  },
  components: {
    DatasetInfo
  },
  computed: {
    source: function() {
      return this.lookup_url + "/dataset/search";
    },
    num_datasets: function() {
      return this.datasets.length;
    },
    current_dataset: function() {
      return this.datasets[this.current_dataset_index];
    }
  },
  methods: {
    get_query: function() {
      return { $text: { $search: this.query_str } };
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
    },
    updateCurrentDatasetIndex(index) {
      this.current_dataset_index = index;
    }
  }
};
</script>

<style></style>
