<template>
  <div>
    <h5>
      Items <small>({{ numItems }})</small>
    </h5>
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="(item, id) in manifest.items"
        v-bind:key="id"
        @mouseover="update_fetch_identifier(id)"
      >
        <div class="d-flex justify-content-between">
          <h6 class="mb-1">{{ item.relpath }}</h6>
          <small>{{ filesize(item.size_in_bytes) }} </small>
        </div>

        <div class="d-flex justify-content-between">
          <small>{{ id }}</small>

          <BDropdown right size="sm">
  <template #button-content> Fetch </template>

  <template #default>
    <div class="container centered-content">
      <!-- Dropdown text for descriptive content -->
      <BDropdownText>
        The command below fetches the dataset item and returns an
        absolute path on disk from where it can be accessed.
      </BDropdownText>
    </div>

              <!-- Dropdown form containing input group, form input, and button -->
              <BDropdownForm style="width: 440px">
                <template #default>
                  <b-input-group>
                    <b-form-input
                      readonly
                      v-model="fetch_command"
                      size="sm"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button
                        size="sm"
                        variant="outline-secondary"
                        v-clipboard:copy="fetch_command"
                      >
                        <span class="octicon octicon-clippy"></span>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </template>
              </BDropdownForm>
            </template>
          </BDropdown>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  BDropdown,
  BInputGroup,
  BFormInput,
  BButton,
  BDropdownForm,
} from "bootstrap-vue-next";
var filesize = require("filesize");
export default {
  name: "DatasetManifest",
  data: function () {
    return {
      filesize: filesize,
      fetch_identifier: null,
    };
  },
  computed: {
    manifest: function () {
      return this.$store.state.current_dataset_manifest;
    },
    numItems: function () {
      return this.manifest && this.manifest.items
        ? Object.values(this.manifest.items).length
        : 0;
    },
    fetch_command: function () {
      return (
        "dtool item fetch " +
        this.$store.state.current_dataset.uri +
        " " +
        this.fetch_identifier
      );
    },
  },
  methods: {
    update_fetch_identifier(identifier) {
      console.log("update_fetch_identifer: " + identifier);
      this.fetch_identifier = identifier;
    },
  },

  components: {
    BDropdown,
    BInputGroup,
    BFormInput,
    BButton,
    BDropdownForm,
  },
};
</script>

<style>
.centered-content {
  display: flex;
  justify-content: flex-start; /* Aligns content to the start of the container */
  align-items: center; /* Aligns content vertically center */
  height: 100%; /* Sets the height to fill the container */
  text-align: left; /* Ensures the text itself is right-aligned */
  margin-right: 10px; /* Adjust as needed for your design */
}


</style>
