<template>
  <div v-if="numDatasets > 0" class="card">
    <div class="card-header">
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
    <div class="card-body">
      <h5>README</h5>
      <pre>{{ yaml.stringify(dataset.readme) }}</pre>
    </div>

    <div class="card-footer">
      <h5>
        Items <small>({{ numItems }})</small>
      </h5>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="(item, id) in dataset.manifest.items"
          v-bind:key="id"
          @mouseover="update_fetch_identifier(id)"
        >
          <div class="d-flex  justify-content-between">
            <h6 class="mb-1">{{ item.relpath }}</h6>
            <small>{{ filesize(item.size_in_bytes) }} </small>
          </div>

          <div class="d-flex  justify-content-between">
            <small>{{ id }}</small>
            <b-dropdown right text="Fetch" size="sm">
              <b-dropdown-text
                >The command below fetches the dataset item and returns an
                absolute path on disk from where it can be
                accessed</b-dropdown-text
              >
              <b-dropdown-form style="width: 300px;">
                <b-input-group>
                  <b-form-input
                    v-model="fetch_command"
                    size="sm"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button
                      size="sm"
                      variant="outline-secondary"
                      v-clipboard:copy="fetch_command"
                      ><span class="octicon octicon-clippy"></span
                    ></b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-dropdown-form>
            </b-dropdown>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
var filesize = require("filesize");
var moment = require("moment");
var yaml = require("json2yaml");
export default {
  name: "DatasetInfo",
  props: {
    datasetHits: Array
  },
  data: function() {
    return {
      filesize: filesize,
      moment: moment,
      yaml: yaml,
      fetch_identifier: null
    };
  },
  computed: {
    dataset: function() {
      return this.$store.state.current_dataset;
    },
    numDatasets: function() {
      return this.datasetHits.length;
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
    },
    fetch_command: function() {
      return (
        "dtool item fetch " + this.dataset.uri + " " + this.fetch_identifier
      );
    }
  },
  methods: {
    update_fetch_identifier(identifier) {
      this.fetch_identifier = identifier;
    }
  }
};
</script>

<style></style>
