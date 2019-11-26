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
                    <label for="speedcoin" class="col-sm-4 col-xs-5 col-4 col-form-label" >SPEED COIN</label>
                    <div class="col-sm-8 col-8 col-xs-7">
                            <input disabled type="text" v-model="user.SPEED_COIN" class="form-control" id="speedcoin" placeholder="Họ và tên" />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="speedcoin" class="col-sm-4 col-xs-5 col-4 col-form-label" >SPEED COIN</label>
                    <div class="col-sm-8 col-8 col-xs-7">
                            <input disabled type="text" v-model="user.SPEED_COIN" class="form-control" id="speedcoin" placeholder="Họ và tên" />
                    </div>
                </div>
                 <div class="form-group row">
                    <label for="provinceuser" class="col-sm-4 col-xs-5 col-4 col-form-label" >Tỉnh</label>
                    <div class="col-sm-8 col-8 col-xs-7" >
                        <select class="form-control" id="provinceuser" v-model="user.ID_PROVINCE" @change=""> 
                            <option v-for="(province,index) in provinces" :key="index" :value="province.ID_PROVINCE">{{province.NAME_PROVINCE}}</option>
                        </select>
                    </div>
                </div>
                 <div class="form-group row">
                    <label for="provinceuser" class="col-sm-4 col-xs-5 col-4 col-form-label" >Quận / Huyện</label>
                    <div class="col-sm-8 col-8 col-xs-7" >
                        <select class="form-control" id="provinceuser" v-model="user.ID_DISTRICT"> 
                            <option v-for="(district,index) in districts" :key="index" :value="district.ID_DISTRICT">{{district.NAME_DISTRICT}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="addressuser" class="col-sm-4 col-xs-5 col-4 col-form-label" >Địa chỉ</label>
                    <div class="col-sm-8 col-8 col-xs-7">
                            <input type="text" v-model="user.ADDRESS" class="form-control" id="addressuser" aria-describedby="emailHelp" placeholder="Số điện thoại" />
                    </div>
                </div>
                <div class="form-group row">
                    <label for="phoneuser" class="col-sm-4 col-xs-5 col-4 col-form-label" >SĐT</label>
                    <div class="col-sm-8 col-8 col-xs-7">
                            <input type="text" v-model="user.PHONE" class="form-control" id="phoneuser" aria-describedby="emailHelp" placeholder="Số điện thoại" />
                    </div>
                </div>
                 <div class="form-group row">
                    <label for="genderuser" class="col-sm-4 col-xs-5 col-4 col-form-label" >Giới tính</label>
                    <div class="col-sm-4 col-4 col-xs-7">
                            <input v-model="user.GENDER"  class="form-check-input" type="radio" name="male" id="genderuser" value="1" >
                            <label class="form-check-label" for="exampleRadios1">
                                Nam
                            </label>
                           
                    </div>
                    <div class="col-sm-4 col-4">
                         <input v-model="user.GENDER" class="form-check-input" type="radio" name="female" id="genderuser" value="0" >
                            <label class="form-check-label" for="exampleRadios1">
                                Nữ
                            </label>
                    </div>
                </div>
                 <!-- <div class="form-group row">
                    <label for="birthday" class="col-sm-4 col-xs-5 col-4 col-form-label" >Ngày sinh</label>
                    <div class="col-sm-8 col-8 col-xs-7">
                            <input type="text" v-model="user.BIRTH_DAY" class="form-control" id="birthday"  placeholder="Ngày sinh" />
                    </div>
                </div> -->
                 

                <div class="form-group row">
                    <div class="col-sm-9">
                        <button type="submit" :disabled="update"  class="btn btn-primary btn-form">Cập nhật</button>
                        
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
            provinces: [],
            districts: []
        }
    },
    methods: {

        ApiGetToken()
        {
            this.axios.get(this.$store.state.API_URL + 'user/token?api_token='+this.$session.get('token')).then((response) => {
                this.user = response.data
                this.api_district(response.data.ID_DISTRICT)
            })
        },
        api_province()
        {
            this.axios.get(this.$store.state.API_URL + 'province').then((response) => {
                this.provinces = response.data
            })
        },
        api_district(id)
        {
            this.axios.get(this.$store.state.API_URL + 'district?ID_PROVINCE='+id).then((response) => {
                this.districts = response.data
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