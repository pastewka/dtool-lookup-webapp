<template>
  <div>
    <BDropdown
      id="account-dropdown"
      v-model="show1"
      text="Account"
      variant="primary"
      class="ml-auto"
    >
      <BDropdownItem @click="downloadFile('yaml')"
        >Download Readme as YAML</BDropdownItem
      >

      <BDropdownItem @click="downloadFile('json')"
        >Download Readme as JSON</BDropdownItem
      >

      <BDropdownItem @click="logout">
        <button class="btn btn-outline-danger" type="button">Logout</button>
      </BDropdownItem>
    </BDropdown>

    <button class="btn btn-outline-danger" type="button" @click="logout">
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
    },
  },
};
</script>
