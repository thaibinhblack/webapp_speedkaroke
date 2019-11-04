<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
      <f7-navbar  back-link="Back">
        Đăng nhập
      </f7-navbar>
    <f7-login-screen-title>Speed Karaoke</f7-login-screen-title>
    <f7-list form>
      <f7-list-input
        label="Username"
        type="text"
        placeholder="Nhập tài khoản"
        :value="username"
        @input="username = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Password"
        type="password"
        placeholder="Nhập mật khẩu"
        :value="password"
        @input="password = $event.target.value"
      ></f7-list-input>
    </f7-list>
    <f7-list>
      <f7-list-button @click="signIn()">Đăng nhập</f7-list-button>
      <f7-list-button @click="signInFacebook()">Đăng nhập bằng Facebook</f7-list-button>
      <f7-list-button @click="signInGoogle()">Đăng nhập bằng Google</f7-list-button>
      <f7-block-footer>Speed Karaoke.<br>Ứng dụng tìm kiếm địa điểm karaoke toàn quốc.</f7-block-footer>
    </f7-list>
  </f7-page>
</template>

<script>
import * as firebase from 'firebase'
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      signInFacebook(){
        var provider =  new firebase.auth.FacebookAuthProvider();
             provider.addScope('user_birthday');
            firebase.auth().languageCode =  'fr_FR';
             provider.setCustomParameters({
            'display': 'popup'
            });
            var token =  ''
            var user =  ''
            const self = this;
            const app = self.$f7;
            const router = self.$f7router;
            app.dialog.preloader()
            firebase.auth().signInWithPopup(provider).then((result) => {
                console.log('result',result)
                const data = new FormData()
                data.append("TOKEN",result.credential.accessToken)
                data.append("EMAIL",result.user.email)
                data.append("AVATAR",result.user.photoURL)
                data.append("DISPLAY_NAME",result.user.displayName)
                self.axios.post(self.$store.state.API_URL + 'facebook',data).then((response) =>{
                    self.$session.start()
                    self.$session.set('token',response.data)
                    console.log(response.data)
                    router.navigate('/')
                })

                // ...
                }).catch(function(error) {
                  console.log(error)
                  app.dialog.alert(`Đăng nhập thất bại!`, () => {});
            });
            setTimeout(() => {
              app.dialog.close()
            },1500)
      },
      signInGoogle()
      {
         var provider_google =  new firebase.auth.GoogleAuthProvider();
             provider_google.addScope('https://www.googleapis.com/auth/contacts.readonly');
            firebase.auth().languageCode =  'pt';
            var token =  ''
            var user =  ''
             provider_google.setCustomParameters({
            'login_hint': 'example@example.com'
            });
            const self = this;
            const app = self.$f7;
            const router = self.$f7router;
            firebase.auth().signInWithPopup(provider_google).then(  (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
              console.log('result',result)
              const data = new FormData();
              data.append("TOKEN",result.credential.accessToken)
              data.append("EMAIL",result.user.email)
              data.append("AVATAR",result.user.photoURL)
              data.append("DISPLAY_NAME",result.user.displayName)
              self.axios.post(self.$store.state.API_URL + 'google',data).then((response) =>{
                    self.$session.start()
                    self.$session.set('token',response.data)
                    console.log(response.data)
                    router.navigate('/')
                })
            // ...
            }).catch(function(error) {
                console.log(error)
                app.dialog.alert(`Đăng nhập thất bại!`, () => {});
            });
            setTimeout(() => {
              app.dialog.close()
            },1500)
           
      },
      signIn() {
        const self = this;
        const app = self.$f7;
        const router = self.$f7router;
        const data = new FormData()
        data.append("EMAIL",self.username)
        data.append("PASSWORD",self.password)
        app.dialog.preloader()
        self.axios.post(self.$store.state.API_URL + 'user/login', data).then((response) => {
          self.$session.start()
          self.$session.set('token',response.data.data)
          
          router.navigate('/')
        }).catch(() => {
          app.dialog.alert(`Đăng nhập thất bại! Username: ${self.username}<br>Password: ${self.password}`, () => {
            
          });
        })
        setTimeout(() => {
          app.dialog.close()
        },1500)
        
      },
    },
    mounted()
    {
      if(this.$session.has('token'))
      {
        console.log(this.$session.get('token'))
        this.$f7router.navigate('/account/')
      }
      console.log(this.$session.get('token'))
    }
  };
</script>