import Vue from "vue";
import App from "./App.vue";

import axios from "axios";
import BootstrapVue from "bootstrap-vue";
import store from "./store";
import VueClipboard from "vue-clipboard2";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(VueClipboard);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
