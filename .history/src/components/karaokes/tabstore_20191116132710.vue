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
            <h3>{{karaoke.NAME_BAR_KARAOKE}}}</h3>
            <P><f7-icon size="12px" v-for="(star,index) in Math.floor(karaoke.STAR_RATING)" :key="index" color="yellow"  ios="material:star" aurora="material:star" md="material:star"></f7-icon> ({{karaoke.NUMBER_REATED}}), {{karaoke.VIEW}} lượt xem </P>
            <f7-button  tag="span" width="150px" color="#333">  <f7-icon ios="material:save" aurora="material:save" md="material:save" ></f7-icon> Lưu lại</f7-button>
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
    mounted()
    {
        window.FB.XFBML.parse();
    }
}
</script>
<style scoped>
.main-content p {margin: 5px 0;}
</style>