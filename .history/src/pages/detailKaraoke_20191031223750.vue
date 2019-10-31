<template>
<f7-page name="detail-karaoke">
    <f7-navbar  back-link="Back">{{karaoke.NAME_BAR_KARAOKE}}</f7-navbar>
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
            this.axios.get(this.$store.state.API_URL + 'karaoke/'+this.$f7route.params.UUID).then((response) =>{
                this.karaoke = response.data
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