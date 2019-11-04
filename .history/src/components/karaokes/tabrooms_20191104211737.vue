<template>
<div id="page-rooms">
    <f7-block>
        <f7-row>
            <f7-col v-for="(room,index) in rooms" :key="index" class="item-room">
                <f7-link>
                    <div class="img-room">
                        <img width="100%" height="auto" :src="$store.state.PUBLIC_URL + room.IMAGE_ROOM_BAR_KARAOKE" :alt="room.NAME_ROOM_BAR_KARAOKE">
                    </div>
                    <div class="content-room">
                        <p><strong>Tên phòng: </strong> {{room.NAME_ROOM_BAR_KARAOKE}}</p>
                        <p><strong>Giá thuê: </strong>{{room.RENT_COST}}</p>
                        <P><f7-icon size="12px" v-for="(star,index) in Math.floor(room.STAR_RATING)" :key="index" color="yellow"  ios="material:star" aurora="material:star" md="material:star"></f7-icon>, ({{room.NUMBER_RATED}})</P>
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
.item-room {cursor: pointer;}
.img-room {width: 50%}
.content-room {width: 50%}
.content-room p {margin: 0;margin-left: 5px;color: #333;}
</style>