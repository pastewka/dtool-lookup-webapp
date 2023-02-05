<template>
  <div>
    <h3>Readme</h3>

    {{"Version : " + this.currverison }}    
    <pre>{{ yaml.stringify(readme) }}</pre>

  </div>
</template>

<script>
var yaml = require("json2yaml");
export default {
  name: "DatasetReadme",
  props: {
    getinfo:{}
  },
  data: function() {
    return {
      yaml: yaml,
      currverison:this.getinfo["version"] ,
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
