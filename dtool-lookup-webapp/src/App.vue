<template>
  <div id="app">
    <nav class="navbar navbar-default navbar-dark bg-dark sticky-top">
      <span class="navbar-brand mb-0 h1">dtool</span>
      <TextSearch @start-search="searchDatasets" />
    </nav>

    <div v-if="token" class="">
      <div class="row row-height">
        <div class="col-md-2 left">
          <SummaryInfo
            :auth_str="auth_str"
            :lookup_url="lookup_url"
            @start-search="searchDatasets"
          />
        </div>
        <div class="col-md-4 left">
          <DatasetTable :datasetHits="datasetHits" />
        </div>
        <div class="col-md-6 right">
          <DatasetInfo :datasetHits="datasetHits" />
        </div>
      </div>
    </div>
    <div v-else>
      <SignIn @sign-in="setTokenAndSearch" />
    </div>
  </div>
</template>

<script>
import SignIn from "./components/SignIn.vue";
import SummaryInfo from "./components/SummaryInfo.vue";
import TextSearch from "./components/TextSearch.vue";
import DatasetTable from "./components/DatasetTable.vue";
import DatasetInfo from "./components/DatasetInfo.vue";

export default {
  name: "app",
  data: function() {
    return {
      datasetHits: [],
      searchLoading: true,
      searchErrored: false,
      lookup_url: "http://dtool-lookup-server-dev.ciscloud",
      token: null
    };
  },
  computed: {
    searchURL: function() {
      return this.lookup_url + "/dataset/search";
    },
    auth_str: function() {
      return "Bearer ".concat(this.token);
    },
    searchQuery: function() {
      var query = {};
      if (this.$store.state.free_text) {
        query.free_text = this.$store.state.free_text;
      }
      if (this.$store.state.creator_username) {
        query.creator_usernames = [this.$store.state.creator_username];
      }
      if (this.$store.state.base_uri) {
        query.base_uris = [this.$store.state.base_uri];
      }
      return query;
    }
  },
  methods: {
    setTokenAndSearch: function(token) {
      this.token = token;
      this.searchDatasets();
    },
    searchDatasets: function() {
      console.log("Running search");
      console.log(this.searchQuery);
      this.$store.commit("update_current_dataset_index", 0);
      this.searchLoading = true;
      this.searchErrored = false;
      this.$http
        .post(this.searchURL, this.searchQuery, {
          headers: {
            Authorization: this.auth_str,
            "Content-Type": "application/json"
          }
        })
        .then(response => (this.datasetHits = response.data))
        .catch(error => {
          console.log(error);
          this.searchErrored = true;
        })
        .finally(() => (this.searchLoading = false));
    }
  },
  components: {
    SignIn,
    SummaryInfo,
    TextSearch,
    DatasetTable,
    DatasetInfo
  }
};
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

/*Set the row height to the viewport*/
.row-height {
  height: 100vh;
}

/*Set up the columns with a 100% height, body color and overflow scroll*/

.left {
  height: 100%;
  overflow-y: scroll;
}

.right {
  height: 100%;
  overflow-y: scroll;
}
</style>
