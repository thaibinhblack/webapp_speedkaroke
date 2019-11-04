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
      <f7-list-button @click="signIn">Đăng nhập</f7-list-button>
       <f7-list-button @click="signIn">Đăng nhập bằng Facebook</f7-list-button>
      <f7-block-footer>Speed Karaoke.<br>Ứng dụng tìm kiếm địa điểm karaoke toàn quốc.</f7-block-footer>
    </f7-list>
  </f7-page>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      signIn() {
        const self = this;
        const app = self.$f7;
        const router = self.$f7router;
        const data = new FormData()
        data.append("EMAIL",self.username)
        data.append("PASSWORD",self.password)
        self.axios.post(self.$store.state.API_URL + 'user/login', data).then((response) => {
          self.$session.start()
          self.$session.set('token',response.data.data)
          router.back()
        }).catch(() => {
          app.dialog.alert(`Đăng nhập thất bại! Username: ${self.username}<br>Password: ${self.password}`, () => {
            
          });
        })
        
      },
    },
    mounted()
    {
      if(this.$session.has('token'))
      {
        console.log(this.$session.get('token'))
        this.$f7router.back('/')
      }
      console.log(this.$session.get('token'))
    }
  };
</script>