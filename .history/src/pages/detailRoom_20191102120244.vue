<template>
<f7-page>
    <f7-navbar  back-link="Back"></f7-navbar>

</f7-page>
</template>

<script>
export default {
    methods:
    {
        ApiGetRoom()
        {
            this.axios.get(this.$store.state.API_URL + 'room/'+this.$f7route.params.UUID).then((response) => {
                console.log(response.data)
            })
        }
    },
    mounted()
    {
        this.ApiGetRoom()
    }
}
</script>