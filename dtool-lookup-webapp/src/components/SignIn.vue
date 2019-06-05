<template>
  <div>
    <h5>Please sign in</h5>
    <form v-on:submit.stop.prevent="signIn">
      <div class="form-goroup">
        <label for="token">JSON Web Token</label>
        <input
          type="text"
          class="form-control"
          id="token"
          aria-describedby="emailHelp"
          v-model="token"
        />
        <small id="tokenHelp" class="form-text text-muted"
          >Replace by username and password later...</small
        >
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data: function() {
    return {
      token:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYjI0Y2QxZC1iY2I2LTRlMjYtYTBkMy04MDJiODMyNDcyZTAiLCJmcmVzaCI6ZmFsc2UsImlhdCI6MTU1NzQzNTUzOSwidHlwZSI6ImFjY2VzcyIsIm5iZiI6MTU1NzQzNTUzOSwiaWRlbnRpdHkiOiJvbHNzb250In0.gs6D0l_cTBwh-uuFfGCuBpuy61Svy66sKnbSvtCNxmaOSvGHMAPjQSCFPBjGUEcvbTO_SKbS7QiQRRXQL1NzS2ocz9lfONbmGfz_J1hlViSFypzkUxPttgJwTHwJPkSsx6YzwlFpJObDNyaLQXK76vt2pZircuukPOYBEp-htmb77JPt8Cf_93I9zRznwTDgykb4BR0mJTHIPKxl6ATG58pNM5zg3isnfC40tmkicztaKLxvktYnIh7lt-vO71KmWXfuRXlrxDF2hwMnRrsv9LswwenxgJWwxEkYiZIagGAM7LRfel_uwYPnOGXQQ7y_-8rqkZf7Gmlq5j7B4-GCjg"
    };
  },
  methods: {
    signIn: function() {
      this.$emit("sign-in", this.token);
    }
  }
};
</script>

<style></style>
