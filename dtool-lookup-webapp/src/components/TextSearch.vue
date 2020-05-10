<template>
  <form class="form-inline" @submit.prevent>
    <input
      class="form-control"
      type="text"
      v-model="textQuery"
      v-on:keyup.enter.prevent="startSearch"
    />
  </form>
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
      this.$emit("start-search");
    }
  }
};
</script>

<style></style>
