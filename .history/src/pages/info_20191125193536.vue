<template>
<f7-page>
    <f7-navbar  back-link="Back" title="Thông tin cá nhân"></f7-navbar>
     <f7-block>
         <div class="card" style="padding: 15px;">
            <form action="">
                <div class="form-group row">
                    <img width="70px" height="70px" :src="$store.state.PUBLIC_URL + user.AVATAR" alt="AVATAR" style="margin:auto;border-radius:50%">
                </div>
                <div class="form-group row">
                    <label for="emailuser" class="col-sm-4 col-xs-5 col-4 col-form-label" >Email</label>
                    <div class="col-sm-8 col-8 col-xs-7">
                            <input type="email" disabled v-model="user.EMAIL" class="form-control" id="emailuser" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="phoneuser" class="col-sm-4 col-xs-5 col-4 col-form-label" >Họ & Tên</label>
                    <div class="col-sm-8 col-8 col-xs-7">
                            <input type="text" v-model="user.DISPLAY_NAME" class="form-control" id="phoneuser" aria-describedby="emailHelp" placeholder="Họ và tên" />
                    </div>
                </div>
                 <div class="form-group row">
                    <label for="provinceuser" class="col-sm-4 col-xs-5 col-4 col-form-label" >Tỉnh</label>
                    <div class="col-sm-8 col-8 col-xs-7">
                            <select class="form-control" id="provinceuser">
                                <option v-for="(province,index) in provinces" :key="index" :value="province.ID_PROVINCE">{{province.NAME_PROVINCE}}</option>
                            </select>
                    </div>
                </div>
                
                <div class="form-group row">
                    <label for="phoneuser" class="col-sm-4 col-xs-5 col-4 col-form-label" >SĐT</label>
                    <div class="col-sm-8 col-8 col-xs-7">
                            <input type="text" v-model="user.PHONE" class="form-control" id="phoneuser" aria-describedby="emailHelp" placeholder="Số điện thoại" />
                    </div>
                </div>
            </form>
         </div>
     </f7-block>
</f7-page>
</template>

<script>
export default {
    data()
    {
        return {
            user: {},
            provinces: []
        }
    },
    methods: {

        ApiGetToken()
        {
            this.axios.get(this.$store.state.API_URL + 'user/token?api_token='+this.$session.get('token')).then((response) => {
                this.user = response.data
            })
        },
        api_province()
        {
            this.axios.get(this.$store.state.API_URL + 'province').then((response) => {
                this.provinces = response.data
            })
        }
    },
    mounted()
    {
        this.ApiGetToken()
        this.api_province()
    }
}
</script>