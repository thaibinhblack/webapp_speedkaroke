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
             <f7-icon class="icon-fill" ios="material:bill" aurora="material:bill" md="material:bill">
            </f7-icon>
            <small>Hóa đơn</small>
        </f7-link>
    </f7-toolbar>
   <f7-tabs>
       <f7-tab id="store-like" tab-active>
            <tab-karaoke-save :karaokes="karaokes" />
       </f7-tab>
       <f7-tab id="rooms-like"></f7-tab>
       <f7-tab id="tab-history">
           <f7-card v-for="(booking,index) in bookings" :key="index">
               <f7-row>
                   <f7-col width="20">
                       <img width="70" height="70" style="border-radius:50%" :src="$store.state.PUBLIC_URL + booking.LOGO_BAR_KARAOKE" alt="">
                   </f7-col>
                   <f7-col width="80">
                       <p>{{booking.NAME_BAR_KARAOKE}}, {{booking.NAME_ROOM_BAR_KARAOKE}}</p>
                       <P><strong>Trạng thái: </strong> <span v-if="booking.STATUS == 0">Chờ duyệt</span> 
                       <span v-else-if="booking.STATUS == 1">Đã duyệt</span>
                       <span v-else-if="booking.STATUS == 2">Đã thanh toán</span>
                       <span v-else-if="booking.STATUS == 3 || booking.STATUS == 4">Đã hủy</span>
                       </P>
                        <p><strong>Thời gian đặt</strong> {{booking.TIME_START}}, {{booking.CREATED_AT}}</p>

                   </f7-col>
               </f7-row>
           </f7-card>
       </f7-tab>
       <f7-tab id="tab-bill">
           <f7-block>
               
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
            bookings: []
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
        api_bookings()
        {
            this.axios.get(this.$store.state.API_URL + 'booking?status=all&api_token='+this.$session.get('token')).then((response) => {
                this.bookings = response.data
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
        }
    }
}
</script>