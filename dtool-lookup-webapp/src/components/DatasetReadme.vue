<template>
  <div>
    <h3>Readme</h3>
 
    <pre v-if="currversion < this.$store.state.current_required_version">{{ getFormattedYaml() }}</pre>
    <pre v-else>{{ getReadmeContent() }}</pre>
  </div>
</template>

<script>
var yaml = require("json2yaml");
export default {
  name: "DatasetReadme",
  props: {
    getinfo: {},
  },
  data: function () {
    return {
      yaml: yaml,
      currversion: this.getinfo["dtool_lookup_server"],
    };
  },
  computed: {
    readme: function () {
      return this.$store.state.current_dataset_readme;
    },
  },
  methods: {
    getFormattedYaml() {
      return this.yaml.stringify(this.$store.state.current_dataset_readme);
    },
    getReadmeContent() {
      return this.$store.state.current_dataset_readme;
    },
  },
};
</script>

<style></style>
