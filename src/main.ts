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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHynZuMSJE2UD1u9LDFAI6A-fAJedNk8I",
  authDomain: "naninani-c5b7f.firebaseapp.com",
  projectId: "naninani-c5b7f",
  storageBucket: "naninani-c5b7f.appspot.com",
  messagingSenderId: "821471101674",
  appId: "1:821471101674:web:32fa1c957d38ce64b30d93",
  measurementId: "G-NJ91J0K81E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createApp(App)
  .use(router)
  .use(BootstrapVue3)
  // .use(createRedux(store))
  .mount("#app");
