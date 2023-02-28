<template>
  <div class="card">
    <div class="card-body p-0">
      <div class="list-group">
        <li
          href=""
          class="list-group-item list-group-item-action"
          @click="clearFilters()"
        >
          <div class="d-flex justify-content-between">
            <small> All </small>

            <small>
              <span class="badge badge-pill badge-primary">{{
                summary_info["number_of_datasets"]
              }}</span>
            </small>
          </div>
        </li>

        <li href="" class="list-group-item">
          <div class="d-flex justify-content-between">
            <small> Filtered </small>

            <small>
              <span class="badge badge-pill badge-secondary">{{
                this.$store.state.num_filtered
              }}</span>
            </small>
          </div>
        </li>

        <li href="" class="list-group-item">
          <div>
            <small> Contents per Page </small>

            <div class="mt-3">
              <b-button-group class="w-100">
                <b-button-group class="w-100">
                  <b-button @click="updatePerPage(5)" variant="outline-info"
                    >5</b-button
                  >
                  <b-button @click="updatePerPage(20)" variant="outline-info"
                    >20</b-button
                  >
                  <b-button @click="updatePerPage(50)" variant="outline-info"
                    >50</b-button
                  >
                  <b-button @click="updatePerPage(100)" variant="outline-info"
                    >100</b-button
                  >
                </b-button-group>
              </b-button-group>
            </div>
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
    summary_info: Object,
  },
  data: function () {
    return {
      selectedTags: [],
    };
  },
  methods: {
    clearFilters: function () {
      this.$store.commit("clear_all");
      this.$emit("start-search");
    },
    updatePerPage: function (perpage) {
      this.$store.commit("update_current_Per_Page", perpage);
      this.$emit("start-search");
    },
  },
};
</script>

<style></style>
