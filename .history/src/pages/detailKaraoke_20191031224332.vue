<template>
<f7-page name="detail-karaoke">
    <f7-navbar  back-link="Back">{{karaoke.NAME_BAR_KARAOKE}}</f7-navbar>
    <f7-toolbar top tabbar labels>
      <f7-link tab-link="#tab-1" tab-link-active>
        <f7-icon class="icon-fill" ios="material:camera" aurora="material:camera" md="material:camera">
        </f7-icon>
        <span class="tabbar-label">Tải hình lên</span>
      </f7-link>
      <f7-link tab-link="#tab-2">
        <f7-icon ios="material:today" aurora="material:note" md="material:note">
        </f7-icon>
        <span class="tabbar-label">Lưu các địa điểm</span>
      </f7-link>
      <f7-link tab-link="#tab-3">
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
            karaoke: {
                NAME_BAR_KARAOKE: 'Karaoke'
            }
        }
    },
    methods:{
        DetailKaraoke()
        {
            this.$f7.dialog.preloader();
            this.axios.get(this.$store.state.API_URL + 'karaoke/'+this.$f7route.params.UUID).then((response) =>{
                this.karaoke = response.data
            })
            this.$f7.dialog.close()
        }
    },
    mounted()
    {
        this.DetailKaraoke()
        console.log('mounted',this.$f7route)
    },
    create()
    {
        
        console.log('CREATED',this.$f7route)
    }
}
</script>