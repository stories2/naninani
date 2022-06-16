import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import BootstrapVue3 from "bootstrap-vue-3";

// Optional, since every component import their Bootstrap functionality
// the following line is not necessary
// import 'bootstrap' asdfasd

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

import { firebaseApp } from "./firebase";

// https://thewebdev.info/2022/03/12/how-to-fix-vue-js-vuetify-icon-not-showing/
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css";

import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import { store } from "./dataStore";

loadFonts();

// https://github.com/vuetifyjs/vuetify/issues/14967#issuecomment-1106463958
const vueApp = createApp(App);
vueApp.config.globalProperties.$firebase = firebaseApp;
vueApp.use(router).use(BootstrapVue3).use(vuetify).use(store).mount("#app");
