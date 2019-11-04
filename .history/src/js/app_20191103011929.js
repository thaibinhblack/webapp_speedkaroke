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
  apiKey: "AIzaSyD_rGZjl-91i-pzs8WX6-lmG2ZsxAPMiNs",
  authDomain: "speedkaraoke-e2429.firebaseapp.com",
  databaseURL: "https://speedkaraoke-e2429.firebaseio.com",
  projectId: "speedkaraoke-e2429",
  storageBucket: "speedkaraoke-e2429.appspot.com",
  messagingSenderId: "576389700469",
  appId: "1:576389700469:web:e4fff4e1c641e345efd13c",
  measurementId: "G-T7K3QTWKP9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.usePublicVapidKey("BDgdx7jCs8ieFkO00uLG2XmRAKxqX84SkNub0PpEXmEmGvIl66XkSUuvQDS38jjMXfTCRoZwXyR8qfGKvmZpv3E")
Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('Notification permission granted.');
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // ...
  } else {
    console.log('Unable to get permission to notify.',permission);
  }
});

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