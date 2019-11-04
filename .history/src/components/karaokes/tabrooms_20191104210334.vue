<template>
<div id="page-rooms">
    <f7-block>
        <f7-row>
            <f7-col>
                <f7-link>
                    <div class="img-room">
                        <img src="" alt="">
                    </div>
                </f7-link>
            </f7-col>
        </f7-row>
    </f7-block>
</div>
</template>

<script>
export default {
    data()
    {
        return {
            rooms: []
        }
    },
    methods: {
        api_room()
        {
            this.axios.get(this.$store.state.API_URL + 'room/'+this.$f7route.params.UUID).then((response) => {
                this.rooms = response.data
            }).catch(() => {
                this.rooms = []
            })
        }
    }
}
</script>