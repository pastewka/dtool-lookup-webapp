<template>
  <div class="text-search">
    <input type="text" v-model="textQuery" v-on:keyup.enter="startSearch" />
  </div>
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
      this.$emit("start-search", this.textQuery);
    }
  }
};
</script>

<style></style>
