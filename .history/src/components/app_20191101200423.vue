<template>
<f7-app :params="f7params" >
  <f7-view main class="safe-areas" url="/"></f7-view>
</f7-app>
</template>
<script>

  import routes from '../js/routes.js';

  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          name: 'speedkaraoke', // App name
          theme: 'auto', // Automatic theme detection
          // App root data
          data: function () {
            return {
              user: {
                firstName: 'John',
                lastName: 'Doe',
              },

            };
          },

          // App routes
          routes: routes,
          // Register service worker
          serviceWorker: {
            path: '/service-worker.js',
          },
        },

        // Login screen data
        username: '',
        password: '',
      }
    },
    methods: {
      alertLoginData() {
        this.$f7.dialog.alert('Username: ' + this.username + '<br>Password: ' + this.password);
      }
    },
    mounted() {
      this.$f7ready((f7) => {

        // Call F7 APIs here
      });
    }
  }
</script>