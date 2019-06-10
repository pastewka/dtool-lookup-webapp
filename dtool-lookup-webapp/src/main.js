import Vue from "vue";
import App from "./App.vue";

import axios from "axios";
import store from "./store";
import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
