<template>
  <div class="textSearch">
    <form class="form-inline" @submit.prevent>
      <div class="searchContainer d-flex align-items-center">
        <input
          class="form-control"
          type="text"
          v-model="textQuery"
          v-on:keyup.enter.prevent="startSearch"
   
        />
        <span
          class="jsonChecker"
          v-if="textQuery !== ''"
          :class="{ 'is-invalid': !isJson, 'is-valid': isJson }"
          ref="tooltip"
          v-b-tooltip.hover.top="'Enclose a JSON query in braces {} to have it interpreted as a direct MongoDB query.'"
        >
          {{ isJson ? "✔ JSON Format" : "✘ Not in JSON  ⓘ" }}
        </span>
      </div>
    </form>
  </div>
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
.searchContainer {
  display: flex;
  align-items: center;
}

.is-invalid {
  color: red;
}

.is-valid {
  color: rgb(0, 255, 0);
}

.jsonChecker {
  display: inline-block;
  margin-left: 10px;
  white-space: nowrap;
}
</style>
