<template>
  <form class="form-inline" @submit.prevent>
    <input
      class="form-control"
      type="text"
      v-model="textQuery"
      v-on:keyup.enter.prevent="startSearch"
    />
    <span
      v-if="textQuery !== ''"
      :class="{ 'is-invalid': !isJson, 'is-valid': isJson }"
      >{{ isJson ? "✔ JSON Format" : "✘ Not in JSON" }}</span
    >
  </form>
</template>

<script>
export default {
  name: "TextSearch",
  data: function () {
    return {
      textQuery: "",
      isFocused: false,
    };
  },
  computed: {
    isJson: function () {
      if (this.textQuery === "") {
        return false;
      }
      try {
        JSON.parse(this.textQuery);
        return true;
      } catch (e) {
        return false;
      }
    },
  },
  methods: {
    startSearch: function () {
      if (this.isJson) {
        this.$store.commit("update_mongo_text", this.textQuery);
      } else {
        this.$store.commit("update_free_text", this.textQuery);
      }
      this.$emit("start-search");
    },
  },
};
</script>

<style>
.is-invalid {
  color: red;
}
.is-valid {
  color: rgb(0, 255, 0);
}
</style>
