<template>
  <div class="d-flex justify-content-end align-items-center">
      <!-- Dropdown for sorting options with limited width -->
      <BFormSelect v-model="selectedSortOption" class="me-2" style="width: 200px;"
      :options="formattedOptions">
      </BFormSelect>
      
      <!-- Button to toggle sorting direction with primary color -->
      <button class="btn btn-primary" @click="toggleSortDirection">
          <i :class="sortDirection === 'asc' ? 'bi bi-sort-up' : 'bi bi-sort-down'"></i>
      </button>
  </div>
</template>

<script>
import { BFormSelect } from "bootstrap-vue-next";

export default {
  name: "DatasetSorting",
  components: {
      BFormSelect
  },
  data() {
      return {
          selectedSortOption: 'uri', // Initialize with simple value
          sortOptions: [
            'uri', 'base_uri', 'created_at', 'creator_username', 'frozen_at', 'name', 'uuid'
          ],
          sortDirection: 'asc' // Initial sort direction
      };
  },
  computed: {
      formattedOptions() {
          // Format sort options for display in the dropdown
          return this.sortOptions.map(option => ({
              text: option.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Capitalize each word
              value: option
          }));
      }
  },
  methods: {
      getPrefixedValue(option) {
          // Add the current sort direction prefix to the option
          return (this.sortDirection === 'asc' ? '%2B' : '-') + option;
      },
      toggleSortDirection() {
          // Toggle sort direction between 'asc' and 'desc'
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      },
      updateStoreAndEmit(option) {
          // Update Vuex store and emit a search event
          const prefixedValue = this.getPrefixedValue(option);
          this.$store.commit('update_selected_sort_option', prefixedValue);
          this.$emit('start-search');
      }
  },
  watch: {
      sortDirection() {
          // React to changes in sort direction
          this.updateStoreAndEmit(this.selectedSortOption);
      },
      selectedSortOption(newValue) {
          // React to changes in selected sort option
          this.updateStoreAndEmit(newValue);
      }
  }
};
</script>

<style scoped>
/* Add Bootstrap icons for the toggle button */
@import "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css";
</style>
