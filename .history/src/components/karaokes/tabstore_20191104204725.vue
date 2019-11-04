<template>
<div class="banner-karaoke">
    <img  width="100%" height="auto" :src="$store.state.PUBLIC_URL + karaoke.BANNER_BAR_KARAOKE" :alt="karaoke.NAME_BAR_KARAOKE">
    <f7-photo-browser
        :photos="photos"
        theme="dark"
        type="popup"
        ref="popupDark"
        ></f7-photo-browser>
</div>
</template>
<script>
export default {
    props: ["karaoke", "photos"]
}
</script>