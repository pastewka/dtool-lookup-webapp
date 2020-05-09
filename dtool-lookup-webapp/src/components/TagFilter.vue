<template>
  <div>
    <h3>Tags</h3>
    <template v-for="(tag, index) in tag_info">
      <input
        type="checkbox"
        v-bind:id="tag + '-tag-checkbox'"
        v-model="selectedTags"
        v-bind:value="tag"
        v-bind:key="index + '-checkbox'"
        @change="startSearch"
      />
      <label v-bind:for="tag + '-tag-checkbox'" v-bind:key="index + '-label'">{{
        tag
      }}</label>
      <br v-bind:key="index + '-br'" />
    </template>
  </div>
</template>

<script>
export default {
  name: "TagFilter",
  props: {
    tag_info: Array
  },
  data: function() {
    return {
      selectedTags: []
    };
  },
  methods: {
    startSearch: function() {
      this.$store.commit("update_tags", this.selectedTags);
      this.$emit("start-search");
    }
  }
};
</script>

<style></style>
