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
          sortDirection: 'asc'
      };
  },
  computed: {
      formattedOptions() {
          return this.sortOptions.map(option => ({
              text: option.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              value: option
          }));
      }
  },
  methods: {
      getPrefixedValue(option) {
          if(option.startsWith('+') || option.startsWith('-')) {
              return option;
          }
          return (this.sortDirection === 'asc' ? '%2B' : '-') + option;
      },
      toggleSortDirection() {
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
          this.commitToStore(this.selectedSortOption);
      },
      commitToStore(value) {
          this.$store.commit('update_selected_sort_option', this.getPrefixedValue(value));
      }
  },
  mounted() {
      this.commitToStore(this.selectedSortOption);
  },
  watch: {
      selectedSortOption(newValue) {
          this.commitToStore(newValue);
      }
      
  }
};
</script>

<style scoped>
/* Add Bootstrap icons */
@import "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css";
</style>
