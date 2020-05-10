<template>
  <div>
    <h3>Creator username filter</h3>
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
</template>

<script>
export default {
  name: "BaseUriFilter",
  props: {
    summary_info: Object
  },
  data: function() {
    return {
      active_creator: null
    };
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
    }
  }
};
</script>

<style></style>
