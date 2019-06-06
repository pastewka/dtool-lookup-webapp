<template>
  <input type="text" v-model="textQuery" v-on:keyup.enter="startSearch" />
</template>

<script>
export default {
  name: "TextSearch",
  data: function() {
    return {
      textQuery: ""
    };
  },
  methods: {
    startSearch: function() {
      this.$store.commit("update_free_text", this.textQuery);
      this.$emit("start-search", this.textQuery);
    }
  }
};
</script>

<style></style>
