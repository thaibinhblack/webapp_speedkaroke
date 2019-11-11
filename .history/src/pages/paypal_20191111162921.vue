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
            const time_start = new Date("h:mm:ss",this.booking.TIME_START)
            const time_end = new Date(this.date)
            return time_start
        }
    },
    methods: {
        api_booking()
        {
            this.axios.get('http://127.0.0.1:8000/api/v1/' + 'booking/'+this.$f7route.params.UUID_BOOKING+'/paypal?api_token='+this.$session.get('token'))
            .then((response) => {
                this.booking = response.data
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