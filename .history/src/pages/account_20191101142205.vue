<template>
<f7-page dark>
    <f7-list class="list-accout info">
        <f7-list-item :title="user.EMAIL" after="xem thông tin" link="/info/" badge-color="#33333357">
            <img width="48px" height="48px" slot="media"  :src="$store.state.PUBLIC_URL + user.AVATAR" alt="">
        </f7-list-item>
     </f7-list>
     <f7-list class="list-accout">
          <f7-list-item title="Lịch sử đạt phòng" link="/history/">
            <f7-icon ios="material:history" aurora="material:history" md="material:history" slot="media"></f7-icon>
        </f7-list-item>
     </f7-list>
    <f7-toolbar bottom tabbar labels>
      <f7-link href="/" tab-link="#tab-1" >
        <f7-icon class="icon-fill" ios="material:home" aurora="material:home" md="material:home">
        </f7-icon>
        <span class="tabbar-label">Trang chính</span>
      </f7-link>
      <f7-link tab-link="#tab-2">
        <f7-icon ios="material:today" aurora="material:note" md="material:note">
        </f7-icon>
        <span class="tabbar-label">Lưu các địa điểm</span>
      </f7-link>
      <f7-link href="/login/" tab-link="#login" tab-link-active>
        <f7-icon ios="material:verified_user" aurora="material:verified_user" md="material:verified_user">
        </f7-icon>
        <span class="tabbar-label">Cá nhân</span>
      </f7-link>
    </f7-toolbar>
</f7-page>
</template>

<script>
export default {
    data()
    {
        return {
            user: {}
        }
    },
    methods: {
        ApiGetToken()
        {
            this.axios.get(this.$store.state.API_URL + 'user/token?api_token='+this.$session.get('token')).then((response) => {
                this.user = response.data
            })
        }
    },
    mounted()
    {
        this.$f7.dialog.preloader();
        this.$nextTick(() => {
            this.ApiGetToken()
        })
        setTimeout(() => {
            this.$f7.dialog.close()
        },1500)
    }
}
</script>
<style scoped>
.list-accout.list {margin: 5px 0 !important; }
.list-account.info.list ul {background: #33333357 !important;}
.list-account.info ul * {color: #fff !important;}
</style>