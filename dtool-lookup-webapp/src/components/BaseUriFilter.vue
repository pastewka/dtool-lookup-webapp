<template>
  <div>
    <h3>Base URI</h3>
    <div class="list-group">
      <a
        href=""
        class="list-group-item list-group-item-action"
        @click.prevent="clear_base_uri_filters()"
      >
        <div class="d-flex  justify-content-between">
          <small>All</small
          ><small>
            <span class="badge badge-pill badge-primary">{{
              summary_info["number_of_datasets"]
            }}</span>
          </small>
        </div>
      </a>
      <a
        href=""
        class="list-group-item list-group-item-action"
        v-for="base_uri in summary_info['base_uris']"
        v-bind:key="base_uri"
        @click.prevent="update_base_uri(base_uri)"
        v-bind:class="{ active: active_base_uri == base_uri }"
      >
        <div class="d-flex  justify-content-between">
          <small
            ><div class="text-break">{{ base_uri }}</div></small
          ><small>
            <span class="badge badge-pill badge-secondary">{{
              summary_info["datasets_per_base_uri"][base_uri]
            }}</span>
          </small>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseUriFilter",
  props: {
    summary_info: Object
  },
  data: function() {
    return {
      active_base_uri: null
    };
  },
  methods: {
    clear_base_uri_filters: function() {
      this.active_base_uri = null;
      this.$emit("start-search");
    },
    update_base_uri: function(base_uri) {
      if (this.$store.state.base_uri === base_uri) {
        this.$store.commit("update_base_uri", null);
        this.active_base_uri = null;
      } else {
        this.$store.commit("update_base_uri", base_uri);
        this.active_base_uri = base_uri;
      }
      this.$emit("start-search");
    }
  }
};
</script>

<style></style>
