<template>
  <div class="center-wrapper">
    <div
      class="container"
      :class="{ 'right-panel-active': rightPanelActive }"
      id="container"
    >
      <div class="form-container sign-up-container">
        <form action="#">
          <h1>Supporting Documentation</h1>
          <p>Please refer to the following resources for more information:</p>
          <ul style="list-style-type: none; padding: 0">
            <li>
              <a
                href="https://github.com/livMatS/dtool-lookup-webapp"
                target="_blank"
                >dtool-lookup-webapp repository</a
              >
            </li>
            <li>
              <a
                href="https://demo.dtool.dev/lookup/doc/swagger"
                target="_blank"
                >dserver REST API documentation</a
              >
            </li>
            <li>
              <a href="https://dtool.readthedocs.io/" target="_blank"
                >dtool documentation</a
              >
            </li>
          </ul>
        </form>
      </div>

      <!-- Sign In Form -->
      <div class="form-container sign-in-container">
        <form @submit.stop.prevent="getToken">
          <h1>Sign in</h1>
          <div v-if="signInFailed" class="alert alert-danger" role="alert">
            Invalid username or password
          </div>
          <input
            v-model="username"
            type="username"
            placeholder="UserName"
            required
            :disabled="signInLoading"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            :disabled="signInLoading"
          />
          <button
            :disabled="signInLoading"
            class="btn btn-lg btn-primary btn-block"
          >
            Sign In
          </button>
          <div class="d-flex justify-content-center" v-if="signInLoading">
            <div class="spinner-border text-primary">
              <span class="sr-only">Authenticating...</span>
            </div>
          </div>
        </form>
      </div>

      <!-- Overlay Container -->
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Access Your Account</h1>
            <p>
              To log in, use the default credentials: Username -
              <strong>testuser</strong>, Password -
              <strong>test_password</strong>.
            </p>
            <button class="ghost" @click="deactivateRightPanel">
              Return to Sign In
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Welcome to Dtool</h1>
            <p>
              Make your data more resilient, portable and easy to work with by
              packaging files & metadata into self contained datasets
            </p>
            <button class="ghost" @click="activateRightPanel">More Info</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data: function () {
    return {
      username: null,
      password: null,
      signInFailed: false,
      signInInfo: null,
      signInLoading: false,
      signInErrored: false,
      rightPanelActive: false,
      tokenGeneratorURL:
        process.env.VUE_APP_DTOOL_LOOKUP_SERVER_TOKEN_GENERATOR_URL,
    };
  },
  computed: {
    loginCredentials: function () {
      return { username: this.username, password: this.password };
    },
  },
  methods: {
    signIn: function (token) {
      this.$emit("sign-in", token);
    },
    getToken: function () {
      console.log(process.env);
      this.signInLoading = true;
      this.$http
        .post(this.tokenGeneratorURL, this.loginCredentials, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.signInInfo = response.data;
          if ("token" in this.signInInfo) {
            this.signIn(this.signInInfo.token);
          } else {
            this.signInFailed = true;
          }
        })
        .catch((error) => {
          console.log(error);
          this.signInErrored = true;
        })
        .finally(() => (this.signInLoading = false));
    },
    activateRightPanel() {
      this.rightPanelActive = true;
    },
    deactivateRightPanel() {
      this.rightPanelActive = false;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

* {
  box-sizing: border-box;
}

.center-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Full height of the viewport */
  background: #f6f5f7;
}

body {
  margin: 0; /* Ensure there's no default margin */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  min-height: 100vh; /* Minimum height to take full viewport height */
  background: #f6f5f7;
  font-family: "Montserrat", sans-serif;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #95319b;
  background-color: #95319b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:hover,
button:active,
button:focus {
  background-color: #8b319b; /* Background color for hover and active states */
  border-color: #8b319b; /* Border color for hover and active states */
}

button:active {
  transform: scale(0.95); /* Slight scale down to give a pressed effect */
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 90vw;
  max-width: 800px;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #cc1e67;
  background: -webkit-linear-gradient(135deg, 
                                    #8b319b 0%, 
                                    #95319b 50%, 
                                    #b44acb 75%, 
                                    #cc70e6 100%);
background: linear-gradient(135deg, 
                            #8b319b 0%, 
                            #95319b 50%, 
                            #b44acb 75%, 
                            #cc70e6 100%);


  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
</style>
