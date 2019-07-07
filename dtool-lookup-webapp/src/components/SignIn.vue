<template>
  <div class="sign-in-div">
    <form class="form-signin" v-on:submit.stop.prevent="getToken">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <div v-if="signInFailed" class="alert alert-danger" role="alert">
        Invalid username or password
      </div>
      <div class="form-group">
        <label for="username" class="sr-only">Username</label>
        <input
          v-model="username"
          type="text"
          id="username"
          class="form-control"
          placeholder="Username"
          required
          autofocus
          :disabled="signInLoading"
        />
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          v-model="password"
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
          :disabled="signInLoading"
        />
        <button
          class="btn btn-lg btn-primary btn-block"
          type="submit"
          :disabled="signInLoading"
        >
          Sign in
        </button>
      </div>
      <div class="d-flex justify-content-center">
        <div v-if="signInLoading" class="spinner-border text-primary">
          <span class="sr-only">Authenticating...</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data: function() {
    return {
      username: null,
      password: null,
      signInFailed: false,
      signInInfo: null,
      signInLoading: false,
      signInErrored: false,
      tokenGeneratorURL: "https://token-generator.informatics.jic.ac.uk/token"
    };
  },
  computed: {
    loginCredentials: function() {
      return { username: this.username, password: this.password };
    }
  },
  methods: {
    signIn: function(token) {
      this.$emit("sign-in", token);
    },
    getToken: function() {
      this.signInLoading = true;
      this.$http
        .post(this.tokenGeneratorURL, this.loginCredentials, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.signInInfo = response.data;
          if ("token" in this.signInInfo) {
            this.signIn(this.signInInfo.token);
          } else {
            this.signInFailed = true;
          }
        })
        .catch(error => {
          console.log(error);
          this.signInErrored = true;
        })
        .finally(() => (this.signInLoading = false));
    }
  }
};
</script>

<style>
.sign-in-div {
  height: 100%;
}

.sign-in-div {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
