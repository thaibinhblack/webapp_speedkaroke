<template>
<f7-page name="detail-karaoke">
    <f7-navbar  back-link="Back">Karaoke</f7-navbar>
</f7-page>
</template>
<script>
export default {
    mounted()
    {
        console.log('mounted',this.$f7route)
    },
    create()
    {
        this.axios.get(this.$store.state.API_URL + 'karaoke?UUID_BAR_KARAOKE='+this.$route.params.UUID).then((response) =>{
            console.log(response.data)
        })
        console.log('CREATED',this.$f7route)
    }
}
</script>