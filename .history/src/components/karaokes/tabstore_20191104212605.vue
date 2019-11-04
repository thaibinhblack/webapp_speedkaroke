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
            <p>Giiá thuê: {{karaoke.RENT_COST_MIN}} - {{karaoke.RENT_COST_MAX}}</p>
        </div>
    </f7-block>
</div>
</template>
<script>
export default {
    props: ["karaoke", "photos"]
}
</script>