<template>
<f7-page>
    <f7-navbar title="Thanh toán" back-link="Back"></f7-navbar>
    <f7-block>
        <h3 align="center">Thông tin thanh toán</h3>
        <p><strong>Tên chi nhánh: </strong> {{booking.NAME_BAR_KARAOKE}} </p>
        <p><strong>Phòng: </strong> {{booking.NAME_ROOM_BAR_KARAOKE}}</p>
        <p><strong>Giá thuê: </strong>{{booking.RENT_COST}}/h</p>
        <p><strong>Thời gian đặt phòng</strong> {{booking.TIME_START}}, {{formatDate}}</p>
        <p><strong>Tổng thời gian hát: </strong> {{totalTime}}</p>
        <p><strong>Thành tiền: </strong> {{paypal}}</p>
    </f7-block>
</f7-page>
</template>

<script>
import moment from 'moment'
export default {
    data()
    {
        return {
            booking: {},
            date: moment( new Date()).format('hh:mm:ss')
        }
    },
    computed:
    {
        formatDate()
        {
            return moment(this.booking.CREATED_AT).format('dd/mm/YYYY')
        },
        totalTime()
        {
            const h = Math.floor( this.booking.TOTAL_TIME / 60)
            const p = this.booking.TOTAL_TIME - (h*60)
            return h +' giờ,'+p+' phút'
        },
        paypal()
        {
            const h = Math.floor( this.booking.TOTAL_TIME / 60)
            return Math.floor( this.booking.TOTAL_TIME / 60) * this.booking.RENT_COST + (( this.booking.TOTAL_TIME - (h*60)) / 60) * this.booking.RENT_COST
        }
    },
    methods: {
        api_booking()
        {
            this.axios.get(this.$store.state.API_URL + 'booking/'+this.$f7route.params.UUID_BOOKING+'/paypal?api_token='+this.$session.get('token'))
            .then((response) => {
                this.booking = response.data.result
                console.log(response.data)
            })
        }
    },
    mounted()
    {
        this.api_booking()
    }
}
</script>