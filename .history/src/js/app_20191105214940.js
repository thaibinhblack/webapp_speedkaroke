// Import Vue
import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSession from 'vue-session'
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
// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);
Vue.use(VueGeolocation)
Vue.use(VueAxios,axios)
Vue.use(VueSession)
import store from '../store'
import * as firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyD_rGZjl-91i-pzs8WX6-lmG2ZsxAPMiNs",
  authDomain: "speedkaraoke-e2429.firebaseapp.com",
  databaseURL: "https://speedkaraoke-e2429.firebaseio.com",
  projectId: "speedkaraoke-e2429",
  storageBucket: "speedkaraoke-e2429.appspot.com",
  messagingSenderId: "576389700469",
  appId: "1:576389700469:web:e4fff4e1c641e345efd13c",
  measurementId: "G-T7K3QTWKP9"
};
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()
messaging.usePublicVapidKey("BDgdx7jCs8ieFkO00uLG2XmRAKxqX84SkNub0PpEXmEmGvIl66XkSUuvQDS38jjMXfTCRoZwXyR8qfGKvmZpv3E")
Notification.requestPermission().then((permission) => {
  console.log(permission)
});
// Init App
new Vue({

  el: '#app',
  render: (h) => h(App),
  store,
  components: {
    app: App
  },
  created: function() {
    window.fbAsyncInit = function() {
        FB.init({
          appId            : '****',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v3.1'
        });
    };

    (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.1';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
  },
 
});