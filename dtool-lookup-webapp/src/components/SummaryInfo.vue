<template>
  <div>
    <div v-if="loading" class="spinner-border text-primary">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else>
      <div v-if="errored">
        <div class="container">
          <p>Unable to load summary information please try again.</p>
          <a href="" class="btn btn-secondary" @click.prevent="load_summary()"
            >Try again</a
          >
        </div>
      </div>
      <div v-else>
        <TagFilter
          :tag_info="summary_info.tags"
          @start-search="searchDatasets"
        />

        <BaseUriFilter
          :summary_info="summary_info"
          @start-search="searchDatasets"
        />

        <div class="list-group">
          <a
            href=""
            class="list-group-item list-group-item-action"
            v-for="(creator, index) in summary_info['creator_usernames']"
            v-bind:key="index"
            @click.prevent="update_creator_username(creator)"
            v-bind:class="{ active: active_creator == creator }"
          >
            <div class="d-flex  justify-content-between">
              <small>{{ creator }}</small
              ><small>
                <span class="badge badge-pill badge-secondary">{{
                  summary_info["datasets_per_creator"][creator]
                }}</span>
              </small>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TagFilter from "./TagFilter.vue";
import BaseUriFilter from "./BaseUriFilter.vue";
export default {
  name: "SummaryInfo",
  props: {
    lookup_url: String,
    auth_str: String
  },
  data: function() {
    return {
      summary_info: null,
      loading: true,
      errored: false,
      active_creator: null,
      active_base_uri: null,
      tags_info: null
    };
  },
  computed: {
    source: function() {
      return this.lookup_url + "/dataset/summary";
    }
  },
  methods: {
    update_creator_username: function(creator) {
      if (this.$store.state.creator_username === creator) {
        this.$store.commit("update_creator_username", null);
        this.active_creator = null;
      } else {
        this.$store.commit("update_creator_username", creator);
        this.active_creator = creator;
      }
      this.$emit("start-search");
    },
    load_summary: function() {
      console.log("Loading summary info");
      this.errored = false;
      this.loading = true;
      this.$http
        .get(this.source, { headers: { Authorization: this.auth_str } })
        .then(response => (this.summary_info = response.data))
        .catch(error => {
          console.log(error);
          console.log(error.response);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    searchDatasets: function() {
      this.$emit("start-search");
    }
  },
  mounted() {
    this.load_summary();
  },
  components: {
    TagFilter,
    BaseUriFilter
  }
};
</script>

<style></style>
