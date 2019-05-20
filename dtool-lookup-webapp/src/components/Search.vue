<template>
  <div class="search">
    <h2>Search</h2>
    <section v-if="errored">
      <p>
        Aplogies, we're not able to retrieve this informaiton at the moment,
        please try again later.
      </p>
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Creator</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dataset in datasets" v-bind:key="dataset.uri">
              <td>{{ dataset.name }}</td>
              <td>{{ dataset.creator_username }}</td>
              <td>
                {{ moment(dataset.created_at).format("YYYY-MM-DD") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
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
      errored: false
    };
  },
  computed: {
    source: function() {
      return this.lookup_url + "/dataset/search";
    }
  },
  mounted() {
    this.$http
      .post(
        this.source,
        {},
        {
          headers: {
            Authorization: this.auth_str,
            "Content-Type": "application/json"
          }
        }
      )
      .then(response => (this.datasets = response.data))
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>

<style></style>
