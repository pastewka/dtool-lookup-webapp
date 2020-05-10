<template>
  <div id="app">
    <nav class="navbar navbar-default navbar-dark bg-dark sticky-top">
      <span class="navbar-brand mb-0 h1">dtool</span>
      <TextSearch @start-search="searchDatasets" />
    </nav>

    <div v-if="token" class="">
      <div class="row row-height">
        <div class="col-md-2 left pr-0">
          <SummaryInfo
            :auth_str="auth_str"
            :lookup_url="lookup_url"
            @start-search="searchDatasets"
          />
        </div>
        <div class="col-md-4 left p-0">
          <div v-if="searchLoading" class="spinner-border text-primary">
            <span class="sr-only">Loading...</span>
          </div>
          <div v-else>
            <div v-if="searchErrored">
              <p>Unable to load datasets please try again.</p>
              <a
                href=""
                class="btn btn-secondary"
                @click.prevent="searchDatasets()"
                >Try again</a
              >
            </div>
            <div v-else>
              <DatasetTable
                :datasetHits="datasetHits"
                @update-dataset="updateDataset"
              />
            </div>
          </div>
        </div>
        <div v-if="datasetLoaded" class="col-md-6 right p-0">
          <div class="card">
            <div class="card-header">
              <div v-if="manifestLoading" class="text-primary">
                <span class="sr-only">Loading...</span>
              </div>
              <div v-else>
                <div v-if="manifestErrored">
                  <p>Unable to load manifest please try again.</p>
                  <a
                    href=""
                    class="btn btn-secondary"
                    @click.prevent="updateManifest()"
                    >Try again</a
                  >
                </div>
                <div v-else>
                  <DatasetSummary />
                </div>
              </div>
            </div>

            <div class="card-body">
              <div>
                <div v-if="readmeLoading" class="text-primary">
                  <span class="sr-only">Loading...</span>
                </div>
                <div v-else>
                  <div v-if="readmeErrored">
                    <p>Unable to load readme please try again.</p>
                    <a
                      href=""
                      class="btn btn-secondary"
                      @click.prevent="updateReadme()"
                      >Try again</a
                    >
                  </div>
                  <div v-else>
                    <Readme />
                  </div>
                </div>

                <div v-if="annotationsLoading" class="text-primary">
                  <span class="sr-only">Loading...</span>
                </div>
                <div v-else>
                  <div v-if="annotationsErrored">
                    <p>Unable to load annotations please try again.</p>
                    <a
                      href=""
                      class="btn btn-secondary"
                      @click.prevent="updateAnnotations()"
                      >Try again</a
                    >
                  </div>
                  <div v-else>
                    <Annotations />
                  </div>
                </div>
              </div>
            </div>

            <div class="card-footer">
              <div v-if="manifestLoading" class="text-primary">
                <span class="sr-only">Loading...</span>
              </div>
              <div v-else>
                <div v-if="manifestErrored">
                  <p>Unable to load manifest please try again.</p>
                  <a
                    href=""
                    class="btn btn-secondary"
                    @click.prevent="updateManifest()"
                    >Try again</a
                  >
                </div>
                <div v-else>
                  <Manifest />
                </div>
              </div>
            </div>
          </div>
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
import Manifest from "./components/Manifest.vue";
import Readme from "./components/Readme.vue";
import Annotations from "./components/Annotations.vue";
import DatasetSummary from "./components/DatasetSummary.vue";

export default {
  name: "app",
  data: function() {
    return {
      datasetHits: [],
      searchLoading: true,
      searchErrored: false,
      manifestLoading: false,
      manifestErrored: false,
      readmeLoading: false,
      readmeErrored: false,
      annotationsLoading: false,
      annotationsErrored: false,
      lookup_url: "https://dtool-lookup-server.informatics.jic.ac.uk",
      token: null
    };
  },
  computed: {
    datasetLoaded: function() {
      return this.$store.state.current_dataset;
    },
    current_dataset: function() {
      return this.datasetHits[this.$store.state.current_dataset_index];
    },
    searchURL: function() {
      return this.lookup_url + "/dataset/search";
    },
    manifestURL: function() {
      return this.lookup_url + "/dataset/manifest";
    },
    readmeURL: function() {
      return this.lookup_url + "/dataset/readme";
    },
    annotationsURL: function() {
      return this.lookup_url + "/dataset/annotations";
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
      if (this.$store.state.tags) {
        query.tags = this.$store.state.tags;
      }
      return query;
    },
    uriQuery: function() {
      if (this.datasetHits.length > 0) {
        return {
          uri: this.datasetHits[this.$store.state.current_dataset_index].uri
        };
      } else {
        return { uri: null };
      }
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
      this.$store.commit("update_current_dataset", null);
      this.$store.commit("update_current_dataset_manifest", null);
      this.$store.commit("update_current_dataset_readme", null);
      this.updateDataset();
      this.searchLoading = true;
      this.searchErrored = false;
      this.$http
        .post(this.searchURL, this.searchQuery, {
          headers: {
            Authorization: this.auth_str,
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.datasetHits = response.data;
          this.$store.commit("update_current_dataset", this.current_dataset);
          this.updateDataset();
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);
          this.searchErrored = true;
        })
        .finally(() => {
          this.searchLoading = false;
        });
    },
    updateDataset: function() {
      this.updateManifest();
      this.updateReadme();
      this.updateAnnotations();
    },
    updateManifest: function() {
      console.log("Loading manifest");
      console.log(this.uriQuery);
      this.manifestLoading = true;
      this.manifestErrored = false;
      this.$http
        .post(this.manifestURL, this.uriQuery, {
          headers: {
            Authorization: this.auth_str,
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.$store.commit("update_current_dataset_manifest", response.data);
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);
          this.manifestErrored = true;
        })
        .finally(() => (this.manifestLoading = false));
    },
    updateReadme: function() {
      console.log("Loading readme");
      console.log(this.uriQuery);
      this.readmeLoading = true;
      this.readmeErrored = false;
      this.$http
        .post(this.readmeURL, this.uriQuery, {
          headers: {
            Authorization: this.auth_str,
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.$store.commit("update_current_dataset_readme", response.data);
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);
          this.readmeErrored = true;
        })
        .finally(() => (this.readmeLoading = false));
    },
    updateAnnotations: function() {
      console.log("Loading annotations");
      console.log(this.uriQuery);
      this.annotationsLoading = true;
      this.annotationsErrored = false;
      this.$http
        .post(this.annotationsURL, this.uriQuery, {
          headers: {
            Authorization: this.auth_str,
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.$store.commit(
            "update_current_dataset_annotations",
            response.data
          );
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);
          this.annotationsErrored = true;
        })
        .finally(() => (this.annotationsLoading = false));
    }
  },
  components: {
    SignIn,
    SummaryInfo,
    TextSearch,
    DatasetTable,
    Manifest,
    Readme,
    Annotations,
    DatasetSummary
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
