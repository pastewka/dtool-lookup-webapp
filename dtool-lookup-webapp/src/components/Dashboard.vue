<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <p>Number of datasets: {{ num_datasets }}</p>
      <p>Users: {{ users }}</p>
      <p>User stats: {{ user_stats }}</p>
      <p>Base URIs: {{ base_uris }}</p>
    </div>
  </div>
</template>

<script>
const AuthStr = "Bearer ".concat(
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYjI0Y2QxZC1iY2I2LTRlMjYtYTBkMy04MDJiODMyNDcyZTAiLCJmcmVzaCI6ZmFsc2UsImlhdCI6MTU1NzQzNTUzOSwidHlwZSI6ImFjY2VzcyIsIm5iZiI6MTU1NzQzNTUzOSwiaWRlbnRpdHkiOiJvbHNzb250In0.gs6D0l_cTBwh-uuFfGCuBpuy61Svy66sKnbSvtCNxmaOSvGHMAPjQSCFPBjGUEcvbTO_SKbS7QiQRRXQL1NzS2ocz9lfONbmGfz_J1hlViSFypzkUxPttgJwTHwJPkSsx6YzwlFpJObDNyaLQXK76vt2pZircuukPOYBEp-htmb77JPt8Cf_93I9zRznwTDgykb4BR0mJTHIPKxl6ATG58pNM5zg3isnfC40tmkicztaKLxvktYnIh7lt-vO71KmWXfuRXlrxDF2hwMnRrsv9LswwenxgJWwxEkYiZIagGAM7LRfel_uwYPnOGXQQ7y_-8rqkZf7Gmlq5j7B4-GCjg"
);
export default {
  name: "Dashboard",
  props: {
    lookup_url: String
  },
  data: function() {
    return {
      datasets: null,
      loading: true,
      errored: false,
      loaded: false
    };
  },
  computed: {
    source: function() {
      return this.lookup_url + "/dataset/list";
    },
    num_datasets: function() {
      return this.datasets.length;
    },
    users: function() {
      return Array.from(
        new Set(this.datasets.map(ds => ds["creator_username"]))
      );
    },
    user_stats: function() {
      var stats = {};
      var i = 0;
      for (i = 0; i < this.users.length; i++) {
        stats[this.users[i]] = 0;
      }
      for (i = 0; i < this.datasets.length; i++) {
        stats[this.datasets[i]["creator_username"]] += 1;
      }
      return stats;
    },
    base_uris: function() {
      return Array.from(new Set(this.datasets.map(ds => ds["base_uri"])));
    }
  },
  mounted() {
    this.$http
      .get(this.source, { headers: { Authorization: AuthStr } })
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
