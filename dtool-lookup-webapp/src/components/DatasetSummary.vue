<template>
  <div>
    <div class="d-flex justify-content-between">
      <h3>{{ dataset.name }}</h3>
      <small>
        Created by <em>{{ dataset.creator_username }}</em> at
        <em>{{ moment(dataset.created_at).format("YYYY-MM-DD") }}</em
        >&nbsp;
        <span class="badge badge-pill badge-info">{{ numItems }} items</span
        >&nbsp;
        <span class="badge badge-pill badge-info">{{
          filesize(total_size_in_bytes)
        }}</span>
      </small>
    </div>
    <div class="d-flex justify-content-between">
      <small>{{ dataset.uri }}</small>
      <b-dropdown right text="Copy" size="sm">
        <b-dropdown-text
          >The command below copies the dataset to the working
          directory</b-dropdown-text
        >
        <b-dropdown-form style="width: 300px;">
          <b-input-group>
            <b-form-input v-model="copy_command" size="sm"></b-form-input>
            <b-input-group-append>
              <b-button
                size="sm"
                variant="outline-secondary"
                v-clipboard:copy="copy_command"
                ><span class="octicon octicon-clippy"></span
              ></b-button>
            </b-input-group-append>
          </b-input-group>
        </b-dropdown-form>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
var filesize = require("filesize");
var moment = require("moment");
export default {
  name: "DatasetSummary",
  data: function() {
    return {
      filesize: filesize,
      moment: moment
    };
  },
  computed: {
    dataset: function() {
      return this.$store.state.current_dataset;
    },
    numItems: function() {
      return Object.values(this.$store.state.current_dataset_manifest.items)
        .length;
    },
    total_size_in_bytes: function() {
      var total = 0;
      Object.values(this.$store.state.current_dataset_manifest.items).forEach(
        item => {
          total = total + item.size_in_bytes;
        }
      );
      return total;
    },
    copy_command: function() {
      return "dtool cp " + this.dataset.uri + " .";
    }
  }
};
</script>

<style></style>
