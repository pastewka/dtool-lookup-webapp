/**
 * Component: TemplateDownloader
 * Description: This component renders a button and a dropdown menu. The button is used for logout functionality, and the dropdown menu is used to download files and display information.
 * 
 * Props:
 *   - None
 * 
 * Data:
 *   - downloadReadmeYaml: A boolean indicating whether to offer the download of dtool_readme.yml file.
 *   - downloadReadmeJson: A boolean indicating whether to offer the download of dtool.json file.
 *   - showInfoMenuEntry: A boolean indicating whether to show the "Info" menu entry.
 *   - infoContent: A string containing the content to be displayed in the info modal.
 * 
 * Events:
 *   - logoutAction: This event is emitted when the logout button is clicked.
 * 
 * Methods:
 *   - logout: A method that emits the "logoutAction" event.
 *   - downloadFile: A method that downloads a file based on the provided file name.
 *   - showInfo: A method that shows the info modal.
 * 
 */
<template>
    <!-- Render the logout button if all conditions are false -->
    <button class="btn btn-outline-danger" 
        type="button" 
        @click="logout" 
        v-if="downloadReadmeYaml === false && downloadReadmeJson === false && showInfoMenuEntry === false">
  Logout
   
</button>

  
    <!-- Render the dropdown menu if any of the conditions are true -->
    <BDropdown id="account-dropdown" v-model="show1" text="Account" variant="primary" class="ml-auto" v-else>
        <BDropdownItem @click="downloadFile('dtool_readme.yml')" v-if="downloadReadmeYaml">
        Download dtool_readme.yml
        </BDropdownItem>
  
        <BDropdownItem @click="downloadFile('dtool.json')" v-if="downloadReadmeJson">
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
    <p class="my-4" v-html="infoContent"></p>
</BModal>

</template>


<script>
import { BDropdown, BDropdownItem, BModal } from "bootstrap-vue-next";
export default {
    name: "TemplateDownloader",
    data() {
        return {
            downloadReadmeYaml: process.env.VUE_APP_OFFER_DTOOL_README_YAML_DOWNLOAD === 'true',
            downloadReadmeJson: process.env.VUE_APP_OFFER_DTOOL_JSON_DOWNLOAD === 'true',
            showInfoMenuEntry: process.env.VUE_APP_SHOW_INFO_MENU_ENTRY === 'true',
            infoContent: process.env.VUE_APP_INFO_CONTENT || "Info Content",
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
        async downloadFile(fileName) {
            let filePath = fileName === 'dtool.json' ?
                           (process.env.VUE_APP_DTOOL_JSON_PATH || `data/templates/${fileName}`) :
                           (process.env.VUE_APP_DTOOL_README_YAML_PATH || `data/templates/${fileName}`);

            try {
                let response = await fetch(filePath);
                if (!response.ok) throw new Error("Network response was not ok");

                let text = await response.text();
                let blob = new Blob([text], { type: "text/plain;charset=utf-8" });
                let downloadUrl = window.URL.createObjectURL(blob);

                let a = document.createElement("a");
                a.href = downloadUrl;
                a.download = fileName;
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

