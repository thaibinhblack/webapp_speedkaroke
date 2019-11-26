<template>
<f7-page>
    <f7-navbar  back-link="Back" title="Thông tin cá nhân"></f7-navbar>
     <f7-toolbar top tabbar labels>
        <f7-link tab-link="#info" class="camera">
            <f7-icon class="icon-store" ios="material:account_box" aurora="material:account_box" md="material:account_box" >
            </f7-icon>
            <small>Thông tin cá nhân</small>
        </f7-link>
    </f7-toolbar>
    <f7-tabs>
        <f7-tab>
            
        </f7-tab>
    </f7-tabs>
</f7-page>
</template>

<script>
export default {
    data()
    {
        return {
            user: {},
            provinces: [],
            districts: []
        }
    },
    methods: {

        ApiGetToken()
        {
            this.axios.get(this.$store.state.API_URL + 'user/token?api_token='+this.$session.get('token')).then((response) => {
                this.user = response.data
                this.api_district(response.data.ID_DISTRICT)
            })
        },
        api_province()
        {
            this.axios.get(this.$store.state.API_URL + 'province').then((response) => {
                this.provinces = response.data
            })
        },
        api_district(id)
        {
            this.axios.get(this.$store.state.API_URL + 'district?ID_PROVINCE='+id).then((response) => {
                this.districts = response.data
            })
        }
    },
    mounted()
    {
        this.ApiGetToken()
        this.api_province()
    }
}
</script>