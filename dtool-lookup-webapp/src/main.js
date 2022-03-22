import { createApp } from "vue";
import App from "./App.vue";
import { store } from './store'

import axios from "axios";
import BootstrapVue3 from 'bootstrap-vue-3';
import VueAxios from 'vue-axios'
import { VueClipboard } from '@soerenmartius/vue3-clipboard';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

const app = createApp(App);

app.use(BootstrapVue3);
app.use(VueClipboard);
app.use(store);
app.use(VueAxios, axios)
app.config.productionTip = false;
app.mount("#app");
