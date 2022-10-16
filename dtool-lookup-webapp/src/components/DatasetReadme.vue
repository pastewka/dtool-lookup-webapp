<template>
  <div>
    <h3>Readme</h3>
    <pre>{{ readme }}</pre>
  </div>
</template>

<script>
export default {
  name: "DatasetReadme",
  computed: {
    readme: function() {
      return this.$store.state.current_dataset_readme;
    }
  }
};
</script>

<style></style>
