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
        <p><strong>Thành tiền: </strong> <span class="price" :class="{active: paypal_use_code > 0}">{{paypal}} vnđ</span> <span v-if="paypal_use_code > 0">{{paypal_use_code}} vnđ</span></p>
        <strong>Mã khuyến mãi</strong>
        <f7-input
                label="Mã khuyến mãi"
                type="text"
                placeholder="Nhập mã khuyến mãi"
                @input="code_promotion = $event.target.value"
                @change="api_check_promotion()"
            >
        </f7-input> 
        <strong>Chọn hình thức thanh toán</strong>
        <f7-item title="Hình thức thanh toán" smart-select :smart-select-params="{openIn: 'sheet'}">
            <select name="paypal" v-model="check_paypal">
                <option value="1" selected>Thanh toán trực tiếp</option>
                <option value="2">Thanh toán bằng speed coin</option>
            </select>
        </f7-item>
        <f7-button @click="success_bill()">Xác nhận thanh toán</f7-button>
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
            code_promotion: '',
            paypal_use_code: 0,
            check_paypal: 1
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
            let self = this;
            this.axios.get(this.$store.state.API_URL+'promotion/'+this.booking.UUID_BAR_KARAOKE+'/check?CODE_PROMOTION='+this.code_promotion).then((response) =>{
                self.$f7.dialog.alert(response.data.message)
                if(response.data.result != null)
                {
                    this.paypal_use_code = this.paypal * response.data.result.VALUE_SAFE_OFF / 100
                }
            })
        },
        success_bill()
        {
            const bill = new FormData()
            bill.append("UUID_BAR_KARAOKE",this.booking.UUID_BAR_KARAOKE)
            if(this.paypal_use_code == 0)
            {
                bill.append("PRICE_BILL",this.paypal)
                bill.append("CODE_PROMOTION",'')
            }
            else
            {
                bill.append("PRICE_BILL",this.paypal_use_code)
                bill.append("CODE_PROMOTION",this.code_promotion)
            }
            bill.append("TOTAL_TIME",this.totalTime)
            bill.append("RENT_COST",this.booking.RENT_COST)
            bill.append("PAYPAL",this.check_paypal)
            bill.append("UUID_ROOM_BAR_KARAOKE",this.booking.UUID_ROOM_BAR_KARAOKE)
            bill.append("UUID_BOOKING",this.booking.UUID_BOOKING)
            let self = this;
            this.axios.post('http://127.0.0.1:8000/api/v1/'+'bill?api_token='+this.$session.get('token'),bill).then((response) => {
                self.$f7.dialog.alert(response.data.message)
                // self.$f7.dialog.preloader()
                // setTimeout(() => { 
                //     self.$f7.dialog.close()
                // },1500)
                
                self.$f7router.navigate('/save/')
                
            }).catch(() => {
                self.$f7.dialog.alert('Thanh toán thất bại!')
            })
        }
    },
    mounted()
    {
        this.api_booking()
    }
}
</script>

<style scoped>
.price.active {text-decoration: line-through}
</style>