<template>
  <div>
    <h1>Manifest View is here</h1>
    <p>{{ manifest }}</p>
  </div>
</template>

<script>
export default {
  name: "Manifest",
  computed: {
    manifest: function() {
      return this.$store.state.current_dataset_manifest;
    }
  }
};
</script>

<style></style>
