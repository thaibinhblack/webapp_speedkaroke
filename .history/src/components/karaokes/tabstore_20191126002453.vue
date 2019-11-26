<template>
<div class="banner-karaoke" v-if="karaoke.UUID_BAR_KARAOKE">
    <img  width="100%" height="auto" :src="$store.state.PUBLIC_URL + karaoke.BANNER_BAR_KARAOKE" :alt="karaoke.NAME_BAR_KARAOKE">
    <f7-photo-browser
        :photos="photos"
        theme="dark"
        type="popup"
        ref="popupDark"
        ></f7-photo-browser>
    <f7-block>
        <div class="main-content">
             <button @click="likeRoom()" class="btn-save" style="width:120px;"><f7-icon ios="material:save" aurora="material:save" md="material:save" ></f7-icon> Lưu lại</button>
            <h3>{{karaoke.NAME_BAR_KARAOKE}}}</h3>
            <P>
                <f7-icon size="12px" v-for="(star,index) in Math.floor(karaoke.STAR_RATING)" :key="index" color="yellow"  ios="material:star" aurora="material:star" md="material:star"></f7-icon> ({{karaoke.NUMBER_REATED}}), {{karaoke.VIEW}} lượt xem
               
            </P>
            
            <p>Giiá thuê: {{karaoke.RENT_COST_MIN}} - {{karaoke.RENT_COST_MAX}}</p>
            <P><f7-icon ios="material:phone" aurora="material:phone" md="material:phone"></f7-icon> {{karaoke.PHONE_BAR_KARAOKE}}</P>
            <P><f7-icon ios="material:email" aurora="material:email" md="material:email"></f7-icon> {{karaoke.EMAIL_BAR_KARAOKE}}</P>
            <P><f7-icon ios="material:map-marker" aurora="material:map-marker" md="material:map-marker"></f7-icon> {{karaoke.ADDRESS_BAR_KARAOKE}}</P>
            <p v-html="karaoke.CONTENT_BAR_KARAOKE"></p>
        </div>
       
        <div class="fb-comments" data-href="https://developers.facebook.com/docs/plugins/comments#configurator" data-width="" data-numposts="5"></div>
    </f7-block>
</div>
</template>
<script>
export default {
    props: ["karaoke", "photos"],
    methods:
    {
        likeRoom()
        {
            if(!this.$session.has('token'))
            {
                this.$f7router.navigate('/login/')
            }
            else
            {
                const self = this;
                const app = self.$f7;
                this.axios.post(this.$store.state.API_URL + 'like_mobile?api_token='+this.$session.get('token')+'&UUID_BAR_KARAOKE='+this.$f7route.params.UUID)
                .then(() => {
                    app.dialog.alert(`Lưu thành công`, () => {})     
                })
            }
        },
    },
}
</script>
<style scoped>
.main-content p {margin: 5px 0;}
.btn-save {background: transparent;border: none;box-shadow: none; cursor: pointer; text-align: left}
</style>