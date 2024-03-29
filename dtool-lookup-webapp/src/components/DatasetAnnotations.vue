<template>
  <div>
    <!-- Loop through each filtered annotation that has non-empty values -->
    <div v-for="(details, annotationName, index) in filteredAnnotations" :key="index">
      <h3 class="annotations-heading">{{ capitalizeFirstLetter(annotationName) }}</h3>
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through each property of the annotation and display it -->
          <tr v-for="(value, propertyName, subIndex) in details" :key="`details-${index}-${subIndex}`">
            <td>{{ propertyName }}</td>
            <td>{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatasetAnnotations",
  computed: {
    annotations: function() {
      return this.$store.state.current_dataset_annotations;
    },
    // Computed property to filter annotations that have non-empty values
    filteredAnnotations: function() {
      let filtered = {};
      for (let annotationName in this.annotations) {
        if (this.hasNonEmptyValues(this.annotations[annotationName])) {
          filtered[annotationName] = this.annotations[annotationName];
        }
      }
      return filtered;
    }
  },
  methods: {
    capitalizeFirstLetter: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    // Method to check if an object has non-empty values
    hasNonEmptyValues: function(obj) {
      return Object.values(obj).some(value => value);
    }
  }
};
</script>
<style>
h3.annotations-heading {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.table.table-striped.table-sm {
  margin-bottom: 1rem;
}
</style>
