<template>
  <div>
    <div v-if="num_annotations > 0">
      <h3>Annotations</h3>
      <table class="table table-striped table-sm">
        <tbody>
          <tr v-for="(value, name, index) in annotations" v-bind:key="index">
            <th>{{ name }}</th>
            <td>{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Annotations",
  computed: {
    annotations: function() {
      return this.$store.state.current_dataset_annotations;
    },
    num_annotations: function() {
      return Object.keys(this.annotations).length;
    }
  }
};
</script>

<style></style>
