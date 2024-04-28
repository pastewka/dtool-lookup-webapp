<template>
    <!-- Render the logout button if all conditions are false -->
    <button class="btn btn-outline-danger" type="button" @click="logout" v-if="!downloadReadmeYaml && !downloadReadmeJson && !showInfoMenuEntry">
      Logout
    </button>
  
    <!-- Render the dropdown menu if any of the conditions are true -->
    <BDropdown id="account-dropdown" v-model="show1" text="Account" variant="primary" class="ml-auto" v-else>
      <BDropdownItem @click="downloadFile('yaml')">
        Download dtool_readme.yml
      </BDropdownItem>
  
      <BDropdownItem @click="downloadFile('json')">
        Download dtool.json
      </BDropdownItem>
  
      <BDropdownItem @click="logout">
        <button class="btn btn-outline-danger" type="button">Logout</button>
      </BDropdownItem>
    </BDropdown>
  </template>

<script>
import { BDropdown, BDropdownItem } from "bootstrap-vue-next";
export default {
    name: "TemplateDownloader",
    data() {
        return {
            downloadReadmeYaml: process.env.VUE_APP_OFFER_DTOOL_README_YAML_DOWNLOAD|| false,
            downloadReadmeJson: process.env.VUE_APP_OFFER_DTOOL_JSON_DOWNLOAD || false,
            showInfoMenuEntry : process.env.VUE_APP_SHOW_INFO_MENU_ENTRY || false,
        };
    },
    components: {
        BDropdown,
        BDropdownItem
    },
    methods: {
        logout() {
            this.$emit("logoutAction");
        }
    }
};
</script>
