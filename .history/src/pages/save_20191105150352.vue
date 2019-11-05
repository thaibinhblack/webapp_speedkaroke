<template>
<f7-page>
    <f7-navbar  back-link="Back">Các quán karaoke yêu thích của bạn</f7-navbar>
    <f7-block>
        <f7-row>
            <f7-col width="50" v-for="(karaoke,index) in karaokes" :key="index">
                <f7-card class="item-karaoke" style="margin:0">
                    <f7-link :href="'/karaoke/'+karaoke.UUID_BAR_KARAOKE+'/'" ><img clas="image-karaoke" width="100%" height="100px" :src="$store.state.PUBLIC_URL+karaoke.BANNER_BAR_KARAOKE" :alt="karaoke.NAME_BAR_KARAOKE"></f7-link>
                    <div class="content-item-karaoke" style="padding:5px"> 
                            <p><strong>{{karaoke.NAME_BAR_KARAOKE}}</strong></p>
                            <P><f7-icon ios="material:near_me" aurora="material:near_me" md="material:near_me"></f7-icon> {{karaoke.NAME_PROVINCE}}, {{karaoke.NAME_DISTRICT}}</P>
                            <P><f7-icon ios="material:near_me" aurora="material:near_me" md="material:near_me"></f7-icon> {{karaoke.ADDRESS_BAR_KARAOKE}}</P>
                    </div>
                </f7-card>
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