<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <p>{{ lookup_url }}</p>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  props: {
    lookup_url: String
  }
};
</script>

<style></style>
