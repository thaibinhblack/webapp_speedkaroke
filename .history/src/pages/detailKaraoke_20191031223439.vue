<template>
<f7-page name="detail-karaoke">
    <f7-navbar  back-link="Back">Karaoke</f7-navbar>
</f7-page>
</template>
<script>
export default {
    methods:{
        DetailKaraoke()
        {
            this.axios.get(this.$store.state.API_URL + 'karaoke?UUID_BAR_KARAOKE='+this.$f7route.params.UUID).then((response) =>{
                console.log(response.data)
            })
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