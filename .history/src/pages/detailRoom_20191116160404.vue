<template>
<f7-page>
    <f7-toolbar top tabbar labels>
        <f7-link  href="/home/" >
            <f7-icon class="icon-home" ios="material:home" aurora="material:home" md="material:home" >
            </f7-icon>
            <small>Trang chủ </small>
        </f7-link>
        <f7-link  tab-link="#room" tab-link-active	>
            <f7-icon class="icon-room" ios="material:business" aurora="material:business" md="material:business" >
            </f7-icon>
            <small>Phòng </small>
        </f7-link>
        <f7-link tab-link="#camera-room" class="camera">
            <f7-icon class="icon-fill" ios="material:camera" aurora="material:camera" md="material:camera" >
            </f7-icon>
            <small>Tải hình </small>
        </f7-link>
       
        
      <f7-link tab-link="#tab-save-room">
        <f7-icon ios="material:comment" aurora="material:comment" md="material:comment">
        </f7-icon>
        <small>Bình luận</small>
      </f7-link>
    </f7-toolbar>
    <f7-tabs>
        <f7-tab id="room" tab-active>
            <div class="tab-room">
                <img :src="$store.state.PUBLIC_URL + room.IMAGE_ROOM_BAR_KARAOKE" width="100%" min-height="350px" height="auto" :alt="room.NAME_ROOM_BAR_KARAOKE">
                <f7-block>
                     <button @click="likeRoom()" class="btn-save" style="width:120px;"><f7-icon ios="material:save" aurora="material:save" md="material:save" ></f7-icon> Lưu lại</button>
                    <h3>{{room.NAME_ROOM_BAR_KARAOKE}}</h3>
                    <P><f7-icon size="15px" v-for="(star,index) in Math.floor(room.STAR_RATING)" :key="index" color="yellow"  ios="material:star" aurora="material:star" md="material:star"></f7-icon>, ({{room.NUMBER_RATED}})</P>
                    <p><strong>Giá thuê: </strong>{{room.RENT_COST}}</p>
                    <p v-for="(attribute,index) in attributes" :key="index"><strong>{{attribute.NAME_ATTRIBUTE}}: </strong>{{attribute.CONTENT_ATTRIBUTE}}</p>
                    <p><strong>Thời gian đặt phòng: </strong> <f7-input
                        label="Thời gian đặt phòng"
                        type="datetime-local"
                        v-model="time_booking"
                        placeholder="Please choose..."
                    >
                        <f7-icon ios="material:timer" aurora="material:timer" md="material:timer" slot="media"></f7-icon>
                    </f7-input></p>
                    <div class="button-booking" v-if="$session.has('token')">
                        
                        <f7-button v-if="user_booking == -1 || user_booking == 3 || user_booking == 4" @click="book()" class="btn-book">Đặt phòng ngay</f7-button>
                        <f7-button v-else-if="user_booking == 0 || user_booking == 1 " @click="cancle()" class="btn-book">Hủy đặt phòng</f7-button>
                        <f7-button class="btn-book" v-else @click="$f7router.navigate('/paypal/'+booking.UUID_BOOKING+'/')">Thanh toán</f7-button>
                    </div>
                    <div class="button-booking" v-else>
                        
                        <f7-button v-if="user_booking == -1 || user_booking == 3 || user_booking == 4 || user_booking == 0" @click="book()" class="btn-book">Đặt phòng ngay</f7-button>
                        <f7-button v-else-if="user_booking == 1"  class="btn-book">Đã có người đặt phòng</f7-button>
                    </div>
                </f7-block>
            </div>
        </f7-tab>
        <f7-tab id="camera-room" >
            <tab-cameara />
        </f7-tab>
        <f7-tab id="tab-save-room">
            <tab-save-room :room="room"/>
        </f7-tab>
    </f7-tabs>
</f7-page>
</template>

<script>
import moment from 'moment'
export default {
    components: {
        'tab-cameara': () => import('@/components/rooms/tabcamera.vue'),
        'tab-save-room': () => import('@/components/rooms/tabSaveRoom.vue')
    },
    data()
    {
        return {
            room: {},
            attributes: [],
            UUID_BARR_KARAOKE: 0,
            user_booking: -1,
            time_booking: moment(new Date()).format('DD/MM/YYYY h:mm:ss a')
        }
    },
    
    methods:
    {
        ApiGetRoom()
        {
            this.axios.get(this.$store.state.API_URL + 'room/'+this.$f7route.params.UUID).then((response) => {
                this.room = response.data
                this.UUID_BARR_KARAOKE = response.data.UUID_BAR_KARAOKE
                // console.log(response.data)
                 this.checkbook()
            })
        },
        api_attribute()
        {
            this.axios.get(this.$store.state.API_URL + 'attribute-room?UUID_ROOM_BAR_KARAOKE='+this.$f7route.params.UUID).then((response) => {
                this.attributes = response.data
            })
        },
        book()
        {
            const self = this;
            if(!self.$session.has('token'))
            {
                self.$f7router.navigate('/login/')
            }
            else
            {
                const book = new FormData()
                const time = new Date()
                const self = this;
                const app = self.$f7;
                book.append("UUID_ROOM_BAR_KARAOKE",this.room.UUID_ROOM_BAR_KARAOKE)
                book.append("UUID_BAR_KARAOKE",this.room.UUID_BAR_KARAOKE)
                book.append("TIME_START",moment(time).format('YYYY-MM-DD h:mm:ss'))
                this.axios.post(this.$store.state.API_URL+ 'bookingmobile?api_token='+this.$session.get('token'),book).then((response) => {
                    //  console.log(response.data)
                    self.user_booking = 0
                     app.dialog.alert(`Đặt phòng thành công!`, () => {});
                })
            }
        },
        checkbook()
        {
            this.$http.get(this.$store.state.API_URL + 'check_booking?api_token='+this.$session.get('token')+'&status=check&UUID_ROOM_BAR_KARAOKE='+this.room.UUID_ROOM_BAR_KARAOKE).then((response) => {
                this.user_booking = response.data.STATUS
                this.booking = response.data
            })
        },
        cancle()
        {
            const self = this;
            const app = self.$f7;
            this.axios.get(this.$store.state.API_URL + 'cancle?api_token='+this.$session.get('token')+'&UUID_ROOM_BAR_KARAOKE='+this.$f7route.params.UUID).then(() => {
                 app.dialog.alert(`Đã hủy đặt phòng!`, () => {});
                 this.user_booking = -1
            })
        },
        likeRoom()
        {
            if(!this.$session.has('token'))
            {
                this.$f7router.navigate('/login/')
            }
            else
            {
                const self = this;
                const app = self.$f7;
                this.axios.post(this.$store.state.API_URL + 'like_mobile?api_token='+this.$session.get('token')+'&UUID_BAR_KARAOKE='+this.$f7route.params.UUID)
                .then(() => {
                    app.dialog.alert(`Lưu thành công`, () => {});
                    app.dialog.preloader()
                    setTimeout(() => {
                        app.dialog.close()
                    },1500)
                })
            }
        },
        
    },
    mounted()
    {
        this.$f7.dialog.preloader();
        this.ApiGetRoom()
        this.$nextTick(() => {
            this.api_attribute()
            this.$nextTick(() => {
               
                setTimeout(() => {
                    this.$f7.dialog.close();
                },1500)  
            })
            
        })
        
    }
}
</script>

<style scoped>
.btn-book {background: #f65e39 ;color: #fff !important;}
</style>