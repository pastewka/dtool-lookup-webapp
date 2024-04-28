<template>
    <div>
        <button
                class="btn btn-outline-danger"
                type="button"
                @click="logout"
              >
                Logout
              </button>
    </div>
  </template>
  
<script>
export default {
  name: "TemplateDownloader",
  methods: {
    logout() {
        this.$emit("logoutAction");
    }
  }
};
</script>