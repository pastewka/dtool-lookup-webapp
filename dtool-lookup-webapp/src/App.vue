<template>
  <div id="app">
    <nav class="navbar navbar-default navbar-dark bg-dark sticky-top">
      <span class="navbar-brand mb-0 h1">dtool</span>
      <TextSearch @start-search="searchDatasets" />
    </nav>

    <div class="">
      <div class="row row-height">
        <div class="col-md-2 left">
          <SummaryInfo :auth_str="auth_str" :lookup_url="lookup_url" />
        </div>
        <div class="col-md-4 left">
          <DatasetTable
            :datasetHits="datasetHits"
            @update-selected-dataset="updateCurrentDatasetIndex"
          />
        </div>
        <div class="col-md-6 right">
          <DatasetInfo
            :datasetHits="datasetHits"
            :currentDatasetIndex="currentDatasetIndex"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SummaryInfo from "./components/SummaryInfo.vue";
import TextSearch from "./components/TextSearch.vue";
import DatasetTable from "./components/DatasetTable.vue";
import DatasetInfo from "./components/DatasetInfo.vue";

export default {
  name: "app",
  data: function() {
    return {
      currentDatasetIndex: 0,
      datasetHits: [],
      searchLoading: true,
      searchErrored: false,
      lookup_url: "http://dtool-lookup-server-dev.ciscloud",
      auth_str: "Bearer ".concat(
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYjI0Y2QxZC1iY2I2LTRlMjYtYTBkMy04MDJiODMyNDcyZTAiLCJmcmVzaCI6ZmFsc2UsImlhdCI6MTU1NzQzNTUzOSwidHlwZSI6ImFjY2VzcyIsIm5iZiI6MTU1NzQzNTUzOSwiaWRlbnRpdHkiOiJvbHNzb250In0.gs6D0l_cTBwh-uuFfGCuBpuy61Svy66sKnbSvtCNxmaOSvGHMAPjQSCFPBjGUEcvbTO_SKbS7QiQRRXQL1NzS2ocz9lfONbmGfz_J1hlViSFypzkUxPttgJwTHwJPkSsx6YzwlFpJObDNyaLQXK76vt2pZircuukPOYBEp-htmb77JPt8Cf_93I9zRznwTDgykb4BR0mJTHIPKxl6ATG58pNM5zg3isnfC40tmkicztaKLxvktYnIh7lt-vO71KmWXfuRXlrxDF2hwMnRrsv9LswwenxgJWwxEkYiZIagGAM7LRfel_uwYPnOGXQQ7y_-8rqkZf7Gmlq5j7B4-GCjg"
      )
    };
  },
  computed: {
    searchURL: function() {
      return this.lookup_url + "/dataset/search";
    }
  },
  methods: {
    updateCurrentDatasetIndex: function(index) {
      this.currentDatasetIndex = index;
    },
    getQuery: function(textQuery) {
      if (textQuery === "") {
        return {};
      } else {
        return { $text: { $search: textQuery } };
      }
    },
    searchDatasets: function(textQuery) {
      console.log("Running search");
      console.log(textQuery);
      this.searchLoading = true;
      this.searchErrored = false;
      this.$http
        .post(this.searchURL, this.getQuery(textQuery), {
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
