<template>
<f7-page name="detail-karaoke">
    <f7-navbar  back-link="Back">{{karaoke.NAME_BAR_KARAOKE}}</f7-navbar>
    <f7-toolbar top tabbar labels>
        <f7-link tab-link="#tab-karaoke" class="tab-karaoke">
            <f7-icon class="icon-fill" ios="material:store" aurora="material:store" md="material:store" >
            </f7-icon>
            <small>Karaoke </small>
        
        </f7-link>
      <f7-link no-fast-click :href="false" class="camera">
        <!-- <input ios="material:camera" aurora="material:camera" md="material:camera"  type="file" accept="image/*" ref="uploadImage" multiple @change="uploadImage()"> -->
        <f7-icon class="icon-fill" ios="material:camera" aurora="material:camera" md="material:camera" >
        </f7-icon>
       <small>Tải hình </small>
      
      </f7-link>
      
      <f7-link tab-link="#tab-map">
        <f7-icon class="icon-fill" ios="material:near_me" aurora="material:near_me" md="material:near_me">
        </f7-icon>
        <small>Map</small>
      </f7-link>
      <f7-link tab-link="#tab-2">
        <f7-icon ios="material:beenhere" aurora="material:beenhere" md="material:beenhere">
        </f7-icon>
        <small>Lưu lại</small>
      </f7-link>
      <f7-link tab-link="#tab-rating">
        <f7-icon ios="material:star" aurora="material:star" md="material:star">
        </f7-icon>
        <small>Đánh giá</small>
      </f7-link>
    </f7-toolbar>
    <f7-tabs animated>
        <f7-tab id="tab-karaoke" class="page-content">
            <div class="banner-karaoke">
                <img @click="$refs.popupDark.open()" width="100%" height="auto" :src="$store.state.PUBLIC_URL + karaoke.BANNER_BAR_KARAOKE" :alt="karaoke.NAME_BAR_KARAOKE">
                <f7-photo-browser
                    :photos="photos"
                    theme="dark"
                    type="popup"
                    ref="popupDark"
                ></f7-photo-browser>
            </div>
            <f7-block>
                <p style="margin:0;font-size:18px"><strong>{{karaoke.NAME_BAR_KARAOKE}}</strong></p>
                <f7-icon v-for="i in Math.floor(karaoke.STAR_RATING)" :key="i" color="yellow" ios="material:star" aurora="material:star" md="material:star"></f7-icon> ({{karaoke.NUMBER_REATED}}), {{karaoke.VIEW}} lượt xem
                <p v-html="karaoke.CONTENT_BAR_KARAOKE"></p>
            </f7-block>
            <f7-block>
                <f7-block-title>Danh sách phòng của quán</f7-block-title>
                <f7-row>
                    <f7-col width="100">
                        <f7-card v-for="(room,index) in rooms" :key="index">
                            <img width="100%" height="auto" :src="$store.state.PUBLIC_URL + room.IMAGE_ROOM_BAR_KARAOKE" :alt="room.NAME_ROOM_BAR_KARAOKE">
                            <div class="content-room">
                                <p style="margin-top:15px;margin-bottom:0"><strong>Tên Phòng: </strong> {{room.NAME_ROOM_BAR_KARAOKE}}</p>
                                <p style="margin:0"><strong>Giá: </strong>{{room.RENT_COST.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}} <small>vnd/h</small> </p>
                                <p style="margin:0"><f7-icon v-for="i in Math.floor(karaoke.STAR_RATING)" :key="i" color="yellow" ios="material:star" aurora="material:star" md="material:star"></f7-icon>({{room.NUMBER_RATED}}), {{room.VIEW_ROOM}} lượt xem</p>
                            </div>
                        </f7-card>
                    </f7-col>
                </f7-row>
            </f7-block>
        </f7-tab>
        <f7-tab id="tab-rating" class="page-content">
        <f7-block>
            <p>Tab 1 content</p>
            ...
        </f7-block>
        </f7-tab>
    
    </f7-tabs>
    
</f7-page>
</template>
<script>
export default {
    data()
    {
        return {
            karaoke: {
                NAME_BAR_KARAOKE: 'Karaoke',
                STAR_RATING: 5
            },
            photos: [],
            upload: false,
            rooms: []
        }
    },
    watch: {
        karaoke()
        {
            this.upload = true
        }
    },
    methods:{
        DetailKaraoke()
        {
            
            this.axios.get(this.$store.state.API_URL + 'karaoke/'+this.$f7route.params.UUID).then((response) =>{
                this.karaoke = response.data
                this.photos.push({
                    url: this.$store.state.PUBLIC_URL + response.data.BANNER_BAR_KARAOKE
                })
                this.ApiGetImages()
            })
            
        },
        uploadImage()
        {
            this.$f7.dialog.preloader();
            const files = []
            for (let index = 0; index < this.$refs.uploadImage.files.length; index++) {
                const data = new FormData()
                data.append("IMAGES",this.$refs.uploadImage.files[index])
                data.append("UUID_BAR_KARAOKE",this.$f7route.params.UUID)
                this.axios.post(this.$store.state.API_URL + 'image/upload',data).then((response) => {
                   
                })
            }
            this.DetailKaraoke()
            this.$nextTick(() => {
                setTimeout(() => {
                    this.$f7.dialog.close()
                },2000)
            })
        },
        ApiGetImages()
        {
            
            this.axios.get(this.$store.state.API_URL + 'image/'+this.$f7route.params.UUID+'?type=UUID_BAR_KARAOKE').then((response) => {
               
               if(response.data.length > 0)
                {
                    response.data.forEach((image) => {
                        this.photos.push({
                            url: this.$store.state.PUBLIC_URL + image.URL_IMAGE
                        })
                    })
                }
            })
        },
        ApiGetRoom(UUID)
        {
            this.axios.get(this.$store.state.API_URL + "room?UUID_BAR_KARAOKE="+ this.$f7route.params.UUID).then((response) => {
                this.rooms = response.data
                console.log(response.data)
            })
        },
    },
    mounted()
    {  
        this.$f7.dialog.preloader();
        this.$nextTick(() => {
            this.DetailKaraoke()
            this.ApiGetRoom()
            setTimeout(() => {
                this.$f7.dialog.close()
            },1500)
        
        }) 
        
    },
    create()
    {
        
        console.log('CREATED',this.$f7route)
    }
}
</script>
<style scoped>
.camera {position: relative;}
.input-camera {position: absolute;top: 0;left: 0;width: 90px;height: 100%;z-index: 999;opacity: 0;}
.content-room {padding:10px;}
</style>