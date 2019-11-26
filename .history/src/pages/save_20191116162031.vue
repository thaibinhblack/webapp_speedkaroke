<template>
<f7-page>
    <f7-navbar  back-link="Back" back-link-url="/"></f7-navbar>
    <f7-toolbar top tabbar labels>
        <f7-link tab-link="#store-like" class="store-like">
            <f7-icon class="icon-store" ios="material:store" aurora="material:store" md="material:store" >
            </f7-icon>
            <small>Chi nhánh</small>
        </f7-link>
        <f7-link  tab-link="#rooms-like">
            <f7-icon class="icon-room" ios="material:room" aurora="material:room" md="material:room" >
            </f7-icon>
            <small>Phòng</small>
        </f7-link>
        <f7-link tab-link="#tab-history">
            <f7-icon class="icon-fill" ios="material:update" aurora="material:update" md="material:update">
            </f7-icon>
            <small>Đặt phòng</small>
        </f7-link>
        <f7-link tab-link="#tab-bill">
             <f7-icon class="icon-fill" ios="material:description" aurora="material:description" md="material:description">
            </f7-icon>
            <small>Hóa đơn</small>
        </f7-link>
    </f7-toolbar>
   <f7-tabs>
       <f7-tab id="store-like" tab-active>
            <tab-karaoke-save :karaokes="karaokes" />
       </f7-tab>
       <f7-tab id="rooms-like">
           <f7-block>
               <f7-row v-for="(room,index) in rooms" :key="index">
                   <f7-col width="50">
                       <img :src="$store.state.PUBLIC_URL + room.BANNER_ROOM_BAR_KARAOKE" alt="">
                       <div class="content-room">
                           <h4>{{room.NAME_ROOM_BAR_KARAOKE}}</h4>
                           <p><strong>Giá thuê: </strong>{{room.RENT_COST}}/h</p>
                       </div>
                   </f7-col>
               </f7-row>
           </f7-block>
       </f7-tab>
       <f7-tab id="tab-history">
           <f7-card v-for="(booking,index) in bookings" :key="index">
               <f7-row>
                   <f7-col width="20">
                       <img width="70" height="70" style="border-radius:50%" :src="$store.state.PUBLIC_URL + booking.LOGO_BAR_KARAOKE" alt="">
                   </f7-col>
                   <f7-col width="80">
                       <p><f7-link :href="'/room/'+booking.UUID_ROOM_BAR_KARAOKE+'/'">{{booking.NAME_BAR_KARAOKE}}, {{booking.NAME_ROOM_BAR_KARAOKE}}</f7-link></p>
                       <P><strong>Trạng thái: </strong> <span v-if="booking.STATUS == 0">Chờ duyệt</span> 
                       <span v-else-if="booking.STATUS == 1">Đã duyệt</span>
                       <span v-else-if="booking.STATUS == 2">Đang sử dụng</span>
                       <span v-else-if="booking.STATUS == 3">Đã thanh toán</span>
                       <span v-else>Đã hủy</span>
                       </P>
                        <p><strong>Thời gian đặt</strong> {{booking.TIME_START}}, {{booking.CREATED_AT}}</p>

                   </f7-col>
               </f7-row>
           </f7-card>
       </f7-tab>
       <f7-tab id="tab-bill">
           <f7-block>
               <f7-card v-for="(bill,index) in bills" :key="index">
                   <f7-row>
                       <f7-col width="30">
                           <img width="70" height="70" style="border-radius:50%" :src="$store.state.PUBLIC_URL + bill.LOGO_BAR_KARAOKE">
                       </f7-col>
                       <f7-col width="70">
                           {{bill.NAME_BAR_KARAOKE}}
                       </f7-col>
                   </f7-row>
                   <p><strong>Tổng thời gian hát: </strong>{{bill.TOTAL_TIME}}, {{bill.RENT_COST}}/h</p>
                   <P><strong>Mã khuyến mãi</strong> {{bill.CODE_PROMOTION == '' ? 'Không có sử dụng mã khuyến mãi': bill.CODE_PROMOTION}}</P>
                   <P><strong>Tổng tiền: </strong> {{bill.PRICE_BILL}}</P>
                   <P><strong>Thanh toán vào lúc: </strong> {{bill.CREATED_AT}} </P>
               </f7-card>
           </f7-block>
       </f7-tab>
   </f7-tabs>
</f7-page>
</template>

<script>
import moment from 'moment'
export default {
    components: {
        'tab-karaoke-save': () => import('@/components/karaokes/tabkaraokesave.vue')
    },
    data()
    {
        return {
            karaokes: [],
            bookings: [],
            bills: [],
            rooms: []
        }
    },
    computed:
    {
        formatDate(date)
        {
            return moment(date).format('dd/mm/yyyy h:mm:ss')
        }
    },
    methods:{
        api_like_karaoke()
        {
            this.axios.get(this.$store.state.API_URL + 'like_karaoke?api_token='+this.$session.get('token')).then((response) => {
                this.karaokes = response.data
            })
        },
        api_like_room()
        {
            this.axios.get'http://1270.0.0.1:8000/api/v1/' + 'like_karaoke?api_token='+this.$session.get('token')+'&UUID_ROOM_BAR_KARAOKE=all').then((response) => {
                this.rooms = response.data
            })
        },
        api_bookings()
        {
            this.axios.get(this.$store.state.API_URL + 'booking?status=all&api_token='+this.$session.get('token')).then((response) => {
                this.bookings = response.data
            })
        },
        api_bills()
        {
            this.axios.get(this.$store.state.API_URL + 'bill?api_token='+this.$session.get('token')).then((response) => {
                this.bills = response.data.results
            })
        }
    },
    mounted()
    {
        if(!this.$session.has('token'))
        {
            this.$f7router.navigate('/login/')
        }
        else{
            this.api_like_karaoke()
            this.api_bookings()
            this.api_bills()
        }
    }
}
</script>