<template>
  <div class="card">
    <div class="card-body p-0">
      <div class="list-group">
        <a
          @click.prevent="clearFilters()"
          class="list-group-item list-group-item-action"
        >
          <div class="d-flex justify-content-between">
            <small> All </small>
            <small>
              <span class="badge badge-pill badge-primary dataset-count">{{
                summary_info.number_of_datasets
              }}</span>
            </small>
          </div>
        </a>

        <a class="list-group-item">
          <div class="d-flex justify-content-between">
            <small> Filtered </small>
            <small>
              <span class="badge badge-pill badge-secondary dataset-count">{{
                this.$store.state.num_filtered
              }}</span>
            </small>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NumDatasets",
  components: {},
  props: {
    summary_info: Object,
  },
  data() {
    return {};
  },
  methods: {
    clearFilters() {
      this.$store.commit("clear_all");
      this.$emit("start-search");
    },
  },
};
</script>

<style scoped>
.dataset-count {
  color: #000; /* Change text color to black */
}
</style>
