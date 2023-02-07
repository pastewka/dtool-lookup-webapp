<template>
  <div>
    <h3>Readme</h3>

    {{ "Version : " + this.currverison }}

    <template v-if="currverison < '0.18.0'">
      <pre>{{ yaml.stringify(readme) }}</pre>
    </template>
    <template v-else>
      <pre>{{ readme }}</pre>
    </template>
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
      currverison: this.getinfo["version"],
    };
  },
  computed: {
    readme: function () {
      return this.$store.state.current_dataset_readme;
    },
  },
};
</script>

<style></style>
