<template>
  <div class="d-flex justify-content-end align-items-center">
      <!-- Dropdown for sorting options with limited width -->
      <select v-model="selectedSortOption" class="form-select me-2" style="width: 200px;">
          <option v-for="option in sortOptions" :key="option" :value="option">
              {{ option }}
          </option>
      </select>
      
      <!-- Button to toggle sorting direction with primary color -->
      <button class="btn btn-primary" @click="toggleSortDirection">
          <i :class="sortDirection === 'asc' ? 'bi bi-sort-up' : 'bi bi-sort-down'"></i>
      </button>
  </div>
</template>

<script>
export default {
  name: "DatasetSorting",
  data() {
      return {
          selectedSortOption: 'uri', // Stores the current selected sorting option
          sortOptions: [
              'base_uri', 'created_at', 'creator_username', 'frozen_at', 'name', 'uri', 'uuid'
          ],
          sortDirection: 'asc' // Tracks the current sort direction
      };
  },
  methods: {
      toggleSortDirection() {
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      }
  }
};
</script>

<style scoped>
/* Add Bootstrap icons */
@import "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css";

</style>
