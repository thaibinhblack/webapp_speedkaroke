// Import Vue
import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.vue';
import VueGeolocation from 'vue-browser-geolocation';
import VueSession from 'vue-session'
// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);
Vue.use(VueGeolocation)
Vue.use(VueAxios,axios)
Vue.use(VueSession)
import * as firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyApI3IYFCloE4ZCB-ZOiPR8DV7y3Hvqgi4",
  authDomain: "appkaraoke-595d7.firebaseapp.com",
  databaseURL: "https://appkaraoke-595d7.firebaseio.com",
  projectId: "appkaraoke-595d7",
  storageBucket: "",
  messagingSenderId: "178224064982",
  appId: "1:178224064982:web:beb3fb9ddbfb5854"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
import store from '../store'
// Init App
new Vue({
  el: '#app',
  render: (h) => h(App),
  store,

  // Register App Component
  components: {
    app: App
  },
});