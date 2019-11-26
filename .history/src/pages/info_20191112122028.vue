<template>
<f7-page>
    <f7-navbar  back-link="Back" title="Thông tin cá nhân"></f7-navbar>
     <f7-list class="list-accout">
            <f7-list-item >
                <f7-icon color="#ee350f" ios="material:account" aurora="material:account" md="material:account" slot="media"></f7-icon>
                <f7-input type="text" label="Email" :value="user.EMAIL"></f7-input>
            </f7-list-item>
    </f7-list>
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
    },
    mounted()
    {
        this.ApiGetToken()
    }
}
</script>