<template>
<f7-page>
    <f7-navbar  back-link="Back" title="Thông tin cá nhân"></f7-navbar>
     <form action="">
        <div class="form-group row">
            <label for="emailuser" class="col-sm-4 col-form-label" >Email</label>
            <div class="col-sm-8">
                    <input type="email" v-model="user.EMAIL" class="form-control" id="emailuser" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
        </div>
     </form>
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