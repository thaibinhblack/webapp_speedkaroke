<template>
<div id="page-rooms">
    <f7-block>
        <f7-row>
            <f7-col v-for="(room,index) in rooms" :key="index">
                <f7-link>
                    <div class="img-room">
                        <img width="100%" height="auto" :src="$store.state.PUBLIC_URL + room.IMAGE_ROOM_BAR_KARAOKE" :alt="room.NAME_ROOM_BAR_KARAOKE">
                    </div>
                    <div class="content-room">
                        <p><strong>Tên phòng: </strong> {{room.NAME_ROOM_BAR_KARAOKE}}</p>
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
            this.axios.get(this.$store.state.API_URL + 'room?UUID_BAR_KARAOKE='+this.$f7route.params.UUID).then((response) => {
                this.rooms = response.data
                console.log(response.data)
            }).catch(() => {
                this.rooms = []
            })
        }
    },
    mounted()
    {
        this.api_room()
    },
    created()
    {
        this.api_room()
    }
}
</script>

<style scoped>
.img-room {width: 60%}
.content-room {width: 40%}
</style>