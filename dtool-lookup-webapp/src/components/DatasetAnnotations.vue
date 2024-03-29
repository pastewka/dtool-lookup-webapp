<template>
  <div>
    <!-- Loop through each filtered annotation that has non-empty values -->
    <div
      v-for="(details, annotationName, index) in filteredAnnotations"
      :key="index"
    >
      <!-- Display the annotation name outside and above the container -->
      <h5 class="annotations-heading-outside">
        {{ capitalizeFirstLetter(annotationName) }}
      </h5>
      <!-- Container for the annotation details -->
      <div class="annotations-container">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <!-- Loop through each property of the annotation and display it -->
            <tr
              v-for="(value, propertyName, subIndex) in details"
              :key="`details-${index}-${subIndex}`"
            >
              <td>{{ propertyName }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatasetAnnotations",
  computed: {
    annotations: function () {
      return this.$store.state.current_dataset_annotations;
    },
    // Computed property to filter annotations that have non-empty values
    filteredAnnotations: function () {
      let filtered = {};
      for (let annotationName in this.annotations) {
        if (this.hasNonEmptyValues(this.annotations[annotationName])) {
          filtered[annotationName] = this.annotations[annotationName];
        }
      }
      return filtered;
    },
  },
  methods: {
    capitalizeFirstLetter: function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    // Method to check if an object has non-empty values
    hasNonEmptyValues: function (obj) {
      return Object.values(obj).some((value) => value);
    },
  },
};
</script>
<style>
.annotations-container {
  max-height: 250px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f8f9fa;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem; /* Adds some space below the container */
}

.annotations-heading-outside {
  margin-top: 1rem; /* Adds space above the heading for separation from previous elements */
  margin-bottom: 0.5rem; /* Reduces space below the heading to bring it closer to the container */
}
</style>
