<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Tags</h5>
    </div>
    <div class="card-body p-0">
      <div class="list-group">
        <li
          href=""
          class="list-group-item list-group-item-action"
          v-for="(tag, index) in summary_info['tags']"
          v-bind:key="index"
          @click="toggleSelect(tag)"
        >
          <div class="d-flex  justify-content-between">
            <small>
              <input
                type="checkbox"
                v-bind:id="tag + '-tag-checkbox'"
                v-model="selectedTags"
                v-bind:value="tag"
              />
              <label v-bind:for="tag + '-tag-checkbox'">{{ tag }}</label>
            </small>

            <small>
              <span class="badge badge-pill badge-secondary">{{
                summary_info["datasets_per_tag"][tag]
              }}</span>
            </small>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagFilter",
  props: {
    summary_info: Object
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
    },
    toggleSelect: function(tag) {
      if (this.selectedTags.includes(tag)) {
        console.log("Unset tag?");
        // Remove item from array.
        this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
        this.startSearch();
      } else {
        console.log("Set tag?");
        this.selectedTags.push(tag);
        this.startSearch();
      }
    }
  }
};
</script>

<style></style>
