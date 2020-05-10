<template>
  <div class="card">
    <div class="card-body p-0">
      <div class="list-group">
        <li
          href=""
          class="list-group-item list-group-item-action"
          @click="clearFilters()"
        >
          <div class="d-flex  justify-content-between">
            <small>
              All
            </small>

            <small>
              <span class="badge badge-pill badge-primary">{{
                summary_info["number_of_datasets"]
              }}</span>
            </small>
          </div>
        </li>

        <li href="" class="list-group-item">
          <div class="d-flex  justify-content-between">
            <small>
              Filtered
            </small>

            <small>
              <span class="badge badge-pill badge-secondary">{{
                this.$store.state.num_filtered
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
  name: "NumDatasets",
  props: {
    summary_info: Object
  },
  data: function() {
    return {
      selectedTags: []
    };
  },
  methods: {
    clearFilters: function() {
      this.$store.commit("clear_all");
      this.$emit("start-search");
    }
  }
};
</script>

<style></style>
