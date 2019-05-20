<template>
  <div id="app">
    <Dashboard :lookup_url="lookup_url" />
    <Search :lookup_url="lookup_url" />
  </div>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";
import Search from "./components/Search.vue";

export default {
  name: "app",
  data: function() {
    return {
      lookup_url: "http://dtool-lookup-server-dev.ciscloud"
    };
  },
  components: {
    Dashboard,
    Search
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
