<template>
<f7-page>
    <f7-navbar  back-link="Back">{{room.NAME_ROOM_BAR_KARAOKE}}</f7-navbar>
    <img :src="$store.state.PUBLIC_URL + room.IMAGE_ROOM_BAR_KARAOKE" width="100%" height="auto" :alt="room.NAME_ROOM_BAR_KARAOKE">
</f7-page>
</template>

<script>
import tab-camera from '@/components/tabCamera.vue';
export default {
    data()
    {
        return {
            room: {}
        }
    },
    methods:
    {
        ApiGetRoom()
        {
            this.axios.get(this.$store.state.API_URL + 'room/'+this.$f7route.params.UUID).then((response) => {
                this.room = response.data
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