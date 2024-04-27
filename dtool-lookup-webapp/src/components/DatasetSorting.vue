<template>
  <div class="d-flex justify-content-end align-items-center">
    <BFormSelect
      v-model="selectedSortOption"
      class="me-2"
      style="width: 200px"
      :options="formattedOptions"
    >
    </BFormSelect>
    <button class="btn btn-primary sort-button" @click="toggleSortDirection">
      <img :src="sortIcon" alt="Sort Icon" class="sort-icon" />
    </button>
  </div>
</template>

<script>
import { BFormSelect } from "bootstrap-vue-next";

export default {
  name: "DatasetSorting",
  components: {
    BFormSelect,
  },
  data() {
    // Initialize selectedSortOption and sortDirection based on store state
    let initialSortOption = this.$store.state.selected_sort_option;
    let initialSortDirection = "asc";
    if (initialSortOption.startsWith("-")) {
      initialSortDirection = "desc";
      initialSortOption = initialSortOption.substring(1);
    }
    return {
      selectedSortOption: initialSortOption,
      sortOptions: [
        "uri",
        "base_uri",
        "created_at",
        "creator_username",
        "frozen_at",
        "name",
        "uuid",
      ],
      sortDirection: initialSortDirection,
    };
  },
  computed: {
    // Format sortOptions for display in the dropdown
    formattedOptions() {
      return this.sortOptions.map((option) => ({
        text: option
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        value: option,
      }));
    },
    // Get the appropriate sort icon based on the sortDirection
    sortIcon() {
      return require(`@/assets/icons/sort-${this.sortDirection}.svg`);
    },
    // Get the selectedSortValue with the correct prefix based on sortDirection
    selectedSortValue() {
      return this.sortDirection === "asc"
        ? this.selectedSortOption
        : `-${this.selectedSortOption}`;
    },
  },
  methods: {
    // Toggle the sortDirection and update the store and emit an event
    toggleSortDirection() {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      this.$store.commit("update_selected_sort_option", this.selectedSortValue);
      this.$emit("start-search");
    },
  },
  watch: {
    // Update the store and emit an event when selectedSortOption changes
    selectedSortOption() {
      this.$store.commit("update_selected_sort_option", this.selectedSortValue);
      this.$emit("start-search");
    },
  },
};
</script>

<style>
// Style the sort button and icon
.sort-button {
  color: inherit;
}

.sort-icon {
  filter: invert(100%);
  transition: filter 0.3s;
}

.sort-button:hover .sort-icon {
  filter: invert(0%);
}
</style>
