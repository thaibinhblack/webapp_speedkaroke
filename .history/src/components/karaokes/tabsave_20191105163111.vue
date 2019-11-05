<template>
<f7-page>
    <f7-block>
        <f7-row>
            <f7-col width="20">
                <img v-if="user.TYPE_USER == 'FACEBOOK'" width="48px" height="48px"   :src="user.AVATAR" alt="">
                <img v-else-if="user.TYPE_USER == 'GOOGLE'" width="48px" height="48px"   :src="user.AVATAR" alt="">
                <img v-else :src="$store.state.PUBLIC_URL + user.AVATAR" width="48px" height="48px" >
            </f7-col>
            <f7-col width="80">

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
            user: {}
        }
    },
    methods: {
        ApiGetToken()
        {
            this.axios.get(this.$store.state.API_URL + 'user/token?api_token='+this.$session.get('token')).then((response) => {
                this.user = response.data
            })
        },
    }
}
</script>