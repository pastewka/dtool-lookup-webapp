<template>
  <div class="d-flex justify-content-end align-items-center">
    <BFormSelect v-model="selectedSortOption" class="me-2" style="width: 200px;" :options="formattedOptions">
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
    formattedOptions() {
      return this.sortOptions.map((option) => ({
        text: option.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        value: option,
      }));
    },
    sortIcon() {
      return require(`@/assets/icons/sort-${this.sortDirection}.svg`);
    },
    selectedSortValue() {
      return this.sortDirection === "asc" ? this.selectedSortOption : `-${this.selectedSortOption}`;
    },
  },
  methods: {
    toggleSortDirection() {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      this.$store.commit("update_selected_sort_option", this.selectedSortValue);
      this.$emit("start-search");
    },
  },
  watch: {
    selectedSortOption() {
      this.$store.commit("update_selected_sort_option", this.selectedSortValue);
      this.$emit("start-search");
    },
  },
};
</script>

<style>
.sort-button {
  /* Ensures the icon inherits the color from the button */
  color: inherit;
}

.sort-icon {
  /* Sets the default icon color to white */
  filter: invert(100%);
  transition: filter 0.3s; /* Smooth transition for the filter effect */
}

.sort-button:hover .sort-icon {
  /* Changes the icon color to black on hover */
  filter: invert(0%);
}
</style>