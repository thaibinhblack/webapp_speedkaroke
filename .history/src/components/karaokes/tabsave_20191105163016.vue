<template>
<f7-page>
    <f7-block>
        <f7-row>
            <f7-col width="20">
                <img src="" alt="">
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