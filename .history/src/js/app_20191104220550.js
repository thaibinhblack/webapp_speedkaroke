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
// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);
Vue.use(VueGeolocation)
Vue.use(VueAxios,axios)
import store from '../store'
// Init App
new Vue({
  components: {
    app: App
  },
  el: '#app',
  render: (h) => h(App),
  store,
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