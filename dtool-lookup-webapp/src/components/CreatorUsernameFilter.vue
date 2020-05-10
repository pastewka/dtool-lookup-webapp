<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Creators</h5>
    </div>
    <div class="card-body p-0">
      <div class="list-group">
        <li
          href=""
          class="list-group-item list-group-item-action"
          v-for="(creator, index) in summary_info['creator_usernames']"
          v-bind:key="index"
          @click="toggleSelect(creator)"
        >
          <div class="d-flex  justify-content-between">
            <small>
              <input
                type="checkbox"
                v-bind:id="index + '-creator-checkbox'"
                v-model="selectedCreators"
                v-bind:value="creator"
              />
              <label v-bind:for="index + '-creator-checkbox'" @click.prevent>{{
                creator
              }}</label>
            </small>

            <small>
              <span class="badge badge-pill badge-secondary">{{
                summary_info["datasets_per_creator"][creator]
              }}</span>
            </small>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatorUsernameFilter",
  props: {
    summary_info: Object
  },
  data: function() {
    return {
      selectedCreators: []
    };
  },
  methods: {
    toggleSelect: function(creator) {
      if (this.selectedCreators.includes(creator)) {
        console.log("Unset creator username");
        // Remove item from array.
        this.selectedCreators.splice(this.selectedCreators.indexOf(creator), 1);
        this.$store.commit("update_creator_usernames", this.selectedCreators);
        this.$emit("start-search");
      } else {
        console.log("Set base URI");
        this.selectedCreators.push(creator);
        this.$store.commit("update_creator_usernames", this.selectedCreators);
        this.$emit("start-search");
      }
    }
  }
};
</script>

<style></style>
