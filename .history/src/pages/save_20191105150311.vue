<template>
<f7-page>
    <f7-navbar  back-link="Back">Các quán karaoke yêu thích của bạn</f7-navbar>
    <f7-block>
        <f7-row>
            <f7-col width="50">
                
            </f7-col>
        </f7-row>
    </f7-block>
</f7-page>
</template>

<script>
export default {
    data()
    {
        return {
            karaokes: []
        }
    },
    methods:{
        api_like_karaoke()
        {
            this.axios.get(this.$store.state.API_URL + 'like_karaoke?api_token='+this.$session.get('token')).then((response) => {
                this.karaokes = response.data
            })
        }
    },
    mounted()
    {
        if(!this.$session.has('token'))
        {
            this.$f7router.navigate('/login/')
        }
        else{
            this.api_like_karaoke()
        }
    }
}
</script>