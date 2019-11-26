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
        <p><strong>Thành tiền: </strong> {{paypal}} vnđ</p>
        <strong>Mã khuyến mãi</strong>
        <f7-input
                label="Mã khuyến mãi"
                type="text"
                placeholder="Nhập mã khuyến mãi"
                v-model="code_promotion"
                @change="api_check_promotion()"
            >
        </f7-input> 
        <strong>Chọn hình thức thanh toán</strong>
        <f7-item title="Hình thức thanh toán" smart-select :smart-select-params="{openIn: 'sheet'}">
            <select name="paypal">
                <option value="1" selected>Thanh toán trực tiếp</option>
                <option value="2">Thanh toán bằng speed coin</option>
            </select>
        </f7-item>
        <f7-button>Xác nhận thanh toán</f7-button>
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
            date: moment( new Date()).format('hh:mm:ss'),
            code_promotion: ''
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
    watch:
    {
        
    },
    methods: {
        api_booking()
        {
            this.axios.get(this.$store.state.API_URL + 'booking/'+this.$f7route.params.UUID_BOOKING+'/paypal?api_token='+this.$session.get('token'))
            .then((response) => {
                this.booking = response.data.result
                console.log(response.data)
            })
        },
        api_check_promotion()
        {
            this.axios.get('http://127.0.0.1:8000/api/v1/promotion/'+this.booking.UUID_BAR_KARAOKE+'/check?CODE_PROMOTION='+this.code_promotio).then((response) =>{
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