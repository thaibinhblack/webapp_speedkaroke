<template>
<f7-page>
    <f7-navbar  back-link="Back">{{room.NAME_ROOM_BAR_KARAOKE}}</f7-navbar>
    <f7-toolbar top tabbar labels>
        <f7-link  tab-link="#rooms">
            <f7-icon class="icon-room" ios="material:room" aurora="material:room" md="material:room" >
            </f7-icon>
            <small>Phòng </small>
        </f7-link>
        <f7-link tab-link="#camera" class="camera">
            <f7-icon class="icon-fill" ios="material:camera" aurora="material:camera" md="material:camera" >
            </f7-icon>
            <small>Tải hình </small>
        </f7-link>
       
        
      <f7-link tab-link="#tab-2">
        <f7-icon ios="material:beenhere" aurora="material:beenhere" md="material:beenhere">
        </f7-icon>
        <small>Lưu lại</small>
      </f7-link>
    </f7-toolbar>
    <f7-tabs>
        <f7-tab tab-active>
            <img :src="$store.state.PUBLIC_URL + room.IMAGE_ROOM_BAR_KARAOKE" width="100%" height="auto" :alt="room.NAME_ROOM_BAR_KARAOKE">
        </f7-tab>
    </f7-tabs>
</f7-page>
</template>

<script>
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
        this.$f7.dialog.preloader();
        this.ApiGetRoom()
        setTimeout(() => {
            this.$f7.dialog.close();
        },1500)
    }
}
</script>