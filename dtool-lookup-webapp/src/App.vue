<template>
  <div id="app" class="pure-g">
    <Dashboard
      :lookup_url="lookup_url"
      :auth_str="auth_str"
      class="pure-u-1-5"
    />
    <Search :lookup_url="lookup_url" :auth_str="auth_str" class="pure-u-4-5" />
  </div>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";
import Search from "./components/Search.vue";

export default {
  name: "app",
  data: function() {
    return {
      lookup_url: "http://dtool-lookup-server-dev.ciscloud",
      auth_str: "Bearer ".concat(
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYjI0Y2QxZC1iY2I2LTRlMjYtYTBkMy04MDJiODMyNDcyZTAiLCJmcmVzaCI6ZmFsc2UsImlhdCI6MTU1NzQzNTUzOSwidHlwZSI6ImFjY2VzcyIsIm5iZiI6MTU1NzQzNTUzOSwiaWRlbnRpdHkiOiJvbHNzb250In0.gs6D0l_cTBwh-uuFfGCuBpuy61Svy66sKnbSvtCNxmaOSvGHMAPjQSCFPBjGUEcvbTO_SKbS7QiQRRXQL1NzS2ocz9lfONbmGfz_J1hlViSFypzkUxPttgJwTHwJPkSsx6YzwlFpJObDNyaLQXK76vt2pZircuukPOYBEp-htmb77JPt8Cf_93I9zRznwTDgykb4BR0mJTHIPKxl6ATG58pNM5zg3isnfC40tmkicztaKLxvktYnIh7lt-vO71KmWXfuRXlrxDF2hwMnRrsv9LswwenxgJWwxEkYiZIagGAM7LRfel_uwYPnOGXQQ7y_-8rqkZf7Gmlq5j7B4-GCjg"
      )
    };
  },
  components: {
    Dashboard,
    Search
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

html,
button,
input,
select,
textarea,
.pure-g [class*="pure-u"] {
  /* Set your content font stack here: */
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 10pt;
}
</style>
