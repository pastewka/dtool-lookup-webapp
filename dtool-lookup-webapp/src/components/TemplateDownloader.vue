<template>
    <!-- Render the logout button if all conditions are false -->
    <button class="btn btn-outline-danger" type="button" @click="logout" v-if="!downloadReadmeYaml && !downloadReadmeJson && !showInfoMenuEntry">
      Logout
    </button>
  
    <!-- Render the dropdown menu if any of the conditions are true -->
    <BDropdown id="account-dropdown" v-model="show1" text="Account" variant="primary" class="ml-auto" v-else>
        <BDropdownItem @click="downloadFile('yaml')" v-if="downloadReadmeYaml">
        Download dtool_readme.yml
        </BDropdownItem>
  
        <BDropdownItem @click="downloadFile('json')" v-if="downloadReadmeJson">
        Download dtool.json
        </BDropdownItem>
    
        <BDropdownItem @click="showInfo" v-if="showInfoMenuEntry">
            Info    
        </BDropdownItem>

        <BDropdownItem @click="logout">
            <button class="btn btn-outline-danger" type="button">Logout</button>
        </BDropdownItem>
    </BDropdown>

    <!-- Modal Component -->
    <BModal ref="infoModal" id="modal-center" centered title="Info" ok-only>
        <p class="my-4"> {{ infoContent }}</p>
    </BModal>
</template>


<script>
import { BDropdown, BDropdownItem,BModal } from "bootstrap-vue-next";
export default {
    name: "TemplateDownloader",
    data() {
        return {
            downloadReadmeYaml: process.env.VUE_APP_OFFER_DTOOL_README_YAML_DOWNLOAD|| false,
            downloadReadmeJson: process.env.VUE_APP_OFFER_DTOOL_JSON_DOWNLOAD || false,
            showInfoMenuEntry : process.env.VUE_APP_SHOW_INFO_MENU_ENTRY || true,
            infoContent : process.env.VUE_APP_INFO_CONTENT || "Info Content",
        };
    },
    components: {
        BDropdown,
        BDropdownItem,
        BModal
    },
    methods: {
        logout() {
            this.$emit("logoutAction");
        },
        async downloadFile(fileType) {
      let fileName = "dtool_readme";
      let fileExtension = fileType === "yaml" ? ".yml" : ".json";
      let filePath = `data/templates/${fileName}${fileExtension}`;

      try {
        let response = await fetch(filePath);
        if (!response.ok) throw new Error("Network response was not ok");

        let text = await response.text();
        let blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        let downloadUrl = window.URL.createObjectURL(blob);

        let a = document.createElement("a");
        a.href = downloadUrl;
        a.download = `${fileName}${fileExtension}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);
      } catch (error) {
        console.error("Failed to download file:", error);
      }
    },
    showInfo() {
            this.$refs.infoModal.show();
        },
    }
};
</script>
