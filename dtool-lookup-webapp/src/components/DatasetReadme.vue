<template>
  <div>
    <h3>Readme</h3>
    <pre>{{ yaml.stringify(readme) }}</pre>
  </div>
</template>

<script>
var yaml = require("json2yaml");
export default {
  name: "DatasetReadme",
  data: function() {
    return {
      yaml: yaml
    };
  },
  computed: {
    readme: function() {
      return this.$store.state.current_dataset_readme;
    }
  }
};
</script>

<style></style>
