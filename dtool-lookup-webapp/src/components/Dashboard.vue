<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <section v-if="errored">
      <p>
        Aplogies, we're not able to retrieve this informaiton at the moment,
        please try again later.
      </p>
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div class="container">
          <!-- <div class="recent-datasets">
            <table>
              <caption>
                Recent datasets
              </caption>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Creator</th>
                  <th>Created at</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="dataset in recent_datasets" v-bind:key="dataset.uri">
                  <td>{{ dataset.name }}</td>
                  <td>{{ dataset.creator_username }}</td>
                  <td>
                    {{ moment.unix(dataset.created_at).format("YYYY-MM-DD") }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div> -->

          <div class="user-stats">
            <table>
              <caption>
                Datasets per user
              </caption>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Number of datasets</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="key in Object.keys(user_stats)" v-bind:key="key">
                  <td>{{ key }}</td>
                  <td class="number">{{ user_stats[key] }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="base-uri-stats">
            <table>
              <caption>
                Datasets per base URI
              </caption>
              <thead>
                <tr>
                  <th>Base URI</th>
                  <th>Number of datasets</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="key in Object.keys(base_uri_stats)" v-bind:key="key">
                  <td>{{ key }}</td>
                  <td class="number">{{ base_uri_stats[key] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
var moment = require("moment");
export default {
  name: "Dashboard",
  props: {
    lookup_url: String,
    auth_str: String
  },
  data: function() {
    return {
      moment: moment,
      datasets: null,
      loading: true,
      errored: false
    };
  },
  computed: {
    source: function() {
      return this.lookup_url + "/dataset/list";
    },
    num_datasets: function() {
      return this.datasets.length;
    },
    users: function() {
      return Array.from(
        new Set(this.datasets.map(ds => ds["creator_username"]))
      );
    },
    user_stats: function() {
      var stats = {};
      var i = 0;
      for (i = 0; i < this.users.length; i++) {
        stats[this.users[i]] = 0;
      }
      for (i = 0; i < this.datasets.length; i++) {
        stats[this.datasets[i]["creator_username"]] += 1;
      }
      return stats;
    },
    base_uris: function() {
      return Array.from(new Set(this.datasets.map(ds => ds["base_uri"])));
    },
    base_uri_stats: function() {
      var stats = {};
      var i = 0;
      for (i = 0; i < this.base_uris.length; i++) {
        stats[this.base_uris[i]] = 0;
      }
      for (i = 0; i < this.datasets.length; i++) {
        stats[this.datasets[i]["base_uri"]] += 1;
      }
      return stats;
    },
    recent_datasets: function() {
      return this.datasets
        .concat() // Take a copy to avoid triggering no-side-effects-in-computed-properties.
        .sort(function(a, b) {
          return b.frozen_at - a.frozen_at;
        })
        .slice(0, 3);
    }
  },
  mounted() {
    this.$http
      .get(this.source, { headers: { Authorization: this.auth_str } })
      .then(response => (this.datasets = response.data))
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>

<style>
.recent-datasets {
  grid-area: recent-datasets;
}
.user-stats {
  grid-area: user-stats;
}
.base-uri-stats {
  grid-area: base-uri-stats;
}
.container {
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 15px;
  grid-template-areas:
    "recent-datasets recent-datasets"
    "user-stats base-uri-stats";
}
table caption {
  font-size: 1.2em;
}
* {
  text-align: left;
}
td {
  padding-right: 5px;
}
td.number {
  text-align: right;
}
</style>
